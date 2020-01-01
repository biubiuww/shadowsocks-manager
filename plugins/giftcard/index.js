const knex = appRequire('init/knex').knex;
const log4js = require('log4js');
const logger = log4js.getLogger('giftcard');
const uuidv4 = require('uuid/v4');
const account = appRequire('plugins/account/index');
const orderPlugin = appRequire('plugins/webgui_order');
const ref = appRequire('plugins/webgui_ref/time');
const config = appRequire('services/config').all();
const moment = require('moment');

const dbTableName = require('./db/giftcard').tableName;

const isTelegram = config.plugins.webgui_telegram && config.plugins.webgui_telegram.use;
let telegram;
if (isTelegram) {
  telegram = appRequire('plugins/webgui_telegram/admin');
}
const cardType = {
  hourly: 5,
  daily: 4,
  weekly: 2,
  monthly: 3,
  quarterly: 6,
  yearly: 7
};

const cardStatusEnum = {
  available: 'AVAILABLE',
  used: 'USED',
  revoked: 'REVOKED'
};

const batchStatusEnum = {
  available: 'AVAILABLE',
  usedup: 'USEDUP',
  revoked: 'REVOKED'
};

const generateGiftCard = async (count, orderType, comment = '') => {
  const currentCount = (await knex(dbTableName).count('* as cnt'))[0].cnt;
  const batchNumber = currentCount === 0 ? 1 :
    ((await knex(dbTableName).max('batchNumber as mx'))[0].mx + 1);
  const cards = [];
  for (let i = 0; i < count; i++) {
    const password = uuidv4().replace(/\-/g, '').substr(0, 18);
    cards.push({
      orderType,
      status: cardStatusEnum.available,
      batchNumber,
      password,
      createTime: Date.now(),
      comment,
    });
  }
  await knex(dbTableName).insert(cards);
  logger.debug(`Inserted ${count} gift card`);
  return batchNumber;
};

const sendSuccessMail = async userId => {
  const emailPlugin = appRequire('plugins/email/index');
  const user = await knex('user').select().where({
    type: 'normal',
    id: userId,
  }).then(success => {
    if (success.length) {
      return success[0];
    }
    return Promise.reject('user not found');
  });
  const orderMail = await knex('webguiSetting').select().where({
    key: 'mail',
  }).then(success => {
    if (!success.length) {
      return Promise.reject('settings not found');
    }
    success[0].value = JSON.parse(success[0].value);
    return success[0].value.order;
  });
  await emailPlugin.sendMail(user.email, orderMail.title, orderMail.content);
};

const processOrder = async (userId, accountId, password) => {
  const cardResult = await knex(dbTableName).where({ password }).select();
  if (cardResult.length === 0) {
    return { success: false, message: '充值码不存在' };
  }
  const card = cardResult[0];
  if (card.status !== cardStatusEnum.available) {
    return { success: false, message: '无法使用这个充值码' };
  }
  const orderInfo = await orderPlugin.getOneOrder(card.orderType);
  return account.setAccountLimit(userId, accountId, card.orderType)
    .then(account_id => {
      return knex(dbTableName).where({ id: card.id }).update({
        user: userId,
        account: accountId || account_id,
        status: cardStatusEnum.used,
        usedTime: Date.now()
      });
    }).then(() => {
      isTelegram && telegram.push(`充值码[ ${password} ][ ${orderInfo.name} ]使用成功`);
      ref.payWithRef(userId, card.orderType);
      return { success: true, type: card.orderType, cardId: card.id };
    }).catch(err => {
      logger.error(`充值码使用失败: [${password}]`, err);
      isTelegram && telegram.push(`请注意，充值码[ ${password} ][ ${orderInfo.name} ]充值失败了`);
    });
};

const orderListAndPaging = async (options = {}) => {
  const search = options.search || '';
  const filter = options.filter || [];
  const group = options.group;
  const sort = options.sort || `${dbTableName}.createTime_desc`;
  const page = options.page || 1;
  const pageSize = options.pageSize || 20;
  const start = options.start ? moment(options.start).hour(0).minute(0).second(0).millisecond(0).toDate().getTime() : moment(0).toDate().getTime();
  const end = options.end ? moment(options.end).hour(23).minute(59).second(59).millisecond(999).toDate().getTime() : moment().toDate().getTime();

  const where = {};
  where[dbTableName + '.status'] = cardStatusEnum.used;
  let count = knex(dbTableName).select([]).where(where).whereBetween(`${dbTableName}.usedTime`, [start, end]);
  let orders = knex(dbTableName).select([
    `${dbTableName}.password as orderId`,
    `${dbTableName}.orderType`,
    'webgui_order.name as orderName',
    'webgui_order.alipay as amount',
    'user.id as userId',
    'user.username',
    'account_plugin.id as accountId',
    'account_plugin.port',
    `${dbTableName}.status`,
    `${dbTableName}.usedTime as createTime`,
  ])
  .where(where)
  .orderBy(`${dbTableName}.usedTime`, 'DESC')
  .leftJoin('user', 'user.id', `${dbTableName}.user`)
  .leftJoin('account_plugin', 'account_plugin.id', `${dbTableName}.account`)
  .leftJoin('webgui_order', 'webgui_order.id', `${dbTableName}.orderType`)
  .whereBetween(`${dbTableName}.usedTime`, [start, end]);

  if (filter.length) {
    count = count.whereIn(`${dbTableName}.status`, filter);
    orders = orders.whereIn(`${dbTableName}.status`, filter);
  }
  if (group >= 0) {
    count = count.leftJoin('user', 'user.id', `${dbTableName}.user`).where({ 'user.group': group });
    orders = orders.where({ 'user.group': group });
  }
  if (search) {
    count = count.where(`${dbTableName}.password`, 'like', `%${search}%`);
    orders = orders.where(`${dbTableName}.password`, 'like', `%${search}%`);
  }

  count = await count.count(`${dbTableName}.id as count`).then(success => success[0].count);
  orders = await orders.orderBy(sort.split('_')[0], sort.split('_')[1]).limit(pageSize).offset((page - 1) * pageSize);
  const maxPage = Math.ceil(count / pageSize);
  return {
    total: count,
    page,
    maxPage,
    pageSize,
    orders,
  };
};

const checkOrder = async (id) => {
  const order = await knex(dbTableName).select().where({ id });
  if (order.length > 0) {
    return success[0].status;
  } else {
    return null;
  }
};

const generateBatchInfo = (x) => {
  let status;
  if (x.status === cardStatusEnum.revoked)
    status = batchStatusEnum.revoked;
  else {
    if (x.availableCount > 0)
      status = batchStatusEnum.available;
    else
      status = batchStatusEnum.usedup;
  }
  return {
    orderName: x.orderName,
    batchNumber: x.batchNumber,
    status: status,
    type: x.orderType,
    createTime: x.createTime,
    comment: x.comment,
    totalCount: x.totalCount,
    availableCount: x.availableCount
  };
};

const listBatch = async () => {
  const sqlResult = await knex(dbTableName).select([
    'webgui_order.name as orderName',
    `${dbTableName}.batchNumber`,
    `${dbTableName}.status as status`,
    `${dbTableName}.orderType as orderType`,
    `${dbTableName}.createTime as createTime`,
    `${dbTableName}.comment as comment`,
    knex.raw('COUNT(*) as totalCount'),
    knex.raw(`COUNT(case status when '${cardStatusEnum.available}' then 1 else null end) as availableCount`)
  ])
    .groupBy('batchNumber')
    .leftJoin('webgui_order', `${dbTableName}.orderType`, 'webgui_order.id');
  const finalResult = sqlResult.map(generateBatchInfo);
  return finalResult;
};

const getBatchDetails = async (batchNumber) => {
  const sqlBatchResult = await knex(dbTableName).select([
    'webgui_order.name as orderName',
    `${dbTableName}.batchNumber`,
    `${dbTableName}.status as status`,
    `${dbTableName}.orderType as orderType`,
    `${dbTableName}.createTime as createTime`,
    `${dbTableName}.comment as comment`,
    knex.raw('COUNT(*) as totalCount'),
    knex.raw(`COUNT(case status when '${cardStatusEnum.available}' then 1 else null end) as availableCount`)
  ])
    .where({ batchNumber })
    .leftJoin('webgui_order', `${dbTableName}.orderType`, 'webgui_order.id');
  if (sqlBatchResult.length == 0) { return null; }

  const batchInfo = generateBatchInfo(sqlBatchResult[0]);

  const sqlCardsResult = await knex(dbTableName).select([
    `${dbTableName}.id as id`,
    `${dbTableName}.status as status`,
    `${dbTableName}.usedTime as usedTime`,
    `${dbTableName}.password as password`,
    'account_plugin.port as portNumber',
    'user.email as userEmail'
  ])
    .where({ batchNumber: batchNumber })
    .leftJoin('account_plugin', `${dbTableName}.account`, 'account_plugin.id')
    .leftJoin('user', `${dbTableName}.user`, 'user.id');

  return Object.assign(batchInfo, { cards: sqlCardsResult });
};

const revokeBatch = async batchNumber => {
  await knex(dbTableName).where({
    batchNumber,
    status: cardStatusEnum.available,
  }).update({ status: cardStatusEnum.revoked });
};

const getUserOrders = async userId => {
  const orders = await knex(dbTableName).select([
    `${dbTableName}.password as orderId`,
    `${dbTableName}.orderType`,
    'webgui_order.name as orderName',
    'user.id as userId',
    'user.username',
    'account_plugin.id as accountId',
    'account_plugin.port',
    `${dbTableName}.status`,
    `${dbTableName}.usedTime as createTime`,
  ])
    .leftJoin('user', 'user.id', `${dbTableName}.user`)
    .leftJoin('account_plugin', 'account_plugin.id', `${dbTableName}.account`)
    .leftJoin('webgui_order', 'webgui_order.id', `${dbTableName}.orderType`)
    .where({ 'user.id': userId })
    .orderBy(`${dbTableName}.usedTime`, 'DESC');
  return orders;
};

const getUserFinishOrder = async userId => {
  let orders = await knex('giftcard').select([
    'giftcard.password as orderId',
    'giftcard.createTime',
    'account_plugin.port',
  ])
    .where({ user: userId, })
    .orderBy('createTime', 'DESC')
    .leftJoin('account_plugin', 'account_plugin.id', `giftcard.account`);;
  orders = orders.map(order => {
    return {
      orderId: order.orderId,
      type: '充值码',
      port: order.port,
      createTime: order.createTime,
    };
  });
  return orders;
};

exports.generateGiftCard = generateGiftCard;
exports.orderListAndPaging = orderListAndPaging;
exports.checkOrder = checkOrder;
exports.processOrder = processOrder;
exports.revokeBatch = revokeBatch;
exports.listBatch = listBatch;
exports.getBatchDetails = getBatchDetails;
exports.getUserOrders = getUserOrders;
exports.getUserFinishOrder = getUserFinishOrder;
