const knex = appRequire('init/knex').knex;
const manager = appRequire('services/manager');
const accountFlow = appRequire('plugins/account/accountFlow');
const moment = require('moment');

const add = async options => {
  const { type = 'Shadowsocks', name, host, area, port, password, method, scale = 1, comment = '', shift = 0, resetday = 1, monthflow = 0, key, net, wgPort, singleMode, v2ray, v2rayMethod, v2rayPort, v2rayAID, v2rayTLS, v2rayNet, v2rayPath, v2rayHost, sort } = options;
  let node_bandwidth_limit = monthflow;
  const [serverId] = await knex('server').insert({
    type,
    name,
    comment,
    host, area,
    port,
    password,
    method,
    scale,
    shift,
    monthflow,
    node_bandwidth_limit,
    resetday,
    key,
    net,
    wgPort,
    singleMode,
    v2ray, v2rayMethod, v2rayPort, v2rayAID, v2rayTLS, v2rayNet, v2rayPath, v2rayHost,
    sort
  });
  accountFlow.addServer(serverId);
  return [serverId];
};

const del = (id) => {
  return knex.transaction(trx => {
    return knex('server').transacting(trx).where({ id }).delete()
      .then(() => knex('saveFlow').transacting(trx).where({ id }).delete())
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

const edit = async options => {
  const { id, type = 'Shadowsocks', name, host, area, port, password, method, scale = 1, comment = '', shift = 0, check, resetday = 1, monthflow = 0, key, net, wgPort,
    singleMode, v2ray, v2rayMethod, v2rayPort, v2rayAID, v2rayTLS, v2rayNet, v2rayPath, v2rayHost, sort } = options;
  let node_bandwidth_limit = monthflow
  const serverInfo = await knex('server').where({ id }).then(s => s[0]);
  if (serverInfo.shift !== shift) {
    // const accounts = await knex('account_plugin').where({});
    // (async server => {
    //   for (account of accounts) {
    //     await manager.send({
    //       command: 'del',
    //       port: account.port + server.shift,
    //     }, {
    //       host: server.host,
    //       port: server.port,
    //       password: server.password,
    //     }).catch();
    //   }
    // })(serverInfo);
  }

  // if (serverInfo.singleMode != singleMode) {
  //   const accounts = await knex('account_plugin').whereNot({ connType: 'SSR' }).select('id');
  //   await knex('account_flow').update({ nextCheckTime: Date.now() }).where('serverId', serverInfo.id).whereIn('accountId', accounts);
  // }
  //立即同步
  if (check) {
    accountFlow.editServer(id);
  }
  return knex('server').where({ id }).update({
    type,
    name,
    comment,
    host, area,
    port,
    password,
    method,
    scale,
    shift,
    monthflow,
    node_bandwidth_limit,
    resetday,
    key,
    net,
    wgPort,
    singleMode,
    v2ray, v2rayMethod, v2rayPort, v2rayAID, v2rayTLS, v2rayNet, v2rayPath, v2rayHost,
    sort
  });
};

const list = async (options = {}) => {
  const serverList = await knex('server').select().orderByRaw('sort,name');

  // const serverStatus = [];
  // const getServerStatus = (server, index) => {
  //   return manager.send({
  //     command: 'version',
  //   }, {
  //     host: server.host,
  //     port: server.port,
  //     password: server.password
  //   }).then(success => {
  //     return { status: success.version, isGfw: success.isGfw, index };
  //   }).catch(error => {
  //     return { status: -1, index };
  //   });
  // };

  //开始日期
  const nowday = moment().format('D');
  const now = moment().valueOf();
  for (let i = 0; i < serverList.length; i++) {
    let server = serverList[i];
    // serverStatus.push(getServerStatus(server, i));
    server.isGfw = false;
    if (server.node_bandwidth_limit > 0 && server.node_bandwidth >= server.node_bandwidth_limit) {
      server.status = '[流量耗尽]'
    } else if (server.status == 1) {
      server.status = '[维修中]';
    } else {
      server.status = '';
    }
    // if (server.node_heartbeat < (now / 1000 - 300)) {
    //   server.status = '[离线]'
    // }
    if (options.status) {
      //上次重置时间
      let last = moment().subtract(1, 'months').valueOf();
      let lastday = moment().subtract(1, 'months').endOf('month')
      //重置日期在当前日期后面 取上个月的
      if (server.resetday > nowday) {
        lastday = moment().subtract(1, 'months').endOf('month').format('D');
        //上个月最后一天小于重置天
        if (lastday < server.resetday) {
          last = moment().subtract(1, 'months').endOf('month').startOf('day').valueOf();
        } else {
          last = moment(moment().subtract(1, 'months').format('YYYY-MM') + '-' + (server.resetday < 10 ? '0' + server.resetday : server.resetday)).startOf('day').valueOf();
        }
      } else {
        last = moment(moment().format('YYYY-MM') + '-' + (server.resetday < 10 ? '0' + server.resetday : server.resetday)).startOf('day').valueOf();
      }
      //0409修改后 这是只统计到昨天
      let yesterday = await knex('saveFlowDay')
        .sum(`flow as sumFlow`)
        .where({ id: server.id })
        .whereBetween(`time`, [last, now]).then(res => res[0].sumFlow || 0);
      //今天的
      let t = moment(last).startOf('day').valueOf();
      let today = await knex('saveFlowHour')
        .sum(`flow as sumFlow`)
        .where({ id: server.id })
        .whereBetween(`time`, [t, now]).then(res => res[0].sumFlow || 0);
      server['useflow'] = yesterday + today;
    }
    // serverList.forEach((server, index) => {
    //   serverStatus.push(getServerStatus(server, index));
    // });
    // const status = await Promise.all(serverStatus);
    // status.forEach(f => {
    //   serverList[f.index].status = f.status;
    //   serverList[f.index].isGfw = !!f.isGfw;
    // });
  }
  return serverList;
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
