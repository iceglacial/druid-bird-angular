//路由配置开始
+ function(app) {
    app.config([
        '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================        
                .state('layout', {
                    abstract: true,
                    views: {
                        '@': {
                            templateUrl: '/layout/layout.html',
                            controller: "home.ctrl"
                        },
                        'header@layout': {
                            templateUrl: '/layout/header.html'
                        },
                        'nav@layout': {
                            templateUrl: '/layout/nav.html'
                        },
                        'footer@layout': {
                            templateUrl: '/layout/footer.html'
                        }
                    }
                })
                .state('home', {
                    url: '/home',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/device/devicelist.html',
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    params: { 'name': null },
                    templateUrl: '/user/login.html',
                    // controller: 'login.ctrl'
                })
                .state('device_list', {
                    // we'll get to this in a bit   
                    url: '/device_list',
                    parent: 'layout',
                    params: { "searchInfo": null},
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/device/devicelist.html',
                            // controller: "deviseList.ctrl"
                        }
                    }
                })
                .state('device_set', {
                    // we'll get to this in a bit   
                    url: '/device_set',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/device/deviceset.html',
                            // controller: "deviseSet.ctrl"
                        }
                    }
                })
                .state('data_analysis', {
                    // we'll get to this in a bit
                    url: '/data_analysis',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/data/data_analysis.html',
                            controller: "dataAnalysis.ctrl"
                        }
                    }
                })
                .state('user_auth', {
                    // we'll get to this in a bit
                    url: '/user_auth',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/user/device_auth.html',
                            // controller: "deviceAuth.ctrl"
                        }
                    }
                })
                .state('user_auth.user', {
                    // we'll get to this in a bit
                    url: '/{id}',
                    views: {
                        'content@layout': {
                            // templateUrl: '/user/device_auth_user.html',
                            templateUrl: '/user/edit_user_auth.html',
                            controller: "deviceAuthUser.ctrl"
                        }
                    }
                })
                .state('user_auth.user.add', {
                    // we'll get to this in a bit
                    url: '/add',
                    views: {
                        'content@layout': {
                            templateUrl: '/user/device_auth_add.html',
                            controller: "addDeviceAuthToUser.ctrl"
                        }
                    }
                })
                .state('user_info', {
                    // we'll get to this in a bit   
                    url: '/user_info',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/user/userinfo.html',
                            // controller: "userInfo.ctrl"
                        }
                    }
                })
                .state('push_notification', {
                    // we'll get to this in a bit
                    url: '/push_notification',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/user/message.html',
                            // controller: "message.ctrl"
                        }
                    }
                })
                .state('company_bill', {
                    // we'll get to this in a bit
                    url: '/bill',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/user/company-pay.html',
                            // controller: "message.ctrl"
                        }
                    }
                })
                .state('company_bill.month_device_pay', {
                    // we'll get to this in a bit
                    url: '/month/{month}',
                    params: {'month': null},
                    views: {
                        'content@layout': {
                            templateUrl: '/user/month_device_pay.html',
                            // controller: "message.ctrl"
                        }
                    }
                })
                .state('user_add', {
                    // we'll get to this in a bit   
                    url: '/user_add',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/user/useradd.tpl.html',
                            // controller: "userAdd.ctrl"
                        }
                    }
                })
                .state('device_gps', {
                    // we'll get to this in a bit
                    url: '/device?{id}',
                    parent: 'layout',
                    params: { "id": null},
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/class/gps-behavior.html',
                            // controller: "gprs.ctrl"
                        }
                    }
                })
                .state('gps', {
                    // we'll get to this in a bit
                    url: '/gps',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/class/gps.html',
                            // controller: "gprs.ctrl"
                        }
                    }
                })
                .state('behavior', {
                    // we'll get to this in a bit
                    url: '/behavior',
                    parent: 'layout',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/class/behavior.html',
                            // controller: "gprs.ctrl"
                        }
                    }
                })
                .state('biological', {
                    // we'll get to this in a bit
                    url: '/biological',
                    parent: 'layout',
                    params: { "id": null },
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/biological/biological.html',
                            // controller: "gprs.ctrl"
                        }
                    }
                })
                .state('map', {
                    // we'll get to this in a bit
                    url: '/map',
                    parent: 'layout',
                })
                .state('map.gps', {
                    // we'll get to this in a bit
                    url: '/gps?{id}',
                    params: { "id": null },
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/class/gps-map.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('map.gps.search', {
                    // we'll get to this in a bit
                    url: '/search?{info}&{type}&{id}',
                    params: { "info": null},
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/class/gps-map.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('fence', {
                    // we'll get to this in a bit
                    url: '/fence?{id}',
                    params: { "id": null},
                    parent: 'layout',
                })
                .state('fence.device', {
                    // we'll get to this in a bit
                    url: '/device/{device_id}',
                    params: { "device_id": null},
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/fence/device-fence.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('fence.list', {
                    // we'll get to this in a bit
                    url: '/list',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/fence/fence-map.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('fence.add', {
                    // we'll get to this in a bit
                    url: '/add',//fence ID
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/fence/map-fence-add.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('fence.edit', {
                    // we'll get to this in a bit
                    url: '/edit',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/fence/map-fence-edit.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('fence.edit.device', {
                    // we'll get to this in a bit
                    url: '/device',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/fence/device-fence-add.html',
                            // controller: "map.ctrl"
                        }
                    }
                })
                .state('search', {
                    // we'll get to this in a bit
                    url: '/search',
                    parent: 'layout',
                })
                .state('search.device', {
                    // we'll get to this in a bit
                    url: '/device?type&info',
                    params: {"info":null},
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/search.html',
                            controller: "search.ctrl"
                        }
                    }
                })
                .state('search.gps', {
                    // we'll get to this in a bit
                    url: '/gps?mark&uuid&timestamp&updated_at&longitude&latitude&altitude&humidity&temperature&light&pressure&dimension&used_star&speed&&horizontal&vertical&signal_strength&battery_voltage',
                    views: {
                        'content@layout': {
                            templateUrl: '/discovery/search.html',
                            controller: "search.ctrl"
                        }
                    },
                    onEnter: function($stateParams){
                        // console.log($stateParams,"enter gps");
                    },
                    onExit: function($stateParams){
                        // console.log($stateParams,"exit gps");
                    }
                })
                // .state('search', {
                //     // we'll get to this in a bit
                //     url: '/{uri}',
                //     parent: 'layout',
                //     params: { "searchData": null,"type":null},
                //     resolve: {
                //         uri: function ($stateParams, httpService) {
                //             $stateParams.searchData && ($stateParams.uri = httpService.setParamUrl($stateParams.type,$stateParams.searchData));
                //         }
                //     },
                //     views: {
                //         'content@layout': {
                //             templateUrl: 'discovery/search.html',
                //             controller: "search.ctrl"
                //         }
                //     }
                // })
            ; //引号只加在最后一段       
        }
    ]);
}(app); //路由配置结束