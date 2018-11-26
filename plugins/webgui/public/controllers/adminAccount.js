const app = angular.module('app');

app.controller('AdminAccountController', ['$scope', '$state', '$stateParams', '$http', 'accountSortDialog', '$interval', 'adminApi', '$localStorage', 'accountSortTool',
  ($scope, $state, $stateParams, $http, accountSortDialog, $interval, adminApi, $localStorage, accountSortTool) => {
    $scope.setTitle('账号');
    $scope.setMenuRightButton('sort_by_alpha');
    $scope.setMenuSearchButton('search');
    var currentPage = 1;
    const getPageSize = () => {
      if($mdMedia('xs')) { return 30; }
      if($mdMedia('sm')) { return 30; }
      if($mdMedia('md')) { return 60; }
      if($mdMedia('gt-md')) { return 80; }
    };
    $scope.isUserLoading = false;
    $scope.isUserPageFinish = false;
    if (!$localStorage.admin.accountFilterSettings) {
      $localStorage.admin.accountFilterSettings = {
        sort: 'port_asc',
        filter: {
          expired: true,
          unexpired: true,
          unlimit: true,
          mac: true,
        },
      };
    }
    $scope.accountMethod = $localStorage.admin.accountFilterSettings;
    $scope.accountInfo = {};
    $scope.accountList = [];
    $scope.macAccountInfo = {};
    //分页代码
    const paging = () => {
      console.log('开始分页');
      let start = (currentPage - 1) * getPageSize;
      let end = 0;
      console.log(start, $scope.accountInfo.account.length);
      if ((start + getPageSize) >= $scope.accountInfo.account.length) {
        end = $scope.accountInfo.account.length;
        $scope.isUserPageFinish = true;
      } else {
        end = start + getPageSize;
        currentPage++;
      }
      $scope.accountList = $scope.accountList.concat($scope.accountInfo.account.slice(start, end))
    }
    $scope.sortAndFilter = () => {
      accountSortTool($scope.accountInfo, $scope.accountMethod);
      console.log('排序');
      currentPage = 1;
      $scope.accountList = [];
      paging();
    };
    if (!$localStorage.admin.accountInfo) {
      $localStorage.admin.accountInfo = {
        time: Date.now(),
        data: [],
      };
    }
    if (!$localStorage.admin.macAccountInfo) {
      $localStorage.admin.macAccountInfo = {
        time: Date.now(),
        data: [],
      };
    }
    $scope.accountInfo.originalAccount = $localStorage.admin.accountInfo.data;
    $scope.accountInfo.account = angular.copy($scope.accountInfo.originalAccount);
    $scope.macAccountInfo.originalAccount = $localStorage.admin.macAccountInfo.data;
    $scope.macAccountInfo.account = angular.copy($scope.macAccountInfo.originalAccount);
    $scope.sortAndFilter();
    const getAccountInfo = () => {
      adminApi.getAccount().then(accounts => {
        $localStorage.admin.accountInfo = {
          time: Date.now(),
          data: accounts,
        };
        $scope.accountInfo.originalAccount = accounts;
        $scope.accountInfo.account = angular.copy($scope.accountInfo.originalAccount);
        $scope.sortAndFilter();
        return adminApi.getMacAccount();
      }).then(macAccounts => {
        $localStorage.admin.macAccountInfo = {
          time: Date.now(),
          data: macAccounts,
        };
        // $scope.macAccount = macAccounts;
        $scope.macAccountInfo.originalAccount = macAccounts;
        $scope.macAccountInfo.account = angular.copy($scope.macAccountInfo.originalAccount);
      });
    };
    getAccountInfo();
    $scope.$on('visibilitychange', (event, status) => {
      if (status === 'visible') {
        if ($localStorage.admin.accountInfo && Date.now() - $localStorage.admin.accountInfo.time >= 20 * 1000) {
          getAccountInfo();
        }
      }
    });
    $scope.setInterval($interval(() => {
      if ($localStorage.admin.accountInfo && Date.now() - $localStorage.admin.accountInfo.time >= 90 * 1000) {
        getAccountInfo();
      }
    }, 15 * 1000));
    $scope.setFabButton($scope.id === 1 ? () => {
      $state.go('admin.addAccount');
    } : null);
    $scope.toAccount = id => {
      $state.go('admin.accountPage', { accountId: id });
    };
    $scope.toMacAccount = userId => {
      $state.go('admin.userPage', { userId });
    };
    $scope.sortAndFilterDialog = () => {
      accountSortDialog.show($scope.accountMethod, $scope.accountInfo);
    };
    const accountFilter = () => {
      accountSortTool($scope.accountInfo, $scope.accountMethod);
      $scope.accountInfo.account = $scope.accountInfo.account.filter(f => {
        return (f.port + (f.user ? f.user : '')).indexOf($scope.menuSearch.text) >= 0;
      });
      $scope.macAccountInfo.account = $scope.macAccountInfo.originalAccount.filter(f => {
        return (f.port + f.mac).indexOf($scope.menuSearch.text.replace(/-/g, '').replace(/:/g, '').toLowerCase()) >= 0;
      });
      console.log('搜索数据');
    };
    $scope.flowNumber = (number) => {
      if (number < 1000) return number + ' B';
      else if (number < 1000 * 1000) return (number / 1000).toFixed(0) + ' KB';
      else if (number < 1000 * 1000 * 1000) return (number / 1000000).toFixed(1) + ' MB';
      else if (number < 1000 * 1000 * 1000 * 1000) return (number / 1000000000).toFixed(2) + ' GB';
    };
    $scope.$on('RightButtonClick', () => {
      $scope.sortAndFilterDialog();
    });
    $scope.$on('cancelSearch', () => {
      accountSortTool($scope.accountInfo, $scope.accountMethod);
      currentPage = 1;
      $scope.accountList = [];
      $scope.isUserPageFinish = false;
      console.log('清除搜索');
      paging();
    });
    $scope.$watch("accountInfo", function () {
      console.log('变化了');
      currentPage = 1;
      $scope.accountList = [];
      paging();
    }, true);
    $scope.$watch('menuSearch.text', () => {
      if (!$scope.menuSearch.input) {
        return;
      }
      // if (!$scope.menuSearch.text) {
      //   accountSortTool($scope.accountInfo, $scope.accountMethod);
      //   return;
      // }
      accountFilter();
    });
    $scope.view = (inview) => {
      console.log('上拉加载');
      if (!inview || $scope.isUserLoading || $scope.isUserPageFinish) { return; }
      paging();
    };
    $scope.accountColor = account => {
      if (account.type === 1) {
        return {
          background: 'blue-50', 'border-color': 'blue-300',
        };
      } else if (account.data && account.data.expire <= Date.now()) {
        return {
          background: 'red-50', 'border-color': 'red-300',
        };
      } else if (account.autoRemove) {
        return {
          background: 'lime-50', 'border-color': 'lime-300',
        };
      }
      return {};
    };
  }
])
  .controller('AdminAccountPageController', ['$scope', '$state', '$stateParams', '$http', '$mdMedia', '$q', 'adminApi', '$timeout', '$interval', 'qrcodeDialog', 'ipDialog', '$mdBottomSheet',
    ($scope, $state, $stateParams, $http, $mdMedia, $q, adminApi, $timeout, $interval, qrcodeDialog, ipDialog, $mdBottomSheet) => {
      $scope.setTitle('账号');
      $scope.setMenuButton('arrow_back', 'admin.account');
      $scope.accountId = +$stateParams.accountId;
      $scope.account = { port: '...' };
      $q.all([
        $http.get(`/api/admin/account/${$scope.accountId}`),
        $http.get('/api/admin/server'),
        $http.get('/api/admin/setting/account'),
      ]).then(success => {
        $scope.account = success[0].data;
        $scope.servers = success[1].data.map(server => {
          if (server.host.indexOf(':') >= 0) {
            const hosts = server.host.split(':');
            const number = Math.ceil(Math.random() * (hosts.length - 1));
            server.host = hosts[number];
          }
          return server;
        });
        $scope.getServerPortData($scope.servers[0], $scope.accountId);
        $scope.isMultiServerFlow = !!$scope.account.multiServerFlow;
      }).catch(err => {
        console.log(err);
        $state.go('admin.account');
      });
      let currentServerId;
      $scope.getServerPortData = (server, accountId) => {
        const serverId = server.id;
        currentServerId = serverId;
        $scope.serverPortFlow = 0;
        $scope.lastConnect = 0;
        adminApi.getServerPortData(serverId, accountId).then(success => {
          $scope.serverPortFlow = success.serverPortFlow;
          $scope.lastConnect = success.lastConnect;
          let maxFlow = 0;
          if ($scope.account.data) {
            server.isFlowOutOfLimit = (($scope.account.data.flow + $scope.account.data.flowPack) <= $scope.serverPortFlow);
          }
        });
        $scope.getChartData(serverId);
        $scope.servers.forEach((server, index) => {
          if (server.id === serverId) { return; }
          $timeout(() => {
            adminApi.getServerPortData(serverId, accountId);
          }, index * 1000);
        });

        $scope.server = $scope.servers.filter(f => {
          return f.id === serverId;
        })[0];

      };
      $scope.setInterval($interval(() => {
        const serverId = currentServerId;
        adminApi.getServerPortData(serverId, $scope.accountId).then(success => {
          if (serverId !== currentServerId) { return; }
          $scope.lastConnect = success.lastConnect;
          $scope.serverPortFlow = success.serverPortFlow;
        });
      }, 60 * 1000));
      const base64Encode = str => {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
      };
      const urlsafeBase64 = str => {
        return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      };
      $scope.createQrCode = (method, password, host, port, serverName) => {
        let str = 'ss://' + base64Encode(method + ':' + password + '@' + host + ':' + port);
        return str;
      };
      $scope.SSRAddress = (method, password, host, port, serverName) => {
        let str = 'ssr://' + urlsafeBase64(host + ':' + port + ':origin:' + method + ':plain:' + urlsafeBase64(password) + '/?obfsparam=&remarks=' + urlsafeBase64(serverName));
        return str;
      };
      $scope.showQrcodeDialog = (method, password, host, port, serverName) => {
        const ssAddress = $scope.createQrCode(method, password, host, port, serverName);
        const ssrAddress = $scope.SSRAddress(method, password, host, port, serverName);
        qrcodeDialog.show(serverName, ssAddress, ssrAddress);
      };
      $scope.editAccount = id => {
        $state.go('admin.editAccount', { accountId: id });
      };

      $scope.flowType = {
        value: 'day',
      };
      const flowTime = {
        hour: Date.now(),
        day: Date.now(),
        week: Date.now(),
      };
      const flowLabel = {
        hour: ['0', '', '', '15', '', '', '30', '', '', '45', '', ''],
        day: ['0', '', '', '', '', '', '6', '', '', '', '', '', '12', '', '', '', '', '', '18', '', '', '', '', '',],
        week: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      };
      const scaleLabel = (number) => {
        if (number < 1) {
          return number.toFixed(1) + ' B';
        } else if (number < 1000) {
          return number.toFixed(0) + ' B';
        } else if (number < 1000000) {
          return (number / 1000).toFixed(0) + ' KB';
        } else if (number < 1000000000) {
          return (number / 1000000).toFixed(0) + ' MB';
        } else if (number < 1000000000000) {
          return (number / 1000000000).toFixed(1) + ' GB';
        } else {
          return number;
        }
      };
      const setChart = (lineData, pieData) => {
        $scope.pieChart = {
          data: pieData.map(m => m.flow),
          labels: pieData.map(m => m.name),
          options: {
            responsive: false,
            tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                label: function (tooltipItem, data) {
                  const label = data.labels[tooltipItem.index];
                  const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  return [label, scaleLabel(datasetLabel)];
                }
              },
            },
          }
        };
        $scope.lineChart = {
          data: [lineData],
          labels: flowLabel[$scope.flowType.value],
          series: 'day',
          datasetOverride: [{ yAxisID: 'y-axis-1' }],
          options: {
            responsive: false,
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return scaleLabel(tooltipItem.yLabel);
                }
              }
            },
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    callback: scaleLabel,
                  },
                }
              ]
            }
          },
        };
      };
      $scope.getChartData = serverId => {
        adminApi.getAccountChartData(serverId, $scope.accountId, $scope.flowType.value, flowTime[$scope.flowType.value])
          .then(success => {
            $scope.sumFlow = success[0].data.reduce((a, b) => {
              return a + b;
            }, 0);
            $scope.sumFlowForAllServer = success[1].data.reduce((a, b) => {
              return { flow: a.flow + b.flow };
            }, { flow: 0 });
            setChart(success[0].data, success[1].data);
          });
        if ($scope.flowType.value === 'hour') {
          $scope.time = moment(flowTime[$scope.flowType.value]).format('YYYY-MM-DD HH:00');
        }
        if ($scope.flowType.value === 'day') {
          $scope.time = moment(flowTime[$scope.flowType.value]).format('YYYY-MM-DD');
        }
        if ($scope.flowType.value === 'week') {
          $scope.time = moment(flowTime[$scope.flowType.value]).day(0).format('YYYY-MM-DD') + ' / ' + moment(flowTime[$scope.flowType.value]).day(6).format('YYYY-MM-DD');
        }
      };
      $scope.changeFlowTime = (serverId, number) => {
        const time = {
          hour: 3600 * 1000,
          day: 24 * 3600 * 1000,
          week: 7 * 24 * 3600 * 1000,
        };
        flowTime[$scope.flowType.value] += number * time[$scope.flowType.value];
        $scope.getChartData(serverId);
      };
      $scope.resetFlowTime = serverId => {
        flowTime[$scope.flowType.value] = Date.now();
        $scope.getChartData(serverId);
      };
      $scope.getChartSize = () => {
        if ($mdMedia('xs')) {
          return {
            line: [320, 170],
            pie: [170, 170],
          };
        } else if ($mdMedia('sm')) {
          return {
            line: [360, 190],
            pie: [190, 190],
          };
        } else if ($mdMedia('md')) {
          return {
            line: [360, 180],
            pie: [180, 180],
          };
        } else if ($mdMedia('gt-md')) {
          return {
            line: [540, 240],
            pie: [240, 240],
          };
        }
      };
      $scope.fontColor = account => {
        if (account.data.expire >= Date.now()) {
          return {
            color: '#333',
          };
        }
        return {
          color: '#a33',
        };
      };
      $scope.toUserPage = userId => {
        if (!userId) { return; }
        $state.go('admin.userPage', { userId });
      };
      $scope.clientIp = (serverId, accountId) => {
        ipDialog.show(serverId, accountId);
      };
      $scope.cycleStyle = account => {
        let percent = 0;
        if (account.type !== 1) {
          percent = ((Date.now() - account.data.from) / (account.data.to - account.data.from) * 100).toFixed(0);
        }
        if (percent > 100) {
          percent = 100;
        }
        return {
          background: `linear-gradient(90deg, rgba(0,0,0,0.12) ${percent}%, rgba(0,0,0,0) 0%)`
        };
      };
      $scope.setFabButton($scope.id === 1 ? () => {
        $scope.editAccount($scope.account.id);
      } : null, 'mode_edit');
      $scope.setExpireTime = number => {
        $scope.expireTimeShift += number;
      };
      $scope.expireTimeSheet = time => {
        if ($scope.id !== 1) { return; }
        if (!time) { return; }
        $scope.expireTimeShift = 0;
        $mdBottomSheet.show({
          templateUrl: '/public/views/admin/setExpireTime.html',
          preserveScope: true,
          scope: $scope,
        }).catch(() => {
          $http.put(`/api/admin/account/${$scope.accountId}/time`, {
            time: $scope.expireTimeShift,
            check: true,
          }).then(success => {
            $http.get(`/api/admin/account/${$scope.accountId}`).then(success => {
              $scope.account = success.data;
            });
          });
        });
      };
    }
  ])
  .controller('AdminAddAccountController', ['$scope', '$state', '$stateParams', '$http', '$mdBottomSheet', 'alertDialog', '$filter',
    ($scope, $state, $stateParams, $http, $mdBottomSheet, alertDialog, $filter) => {
      $scope.setTitle('添加账号');
      $scope.setMenuButton('arrow_back', 'admin.account');
      $http.get('/api/admin/order').then(success => {
        $scope.orders = success.data.filter(f => !f.baseId);
        $scope.account.orderId = $scope.orders[0].id;
      });
      $http.get('/api/admin/account/newPort').then(success => {
        $scope.account.port = success.data.port;
        $scope.account.password = Math.random().toString().substr(2, 10);
      });
      $scope.typeList = [
        { key: '不限量', value: 1 },
        { key: '月', value: 3 },
        { key: '周', value: 2 },
        { key: '天', value: 4 },
        { key: '小时', value: 5 },
      ];
      $scope.timeLimit = {
        '2': 7 * 24 * 3600000,
        '3': 30 * 24 * 3600000,
        '4': 24 * 3600000,
        '5': 3600000,
      };
      $scope.account = {
        type: 1,
        fromOrder: 0,
        time: Date.now(),
        limit: 1,
        flow: 100000000,
        autoRemove: 0,
        autoRemoveDelay: 0,
        autoRemoveDelayStr: '0',
        multiServerFlow: 0,
        accountServer: false,
        accountServerObj: {},
      };
      $scope.account.flowStr = $filter('flowNum2Str')($scope.account.flow);
      const selectOrder = () => {
        if (!$scope.account.fromOrder) { return; }
        const orderInfo = $scope.orders.filter(f => +f.id === +$scope.account.orderId)[0];
        $scope.account.type = orderInfo.type;
        $scope.account.flow = orderInfo.flow;
        $scope.account.limit = orderInfo.cycle;
        $scope.account.autoRemove = orderInfo.autoRemove;
        $scope.account.autoRemoveDelay = orderInfo.autoRemoveDelay;
        $scope.account.multiServerFlow = orderInfo.multiServerFlow;
        $scope.account.accountServer = !!orderInfo.server;
        $scope.account.flowStr = $filter('flowNum2Str')($scope.account.flow);
        $scope.account.autoRemoveDelayStr = $filter('timeNum2Str')(orderInfo.autoRemoveDelay);
        if (orderInfo.server) {
          $scope.servers.forEach(server => {
            if (JSON.parse(orderInfo.server).indexOf(server.id) >= 0) {
              $scope.account.accountServerObj[server.id] = true;
            } else {
              $scope.account.accountServerObj[server.id] = false;
            }
          });
        }
      };
      $scope.$watch('account.orderId', selectOrder);
      $scope.$watch('account.fromOrder', selectOrder);
      $scope.cancel = () => {
        $state.go('admin.account');
      };
      $scope.confirm = () => {
        $scope.account.autoRemoveDelay = $filter('timeStr2Num')($scope.account.autoRemoveDelayStr);
        alertDialog.loading();
        $scope.account.flow = $filter('flowStr2Num')($scope.account.flowStr);
        if ($scope.account.server) {
          $scope.servers.forEach(server => {
            if ($scope.account.server.indexOf(server.id) >= 0) {
              $scope.account.accountServerObj[server.id] = true;
            } else {
              $scope.account.accountServerObj[server.id] = false;
            }
          });
        }
        const server = Object.keys($scope.account.accountServerObj).map(m => $scope.account.accountServerObj[m] ? +m : null).filter(f => f);
        $http.post('/api/admin/account', {
          type: +$scope.account.type,
          orderId: $scope.account.fromOrder ? +$scope.account.orderId : 0,
          port: +$scope.account.port,
          password: $scope.account.password,
          time: $scope.account.time,
          limit: +$scope.account.limit,
          flow: +$scope.account.flow,
          autoRemove: $scope.account.autoRemove ? 1 : 0,
          autoRemoveDelay: $scope.account.autoRemoveDelay,
          multiServerFlow: $scope.account.multiServerFlow ? 1 : 0,
          server: $scope.account.accountServer ? server : null,
        }).then(success => {
          alertDialog.show('添加账号成功', '确定');
          $state.go('admin.account');
        }).catch(() => {
          alertDialog.show('添加账号失败', '确定');
        });
      };
      $scope.pickTime = () => {
        $mdBottomSheet.show({
          templateUrl: '/public/views/admin/pickTime.html',
          preserveScope: true,
          scope: $scope,
        });
      };
      $scope.setStartTime = (number) => {
        $scope.account.time += number;
      };
      $scope.setLimit = (number) => {
        $scope.account.limit += number;
        if ($scope.account.limit < 1) {
          $scope.account.limit = 1;
        }
      };
      $http.get('/api/admin/server').then(success => {
        $scope.servers = success.data;
      });
    }
  ])
  .controller('AdminEditAccountController', ['$scope', '$state', '$stateParams', '$http', '$mdBottomSheet', 'confirmDialog', 'alertDialog', '$filter', '$q',
    ($scope, $state, $stateParams, $http, $mdBottomSheet, confirmDialog, alertDialog, $filter, $q) => {
      $scope.setTitle('编辑账号');
      $scope.setMenuButton('arrow_back', function () {
        $state.go('admin.accountPage', { accountId: $stateParams.accountId });
      });
      $http.get('/api/admin/order').then(success => {
        $scope.orders = success.data.filter(f => !f.baseId);
        $scope.account.orderId = success.data[0].id;
      });
      $scope.typeList = [
        { key: '不限量', value: 1 },
        { key: '月', value: 3 },
        { key: '周', value: 2 },
        { key: '天', value: 4 },
        { key: '小时', value: 5 },
      ];
      $scope.timeLimit = {
        '2': 7 * 24 * 3600000,
        '3': 30 * 24 * 3600000,
        '4': 24 * 3600000,
        '5': 3600000,
      };
      $scope.account = {
        fromOrder: 0,
        time: Date.now(),
        limit: 1,
        flow: 100,
        autoRemove: 0,
      };
      const selectOrder = (newValue, oldValue) => {
        if (newValue === oldValue) { return; }
        if (!$scope.account.fromOrder) { return; }
        let orderInfo = $scope.orders.filter(f => +f.id === +$scope.account.orderId)[0];
        if (!orderInfo) {
          orderInfo = $scope.orders[0];
          $scope.account.orderId = orderInfo.id;
        }
        let expire;
        if ($scope.account.fixedExpire) {
          expire = $scope.account.time + $scope.timeLimit[$scope.account.type] * $scope.account.limit;
        }
        $scope.account.type = orderInfo.type;
        $scope.account.flow = orderInfo.flow;
        $scope.account.limit = orderInfo.cycle;
        $scope.account.autoRemove = orderInfo.autoRemove;
        $scope.account.autoRemoveDelay = orderInfo.autoRemoveDelay;
        $scope.account.multiServerFlow = orderInfo.multiServerFlow;
        $scope.account.accountServer = !!orderInfo.server;
        $scope.account.flowStr = $filter('flowNum2Str')($scope.account.flow);
        $scope.account.autoRemoveDelayStr = $filter('timeNum2Str')(orderInfo.autoRemoveDelay);
        if ($scope.account.fixedExpire) {
          $scope.account.time = expire - $scope.timeLimit[$scope.account.type] * $scope.account.limit;
          while ($scope.account.time >= Date.now()) {
            $scope.account.time -= $scope.timeLimit[$scope.account.type];
            $scope.account.limit++;
          }
        }
        if (orderInfo.server) {
          $scope.servers.forEach(server => {
            if (JSON.parse(orderInfo.server).indexOf(server.id) >= 0) {
              $scope.account.accountServerObj[server.id] = true;
            } else {
              $scope.account.accountServerObj[server.id] = false;
            }
          });
        }
      };
      const accountId = $stateParams.accountId;
      $q.all([
        $http.get('/api/admin/server'),
        $http.get(`/api/admin/account/${accountId}`),
      ]).then(success => {
        $scope.servers = success[0].data;
        $scope.account.type = success[1].data.type;
        if (success[1].data.orderId) {
          $scope.account.fromOrder = 1;
        }
        $scope.account.orderId = success[1].data.orderId;
        $scope.account.port = success[1].data.port;
        $scope.account.password = success[1].data.password;
        $scope.account.cleanFlow = false;
        $scope.account.autoRemove = success[1].data.autoRemove;
        $scope.account.autoRemoveDelay = success[1].data.autoRemoveDelay;
        $scope.account.autoRemoveDelayStr = $filter('timeNum2Str')($scope.account.autoRemoveDelay);;
        $scope.account.multiServerFlow = success[1].data.multiServerFlow;
        if (success[1].data.type >= 2 && success[1].data.type <= 5) {
          $scope.account.time = success[1].data.data.create;
          $scope.account.limit = success[1].data.data.limit;
          $scope.account.flow = success[1].data.data.flow;
          $scope.account.flowStr = $filter('flowNum2Str')($scope.account.flow);
        }
        $scope.account.server = success[1].data.server;
        $scope.account.accountServer = !!$scope.account.server;
        $scope.account.accountServerObj = {};
        if ($scope.account.server) {
          $scope.servers.forEach(server => {
            if ($scope.account.server.indexOf(server.id) >= 0) {
              $scope.account.accountServerObj[server.id] = true;
            } else {
              $scope.account.accountServerObj[server.id] = false;
            }
          });
        }
        $scope.$watch('account.orderId', selectOrder);
        $scope.$watch('account.fromOrder', selectOrder);
      });
      $scope.cancel = () => {
        $state.go('admin.accountPage', { accountId: $stateParams.accountId });
      };
      $scope.confirm = () => {
        $scope.account.autoRemoveDelay = $filter('timeStr2Num')($scope.account.autoRemoveDelayStr);
        alertDialog.loading();
        $scope.account.flow = $filter('flowStr2Num')($scope.account.flowStr);
        const server = Object.keys($scope.account.accountServerObj).map(m => $scope.account.accountServerObj[m] ? +m : null).filter(f => f);
        $http.put(`/api/admin/account/${accountId}/data`, {
          type: +$scope.account.type,
          orderId: $scope.account.fromOrder ? +$scope.account.orderId : 0,
          port: +$scope.account.port,
          password: $scope.account.password,
          time: $scope.account.time,
          limit: +$scope.account.limit,
          flow: +$scope.account.flow,
          cleanFlow: $scope.account.cleanFlow,
          autoRemove: $scope.account.autoRemove ? 1 : 0,
          autoRemoveDelay: $scope.account.autoRemoveDelay,
          multiServerFlow: $scope.account.multiServerFlow ? 1 : 0,
          server: $scope.account.accountServer ? server : null,
        }).then(success => {
          alertDialog.show('修改账号成功', '确定');
          $state.go('admin.accountPage', { accountId: $stateParams.accountId });
        }).catch(() => {
          alertDialog.show('修改账号失败', '确定');
        });
      };
      $scope.pickTime = () => {
        $mdBottomSheet.show({
          templateUrl: '/public/views/admin/pickTime.html',
          preserveScope: true,
          scope: $scope,
        });
      };
      $scope.setStartTime = (number) => {
        $scope.account.time += number;
      };
      $scope.setStartTimeToCurrentTime = () => {
        $scope.account.time = Date.now();
      };
      $scope.setLimit = (number) => {
        $scope.account.limit += number;
        if ($scope.account.limit < 1) {
          $scope.account.limit = 1;
        }
      };
      $scope.deleteAccount = () => {
        confirmDialog.show({
          text: '真的要删除账号吗？',
          cancel: '取消',
          confirm: '删除',
          error: '删除账号失败',
          fn: function () { return $http.delete('/api/admin/account/' + accountId); },
        }).then(() => {
          $state.go('admin.account');
        });
      };
    }
  ]);
