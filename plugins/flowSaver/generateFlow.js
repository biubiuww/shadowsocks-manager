const log4js = require('log4js');
const logger = log4js.getLogger('flowSaver');
const knex = appRequire('init/knex').knex;
const moment = require('moment');
const cron = appRequire('init/cron');

const generateFlow = async (type) => {
  try {
    let tableName;
    let sourceDataTableName = '';
    let interval;
    if (type === 'day') {
      tableName = 'saveFlowDay';
      sourceDataTableName = 'saveFlowHour';
      interval = 24 * 3600 * 1000;
    }
    if (type === 'hour') {
      tableName = 'saveFlowHour';
      sourceDataTableName = 'saveFlow5min';
      interval = 3600 * 1000;
    }
    if (type === '5min') {
      tableName = 'saveFlow5min';
      sourceDataTableName = 'saveFlow';
      interval = 5 * 60 * 1000;
    }
    const count = await knex(sourceDataTableName).count('id as count').then(success => success[0].count);
    if (!count) { return; }
    const recent = await knex(tableName).select().orderBy('time', 'DESC').limit(1).then(success => success[0]);
    let time;
    if (!recent) {
      const firstFlow = await knex('saveFlow').select().orderBy('time', 'ASC').limit(1).then(success => success[0]);
      if (type === 'day') {
        time = moment(firstFlow.time).hour(0).minute(0).second(0).millisecond(0).toDate().getTime();
      }
      if (type === 'hour') {
        time = moment(firstFlow.time).minute(0).second(0).millisecond(0).toDate().getTime();
      }
      if (type === '5min') {
        const minute = moment(firstFlow.time).minute();
        time = moment(firstFlow.time).minute(minute - minute % 5).second(0).millisecond(0).toDate().getTime();
      }
    } else {
      time = recent.time + interval;
    }
    if (Date.now() - time < interval) {
      console.log(Date.now() - time, time, interval);
      return;
    }
    let sum = await knex(sourceDataTableName)
      .sum('flow as sumFlow')
      .groupBy(['port', 'id'])
      .select([`${sourceDataTableName}.port as port`])
      .select([`${sourceDataTableName}.id as id`])
      .select([`${sourceDataTableName}.accountId as accountId`])
      .whereBetween('time', [time, time + interval - 1]);//between包含边界  故此处-1，避免重复统计
    if (!sum.length) { sum = [{ id: 0, port: 0, flow: 0 }]; }
    logger.info(`Generate ${type} flow, length: ${sum.length}`);
    const insertPromises = [];
    for (let i = 0; i < Math.ceil(sum.length / 50); i++) {
      logger.info(`insert generate flow from ${i * 50} to ${i * 50 + 50}`);
      const insert = knex(tableName).insert(sum.slice(i * 50, i * 50 + 50).map(m => {
        return {
          id: m.id,
          accountId: m.accountId || 0,
          port: m.port,
          flow: m.sumFlow,
          time,
        };
      }));
      insertPromises.push(insert);
    }
    await Promise.all(insertPromises);
    await knex(tableName).delete().where({
      id: 0,
    }).whereBetween('time', [0, time - 1]);
  } catch (err) {
    logger.error(err);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 30 * 1000);
    });
  }
  await generateFlow(type);
};

cron.minute(async () => {
  knex('saveFlow').delete().whereBetween('time', [0, Date.now() - 3 * 3600 * 1000]).then();
  knex('saveFlowDay').delete().whereBetween('time', [0, Date.now() - 32 * 24 * 3600 * 1000]).then();
  knex('saveFlowHour').delete().whereBetween('time', [0, Date.now() - 3 * 24 * 3600 * 1000]).then();
  knex('saveFlow5min').delete().whereBetween('time', [0, Date.now() - 5 * 3600 * 1000]).then();
}, 'RemoveOldFlow', 37);

cron.minute(async () => {
  logger.info('每3分钟执行一次,设置更新时间');
  let date = Date.now();
  let sum = await knex('saveFlow')
    .sum('flow as sumFlow')
    .groupBy(['id', 'accountId'])
    .select(['saveFlow.id as id'])
    .select(['saveFlow.accountId as accountId'])
    .whereBetween('time', [date - 180000, date]);
  for (let item of sum) {
    let account_flow = await knex('account_flow')
      .select('nextCheckTime')
      .where({ 'serverId': item.id, 'accountId': item.accountId })
      .then(success => success[0]);
    //只更新流量大于2M并且距下次检查时间大于30分钟的数据
    if ((account_flow.nextCheckTime - date > 30 * 60 * 1000) && (item.sumFlow > 2 * 1000 * 1000)) {
      await knex('account_flow').update({
        nextCheckTime: Date.now()
      }).where({
        'accountId': item.accountId,
        'serverId': item.id
      });
    }
  }
}, 'UpdateNextCheckTime', 3);
cron.minute(async () => {
  logger.info('每5分钟执行一次');
  generateFlow('5min');
}, 'Generate5minFlow', 5);
cron.cron(() => {
  logger.info('每小时执行一次');
  generateFlow('hour');
}, 'GenerateHourFlow', '1 * * * *', 3600);
cron.cron(() => {
  logger.info('每天0点1分钟执行');
  generateFlow('day');
}, 'GenerateDayFlow', '1 0 * * *', 24 * 3600);