/**
 * Creator: WangChengting-iceglacial
 * Email: iceglacial@sina.com
 * Create Time: 2016/10/26 上午10.32.
 * description:
 */
+ function(app) {
    app
    // 语言
    .factory('langService', [
        "$localStorage", "$rootScope",
        function ($localStorage, $rootScope) {
            var lang = {
                chinese: "zh",
                english: "en"
            };
            var currentLang;
            return {
                getBroswerLang: function () {
                    var browserLang = lang.chinese;
                    if(currentLang){
                        browserLang = currentLang;
                    }
                    else{
                        browserLang = navigator.language;   //判断除IE外其他浏览器使用语言
                        if(!browserLang){//判断IE浏览器使用语言
                            browserLang = navigator.browserLanguage;
                        }
                    }
                    return browserLang;
                },
                getDefaultLang: function () {
                    return lang;
                },
                getCurrentLang: function () {
                    // var path = window.location.pathname;
                    // if(path.indexOf("/en") >= 0){
                    //     // currentLang = lang.english;
                    //     currentLang = 0;
                    // }else{
                    //     // currentLang = lang.chinese;
                    //     currentLang = 1;
                    // }
                    // console.log("lang:",currentLang);
                    // console.log("lang",currentLang);
                    return currentLang;
                },
                setCurrentLang: function (str) {
                    currentLang = str;
                    var pathName = window.location.pathname;
                    var langPath = pathName;
                    if(str === 0 && pathName.indexOf("/en/") < 0){//en
                        langPath = pathName + "en/";//"/en/";
                    }else if(str === 1 && pathName.indexOf("/en/") >= 0){//zh
                        langPath = pathName.slice(0,-3);//"/";
                    }
                    // console.log(langPath);
                    window.location.pathname = langPath;
                    // if(str === 0 || (!parseInt(str) && str.indexOf("en") >= 0)){
                    //     currentLang = lang.english;
                    // }else{//1
                    //     currentLang = lang.chinese;
                    // }
                },
            }
        }
    ])
    // 接口
    .factory('apiService',[
        '$q','httpService', 'langService','authService',
        function ($q, httpService, langService,authService) {
            var deffered  = $q.defer();
            function get(_url,_limit, _offset, _sort) {
                httpService.get(_url,_limit, _offset, _sort).then(
                function(response){
                    deffered.resolve(response);
                },
                function(response){
                    httpService.error(response);
                    deffered.reject();
                });
                return deffered.promise;
            };
            function post(_url, data,_limit, _offset, _sort) {
                httpService.set("post",_url,data,_limit, _offset, _sort).then(
                    function(response){
                        deffered.resolve(response);
                    },
                    function(response){
                        httpService.error(response);
                        deffered.reject();
                    });
                return deffered.promise;
            };
            return {
                getMe: function () {
                    var url = this.me();
                    return get(url);
                },
                // 获取当前保存 token 的用户信息
                me: function () {
                    /*
                     * method: get
                     */
                    return "/v1/user/myself";
                },
                /**
                 * 根据 用户ID 获取用户基本信息
                 * @param id 用户ID
                 * @returns {string}
                 */
                account: function (id) {
                    /*
                     * method: get
                     */
                    return "/v1/user/" + id;
                },
                user: function (id) {
                    return "/v1/user/" + id;
                },
                // 用户登录
                login: function () {
                    return "/v1/user/login";
                },
                // 创建用户
                createAccount: function () {
                    /*
                     * method: post
                     * Request
                     {
                        "username": "myname",
                        "password": "afeewfwefw",
                        "email": "xx@xx.com",
                        "phone": "xx",
                        "address": "xx",
                        "role": "user",
                     }
                     */
                    return "/v1/user/";
                },
                /**
                 * put
                 * @returns {string}
                 */
                userProfile: function () {
                  return "/v1/user/profile";
                },
                // 修改我的信息
                updateInfo: function () {
                    /*
                     * method: put
                     * request:
                     {
                        "email": "xx@xx.com",
                        "phone": "11111111",
                     }
                     */
                    return "/v1/user/info";
                },
                // 修改我的密码
                password: function (userId) {
                    /*
                     * method: put
                     * *request:
                     {
                     "old_password": "fwef23r23r",   //this is admin password
                     "password": "afeewfwefw"
                     }
                     */
                    if(userId){
                        return "/v1/user/" + userId + "/password";
                    }else{
                        return "/v1/user/password";
                    }
                },
                // 获取公司成员信息
                company: function () {
                    /*
                     * method: get
                     */
                    return "/v1/user/company";
                },
                // 获取公司余额等信息
                companyBillInfo: function () {
                    /*
                     * method: get
                     */
                    return "/v1/company/bill";
                },
                // 获取公司充值记录
                companyPayList: function () {
                    /*
                     * method: get
                     */
                    return "/v1/company/recharge";
                },
                // 获取公司每月扣费总和
                companyMonthPay: function (month) {
                    /*
                     * method: get
                     */
                    if(month){
                        return "/v1/company/deduction/" + month;
                    }else{
                        return "/v1/company/deduction";
                    }
                },
                // 获取所有设备
                device: function (device_id) {
                    /*
                     * method: get
                     */
                    if(device_id){
                        return "/v1/device/" + device_id;
                    }else{
                        return "/v1/device/";
                    }
                },
                // 更新设备信息
                updateDevice: function (id) {
                    /*
                     * method: put
                     * request:
                     {
                        "discription":	"this is test"
                     }
                     */
                    return "/v1/device/" + id;
                },
                // 获取单个设备信息
                deviceOnly: function (id) {
                    /*
                     * method: get
                     * request:
                     */
                    return "/v1/device/" + id;
                },
                // 授权用户设备权限
                deviceAuth: function () {
                    /*
                     * method: post
                     * request:
                     {
                          "id": "5833ac049e190d7dae32e1e4",//user_id
                          "auth_devices": [
                          {
                              "device_id": "58300d9921a43e671cf99a82",
                              "biological_view": 0,
                              "setting_set": 1
                          }
                          ]
                     }
                     */
                    return "/v1/user/auth";
                },
                /**
                 * 修改用户授权
                 * post
                 * @param id
                 * @returns {string}
                 */
                userAuth: function (id) {
                    /**
                     * {
                        "setting_auth": 0,
                        "export_auth": 0,
                        "user_auth": 0,
                        "biological_auth": 0,
                        "env_auth": 0,
                        "beh_auth": 0,
                        "analysis_auth": 0,
                        }
                     */
                    return "/v1/user/" + id + "/edit_auth";
                },
                // 授权用户设备权限
                addDeviceAuth: function (user_id) {
                    /*
                     * method: post
                     * request:
                     * { id" [...]}
                     -- [{
                     -- "device_id": "58300d9921a43e671cf99a82",
                     -- "biological_view": 0,
                     -- "setting_set": 1
                     -- },
                     -- ...]
                     */
                    return "/v1/user/" + user_id + "/add_auth";
                },
                // 删除用户设备权限
                removeDeviceAuth: function (user_id) {
                    /*
                     * method: post
                     * request:
                     * { id" [...]}
                     -- [{
                     -- "device_id": "58300d9921a43e671cf99a82",
                     -- "biological_view": 0,
                     -- "setting_set": 1
                     -- },
                     -- ...]
                     */
                    return "/v1/user/" + user_id + "/del_auth";
                },
                // 修改用户设备权限
                editDeviceAuth: function (user_id) {
                    /*
                     * method: post
                     * request:
                     {
                     "device_id": "58300d9921a43e671cf99a82",
                     "biological_view": 0,
                     "setting_set": 1
                     }
                     */
                    return "/v1/user/" + user_id + "/edit_auth";
                },
                // 授权用户设备权限
                deviceNotAuth: function () {
                    /*
                     * method: post
                     * request:
                     {
                     "id": [...],//user auth device_id
                     ]
                     }
                     */
                    return "/v1/device/exclude";
                },
                deviceByIDs: function () {
                    return "/v1/device/many";
                },
                // 单个设备的定位成功率
                gpsCount: function (id) {
                    /*
                     * method: post
                     * request:
                     {
                          "device_id": "4234234234",
                          "date": ["2016-02-22", "2016-02-23"], //时间段
                     }
                     */
                    return "/v1/statistics/gpscount/" + id;
                },
                // 获取所有设备的 GPS 信息
                gps: function () {
                    /*
                     * method: get
                     */
                    return "/v1/gps/";
                },
                // 获取所有设备的行为信息
                behavior: function () {
                    /*
                     * method: get
                     */
                  return "/v1/behavior/";
                },
                // 获取所有设备的 sms 信息
                deviceSMS: function (device_id) {
                    /*
                     * method: get
                     */
                    return "/v1/gps/device/" + device_id + "/sms";
                },
                // 获取设备的 GPS 信息
                deviceGps: function (id) {
                    return "/v1/gps/device/" + id;   //+[id]
                },
                // 获取设备的行为信息
                deviceBehavior: function (id) {
                    /*
                     * method: get
                     */
                    return "/v1/behavior/device/" + id;    //+[id]
                },
                // 获取设备的生物信息
                deviceBiological: function (id) {
                    /*
                     * method: get
                     */
                    return "/v1/biological/device/" + id;    //+[id]
                },
                // 根据 设备id 更新设备生物信息
                updateBiologicalInfo: function (id,bio_Type) {
                    /*
                     * method: post
                     */
                    return "/v1/biological/" + bio_Type + "/" + id;
                },
                // 修改用户信息
                // updateUserInfo: function () {
                //     return "/v1/user/info";
                // },
                // 获取所有设备的设备配置
                setting: function () {
                    /*
                     * method: get
                     */
                    return "/v1/setting/";
                },
                // 获得单个设备的设备配置
                deviceSetting: function (id) {
                    /*
                     * method: get
                     */
                    return "/v1/setting/device/" +id;
                },
                // 打包下载文件 - 多个文件多个设备
                downloadDeviceGps: function (filetype,oneFile,params) {
                    /*
                     * method: post
                     * filetype: excel,kml
                     * request:
                     {
                     "id": [
                     "242424234234",
                     "424242342423"
                     ]
                     }
                     */
                    var urlParams = '';
                    if(params){
                        angular.forEach(params,function (value,key) {
                            urlParams += '&' + key + "=" + value;
                        });
                        urlParams = urlParams.replace('&','?');
                    };
                    if(!oneFile || (filetype === 'kml')){//1
                        return "/v1/device/" + filetype + "_multiple" + urlParams;
                    }else{
                        return "/v1/device/" + filetype + urlParams;
                    }
                },
                // 打包下载文件 - 单个设备
                downloadFileOnly: function (id,filetype) {
                    /*
                     * method: get
                     * filetype: excel,kml
                     * request:
                     {
                         "id": [
                             "242424234234",
                             "424242342423"
                         ]
                     }
                     */
                    return "/v1/device/" + id + "/" + filetype;
                },
                // 搜索多个设备
                searchDevice: function (searchInfo) {
                    /*
                     * method: get
                     * url: + (search info)
                     */
                    return "/v1/device/search/" + searchInfo;
                },
                // 搜索单个设备
                searchDeviceOnly: function () {
                    /*
                     * method: post
                     * request:
                     {
                          mark/uuid: int
                     }
                     */
                    return "/v1/search/device";
                },
                // 搜索地图圈选范围内所有设备的 GPS 点
                searchDitu: function () {
                    /*
                     * method: post
                     * request:
                     * type 1: *circle
                     * **lat/lng: [lng,lat]
                     {
                          max: int,//radius
                          point: [float, float], //center
                     }
                     * type 2: *polygon
                     * **lat/lng: [lng,lat]
                     {
                          polygon: [
                              [float, float],...
                          ]
                     }
                     */
                    return "/v1/ditu/";
                },
                // 搜索 GPS 信息
                searchGps: function () {
                    /*
                     * method: post
                     * request:
                     {
                         "device_id": "4234234234",
                         "uuid": "4234234234",
                         "firmware_version": [1],
                         "timestamp": ["2016-04-09T23:05:15.163126Z", "2016-04-09T23:05:15.163126Z"],
                         "longitude": [11, 22],
                         "latitude": [11, 22],
                         "altitude": [11, 22],
                         "temperature": [11, 22],
                         "humidity": [11, 22],
                         "light": [11, 22],
                         "pressure": [11, 22],
                         "used_star": [11, 22],
                         "view_star": [11, 22],
                         "dimension": [11, 22],
                         "speed": [11, 22],
                         "horizontal": [11, 22],
                         "vertical": [11, 22],
                         "course": [11, 22],
                         "battery_voltage": [11, 22],
                         "signal_strength": [11, 22],
                     }
                     */
                    return "/v1/search/gps";
                },
                // 围栏
                area: function (id) {
                    /*
                     * method:
                     * （1）列表： get
                     * （2）删除： DELETE
                     * （3）创建：post:
                     * Request:
                     * {
                         // round request
                         "type": "Round",
                         "point": {
                            "lng": 1,
                            "lat": 1
                         },
                         "distance": 10,

                         // polygon request
                         "type": "Polygon",
                         "polygon": [
                             {
                                "lng": 1,
                                "lat": 1
                             },
                             {
                                "lng": 1,
                                "lat": 1
                             },
                         ],
                     }
                     * （4）修改: put
                     * Request: 同（3）
                     */
                    var areaID = id?("/"+id):"";
                    return "/v1/ditu/area" + areaID;
                },
                // 围栏 - 设备
                areaDevice: function (id) {
                    /*
                     * method:
                     * （1）获得围栏内设备列表： get
                     * （2）分配设备到围栏： put
                     */
                    return "/v1/ditu/area/" + id + "/device";
                },
                // 围栏 - 添加设备
                areaAddDevice: function (id) {
                    /*
                     * method:
                     * 分配设备到围栏： put
                     */
                    return "/v1/ditu/area/" + id + "/adddevice";
                },
                // 围栏 - 删除设备
                areaRemoveDevice: function (id) {
                    /*
                     * method: delete
                     */
                    return "/v1/ditu/area/" + id + "/deldevice";
                },
                // 获取设备关联的所有围栏
                deviceArea: function (id) {
                    /*
                     * method:
                     * 分配设备到围栏： get
                     */
                    return "/v1/device/" + id + "/area";
                },
                // 获取未读 websocket 推送消息
                WS: function () {
                    /*
                    * method: get
                    */
                    return "/v1/ws/push";
                },
                wsUrl: function () {
                    return httpService.root(1) + this.WS() + "?X-Druid-Authentication=" + encodeURIComponent(authService.getAuth());
                },
                // websocket 无效时，使用 http 获取最新消息(获取time以后的消息)
                messageNew: function (time) {
                    /*
                     * method: get
                     */
                    return "/v1/http/" + time;
                },
                // 获取历史消息 || 标注信息为已读
                message: function () {
                    /*
                     * method: get - 获取历史消息
                     * method: put - 标注信息为已读
                     */
                    return "/v1/http/message/";
                },
                // 获取未读消息
                messageUnread: function () {
                    /*
                     * method: get - 获取历史消息
                     * method: put - 标注信息为已读
                     */
                    return "/v1/http/message/unread";
                },
                // 发送消息
                sendMessage: function () {
                    /*
                     * method: post
                     * request：
                     */
                    return "/v1/http/message/";
                },
                googleMapLocation: function (lat,lng) {//https:key=AIzaSyCFTe1HMY5kFxMs3Vq8qhzdrtbgrDy-isM&
                    // return "https://ditu.google.cn/maps/api/geocode/json?key=AIzaSyCFTe1HMY5kFxMs3Vq8qhzdrtbgrDy-isM&latlng=" + lat + "," + lng + "&language=" + langService.getBroswerLang();
                    return "https://ditu.google.cn/maps/api/geocode/json";
                },
                mapLocation: function () {
                    // params: lat,lng,language,types
                    // "https://api.coolhei.com:9090/v1/proxy/geocoding?lng=104.0607&lat=30.54833481&language=en&types=locality"
                    return "/v1/proxy/geocoding";
                }
            }
        }
    ])
    // auth-service
    .factory('authService', [
        '$localStorage', '$sessionStorage', '$state',
        function($localStorage, $sessionStorage, $state) {
            // 根据当前 host 地址，计算 token 存储名
            function stripStr(s) {
                var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]");
                var password = "Druid Technology";
                password = password.split("");
                var rs = "";
                for (var i = 0; i < s.length; i++) {
                    var tmp = s.substr(i, 1);
                    if(tmp.match(pattern)){
                        tmp = password.splice(0,1);
                        tmp = tmp.toString().trim().replace(pattern, "");
                    }
                    rs =  rs + tmp;
                }
                return rs;
            }
            return {
                getStorageName: function(){
                    var base = window.location.host + window.location.pathname.split('en/')[0];
                    var storageName = stripStr(base);
                    return storageName;
                },
                // 判断 token 存在
                getAuth: function() {
                    var storageName = this.getStorageName();
                    var localStorage = $localStorage[storageName];
                    var sessionStorage = $sessionStorage[storageName];
                    if(localStorage){
                        return localStorage;
                    } else if (sessionStorage) {
                        return sessionStorage;
                    } else if (!localStorage && !sessionStorage) {
                        return false;
                    }
                },
                // 加密用户密码
                getPass: function(name, pass) {
                    var pass = (name + " + " + "druid" + " + " + pass + " + " + "heifeng").toString();
                    var endpass = CryptoJS.SHA256(pass).toString();
                    return endpass;
                },
                // 注销登录
                logout: function() {
                    var storageName = this.getStorageName();
                    angular.forEach($sessionStorage,function (value,key,array) {
                        if(key.indexOf(storageName) >= 0){
                            delete $sessionStorage[key]; // 清除缓存
                        };
                    });
                    angular.forEach($localStorage,function (value,key,array) {
                        if(key.indexOf(storageName) >= 0){
                            delete $localStorage[key]; // 清除本地存储
                        };
                    });
                    // $window.location.reload();
                    $state.go('login');
                    return true;
                },
            }
        }
    ])
    // http 请求
    .factory("httpService", [
        "$http", "$q","authService", "$location","$alert","$filter","$rootScope","$state","modalService",
        function($http,$q, authService, $location, $alert, $filter,$rootScope,$state,modalService) {
            var port = [9090,9020];
            var authDevices = null;
            var accountShow = ["address","email","id","phone","role","username","company_name"];
            var myAccountInfo = {};
            // var navs = [
            //     {
            //         "title": "device_list",
            //         "router": 'device_list',
            //         "icon": "dd dd-device",
            //         "subNav": []
            //     },
            //     {
            //         "title": "original_data",
            //         "router": '#',
            //         "icon": "dd dd-classify",
            //         'subNav': [
            //             {
            //                 "title": "gps",
            //                 "router": 'gps',
            //                 "icon": "",
            //             },
            //             {
            //                 "title": "behavior",
            //                 "router": 'behavior',
            //                 "icon": "",
            //             },
            //         ]
            //     },
            //     {
            //         "title": "device_set",
            //         "router": 'device_set',
            //         "icon": "dd dd-setting",
            //         "subNav": []
            //     },
            //     {
            //         "title": "fence",
            //         "router": '#',
            //         "icon": "dd dd-fence",
            //         'subNav': [
            //             {
            //                 "title": "fence.list",
            //                 "router": 'fence.list',
            //                 "icon": "",
            //             },
            //             {
            //                 "title": "fence.device",
            //                 "router": 'fence.device',
            //                 "icon": "",
            //             },
            //         ]
            //     },
            //     {
            //         "title": "data_analysis",
            //         "router": 'data_analysis',
            //         "icon": "dd dd-analysis",
            //         "subNav": []
            //     },
            //     {
            //         "title": "user_center",
            //         "router": '#',
            //         "icon": "dd dd-user-center",
            //         'subNav': [
            //             {
            //                 "title": "user_info",
            //                 "router": 'user_info',
            //                 "icon": "",
            //             },
            //             {
            //                 "title": "user_auth",
            //                 "router": 'user_auth',
            //                 "icon": "",
            //             },
            //             {
            //                 "title": "company_bill",
            //                 "router": 'company_bill',
            //                 "icon": "",
            //             },
            //         ]
            //     }
            // ];
            // var adminNav = [
            //     {
            //         "title": "device_list",
            //         "src": 'device_list',
            //         "icon": "dd dd-device",
            //         "list": []
            //     },
            //     {
            //         "title": "original_data",
            //         "src": '#',
            //         "icon": "dd dd-classify",
            //         'list': ['gps', 'behavior']
            //     },
            //     {
            //         "title": "device_set",
            //         "src": 'device_set',
            //         "icon": "dd dd-setting",
            //         "list": []
            //     },
            //     {
            //         "title": "fence",
            //         "src": '#',
            //         "icon": "dd dd-fence",
            //         "list": ["fence.list","fence.device"]
            //     },
            //     {
            //         "title": "data_analysis",
            //         "src": 'data_analysis',
            //         "icon": "dd dd-analysis",
            //         "list": []
            //     },
            //     {
            //         "title": "user_center",
            //         "src": '#',
            //         "icon": "dd dd-user-center",
            //         "list": ['user_info','user_auth','company_bill']
            //     }
            // ];
            // var userNav = [
            //     {
            //         "title": "device_list",
            //         "src": 'device_list',
            //         "icon": "dd dd-device",
            //         "list": []
            //     },
            //     {
            //         "title": "original_data",
            //         "src": '#',
            //         "icon": "dd dd-classify",
            //         'list': ['gps', 'behavior']
            //     },
            //     {
            //         "title": "device_set",
            //         "src": 'device_set',
            //         "icon": "dd dd-setting",
            //         "list": []
            //     },
            //     {
            //         "title": "fence",
            //         "src": '#',
            //         "icon": "dd dd-fence",
            //         "list": ["fence.list","fence.device"]
            //     },
            //     {
            //         "title": "data_analysis",
            //         "src": 'data_analysis',
            //         "icon": "dd dd-analysis",
            //         "list": []
            //     },
            //     {
            //         "title": "user_center",
            //         "src": '#',
            //         "icon": "dd dd-user-center",
            //         "list": ['user_info','user_auth']
            //     }
            // ];
            function Nav(role) {
                this.role = role;
                this.navs = {
                    deviceList:{
                        "title": "device_list",
                        "router": 'device_list',
                        "icon": "dd dd-device",
                        "subNav": []
                    },
                    data: {
                        "title": "original_data",
                        "router": '#',
                        "icon": "dd dd-classify",
                        'subNav': []
                    },
                    setting: {
                        "title": "device_set",
                        "router": 'device_set',
                        "icon": "dd dd-setting",
                        "subNav": []
                    },
                    geoFence: {
                        "title": "fence",
                        "router": '#',
                        "icon": "dd dd-fence",
                        'subNav': []
                    },
                    analysis: {
                        "title": "data_analysis",
                        "router": 'data_analysis',
                        "icon": "dd dd-analysis",
                        "subNav": []
                    },
                    userCenter: {
                        "title": "user_center",
                        "router": '#',
                        "icon": "dd dd-user-center",
                        'subNav': []
                    }
                };
                //subNav
                this.data_sub = {
                    env: {
                        "title": "gps",
                        "router": 'gps',
                        "icon": "",
                    },
                    bhv: {
                        "title": "behavior",
                        "router": 'behavior',
                        "icon": "",
                    }
                };
                this.geoFence_sub = {
                    fences: {
                        "title": "fence.list",
                        "router": 'fence.list',
                        "icon": "",
                    },
                    fenceOfDevice: {
                        "title": "fence.device",
                        "router": 'fence.device',
                        "icon": "",
                    },
                };
                this.userCenter_sub = {
                    userInfo: {
                        "title": "user_info",
                        "router": 'user_info',
                        "icon": "",
                    },
                    userAuth: {
                        "title": "user_auth",
                        "router": 'user_auth',
                        "icon": "",
                    },
                    companyBill: {
                        "title": "company_bill",
                        "router": 'company_bill',
                        "icon": "",
                    },
                }
            }
            Nav.prototype = {
                constructor: Nav,
                admin: function () {
                    var adminNavs = [];
                    adminNavs.push(this.navs.deviceList);
                    var dataNav = this.navs.data;
                    dataNav.subNav.push(this.data_sub.env);
                    dataNav.subNav.push(this.data_sub.bhv);
                    adminNavs.push(dataNav);
                    adminNavs.push(this.navs.setting);
                    var fenceNav = this.navs.geoFence;
                    fenceNav.subNav.push(this.geoFence_sub.fences);
                    fenceNav.subNav.push(this.geoFence_sub.fenceOfDevice);
                    adminNavs.push(fenceNav);
                    adminNavs.push(this.navs.analysis);
                    var userCenterNav = this.navs.userCenter;
                    userCenterNav.subNav.push(this.userCenter_sub.userInfo);
                    userCenterNav.subNav.push(this.userCenter_sub.userAuth);
                    userCenterNav.subNav.push(this.userCenter_sub.companyBill);
                    adminNavs.push(userCenterNav);
                    return adminNavs;
                },
                user: function (permission) {
                    var userNav = [];
                    userNav.push(this.navs.deviceList);
                    if(permission.env_auth || permission.bhv_auth){
                        var dataNav = this.navs.data;
                        permission.env_auth && dataNav.subNav.push(this.data_sub.env);
                        permission.bhv_auth && dataNav.subNav.push(this.data_sub.bhv);
                        userNav.push(dataNav);
                    }
                    if(permission.setting_auth.view){
                        userNav.push(this.navs.setting);
                    }
                    var fenceNav = this.navs.geoFence;
                    fenceNav.subNav.push(this.geoFence_sub.fences);
                    fenceNav.subNav.push(this.geoFence_sub.fenceOfDevice);
                    userNav.push(fenceNav);
                    if(permission.analysis_auth){
                        userNav.push(this.navs.analysis);
                    }
                    var userCenterNav = this.navs.userCenter;
                    userCenterNav.subNav.push(this.userCenter_sub.userInfo);
                    if(permission.user_auth.view){
                        // not show for user
                        // userCenterNav.subNav.push(this.userCenter_sub.userAuth);
                    }
                    userNav.push(userCenterNav);
                    return userNav;
                }
            }
            function parseData(key,value) {
                if(key === "humidity" || key === "light" || key === "pressure" || key === "dimension" || key === "used_star" || key === "signal_strength"){
                    return parseInt(value);
                }
                else if(key === "latitude" || key === "longitude" || key === "vertical" || key === "horizontal" || key === "temperature" || key === "altitude" || key === "speed" || key === "battery_voltage"){
                    return parseFloat(value);
                }
                else{
                    return value;
                };
            };
            function errorStatus(status,type) {
                var resMsg;
                var alertType = 0;
                var state = $state.current.name;
                var alert = true;
                $rootScope.$emit("hideLoadingYellow");
                switch (status) {
                    case 400:
                        if(type === "login"){
                            resMsg = $filter("chFilter")("account_error","tips");
                        }else{
                            resMsg = $filter("chFilter")("request_error","tips");
                        }
                        break;
                    case 401:
                        if(state !== "login"){
                            resMsg = $filter("chFilter")("login_auth_expired","tips");
                            asAlert(0,resMsg);
                            authService.logout();
                        }
                        break;
                    case 403:
                        if(type !== 'biological'){
                            resMsg = $filter("chFilter")("operation_not_permitted","tips");
                            alertType = 2;
                        }else{
                            alert = false;
                        }
                        break;
                    case 404:
                        resMsg = null;
                        break;
                    case 500:
                        resMsg = $filter("chFilter")("internal_error","tips");
                        break;
                    case 503:
                        resMsg = "用户名已存在！";
                        alertType = 2;
                        break;
                    default:
                        resMsg = $filter("chFilter")("request_error","tips");
                        break;
                }
                if(status !== 401 && status !== 404 && type !== -1 && alert){
                    asAlert(alertType,resMsg);
                }
            }
            function asAlert(type,title,content,container,duration) {
                var _title = title ? title : "";
                var alertType;
                if(type === 'success' || type === 1){
                    alertType = 'success';
                }
                else if(!type || type === 0 || type === "danger" || type === "error"){
                    alertType = 'danger';
                }
                else if(type === "info" || type === 2){
                    alertType = 'info';
                };
                return $alert({
                    title: _title,
                    content: content,
                    container: container || "body",
                    duration: duration || 5,
                    placement: 'top-right',
                    animation: 'am-fade-and-slide-top',
                    type: alertType,
                    keyboard: true,
                    onBeforeShow: function () {
                        angular.element('.alert').remove();
                    },
                    show: true
                });
            }
            function getRoot(ws) {
                var _port = ws ? port[1] : port[0];
                var root = $location.host();
                var reg = new RegExp(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
                var isIP = root.match(reg);
                var isLocal = (root.indexOf('localhost') >= 0);
                var protocol = 'https:';
                if(isLocal || isIP){
                    // _port = port[1];
                    root = protocol + '//api.coolhei.com';//测试
                    // root = 'http://api.druidtech.cn:' + _port;//正式
                }else{
                    var partURL = root.split(".");
                    var urlLen = partURL.length;
                    root = protocol + "//" + "api." + partURL[urlLen-2] + "." + partURL[urlLen-1];
                };
                if(ws === 1 || ws === 'ws'){
                    root = root.replace('http','ws');
                    root += ":" + port[1];
                }
                else if(ws === 2 || ws === 'msg'){
                    root = root.replace('ws','http');
                    root += ":" + port[1];
                }else{
                    root += ":" + port[0];
                }
                return root;
            }
            function Root() {
                this.protocol = 'https:';
                this.port = [9090,9020];
                this.testserver = "coolhei.com";
                this.host = window.location.host;
                this.isIp = this.host.match(new RegExp(/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/));//匹配IP； /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
                this.isLocal = this.host.indexOf('localhost') >= 0;
                this.root = this.getApiRoot();
            }
            Root.prototype = {
                constructor: Root,
                getApiRoot: function (ws) {
                    var apiRoot,apiPort;
                    var partURL = this.host.split(".");
                    if(this.isLocal || this.isIp){
                        // _port = port[1];
                        apiRoot = this.protocol + '//api.' + this.testserver;//测试
                        // root = 'http://api.druidtech.cn:' + _port;//正式
                    }else{
                        var partURL = this.host.split(".");
                        var urlLen = partURL.length;
                        apiRoot = this.protocol + "//api." + partURL[urlLen-2] + "." + partURL[urlLen-1];
                    }
                    if(ws === 1 || ws === 'ws'){
                        apiRoot = apiRoot.replace('http','ws');
                        apiPort = this.port[1];
                    }
                    else if(ws === 2 || ws === 'msg'){
                        apiRoot = apiRoot.replace('ws','http');
                        apiPort = this.port[1];
                    }else{
                        apiPort = this.port[0];
                    }
                    apiRoot = apiRoot + ':' + apiPort;
                    return apiRoot;
                },
                getHome: function () {
                    var home = 'http://';
                    var partURL = this.host.split(".");
                    var urlLen = partURL.length;
                    if(this.isIp || this.isLocal){
                        home += this.testserver;
                    }else{
                        if(this.host.indexOf('www.') > 0){
                            home += 'www.'
                        }
                        home += partURL[urlLen-2] + "." + partURL[urlLen-1];
                    }
                    return home;
                },
            };
            return {
                root: function (ws) {
                    return new Root().getApiRoot(ws);
                    // return getRoot(ws);
                },
                getHome: function () {
                    return new Root().getHome();
                },
                http: function (requestArray,successCallback,errorCallback,finallyCallback) {
                    modalService.showLoading();
                    var http;
                    var request = requestArray;
                    var urlType = request.urlType;
                    var _headers = {"X-Druid-Authentication": authService.getAuth()};
                    request.limit > 0 ? _headers["X-Result-Limit"] = request.limit : null;
                    request.offset > 0 ? _headers["X-Result-Offset"] = request.offset : null;
                    request.sort ? _headers["X-Result-Sort"] = request.sort : null;
                    request.contentType ? _headers["Content-Type"] = request.contentType : null;
                    request.compress ? _headers["X-Result-Compress"] = request.compress : null;
                    var _method = request.method || "get";
                    var _url = request.url;
                    var _data = request.data;
                    var _type = request.type;
                    var responseType = request.responseType || '';
                    if(_method === "get"){
                        var _params = request.params;
                        http = $http({
                            headers: _headers,
                            method: _method,
                            url: (getRoot(urlType) + _url),
                            params: _params,
                            responseType: responseType,
                        });
                    }else{
                        http = $http({
                            headers: _headers,
                            method: _method,
                            url: this.root(urlType) + _url,
                            data: _data,
                            responseType: responseType,
                        });
                    }
                    http.success(function (data,status,headers) {
                        modalService.hideLoading();
                        successCallback && successCallback(data,status,headers);
                    }).error(function (error,status) {
                        modalService.hideLoading();
                        errorStatus(status,_type);
                        errorCallback && errorCallback(status);
                    }).finally(function (evt) {
                        // Stop the ion-refresher from spinning
                        finallyCallback && finallyCallback("scroll.refreshComplete");
                    });
                },
                /**
                 * 只包括http请求部分，无callback
                 * @param requestArray
                 * @returns {*}
                 */
                jsonHttp: function (requestArray) {
                    var http;
                    var request = requestArray;
                    var urlType = request.urlType;
                    var _headers = {"X-Druid-Authentication": authService.getAuth()};
                    request.limit > 0 ? _headers["X-Result-Limit"] = request.limit : null;
                    request.offset > 0 ? _headers["X-Result-Offset"] = request.offset : null;
                    request.sort ? _headers["X-Result-Sort"] = request.sort : null;
                    request.contentType ? _headers["Content-Type"] = request.contentType : null;
                    request.compress ? _headers["X-Result-Compress"] = request.compress : null;
                    var _method = request.method || "get";
                    var _url = request.url;
                    var _data = request.data;
                    var _type = request.type;
                    var responseType = request.responseType || '';
                    if(_method === "get"){
                        var _params = request.params;
                        http = $http({
                            headers: _headers,
                            method: _method,
                            url: (getRoot(urlType) + _url),
                            params: _params,
                            responseType: responseType,
                        });
                    }else{
                        http = $http({
                            headers: _headers,
                            method: _method,
                            url: this.root(urlType) + _url,
                            data: _data,
                            responseType: responseType,
                        });
                    }
                    return http;
                },
                get: function(_url, _limit, _offset, _sort) {
                    var _headers = {"X-Druid-Authentication": authService.getAuth()};
                    _limit > 0 ? _headers["X-Result-Limit"] = _limit : null;
                    _offset > 0 ? _headers["X-Result-Offset"] = _offset : null;
                    _sort ? _headers["X-Result-Sort"] = _sort : null;
                    var http = $http({
                        headers: _headers,
                        method: "get",
                        url: this.root() + _url,
                    });
                    return http;
                },
                set: function(_method, _url, _data,_limit,_offset,_sort) {
                    var _headers = {"X-Druid-Authentication": authService.getAuth()};
                    _limit > 0 ? _headers["X-Result-Limit"] = _limit : null;
                    _offset > 0 ? _headers["X-Result-Offset"] = _offset : null;
                    _sort ? _headers["X-Result-Sort"] = _sort : null;
                    var http = $http({
                        headers: _headers,
                        method: _method,
                        data: _data,
                        url: this.root() + _url,
                    });
                    return http;
                },
                getMesg: function(_url, _limit, _offset, _sort) {
                    var _headers = {"X-Druid-Authentication": authService.getAuth()};
                    _limit > 0 ? _headers["X-Result-Limit"] = _limit : null;
                    _offset > 0 ? _headers["X-Result-Offset"] = _offset : null;
                    _sort ? _headers["X-Result-Sort"] = _sort : null;
                    var http = $http({
                        headers: _headers,
                        method: "get",
                        url: this.root('ws').replace('ws','http') + _url,
                    });
                    return http;
                },
                setMesg: function(_method, _url, _data,_limit,_offset,_sort) {
                    var _headers = {"X-Druid-Authentication": authService.getAuth()};
                    _limit > 0 ? _headers["X-Result-Limit"] = _limit : null;
                    _offset > 0 ? _headers["X-Result-Offset"] = _offset : null;
                    _sort ? _headers["X-Result-Sort"] = _sort : null;
                    var http = $http({
                        headers: _headers,
                        method: _method,
                        data: _data,
                        url: this.root('ws').replace('ws','http') + _url,
                    });
                    return http;
                },
                download: function(_method, _url, _data){
                    var http = $http({
                        headers: {
                            "X-Druid-Authentication": authService.getAuth()
                        },
                        responseType: "arraybuffer",
                        method: _method,
                        data: _data,
                        url: this.root() + _url,
                        //必须带上头信息作为身份验证
                    });
                    return http;
                },
                filterData:function (data) {
                    var filterData = data;
                    angular.forEach(filterData, function (value,key,array) {
                        // console.log(value)
                        if(value.last_gps){
                            value = value.last_gps;
                        };
                        if((value.latitude < -90) || (value.latitude > 90) || (value.longitude < -180) || (value.longitude > 180)){
                            value.latitude = "-";
                            value.longitude = "-";
                            value.altitude = "-";
                            value.course = "-";
                            value.dimension = "-";
                            value.horizontal = "-";
                            value.speed = "-";
                            value.used_star = "-";
                            value.vertical = "-";
                            value.view_star = "-";
                        };
                    });
                    return filterData;
                },
                error:function (response,type) {
                    var resCode;
                    if(parseInt(response)){
                        resCode = response;
                    }else{
                        resCode = response.status
                    }
                    return errorStatus(resCode,type);
                },
                myAlert:function (type,title,content,container) {
                    return asAlert(type,title,content,container);
                },
                getColumnDefs:function (type) {
                    var markDef = '<div class="ui-grid-cell-mark">' +
                        '<div class="ui-grid-cell-contents">' +
                        '<div class="main">{{row.entity.mark | chFilter: "mark"}}' +
                        '<a ng-click="grid.appScope.showCurDeviceGps(row)" ng-if="grid.appScope.accountAuth.env_auth || grid.appScope.accountAuth.bhv_auth" title="' + $filter("chFilter")("click_to_view_device_details","tips") + '">' + $filter("chFilter")("view_details") + '</a>' +
                        '</div>' +
                        '<div class="today" ng-init="getCheckedPic(row)">' +
                        '<div class="col"><span data-placement="right" data-content="{{row.entity.last_gps.timestamp || \'-\' | unitFilter: \'timestamp\'}}" data-trigger="hover" bs-popover><i class="dd dd-env" ng-class="{\'blue\': row.entity.today_gps}"></i></span></div>' +
                        '<div class="col"><span data-placement="right" data-content="{{row.entity.last_behavior.timestamp || \'-\' | unitFilter: \'timestamp\'}}" data-trigger="hover" bs-popover><i class="dd dd-bhv" ng-class="{\'blue\': row.entity.today_beh}"></i></div>' +
                        '<div class="col"><span><i class="dd dd-msg" ng-class="{\'blue\': row.entity.last_valid_gps && row.entity.last_valid_gps.sms === 1}"></i></span></div>' +
                        '<div class="col"><span data-placement="left" data-content="{{row.entity.survive_time || \'-\' | unitFilter: \'timestamp\'}}" data-trigger="hover" bs-popover><i class="dd dd-dead" ng-class="{\'error\': row.entity.survive === 1}"></i></span></div>' +
                        '<div class="col"><span data-placement="left" data-content="{{row.entity.battery_voltage || \'-\' | unitFilter: \'battery_voltage\'}}" data-trigger="hover" bs-popover><i class="dd {{row.entity.battery_voltage || \'null\' | stateFilter: \'voltage\'}}"></i></span></div>' +
                        '<div class="col"><span data-placement="left" data-content="{{row.entity.last_valid_gps.temperature || \'-\' | unitFilter: \'temperature\'}}" data-trigger="hover" bs-popover><i class="dd {{row.entity.last_valid_gps.temperature || \'null\' | stateFilter: \'temperature\'}}"></i></span></div>' +
                        // '<div><i ng-show="row.entity.today_gps" class="dd dd-cloud-success"></i><i ng-hide="row.entity.today_gps" class="dd dd-cloud-warning"></i>ENV</div>' +
                        // '<div><i ng-show="row.entity.today_beh" class="dd dd-cloud-success"></i><i ng-hide="row.entity.today_beh" class="dd dd-cloud-warning"></i>BHV</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    var timeDef = '<div class="ui-grid-cell-sms">' +
                        '<div class="ui-grid-cell-contents">' +
                        '<div class="main pull-left">{{row.entity.timestamp | unitFilter:"timestamp"}}</div>' +
                        '<div class="pull-right sms" ng-if="row.entity.sms === 1"><i class="dd dd-email"></i></div>' +
                        '</div>' +
                        '</div>';
                    var setAndBioViewDef = '<div class="ui-grid-cell-btn">' +
                        '<button class="btn btn-dark" ng-click="grid.appScope.showCurDeviceModal(row)" ng-class="{\'disabled\':  !grid.appScope.accountAuth.setting_auth.view ||(row.entity.owner && row.entity.owner === \'FromDruidOld\')}">{{"device_parameter" | chFilter}}</button>' +
                        '<button class="btn  btn-dark" ng-click="grid.appScope.showCurBiologicalModal(row)" ng-class="{\'disabled\': !grid.appScope.accountAuth.biological_auth.view}">{{"organism_info" | chFilter}}</button>' +
                        '</div>';
                    var locationDef = '<div class="ui-grid-cell-contents ng-binding ng-scope" title="{{row.entity.location}}">'
                        + '{{ row.entity.location }}</div>';
                    var descriptionDef = '<div class="ui-grid-cell-contents ng-binding ng-scope" title="{{row.entity.description}}">'
                        + '{{ row.entity.description }}</div>';
                    var userHeadDef = '<div class="ui-grid-cell-btn">' +
                        '<i class="dd dd-portrait square drop-lead anti"></i>' +
                        '</div>';
                    var userManageDef = '<div class="ui-grid-cell-btn">' +
                        '<button class="btn btn-dark" ng-click="grid.appScope.deleteUser(row.entity)" ng-disabled="row.entity.role === \'admin\' || grid.appScope.accountLogin.role === \'user\'">{{"delete" | chFilter}}</button>' +
                        '<button class="btn  btn-dark" ng-click="grid.appScope.getUserInfo(row.entity)" ng-disabled="row.entity.role === \'admin\' || grid.appScope.accountLogin.role === \'user\'">{{"account_management" | chFilter}}</button>' +
                        '<button class="btn  btn-dark" ng-click="grid.appScope.getUserDeviceAuth(row.entity)" ng-disabled="row.entity.role === \'admin\' || grid.appScope.accountLogin.role === \'user\'">{{"auth_management" | chFilter}}</button>' +
                        '</div>';
                    var timePercentDef = '<div class="ui-grid-cell-contents relative">' +
                        '<div class="progress">' +
                        '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: {{row.entity.activity_expend}}%">{{row.entity.activity_expend | unitFilter: \'activity_expend\'}}' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    var activityTimeDef = '<div class="ui-grid-cell-contents relative">' +
                        '<div class="text-center">{{row.entity.total_expend}}</div>' +
                        '<div class="progress">' +
                        '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: {{row.entity.activity_time}}%">{{row.entity.activity_time * row.entity.total_expend | number}}' +
                        ' / {{row.entity.total_expend | number}}</div>' +
                        '</div>' +
                        '</div>';
                    var userAuthPermissionDef = '<div class="ui-grid-cell-btn permission">' +
                        '<label for="setting_set[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" class="checkbox">' +
                        '<input type="checkbox" ng-change="grid.appScope.save(row.entity)" ng-model="row.entity.setting_set" id="setting_set[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" name="setting_set[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" hidden/>' +
                        '<i class="dd" ng-class="{\'dd-checkbox-thin\': !row.entity.setting_set,\'dd-checkbox-ok active\': row.entity.setting_set}"></i>' +
                        '{{"auth_device_setting" | chFilter}}</label>' +
                        '<label for="biological_view[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" class="checkbox">' +
                        '<input type="checkbox" ng-change="grid.appScope.save(row.entity)" ng-model="row.entity.biological_view" id="biological_view[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" name="biological_view[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" hidden/>' +
                        '<i class="dd" ng-class="{\'dd-checkbox-thin\': !row.entity.biological_view,\'dd-checkbox-ok active\': row.entity.biological_view}"></i>' +
                        '{{"auth_organism_info" | chFilter}}' +
                        '</label>' +
                        '</div>';
                    var userAuthActDef = '<div class="ui-grid-cell-btn">' +
                        '<button class="btn btn-dark" ng-click="grid.appScope.delete(row.entity)">{{"delete" | chFilter}}</button>' +
                        '</div>';
                    var gridUserAuthChooseDef = '<div class="ui-grid-cell-contents">' +
                        '<label for="choose[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" class="checkbox select">' +
                        '<input type="checkbox" ng-model="row.entity.choose" ng-click="grid.appScope.selectRow(row)" id="choose[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" name="choose" hidden/>' +
                        '<i class="dd" ng-class="{\'dd-checkbox-thin\': !row.isSelected,\'dd-checkbox-ok active\': row.isSelected}"></i>' +
                        '</label>' +
                        '</div>';
                    var userAddAuthPermissionDef = '<div class="ui-grid-cell-btn permission">' +
                        '<label for="addsetting_set[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" class="checkbox">' +
                        '<input type="checkbox" ng-change="grid.appScope.selectRowItem(row)" ng-model="row.entity.setting_set" id="addsetting_set[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" name="addsetting_set[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" hidden/>' +
                        '<i class="dd" ng-class="{\'dd-checkbox-thin\': !row.entity.setting_set,\'dd-checkbox-ok active\': row.entity.setting_set}"></i>' +
                        '{{"auth_device_setting" | chFilter}}</label>' +
                        '<label for="addbiological_view[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" class="checkbox">' +
                        '<input type="checkbox" ng-change="grid.appScope.selectRowItem(row)" ng-model="row.entity.biological_view" id="addbiological_view[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" name="addbiological_view[{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}]" hidden/>' +
                        '<i class="dd" ng-class="{\'dd-checkbox-thin\': !row.entity.biological_view,\'dd-checkbox-ok active\': row.entity.biological_view}"></i>' +
                        '{{"auth_organism_info" | chFilter}}' +
                        '</label>' +
                        '</div>';
                    var userDeviceNumberDef = '<div class="ui-grid-cell-contents ng-binding ng-scope">'
                        + '{{ row.entity.device_id.length }}</div>';
                    var gridDeviceList = [
                        {
                            name: 'mark' || "",
                            width: 340,
                            type: 'number',
                            pinnedLeft: true,
                            enableCellEdit: false,
                            displayName: $filter('chFilter')('mark', 'device_list'),
                            cellTemplate: markDef
                        },
                        {
                            name: 'updated_at' || "",
                            width: 175,
                            type: 'date',
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('updated_at', 'device_list')
                        },
                        {
                            name: 'last_gps.timestamp' || "",
                            width: 170,
                            type: 'date',
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('timestamp', 'device_list')
                        },
                        {
                            name: "last_gps.longitude" || "last_gps.latitude" || "",
                            width: 260,
                            // cellFilter: 'locationFilter:this',
                            cellTemplate: locationDef,
                            displayName: $filter('chFilter')('location', 'device_list'),
                        },
                        // {
                        //     name: 'temperature' || "",
                        //     width: 130,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('temperature'),
                        // },
                        // {
                        //     name: 'battery_voltage' || "",
                        //     width: 140,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('battery_voltage', 'device_list'),
                        //     cellTemplate: '<div class="relative ui-grid-cell-contents ng-binding ng-scope"><div style="background-color: {{row.entity.last_gps.battery_voltage | highLightFilter: \'color\'}}" class="bs-colorLine"></div>' +
                        //     '{{row.entity.last_gps.battery_voltage | unitFilter: this}}</div>'
                        // },
                        {
                            name: 'firmware_version' || "",
                            width: 130,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('firmware_version', 'device_list')
                        },
                        {
                            name: 'description' || "",
                            minWidth: 200,
                            enableCellEdit: true,
                            cellTemplate: descriptionDef,
                            displayName: $filter('chFilter')('description', 'device_list')
                        },
                        {
                            name:  $filter('chFilter')('setting'),
                            width: 240,
                            cellTemplate: setAndBioViewDef
                        }
                    ];
                    var gridDeviceSet = [
                        {
                            name: 'mark' || "",
                            width: 110,
                            type: 'number',
                            pinnedLeft: true,
                            enableCellEdit: false,
                            displayName: $filter('chFilter')('mark')
                        },
                        {
                            name: 'uuid' || "",
                            width: 220,
                            pinnedLeft: true,
                            displayName: "UUID"
                        },
                        {
                            name: 'updated_at' || "",
                            width: 170,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('updated_at', 'device_set')
                        },
                        {
                            name: 'downloaded_at' || "",
                            width: 170,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('downloaded_at', 'device_set')
                        },
                        {
                            name: 'behavior_sampling_mode' || "",
                            width: 140,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('behavior_sampling_mode', 'device_set')
                        },
                        {
                            name: 'behavior_sampling_freq' || "",
                            width: 200,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('behavior_sampling_freq', 'device_set')
                        },
                        {
                            name: 'behavior_voltage_threshold' || "",
                            width: 185,
                            cellFilter: 'unitFilter:this' || "",
                            displayName: $filter('chFilter')('behavior_voltage_threshold', 'device_set')
                        },
                        {
                            name: 'env_sampling_mode' || "",
                            width: 140,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('env_sampling_mode', 'device_set')
                        },
                        {
                            name: 'env_sampling_freq' || "",
                            width: 190,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('env_sampling_freq', 'device_set')
                        },
                        {
                            name: 'env_voltage_threshold' || "",
                            width: 185,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('env_voltage_threshold', 'device_set')
                        },
                        {
                            name: 'gprs_mode' || "",
                            width: 125,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('gprs_mode', 'device_set')
                        },
                        {
                            name: 'gprs_freq' || "",
                            width: 180,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('gprs_freq', 'device_set')
                        },
                        {
                            name: 'gprs_voltage_threshold' || "",
                            width: 200,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('gprs_voltage_threshold', 'device_set')
                        },
                        {
                            name: 'gprs_version' || "",
                            width: 210,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('gprs_version', 'device_set')
                        },
                        {
                            name: 'ota_voltage_threshold' || "",
                            width: 190,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('ota_voltage_threshold', 'device_set')
                        },
                        {
                            name: 'sp_number' || "",
                            width: 200,
                            displayName: $filter('chFilter')('sp_number', 'device_set')
                        },
                    ];
                    var gridGps = [
                        {
                            name: 'updated_at' || "",
                            width: 170,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('updated_at','gps'),
                        },
                        {
                            name: 'timestamp' || "",
                            width: 170, //180
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('timestamp','gps'),
                            // cellTemplate: timeDef
                        },
                        {
                            name: 'longitude' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('longitude','gps'),
                        },
                        {
                            name: 'latitude' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('latitude','gps'),
                        },
                        {
                            name: 'altitude' || "",
                            width: 110,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('altitude','gps'),
                        },
                        {
                            name: 'dimension' || "",
                            width: 110,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('dimension','gps'),
                        },
                        {
                            name: 'horizontal' || "",
                            width: 130,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('horizontal','gps'),
                        },
                        {
                            name: 'vertical' || "",
                            width: 130,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('vertical','gps'),
                        },
                        {
                            name: 'course' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('course','gps'),
                        },
                        {
                            name: 'speed' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('speed','gps'),
                        },
                        {
                            name: 'used_star' || "",
                            width: 125,
                            displayName: $filter('chFilter')('used_star','gps'),
                        },
                        {
                            name: 'temperature' || "",
                            width: 125,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('temperature','gps'),
                        },
                        {
                            name: 'humidity' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('humidity','gps'),
                        },
                        {
                            name: 'light' || "",
                            width: 135,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('light','gps'),
                        },
                        {
                            name: 'pressure' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('pressure','gps'),
                        },
                        {
                            name: 'signal_strength' || "",
                            width: 160,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('signal_strength','gps'),
                        },
                        {
                            name: 'battery_voltage' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('battery_voltage','gps'),
                        },
                        {
                            name: 'firmware_version' || "",
                            width: 115,
                            displayName: $filter('chFilter')('firmware_version','gps'),
                        }
                    ];
                    var gridBehavior = [
                        {
                            name: 'updated_at' || "",
                            minWidth: 170,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('updated_at','behavior'),
                        },
                        {
                            name: 'timestamp' || "",
                            minWidth: 180,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('timestamp','behavior'),
                        },
                        {
                            name: 'activity_percent' || "",
                            minWidth: 150,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('activity_percent','behavior'),
                            cellTemplate: timePercentDef
                        },
                        // {
                        //     name: 'activity_expend' || "",
                        //     width: 150,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('activity_expend','behavior'),
                        // },
                        // {
                        //     name: 'sleep_expend' || "",
                        //     width: 135,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('sleep_expend','behavior'),
                        // },
                        {
                            name: 'activity_intensity' || "",
                            minWidth: 200,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('activity_intensity','behavior'),
                            cellTemplate: activityTimeDef
                        },
                        // {
                        //     name: 'total_expend' || "",
                        //     width: 145,
                        //     // cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('total_expend','behavior'),
                        // },
                        // {
                        //     name: 'activity_time' || "",
                        //     width: 190,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('activity_time','behavior'),
                        // },
                        // {
                        //     name: 'sleep_time' || "",
                        //     width: 200,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('sleep_time','behavior'),
                        // },
                        {
                            name: 'firmware_version' || "",
                            minWidth: 120,
                            displayName: $filter('chFilter')('firmware_version','behavior'),
                        }
                    ];
                    var gridSMS = [
                        {
                            name: 'updated_at' || "",
                            width: 170,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('updated_at','gps'),
                        },
                        {
                            name: 'timestamp' || "",
                            width: 170, //180
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('timestamp','gps'),
                            // cellTemplate: timeDef
                        },
                        {
                            name: 'longitude' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('longitude','gps'),
                        },
                        {
                            name: 'latitude' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('latitude','gps'),
                        },
                        {
                            name: 'altitude' || "",
                            width: 110,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('altitude','gps'),
                        },
                        {
                            name: 'dimension' || "",
                            width: 110,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('dimension','gps'),
                        },
                        {
                            name: 'horizontal' || "",
                            width: 130,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('horizontal','gps'),
                        },
                        {
                            name: 'vertical' || "",
                            width: 130,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('vertical','gps'),
                        },
                        {
                            name: 'course' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('course','gps'),
                        },
                        {
                            name: 'speed' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('speed','gps'),
                        },
                        {
                            name: 'used_star' || "",
                            width: 125,
                            displayName: $filter('chFilter')('used_star','gps'),
                        },
                        {
                            name: 'temperature' || "",
                            width: 125,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('temperature','gps'),
                        },
                        {
                            name: 'humidity' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('humidity','gps'),
                        },
                        {
                            name: 'light' || "",
                            width: 135,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('light','gps'),
                        },
                        {
                            name: 'pressure' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('pressure','gps'),
                        },
                        {
                            name: 'signal_strength' || "",
                            width: 160,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('signal_strength','gps'),
                        },
                        {
                            name: 'battery_voltage' || "",
                            width: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('battery_voltage','gps'),
                        },
                        {
                            name: 'firmware_version' || "",
                            width: 115,
                            displayName: $filter('chFilter')('firmware_version','gps'),
                        }
                    ];
                    var gridCompanyUser = [
                        {
                            name: "user_head",
                            width: 56,
                            displayName: '',
                            pinnedLeft: true,
                            cellTemplate: userHeadDef
                        },
                        {
                            name: 'username' || "",
                            width: 120,
                            pinnedLeft: true,
                            displayName: $filter('chFilter')('username'),
                        },
                        {
                            name: 'device_id' || "",
                            width: 130,
                            cellTemplate: userDeviceNumberDef,
                            displayName: $filter('chFilter')('device_count'),
                        },
                        // {
                        //     name: 'setting_set' || "",
                        //     width: 150,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('auth_device_setting'),
                        // },
                        // {
                        //     name: 'biological_view' || "",
                        //     width: 170,
                        //     cellFilter: 'unitFilter:this',
                        //     displayName: $filter('chFilter')('auth_organism_info'),
                        // },
                        {
                            name: 'email' || "",
                            width: 150,
                            displayName: $filter('chFilter')('email'),
                        },
                        {
                            name: 'phone' || "",
                            width: 160,
                            displayName: $filter('chFilter')('phone'),
                        },
                        {
                            name: 'address' || "",
                            minWidth: 200,
                            displayName: $filter('chFilter')('address'),
                        },
                        {
                            name: 'role' || "",
                            width: 120,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('role'),
                        },
                        {
                            name: "act",
                            width: 360,
                            displayName: '',
                            // visible: $rootScope.accountLogin ? $rootScope.accountLogin.role === 'admin' : false,//管理员可见
                            cellTemplate: userManageDef
                        },
                    ];
                    var gridMonthBill = [
                        {
                            name: "no.",
                            width: 56,
                            displayName: '',
                            cellTemplate: userHeadDef
                        },
                        {
                            name: 'username' || "",
                            width: 120,
                            displayName: $filter('chFilter')('username'),
                        },
                        {
                            name: 'auth_device_count' || "",
                            width: 130,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('device_number'),
                        },
                        {
                            name: 'setting_set' || "",
                            width: 150,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('auth_device_setting'),
                        },
                        {
                            name: "act",
                            width: 360,
                            displayName: '',
                            // visible: $rootScope.accountLogin ? $rootScope.accountLogin.role === 'admin' : false,//管理员可见
                            cellTemplate: userManageDef
                        },
                    ];
                    var gridUserAuth = [
                        {
                            name: 'mark' || "",
                            minWidth: 90,
                            type: 'number',
                            pinnedLeft: true,
                            displayName: $filter('chFilter')('mark')
                        },
                        {
                            name: 'uuid' || "",
                            minWidth: 180,
                            pinnedLeft: true,
                            displayName: "UUID"
                        },
                        {
                            name: 'description' || "",
                            minWidth: 300,
                            cellTemplate: descriptionDef,
                            displayName: $filter('chFilter')('description', 'user_auth')
                        },
                        {
                            name: 'owner' || "",
                            minWidth: 100,
                            cellFilter: 'unitFilter:this',
                            displayName: $filter('chFilter')('owner', 'user_auth')
                        },
                        {
                            name: 'permission' || "",
                            minWidth: 300,
                            displayName: $filter('chFilter')('permission', 'device_list'),
                            cellTemplate: userAuthPermissionDef
                        },
                        {
                            name: "act",
                            minWidth: 110,
                            displayName: "",
                            cellTemplate: userAuthActDef
                        },
                    ];
                    var gridAddUserAuth = [
                        {
                            name: 'choose',
                            width: 30,
                            pinnedLeft: true,
                            displayName: "",
                            enableFiltering: false,
                            cellTemplate: gridUserAuthChooseDef
                        },
                        {
                            name: 'mark' || "",
                            minWidth: 90,
                            type: 'number',
                            enableFiltering: true,
                            filter: {
                                //DOES NOT WORK... BUT WHY
                            },
                            pinnedLeft: true,
                            displayName: $filter('chFilter')('mark')
                        },
                        {
                            name: 'uuid' || "",
                            minWidth: 180,
                            pinnedLeft: true,
                            enableFiltering: false,
                            displayName: "UUID"
                        },
                        {
                            name: 'description' || "",
                            minWidth: 300,
                            cellTemplate: descriptionDef,
                            enableFiltering: false,
                            displayName: $filter('chFilter')('description', 'user_auth')
                        },
                        {
                            name: 'owner' || "",
                            minWidth: 100,
                            cellFilter: 'unitFilter:this',
                            enableFiltering: false,
                            displayName: $filter('chFilter')('owner', 'user_auth')
                        },
                        {
                            name: 'permission' || "",
                            minWidth: 300,
                            enableFiltering: false,
                            displayName: $filter('chFilter')('permission', 'device_list'),
                            cellTemplate: userAddAuthPermissionDef
                        },
                    ];
                    if(type === "device_list"){
                        return gridDeviceList;
                    }
                    else if(type === "device_set"){
                        return gridDeviceSet;
                    }
                    else if(type === "gps"){
                        return gridGps;
                    }
                    else if(type === "behavior"){
                        return gridBehavior;
                    }
                    else if(type === "sms"){
                        return gridSMS;
                    }
                    else if(type === "company_user"){
                        return gridCompanyUser;
                    }
                    else if(type === "user_auth"){
                        return gridUserAuth;
                    }
                    else if(type === "add_user_auth"){
                        return gridAddUserAuth;
                    }
                    else{
                        return;
                    };
                },
                getSelectLog: function (log) {
                    var filterLog = "";
                    function filterKey(k) {
                        return $filter("chFilter")(k,"gps");
                    };
                    function filterTime(t) {
                        return $filter('unitFilter')(t,"search_date");
                    };
                    function filterValue(v,k) {
                        return $filter('unitFilter')(v,k);
                    };
                    angular.forEach(log, function (value, key, array) {
                        if(value){
                            if(key === "mark" || key === "uuid"){
                                filterLog += filterKey(key) + ": " + value.toString() + "; ";
                            }
                            else{
                                var tmp = (key === "timestamp" || key === "updated_at")
                                    ? filterTime(value[0])
                                    : filterValue(value[0],key);
                                tmp += (value.length > 1) ? ((key === "timestamp" || key === "updated_at") ? " - " + filterTime(value[1]) : " - " + filterValue(value[1],key)) : '';
                                filterLog += filterKey(key) + ": " + tmp + "; ";
                            }
                        }
                    });
                    return filterLog;
                },
                getJSON: function(_url) {
                    var http = $http.get(_url);
                    return http;
                },
                setParamUrl: function (type, data) {//test
                    var singleData = (JSON.stringify(data).indexOf(":") > 0);
                    var _paramUrl = type + "?";
                    if(singleData){
                        var tmp = "";
                        var _index = 0;
                        angular.forEach(data,function (value,key,array) {
                            _index !== 0 ? tmp += "&" : null;
                            tmp += key + "=" + value.toString();
                            _index++;
                        });
                        _paramUrl += tmp;
                    }else {
                        _paramUrl += data;
                    };
                    return _paramUrl;
                },
                getParamUrl: function () {//test
                    var deCodeUrl = decodeURIComponent($location.url());
                    var data = deCodeUrl.split('?');
                    var _type = data[0].slice(1);
                    var tmp = data[1].split("&");
                    var uriData = {
                        type: _type,
                        data: {}
                    };
                    if(deCodeUrl.indexOf('=') < 0){
                        uriData.data = parseInt(tmp);
                    }else if(_type === 'mark' || _type === 'uuid'){
                        var _val = tmp[0].split('=')[1];
                        (_type === 'mark') && (_val = parseInt(_val));
                        var _tmpData = {};
                        _tmpData[_type] = _val;
                        uriData.data = _tmpData;
                    }else{
                        filterData(tmp);
                    };
                    function filterData(cdata){
                        angular.forEach(cdata, function (value,index) {
                            var _value = value.split('=');
                            var _key = _value[0];
                            var _tmp = [];
                            var _data = _value[1].split(',');
                            for(var i=0;i<_data.length;i++){
                                _tmp[i] = parseData(_key,_data[i]);
                            };
                            uriData.data[_key] = _tmp;
                        });
                    };
                    return uriData;
                },
                formatUriData: function (array) {
                    var data = {};
                    angular.forEach(array, function (value,key) {
                        if(value){
                            data[key] = [];
                            var tmp = value.split(",");
                            if(key === "mark"){//int
                                data[key] = parseInt(tmp);
                            }else if(key === "uuid"){//string
                                data[key] = tmp.toString();
                            }else{
                                for(var i=0;i<tmp.length;i++){
                                    var formatedTmp = parseData(key,tmp[i]);
                                    data[key].push(formatedTmp);
                                }
                            }
                        }
                    });
                    return data;
                },
                getAccountShow: function () {
                    return accountShow;
                },
                setMyAccount: function (array) {
                    var mySelf = array;
                    (!$rootScope.accountLogin) && ($rootScope.accountLogin = {});
                    // if(mySelf.role !== "admin"){
                    //     this.myAlert("danger",$filter("chFilter")("user_not_permitted_visit","tips"));
                    //     // authService.logout();
                    // }else{
                    //     var _aShow = this.getAccountShow();
                    //     _aShow.push("profile");
                    //     authDevices = mySelf.auth_devices;
                    //     angular.forEach(_aShow, function (value) {
                    //         var key = value;
                    //         (mySelf[key]) && (myAccountInfo[key] = mySelf[key]);
                    //     });
                    // }
                    //accountLogin
                    angular.forEach(mySelf, function (value,key) {
                        $rootScope.accountLogin[key] = value;
                    });
                },
                getMyAccount: function () {
                    // console.log(myAccountInfo,"get");
                    return $rootScope.accountLogin;
                },
                checkDeviceAuth: function (id) {
                    var role = $rootScope.accountLogin.role;
                    var authDevices = $rootScope.accountLogin.auth_devices;
                    var auths = {};
                    if(role !== "admin"){
                        // console.log(authDevices);
                        if(authDevices){
                            for(var i=0;i<authDevices.length;i++){
                                var tmp = authDevices[i];
                                if(tmp.device_id === id){
                                    angular.forEach(tmp, function (value,key) {
                                        if(key !== "device_id"){
                                            auths[key] = value;
                                        }
                                    });
                                }
                            }
                            // console.log(auths,id);
                        }
                    }else{
                        auths = {
                            biological_view: 1,
                            setting_set: 1
                        };
                    }
                    return auths;
                },
                getNav: function (role,permission) {
                    var auth = {
                        analysis_auth: true,
                        env_auth: true,
                        bhv_auth: true,
                        export_auth: true,
                        biological_auth: {
                            view: true,
                            edit: true
                        },
                        setting_auth: {
                            view: true,
                            edit: true
                        },
                        user_auth: {
                            view: true,
                            edit: true
                        },
                    };
                    $rootScope.accountAuth = auth;
                    if(role === "admin"){
                        return new Nav().admin();
                    }else{
                        angular.forEach(auth,function (value,key) {
                            if(key === 'biological_auth' || key === 'setting_auth' || key === 'user_auth'){
                                if(permission[key] === 2){
                                    $rootScope.accountAuth[key].view = false;
                                }else if(permission[key] === 1){
                                    $rootScope.accountAuth[key].edit = false;
                                }else if(!permission[key]){
                                    $rootScope.accountAuth[key].view = false;
                                    $rootScope.accountAuth[key].edit = false;
                                }
                            }else{
                                $rootScope.accountAuth[key] = !!permission[key];
                            }
                        });
                        return new Nav().user($rootScope.accountAuth);
                    }
                },

                confirm: function (scope,resolve) {
                    modalService.confirm(scope,resolve);
                },
                clear: function () {
                    myAccountInfo = new Array();
                },
            }
        }
    ])
    // select service
    .factory('selectService', [
        '$filter',
        function($filter) {
            return {
                getSelect: function(type) {
                    var data;
                    if ((type === 'env_sampling_mode') || (type === 'behavior_sampling_mode') || (type === 'gprs_mode')) { //环境/行为采样模式,通信模式
                        // data = ["开", "关"];
                        data = [1, 0];
                    }
                    else if (type === 'env_sampling_freq') { //环境采样间隔
                        // data = ["5min", "10min", "30min", "1hour", "2hours", "3hours", "4hours", "8hours", "12hours", "1day"];
                        data = [300, 600, 1800, 3600, 7200, 10800, 14400, 28800, 43200, 86400];
                    }
                    else if (type === 'env_voltage_threshold') { //环境采样电压门限
                        // data = ["3.7v", "3.75v", "3.8v"];
                        data = [3.7, 3.75, 3.8];
                    }
                    else if (type === 'behavior_sampling_freq') { //行为采样间隔
                        // data = ["5min", "10min", "30min"];
                        data = [600, 1800, 3600];
                    }
                    else if (type === 'behavior_voltage_threshold') { //行为采样电压门限
                        // data = ["3.7v", "3.75v", "3.8v"];
                        data = [3.7, 3.75, 3.8];
                    }
                    else if (type === 'gprs_freq') { //通信间隔
                        // data = ["10min", "30min", "1hour", "2hours", "4hours", "8hours", "12hours", "1day", "2days", "5days", "1week", "2weeks", "1month"];
                        data = [300, 600, 1800, 3600, 7200, 14400, 28800, 43200, 86400, 172800, 432000, 604800, 1209600, 2592000];
                    }
                    else if (type === 'gprs_voltage_threshold') { //通信电压门限
                        // data = ["3.7v","3.8v", "3.85v", "3.9v"];
                        data = [3.8, 3.85, 3.9];
                    }
                    else if(type === "pagination"){
                        data = [10,50,100,200,1000];
                    };
                    return data;
                },
                getMode: function() {
                    var _mode = new Array();
                    _mode.realtime = new Array();
                    _mode.standard = new Array();
                    _mode.save = new Array();
                    _mode.standby = new Array();
                    _mode.custom = new Array();
                    return _mode;
                },
                getModeDefault: function(mode) {
                    // 所有模式下，环境采样默认电压3.7V，行为采样默认电压3.7，通信采样默认电压3.9V
                    var _data = {
                        "env": {
                            "mode": true,
                            "freq": null,
                            "threshold": null
                        },
                        "behavior": {
                            "mode": true,
                            "freq": null,
                            "threshold": null
                        },
                        "gprs": {
                            "mode": true,
                            "freq": null,
                            "threshold": null
                        }
                    };
                    if (mode === "custom") {
                        return _data;
                    } else {
                        _data.env.threshold = { "value": 3.7 };
                        _data.behavior.threshold = { "value": 3.8 };
                        _data.gprs.threshold = { "value": 3.8 };
                        //实时模式(realtime)：环境采样间隔10分钟，行为采样间隔10分钟，通信间隔1天
                        if (mode === 'realtime') {
                            _data.env.freq = { "value": 600 };
                            _data.behavior.freq = { "value": 600 };
                            _data.gprs.freq = { "value": 86400 };
                        } // 标准模式(standard)：环境采样间隔1小时，行为采样间隔10分钟，通信间隔1天
                        else if (mode === "standard") {
                            _data.env.freq = { "value": 3600 };
                            _data.behavior.freq = { "value": 600 };
                            _data.gprs.freq = { "value": 86400 };
                        } // 省电模式(save)：环境采样间隔3小时，行为采样关，通信间隔5天 
                        else if (mode === "save") {
                            _data.env.freq = { "value": 14400 };
                            _data.behavior.mode = false;
                            _data.gprs.freq = { "value": 86400 }; //1day
                        } // 待机模式(standby)：环境采样关，行为采样关，通信间隔1天
                        else if (mode === "standby") {
                            _data.env.mode = false;
                            _data.behavior.mode = false;
                            _data.gprs.freq = { "value": 86400 };
                        }
                        return _data;
                    }
                },
                checkMode: function (deviceSetting) {
                    var mode, setting;
                    setting = deviceSetting;
                    if(setting.env.threshold.value === 3.7 && setting.behavior.threshold.value === 3.7 && setting.gprs.threshold.value === 3.9){
                        if(!setting.env.freq && !setting.behavior.mode && setting.gprs.freq.value === 86400){
                            mode = "standby";
                        }else if(!setting.behavior.mode && setting.env.freq.value === 14400 && setting.gprs.freq.value === 86400){
                            mode = "save";
                        }
                        else if(setting.behavior.freq.value === 600 && setting.env.freq.value === 3600 && setting.gprs.freq.value === 86400){
                            mode = "standard";
                        }
                        else if(setting.behavior.freq.value === 600 && setting.env.freq.value === 600 && setting.gprs.freq.value === 86400){
                            mode = "realtime";
                        }else{
                            mode = "custom";
                        }
                    }else{
                        mode = "custom";
                    }
                    return mode;
                },
            }
        }
    ])
    // 时间 service
    .factory('timeService', [
        '$filter','httpService','$rootScope',
        function($filter,httpService,$rootScope) {
            var profileTimeZone;
            var globalTimeZone = [-720,-660,-600,-570,-540,-480,-420,-360,-300,-240,-210,-180,-120,-60,0,60,120,180,210,240,
                270,300,330,345,360,390,420,480,510,540,570,600,630,660,690,720,765,780,840];
            var languageEnabled = [0,1];
            function formatTimeOffset(offset) {
                // angular-timezone-offset: '+0430'(4 hours, 30 minutes)
                // js-time-zone-offset: '-480'(minutes)
                var timezone = offset || 0;
                var zone;
                if(timezone === 0){
                    zone = "+0000";
                }else{
                    var offset = (timezone > 0) ? "+" : "-";
                    var hours = Math.abs(parseInt(timezone/60));
                    var minute = Math.abs(timezone%60);
                    offset += (hours > 10) ? "" : "0";
                    minute += (minute > 10) ? "" : "0";
                    zone = offset + hours + minute;
                }
                return zone;
            }
            return {
                // 时区时间偏移 - 分钟
                getLocalTimeOffset: function () {
                    var timezone = -(new Date).getTimezoneOffset();
                    return formatTimeOffset(timezone);
                },
                // 时区时间偏移 - "+0000"
                getProfileTimeOffset: function (reverse) {
                    var timezone = parseInt(profileTimeZone);
                    if(timezone !== undefined && timezone !== null){
                        return formatTimeOffset(timezone);
                    }else{
                        return this.getLocalTimeOffset();
                    }
                },
                // 获取RFC3339格式的日期时间-转UTC
                getTimeRFC3339: function(time) {
                    var _time = time ? time : new Date();
                    var filterTime = $filter('date')(_time, "yyyy-MM-ddTHH:mm:ss.sss'Z'","utc");
                    return filterTime;
                },
                // 获取RFC3339格式的日期时间
                getLocalTimeRFC3339: function(time) {
                    var _time = time ? time : new Date();
                    var filterTime = $filter('date')(_time, "yyyy-MM-ddTHH:mm:ss.sss'Z'");
                    return filterTime;
                },
                // 转化为本地时间
                toLocalTime: function (time) {
                    var filterTime = $filter('unitFilter')(time, "updated_at");
                    return filterTime;
                },
                toUTC: function (time) {
                    time = new Date($filter('unitFilter')(time,"fix_time"));//fix_time
                    var utcTurn = (-(new Date).getTimezoneOffset())*60*1000; //highcharts ： useUTC无效；强制-8h
                    var timestamp = time.getTime() + utcTurn;// - utcTurn
                    // timestamp = timestamp - (new Date).getTimezoneOffset() * 60 * 1000; //强制反转换时区
                    return timestamp;
                },
                setProfileTimezone: function (number) {
                    profileTimeZone = number;
                },
                getProfileTimezone: function () {console.log(number);
                    return profileTimeZone;
                },
                getLanguageEnabled: function () {
                    return languageEnabled;
                },
                getGloableTimeZone: function () {
                  return globalTimeZone;
                },
            }
        }
    ])
    // 电压 service
    .factory('voltageService', [
        function() {
            // 3.6-3.7V: (0-5%)  -- red: #FF556A; （不工作）
            // 3.7V~3.8V: (5-30%)  --  orange: #F4A523;  （不能采样）
            // 3.8V~3.9V: (30-85%)  --  green: #54C2E9;  （可采样）
            // 3.9V~4.1V: (85-100%)  --  blue: #94C300;  （正常）//3.9-4.05
            var voltageStateLine = {
                full: 4.1,
                normal: 3.9,
                sample: 3.8,
                notSample: 3.7,
                notWork: 3.6,
            };
            var voltagePercentLine = [1,0.85,0.3,0.05,0];
            return {
                setColor: function(voltage) {
                    var vol = voltage?voltage:0;
                    var colors = [
                        { color: "#ff5469", state: "不工作" },//FF556A-FCA4A6
                        { color: "#F4A523", state: "不能采样" },//F4A523-FCC994
                        { color: "#b0d060", state: "可采样" },//54C2E9-69becb
                        { color: "#69BECB", state: "正常" }//94C300-cbe688
                    ]; //正常->不工作
                    var _state = this.getState(vol);
                    return colors[_state];
                },
                getState: function (voltage) {
                    var vol = voltage ? voltage:0;
                    if (vol >= voltageStateLine.normal) {
                        return 3;
                    }
                    else if (vol >= voltageStateLine.sample) {
                        return 2;
                    }
                    else if (vol >= voltageStateLine.notSample) {
                        return 1;
                    }
                    else if (vol < voltageStateLine.notSample) {
                        return 0;
                    };
                },
                setPercent: function (voltage) {
                    var vol = voltage?voltage:0;
                    var _vol = [3.6, 3.7, 3.8, 3.9, 4.1];
                    var _default = [0, 0.05, 0.3, 0.85, 1];
                    var _index = this.getState(voltage);
                    var _left = _default[_index];
                    if(vol >= _vol[_vol.length-1]){
                        _left = 1;
                    }else  if(vol <= _vol[0]){
                        _left = 0;
                    }else{
                        // 按区间计算
                        // var _per = _default[_index+1] - _default[_index];
                        // var _vol = (vol-_vol[_index])/(_vol[_index+1] - _vol[_index]);
                        // var _tmp = _per*_vol;
                        // _left += _tmp;
                        // 直接计算
                        var fullCharge = voltageStateLine.full;
                        _left = vol/fullCharge;
                    };
                    return _left;
                },
            }
        }
    ])
    // 地图 service
    .factory('mapService', [
        '$filter', 'apiService', 'httpService', '$rootScope','$stateParams','$state','langService','fenceService','deviceService','$timeout',
        function($filter, apiService, httpService, $rootScope,$stateParams,$state,langService,fenceService,deviceService,$timeout) {
            // var MaxZoomLevel =  13;

            var rangeDevice; //搜索结果设备
            var selectedShape; //搜索形状
            var map, mapData, mapDiv, center, contextMenu;
            var searchRadius, searchArray; // 范围搜索半径，区域点array
            var poly, sPoly; //路径
            var oMarkers, sMarkers;//原始markers， 搜索结果markers - 分设备
            var oMarkerCluster, sMarkerCluster;//集群
            var oBounds, sBounds, fenceBounds; //自动缩放
            var sDeviceMap; //搜索设备索引 map
            var sDevicesGPS; //搜索设备 gps数据 array
            var mapItems = ["id","latLng", "mark", "uuid", "timestamp", "updated_at", "temperature", "humidity", "light", "battery_voltage",
                "course", "device_id", "dimension", "signal_strength", "speed", "used_star", "altitude", "horizontal", "vertical", "pressure"]; //地图显示数据
            var deviceLimit = 5; //可对比设备数量
            var activeDevice; //地图对比设备
            var geoFences; //多个围栏
            var maxFenceArea = 314159266; // 10 km radius
            var drawingManager,fenceDrawingManager;
            var rectangleExceedTips = $filter("chFilter")("rectangle_exceed","fence");
            var circleExceedTips = $filter("chFilter")("circle_exceed","fence");
            var curLang = (langService.getCurrentLang() === 0) ? "en" : "zh";
            // 地图搜索
            // var drawPolyOptions = {
            //     strokeColor: '#C01E1E',
            //     strokeOpacity: 0.8,
            //     strokeWeight: 1,
            //     fillColor: '#C01E1E',
            //     fillOpacity: 0.15,
            //     editable: false,
            // };
            //围栏颜色：绿：#7ed321（列表）；蓝：#42B6DB（高亮）；红：#FF3851（新建／编辑）
            // var fenceColor = {
            //     default: "#7ED321",
            //     highLight: "#42B6DB",
            //     edit: "#FF3851",
            // };
            // var fenceOptions = {
            //     strokeOpacity: 1,
            //     strokeWeight: 2,
            //     fillOpacity: 0.15,
            //     editable: false
            // };
            // var drawFenceOptions = fenceOptions;
            // drawFenceOptions.strokeColor = fenceColor.default;
            // drawFenceOptions.fillColor = fenceColor.default;
            //
            // var drawFenceHighLightOptions = fenceOptions;
            // drawFenceHighLightOptions.strokeColor = fenceColor.highLight;
            // drawFenceHighLightOptions.fillColor = fenceColor.highLight;
            //
            // var drawFenceCreateOptions = fenceOptions;
            // drawFenceCreateOptions.strokeColor = fenceColor.edit;
            // drawFenceCreateOptions.fillColor = fenceColor.edit;

            var measurePath;

            // init();

            // 初始化地图参数
            function init() {
                if(curLang === "en"){
                    ChangeGoogleMapsLanguage();
                }
            }
            // 切换地图到当前语言
            function ChangeGoogleMapsLanguage() {
                var lang = curLang;
                var oldScript = document.getElementById("google-maps-script");
                oldScript.parentNode.removeChild(oldScript);
                delete google.maps;
                loadMap(lang);
            }
            // 根据当前语言切换地图
            function loadMap(lang) {
                var _lang = lang || "zh";
                // console.log("add map",lang);
                var mapScript = document.createElement("script");
                // maps.googleapis.com
                mapScript.src = "http://ditu.google.cn/maps/api/js?key=AIzaSyCFTe1HMY5kFxMs3Vq8qhzdrtbgrDy-isM&libraries=drawing,geometry&language=" + _lang;
                mapScript.id = "google-maps-script";
                document.body.appendChild(mapScript);
            }
            /**
             * @description 清空搜索结果
             */
            function initSearchData() {
                sMarkers = new Array();
                sMarkerCluster = new Array();
                sPoly = new Array();
                sBounds = new Array();
                sDeviceMap = new Array;
                sDevicesGPS = new Array();
                activeDevice = [];
            }
            // 初始化围栏地图
            function initFence() {
                angular.forEach(geoFences,function (value,key) {
                    geoFences[key].setMap(null);
                });
                geoFences = {};
                fenceBounds = new google.maps.LatLngBounds();
                // fenceDrawingManager = new google.maps.drawing.DrawingManager({
                //     // drawingMode: google.maps.drawing.OverlayType.MARKER,
                //     // drawingControl: false,
                //     drawingControlOptions: {
                //         position: google.maps.ControlPosition.TOP_CENTER,
                //         drawingModes: [
                //             // google.maps.drawing.OverlayType.MARKER,
                //             google.maps.drawing.OverlayType.CIRCLE,
                //             // google.maps.drawing.OverlayType.POLYGON,
                //             // google.maps.drawing.OverlayType.POLYLINE,
                //             google.maps.drawing.OverlayType.RECTANGLE
                //         ]
                //     },
                //     // overlay: "circle",
                //     markerOptions: {icon: 'images/pin-search2838.png'},
                //     rectangleOptions: drawFenceOptions,
                //     circleOptions: drawFenceOptions,
                // });
                var drawing = new Drawing('fence','default');
                drawing.init();
                initSearchData();
            }
            // 初始化默认地图
            function initMarkerMap() {
                initSearchData();
                // drawingManager = new google.maps.drawing.DrawingManager({
                //     // drawingMode: google.maps.drawing.OverlayType.MARKER,
                //     // drawingControl: false,
                //     drawingControlOptions: {
                //         position: google.maps.ControlPosition.TOP_CENTER,
                //         drawingModes: [
                //             // google.maps.drawing.OverlayType.MARKER,
                //             google.maps.drawing.OverlayType.CIRCLE,
                //             google.maps.drawing.OverlayType.POLYGON,
                //             // google.maps.drawing.OverlayType.POLYLINE,
                //             // google.maps.drawing.OverlayType.RECTANGLE
                //         ]
                //     },
                //     // overlay: "circle",
                //     markerOptions: {icon: 'images/pin-search2838.png'},
                //     rectangleOptions: drawPolyOptions,
                //     circleOptions: drawPolyOptions,
                //     polygonOptions: drawPolyOptions,
                // });
                var drawing = new Drawing();
                drawing.init();
            }

            function Drawing(type,state) {
                this.type = type;
                this.state = state;
                /**
                 * google.maps.drawing.OverlayType.MARKER,
                 * google.maps.drawing.OverlayType.CIRCLE,
                 * google.maps.drawing.OverlayType.POLYGON,
                 * google.maps.drawing.OverlayType.POLYLINE,
                 * google.maps.drawing.OverlayType.RECTANGLE
                 * @type {{default: [*], fence: [*], distance: [*]}}
                 */
                this.modes = {
                    default: [google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.POLYGON],
                    fence: [google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.RECTANGLE],
                    distance: [google.maps.drawing.OverlayType.POLYLINE]
                };
                this.mode = this.modes[this.type] || this.modes.default;
                this.style = {};
                this.color = {
                    search: "#C01E1E",//0-深红: 地图搜索
                    default: "#7ED321",//1-绿：#7ed321（列表）
                    highLight: "#42B6DB",//2-蓝：#42B6DB（高亮）
                    edit: "#FF3851",//3-红：#FF3851（新建／编辑）
                };
                // 样式
                if(!this.state || this.state === 'search'){
                    this.style = {
                        strokeColor: this.color.search,//深红
                        strokeOpacity: 0.8,
                        strokeWeight: 1,
                        fillColor: this.color.search,
                        fillOpacity: 0.15,
                        editable: false,
                    };
                }else{
                    var color;
                    if(this.state === "default" || this.state === 1){
                        color = this.color.default;
                    }else if(this.state === "highlight" || this.state === 2){
                        color = this.color.highLight;
                    }else if(this.state === "edit" || this.state === 3){
                        color = this.color.edit;
                    }
                    this.style = {
                        strokeColor: color,
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        fillColor: color,
                        fillOpacity: 0.15,
                        editable: false
                    };
                }
            }
            Drawing.prototype = {
                constructor : Drawing,
                setType: function (new_type) {
                    drawingManager.setOptions({
                        drawingControlOptions: {
                            position: google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: this.modes[new_type]
                        }
                    });
                },
                /**
                 * 隐藏绘制工具，并限制绘制新的图形
                 */
                hideTool: function () {
                    drawingManager.setDrawingMode(null);
                    // To hide:
                    drawingManager.setOptions({
                        drawingControl: false
                    });
                    // console.log('hide tool',drawingManager);
                },
                showTool: function () {
                    // To show:
                    drawingManager.setOptions({
                        drawingControl: true
                    });
                },
                init: function () {
                    drawingManager = new google.maps.drawing.DrawingManager({
                        // drawingMode: google.maps.drawing.OverlayType.MARKER,
                        // drawingControl: false,
                        drawingControlOptions: {
                            position: google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: this.mode
                        },
                        // overlay: "circle",
                        markerOptions: {icon: 'images/pin-search2838.png'},
                        rectangleOptions: this.style,
                        circleOptions: this.style,
                        polygonOptions: this.style,
                    });
                }
            }
            function MenuAction(type) {
                this.type = type;
                this.measureDistance = {
                    classNames: {menu:'context_menu', menuSeparator:'context_menu_separator'},
                    menuItems: [
                        {className:'menu_item', eventName:'measure_distance', id:'measureDistanceItem', label:'距离测量'},
                    ],
                };
                this.delMeasureDistance = {
                    classNames: {menu:'context_menu', menuSeparator:'context_menu_separator'},
                    menuItems: [
                        {className:'menu_item', eventName:'quit_distance_menu', id:'quitDistanceItem', label:'退出测量'},
                    ],
                };
                this.searchRange = {
                    classNames: {menu:'shape_menu', menuSeparator:'shape_menu_separator'},
                    menuItems: [
                        {className:'shape_item', eventName:'shape_click', id:'shapeItem', label: $filter("chFilter")('delete_search_range')},
                        {className:'shape_search_item', eventName:'shape_search_click', id:'shapeSearchItem', label:$filter("chFilter")('search_range_device')},
                    ],
                };
                this.fence = {
                    classNames: {menu:'shape_menu', menuSeparator:'shape_menu_separator'},
                    menuItems: [
                        {className:'shape_item', eventName:'fence_click', id:'shapeItem', label:$filter("chFilter")('delete_search_range')},
                    ],
                };
            }

            /**
             * @returns {string}
             * @description 随机生成颜色
             */
            function color(){
                return '#' + Math.floor(0x1000000 + Math.random() * 0x1000000).toString(16).slice(1);
            }

            // 反向纠偏
            function gcjToWgs(latlngStr) {
                var latlng = latlngStr.split(',');
                latlng = eviltransform.gcj2wgs(parseFloat(latlng[0]),parseFloat(latlng[1]));
                latlng.lng = parseFloat(latlng.lng.toFixed(7));
                latlng.lat = parseFloat(latlng.lat.toFixed(7));
                var lnglat = new Array();
                lnglat.push(latlng.lng);
                lnglat.push(latlng.lat);
                return lnglat;
            }
            // 格式化搜索数据
            function setsearchArray(event, array, max) {
                searchArray = {};
                var type = event.type;
                if(type === google.maps.drawing.OverlayType.CIRCLE){
                    var latlng = array.toString().slice(1,-1);
                    var lnglat = gcjToWgs(latlng);
                    searchArray.max = parseInt(max);
                    searchArray.point = lnglat;
                }
                else if(type === google.maps.drawing.OverlayType.POLYGON){
                    searchArray.polygon = array;
                };
            }
            // 格式化polygon坐标点array
            function getPolygonArray(polygon) {
                var array = new Array();
                var polygonArray = new Array();
                var beginPoint;
                for (var i = 0; i < polygon.getLength(); i++) {
                    var lnglat = gcjToWgs(polygon.getAt(i).toUrlValue(6));
                    (i==0) &&  (beginPoint = lnglat);
                    array.push(lnglat);
                };
                array.push(beginPoint);
                polygonArray.push(array);
                return polygonArray;
            }
            // 搜索圆形区域
            function searchMap(array) {
                var url = apiService.searchDitu();
                return httpService.set("post", url, array, null, null, "device_id,timestamp");
            }
            // 判断经纬度是否有效，check location, 并加偏中国地区的gps点
            function latlngValidLocation(lat,lng,offset) {
                var latlng = [];//纬度，经度
                var _lat = parseFloat(lat);
                var _lng = parseFloat(lng);
                if(_lat > (-90) && _lat < 90 && _lng > (-180) && _lng < 180){
                    if (offset === 1) {      // for google map, offset china gps only
                        var gcj = eviltransform.wgs2gcj(_lat,_lng);
                        latlng[0] = parseFloat(gcj.lat.toFixed(7));
                        latlng[1] = parseFloat(gcj.lng.toFixed(7));
                    } else {
                        latlng[0] = lat;
                        latlng[1] = lng;
                    }
                    return latlng;
                };
                return false;
            }
            // 判断经纬度是否有效，并加偏中国地区的gps点
            function latlngValid(lat,lng) {
                var latlng = [];//纬度，经度
                var _lat = parseFloat(lat);
                var _lng = parseFloat(lng);
                if(_lat > (-90) && _lat < 90 && _lng > (-180) && _lng < 180){
                    var gcj = eviltransform.wgs2gcj(_lat,_lng);
                    latlng[0] = parseFloat(gcj.lat.toFixed(7));
                    latlng[1] = parseFloat(gcj.lng.toFixed(7));
                    return latlng;
                };
                return false;
            }

            /**
             * 判断gps点有效
             * @param lat,lng
             * @returns {lat: xxx,lng: xxx} / false
             */
            function validLatLng(lat,lng) {
                var _lat = parseFloat(lat);
                var _lng = parseFloat(lng);
                // console.log("origin",lat,lng);
                if(_lat > (-90) && _lat < 90 && _lng > (-180) && _lng < 180){
                    var latLngarray = {
                        lat: parseFloat(_lat.toFixed(7)),
                        lng: parseFloat(_lng.toFixed(7))
                    };
                    return latLngarray;
                }else{
                    return false;
                };
            }
            /**
             * 中国区加偏
             * @param lat, lng
             * @returns {lat: xxx,lng: xxx} / false
             */
            function addLatLngOffset(lat,lng) {
                var latLng = validLatLng(lat,lng);
                if(latLng){
                    var _lat = latLng.lat;
                    var _lng = latLng.lng;
                    var gcj = eviltransform.wgs2gcj(_lat,_lng);
                    var latLng = {
                        lat: parseFloat(gcj.lat.toFixed(7)),
                        lng: parseFloat(gcj.lng.toFixed(7))
                    };
                    // console.log(lat,lng,"加偏:",gcj.lat,gcj.lng);
                    return latLng;
                }
            }
            /**
             * 中国区去偏
             * @param lat, lng
             * @returns {lat: xxx,lng: xxx} / false
             */
            function removeLatLngOffset(lat,lng) {
                var latLng = validLatLng(lat,lng);
                if(latLng){
                    var _lat = latLng.lat;
                    var _lng = latLng.lng;
                    var wgs = eviltransform.gcj2wgs(_lat,_lng);
                    var latLng = {
                        lat: parseFloat(wgs.lat.toFixed(7)),
                        lng: parseFloat(wgs.lng.toFixed(7))
                    };
                    // console.log(lat,lng,"去偏",wgs.lat,wgs.lng);
                    return latLng;
                }
            }
            // 是否存在集群
            function checkCluster(cluster) {
                if(cluster){
                    if(cluster.getMarkers().length > 0){
                        return true;
                    }
                    return false
                }
                return false;
            }
            // 判断点已存在
            function markerNotExit(array, value) {
                for(var i=0;i<array.latLng.length;i++){
                    var sVal = array.uuid[i].toString() + array.timestamp[i].toString() + array.latLng[i].toString();
                    if(sVal === value){
                        return false;
                    }
                }
                return true;
            }
            // 过滤搜索范围内已存在的点
            function filterMarker(array1, array2) {
                var mArray = {};
                var m1 = array1;
                var m2 = array2;
                angular.forEach(mapItems, function (value) {
                    mArray[value] = [];
                });
                for(var i=0;i<m2.latLng.length;i++){
                    var val = m2.uuid[i].toString() + m2.timestamp[i].toString() + m2.latLng[i].toString();
                    var notExit = markerNotExit(m1, val);
                    if(notExit){
                        angular.forEach(mArray, function (value, key) {
                            mArray[key].push(m2[key][i]);
                        });
                    }
                }
                return mArray;
            }
            // 获取集群
            function getCluster(array) {
                return new MarkerClusterer(map, array, {
                    // gridSize: 50,
                    // maxZoom: 15,
                    // ignoreHidden: false,
                    imagePath: '/images/m'
                });
            }

            // 格式化地图显示内容 - old
            function getMapSHow() {
                var array = {};
                angular.forEach(mapItems, function (value) {
                    array[value] = [];
                });
                return array;
            }

            /**
             * @description 过滤和格式化地图数据
             * @param array - gps数据
             * @returns {*}
             */
            function formatData(array) {
                var gpsArray = new Array();
                var curMap = mapItems;
                angular.forEach(array, function(data, index) {
                    (data.last_valid_gps) && (data = data.last_valid_gps);//取设备最后一个有效gps点
                    if(data){
                        var latlng = latlngValidLocation(data.latitude,data.longitude,data.point_location);
                        latlng && setArra();
                        function setArra(){
                            var _tmpGps = new Array();
                            _tmpGps.latLng = latlng;
                            angular.forEach(curMap, function(value, key) {
                                var _item = value;
                                if (_item !== "latLng") {
                                    _tmpGps[_item] = data[_item];
                                };
                            });
                            gpsArray.push(_tmpGps);
                        };
                    };
                });
                return gpsArray;
            }

            /**
             * @description 格式化单个gps点基础信息，marker窗口，map等
             * @param array - 单个gps点
             */
            function formatMarker(array,isSearch,begin){
                // begin: 1 -> begin; 2 -> end
                var thisData = array;
                var content_show = markerWindow(thisData);
                var _point = new google.maps.LatLng(thisData.latLng[0], thisData.latLng[1]);
                var image;
                if(isSearch){
                    if(begin === 1){
                        image = {
                            url: window.location.origin + $filter('chFilter')("image","search-start"),//'http://ditu.google.cn/mapfiles/kml/paddle/ylw-circle.png'
                            scaledSize: new google.maps.Size(40, 40)
                        };
                    }
                    else if(begin === 2){
                        image = {
                            url: window.location.origin + $filter('chFilter')("image","search-end"),//'http://ditu.google.cn/mapfiles/kml/paddle/ylw-circle.png'
                            scaledSize: new google.maps.Size(40, 40)
                        };
                    }
                    else{
                        image = {
                            url: window.location.origin + $filter('chFilter')("image","search"),//'http://ditu.google.cn/mapfiles/kml/paddle/ylw-circle.png'
                            scaledSize: new google.maps.Size(14, 14)
                        };
                    }
                }else{
                    if(begin === 1){
                        image = {
                            url: window.location.origin + $filter('chFilter')("image","start"),//'http://ditu.google.cn/mapfiles/kml/paddle/ylw-circle.png'
                            scaledSize: new google.maps.Size(40, 40)
                        };
                    }
                    else if(begin === 2){
                        image = {
                            url: window.location.origin + $filter('chFilter')("image","end"),//'http://ditu.google.cn/mapfiles/kml/paddle/ylw-circle.png'
                            scaledSize: new google.maps.Size(40, 40)
                        };
                    }
                    else{
                        image = {
                            url: window.location.origin + $filter('chFilter')("image","default"),//'http://ditu.google.cn/mapfiles/kml/paddle/ylw-circle.png'
                            scaledSize: new google.maps.Size(16, 16)
                        };
                    }
                }
                var titleShow = (thisData.mark ? $filter('chFilter')('mark') + ": " + thisData.mark : "UUID: " + thisData.uuid);
                var markerInfoWindow = new google.maps.InfoWindow({ //定义 marker 显示内容
                    content: content_show
                });
                // 定义 marker 位置，内容等
                var marker = new google.maps.Marker({
                    map: map,
                    position: _point,
                    optimized: true, //优化
                    title: titleShow,//path.getLength()
                    icon: image,
                    infoWindow: markerInfoWindow
                });
                // marker 点击事件
                marker.addListener("click", function() {
                    // 添加 marker
                    this.infoWindow.open(map, this);
                    this.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                    this.infoWindow.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                });

                // marker 右键事件
                // marker.addListener("rightclick", function(event) {
                //     contextMenu.show(event.latLng);
                // });
                return marker;
            }

            /**
             * @description 绘制单个设备有效区域内所有gps点
             * @param array gps点
             * @param polyline boolean 是否绘制路径
             * @param isSearch boolean 是否搜索结果
             */
            function drawOnMap(array,polyline,isSearch){
                var _markers = new Array();
                var marker, bounds, polyLine, path;
                var _mapData = formatData(array);
                if(_mapData.length > 0){
                    var _sPoly;
                    var deviceID = _mapData[0].device_id;
                    polyLine = polyline;
                    // 折线样式
                    var polyOptions = {
                        strokeColor: '#00FAFF', // 颜色BD0FE1
                        strokeOpacity: 1, // 透明度
                        strokeWeight: 2, // 宽度
                        icons: [{
                            repeat: '70px', //CHANGE THIS VALUE TO CHANGE THE DISTANCE BETWEEN ARROWS
                            icon: {
                                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            },
                            offset: '100%'},
                        ]
                    };
                    var rangePolyOptions = {
                        strokeColor: color(), // 颜色
                        strokeOpacity: 0.75, // 透明度
                        strokeWeight: 2, // 宽度
                        icons: [{
                            repeat: '70px', //CHANGE THIS VALUE TO CHANGE THE DISTANCE BETWEEN ARROWS
                            icon: {
                                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                            },
                            offset: '100%'}]
                    };
                    if(polyLine){
                        if(isSearch){
                            _sPoly = new google.maps.Polyline(rangePolyOptions);
                        }else{
                            poly = new google.maps.Polyline(polyOptions);
                        }
                    }
                    // Before adding markers:
                    bounds  = new google.maps.LatLngBounds();
                    if(_mapData){
                        var singleDevice = (isSearch || $stateParams.id) && ($state.current.name !== "fence.edit.device");
                        for (var i = 0; i < _mapData.length; i++) {
                            var _point = new google.maps.LatLng(_mapData[i].latLng[0], _mapData[i].latLng[1]);
                            bounds.extend(_point);
                            // 路径
                            if(polyLine){
                                if(isSearch){
                                    path = _sPoly.getPath();
                                    path.push(_point);
                                }else{
                                    path = poly.getPath();
                                    path.push(_point);
                                }
                            };
                            if(singleDevice && (i === 0)){
                                marker = formatMarker(_mapData[i],isSearch,1);
                            }else if(singleDevice && (i === _mapData.length-1)){
                                marker = formatMarker(_mapData[i],isSearch,2);
                            }else{
                                marker = formatMarker(_mapData[i],isSearch);
                            }
                            _markers.push(marker);
                        };
                    };
                    if(polyLine){
                        if(isSearch){
                            _sPoly.setMap(map);
                            sPoly[deviceID] = _sPoly;
                        }else{
                            poly.setMap(map);
                        }
                    }
                    // After all markers have been added:
                    map.fitBounds(bounds);      // # auto-zoom
                    map.panToBounds(bounds);    // # auto-center
                    if(isSearch){
                        pushSMarkers(deviceID,_markers);
                        setRangeBounds(deviceID,bounds);
                    }else{
                        setOMarkers(_markers);
                        oBounds = bounds;
                        oMarkerCluster = getCluster(_markers);
                    }
                }else{
                    // httpService.myAlert('danger',$filter('chFilter')('useful_info_none'));
                }
                $rootScope.$emit('hideLoadingYellow');
                return _markers;
            }

            /**
             * @description  设置信息框
             * @param array gps数据
             * @returns {string}
             */
            function markerWindow(array) {
                var devData = array;
                var _mark = (devData.mark !== undefined) ? devData.mark : "";
                var content = '<div class="marker-window" >' +

                    '<header class="">' +
                    '<div class="g-inline">' +
                    '<div class="text-inline title"><a href="#/device?id=' + devData.device_id + '">' + $filter('chFilter')("mark") + "：" + _mark + '</a></div>' +
                    '<div class="text-inline grey"><a href="#/device?id=' + devData.device_id + '">' + "UUID:" + devData.uuid + '</a></div>' +
                    '</div>' +
                    '<div class="g-inline text-right grey">' +
                    '<div class="text-inline">' + $filter('chFilter')("timestamp") + "：" + $filter("unitFilter")(devData.timestamp, "timestamp") + '</div>' +
                    '<div class="text-inline">' + $filter('chFilter')("updated_at") + "：" + $filter("unitFilter")(devData.updated_at, "updated_at") + '</div>' +
                    '</div>' +
                    '</header>' +

                    '<div class="table">' +

                    '<div class="table-cell">' +
                    '<div>' + $filter('chFilter')("longitude") + "：" + $filter('unitFilter')(devData.latLng[1],"latitude") + '</div>' +
                    '<div>' + $filter('chFilter')("latitude") + "：" + $filter('unitFilter')(devData.latLng[0],"latitude") + '</div>' +
                    '<div>' + $filter('chFilter')("speed") + '：' + $filter('unitFilter')(devData.speed,"speed") + '</div>' +
                    '<div>' + $filter('chFilter')("altitude") + "：" + $filter('unitFilter')(devData.altitude,"altitude") + '</div>' +
                    '<div>' + $filter('chFilter')("battery_voltage") + '：' + $filter('unitFilter')(devData.battery_voltage,"battery_voltage") + '</div>' +
                    '</div>' +

                    '<div class="table-cell">' +
                    '<div>' + $filter('chFilter')("dimension") + '：' + $filter('unitFilter')(devData.dimension,"dimension") + '</div>' +
                    '<div>' + $filter('chFilter')("horizontal") + '：' + $filter('unitFilter')(devData.horizontal,"horizontal") + '</div>' +
                    '<div>' + $filter('chFilter')("vertical") + '：' + $filter('unitFilter')(devData.vertical,"vertical") + '</div>' +
                    '<div>' + $filter('chFilter')("course") + '：' + $filter('unitFilter')(devData.course,"course") + '</div>' +
                    '<div>' + $filter('chFilter')("used_star") + '：' + devData.used_star + '</div>' +
                    '</div>' +

                    '<div class="table-cell">' +
                    '<div>' + $filter('chFilter')("light") + '：' + $filter('unitFilter')(devData.light,"light") + '</div>' +
                    '<div>' + $filter('chFilter')("temperature") + "：" + $filter('unitFilter')(devData.temperature,"temperature") + '</div>' +
                    '<div>' + $filter('chFilter')("humidity") + "：" + $filter('unitFilter')(devData.humidity,"humidity") + '</div>' +
                    '<div>' + $filter('chFilter')("pressure") + '：' + $filter('unitFilter')(devData.pressure,"pressure") + '</div>' +
                    '<div>' + $filter('chFilter')("signal_strength") + '：' + $filter('unitFilter')(devData.signal_strength,"signal_strength") + '</div>' +
                    '</div>' +

                    '<div class="clear"></div>' +
                    '</div>' +
                    '</div>';
                return content;
            }

            /**
             * @description 添加一个设备（范围内）的gps点,(*默认显示集群，忽略目前地图集群显示方式)
             * @param array 地图标记点
             */
            function pushSMarkers(id,markers) {
                sMarkers[id] = markers;
                sMarkerCluster[id] = getCluster(markers);
            }

            /**
             * @description 存储地图默认数据
             * @param markers 地图默认显示markers
             */
            function setOMarkers(markers) {
                oMarkers = markers;
            }

            /**
             * @description 存储设备 gps信息 缩放方式
             * @param id 设备ID
             * @param bounds 缩放参数
             */
            function setRangeBounds(id,bounds) {
                sBounds[id] = bounds;
            }

            /**
             * @param array 设备ID 排序的 gps数据
             * @returns {Array}
             * @description 根据 设备ID 分类 GPS 信息
             */
            function resolveDevices(array) {
                var devices = new Array();//范围内搜索结果设备基本信息
                var devicesGPS = new Array();//范围内单个设备所有gps信息
                if(array.length){
                    angular.forEach(array, function (value,index) {
                        var thisID = value.device_id;
                        var thisMark = (value.mark === undefined) ? "" : value.mark;
                        var thisUUID = value.uuid;
                        var dLen = devices.length;

                        if(index === 0 || !devicesGPS[thisID]){
                            devices.push({
                                id: thisID,
                                mark: thisMark,
                                uuid: thisUUID,
                            });
                        }
                        !devicesGPS[thisID] && (devicesGPS[thisID] = new Array());
                        devicesGPS[thisID].push(value);
                    });
                    setRangeDevice(devices);
                    setRangeDeviceGps(devicesGPS);
                    $rootScope.$emit('searchRange',devices);//更新 map.ctrl 中搜索结果列表设备
                    angular.element('#mapSearch').addClass('open');
                }else{
                    // httpService.myAlert('info',$filter('chFilter')('useful_info_none'));
                }
                $rootScope.$emit('hideLoadingYellow');
            }

            /**
             * @description 存储搜索范围内的 gps设备
             * @param devices 搜索范围内的设备
             */
            function setRangeDevice(devices) {
                rangeDevice = devices;
            }

            /**
             * @description 存储搜索范围内的gps信息
             * @param array 设备ID 分类的 gps点{array}
             */
            function setRangeDeviceGps(array) {
                sDevicesGPS = array;
            }

            /**
             * @description 获取搜索结果中的设备
             * @param id 设备ID
             * @returns {*} 设备 GPS信息
             */
            function getRangeDeviceGps(id) {
                return sDevicesGPS[id];
            }

            /**
             * @description 清除在地图上的单个设备
             * @param id 设备ID
             */
            function removeDevice(id) {
                if(sMarkers[id]){
                    for(var i=0;i<sMarkers[id].length;i++){
                        sMarkers[id][i].setMap(null);
                    }
                    sMarkerCluster[id] && sMarkerCluster[id].clearMarkers();
                    sPoly[id] && sPoly[id].setMap(null);

                    for(var i=0;i<sMarkers.length;i++)
                    {
                        var keyTemp1 = sMarkers[i].key;
                        if(keyTemp1===id)
                        {
                            sMarkers.splice(i,1);
                        }
                    }
                    for(var i=0;i<sMarkerCluster.length;i++)
                    {
                        var keyTemp2 = sMarkerCluster[i].key;
                        if(keyTemp2===id)
                        {
                            sMarkerCluster.splice(i,1);
                        }
                    }
                    for(var i=0;i<sPoly.length;i++)
                    {
                        var keyTemp3 = sPoly[i].key;
                        if(keyTemp3===id)
                        {
                            sPoly.splice(i,1);
                        }
                    }
                    for(var i=0;i<sBounds.length;i++)
                    {
                        var keyTemp4 = sBounds[i].key;
                        if(keyTemp4===id)
                        {
                            sBounds.splice(i,1);
                        }
                    }
                }
                $rootScope.$emit('hideLoadingYellow','test');
            }

            /**
             * @description 清空地图中正在对比的设备
             * @param array [id,id,...]
             */
            function clearDevice() {
                angular.forEach(activeDevice,function (value) {
                    removeDevice(value);
                });
                $rootScope.$emit('hideLoadingYellow','clear device');
            }

            /**
             * @description 限制对比设备数量，绘制或清除设备
             * @param id
             * @returns {*}
             */
            function judgeDevice(id) {
                var _activeDevice = activeDevice;
                var _exits = _activeDevice && _activeDevice.indexOf(id);
                if(parseInt(_exits) >= 0){
                    activeDevice.splice(_exits,1);
                    removeDevice(id);
                    return false;
                }else{
                    if(_activeDevice && _activeDevice.length >= deviceLimit){
                        httpService.myAlert('info',$filter("chFilter")("exceed_map_device_compare","tips",deviceLimit));
                        $rootScope.$emit('hideLoadingYellow');
                        return false;
                    }else{
                        !activeDevice && (activeDevice = new Array());
                        activeDevice.push(id);
                    }
                }
                return activeDevice;
            }

            /**
             * @description 重新加载所有marker - 无cluster
             */
            function reloadMap() {
                if(oMarkers){
                    for(var i=0; i<oMarkers.length; i++){
                        oMarkers[i].setMap(map);
                    };
                }
                if(activeDevice){
                    for(var i=0;i<activeDevice.length;i++) {
                        var id = activeDevice[i];
                        for(var j=0; j<sMarkers[id].length; j++){
                            sMarkers[id][j].setMap(map);
                        };
                    }
                }
                $rootScope.$emit('hideLoadingYellow','toggle cluster');
            }

            /**
             * 限制搜索结果列表框高度 - 自适应
             */
            function autoListDivHeight() {
                var searchDiv = angular.element("#mapSearch");
                var searchList= document.getElementById("searchList");
                var map= document.getElementById("map");
                if(searchDiv.hasClass('open')){
                    var totalHeight = searchList.clientHeight;
                    var mapHeight = map.clientHeight;
                    if((totalHeight+54+27) >= mapHeight){
                        searchDiv.addClass('over-height');
                    }else{
                        searchDiv.removeClass('over-height');
                    }
                }
            }

            /**
             * 格式化围栏 - 圆
             * @param circle
             * @param origin
             * @returns {{}}
             */
            function formatFenceCircle(circle) {
                var fixedCenter;
                var path = {};
                var centerStr = JSON.stringify(circle.center);
                var _center = JSON.parse(centerStr);
                fixedCenter = removeLatLngOffset(_center.lat,_center.lng);
                path.center = fixedCenter;
                path.radius = parseInt(circle.radius);
                var maxR = Math.round(Math.sqrt(maxFenceArea/Math.PI));
                if(path.radius > maxR){
                    limitCircleRadius(path.radius);
                    path.radius = maxR;
                }
                // console.log(path,"format");
                return path;
            }

            /**
             * 格式化围栏 - 矩形
             * @param rectangle
             * @param origin
             * @returns {*}
             */
            function formatFenceRectangle(rectangle) {
                var ne = rectangle.getBounds().getNorthEast();
                var sw = rectangle.getBounds().getSouthWest();
                var north = ne.lat();
                var east = ne.lng();
                var south = sw.lat();
                var west = sw.lng();
                rectangle = {
                    northWest: removeLatLngOffset(north,west),
                    // northEast: removeLatLngOffset(north,east),
                    // southWest: removeLatLngOffset(south,west),
                    southEast: removeLatLngOffset(south,east),
                };
                // console.log(getRectangleArea(ne.lat,sw.lat,sw.lng,ne.lng));
                // limitFenceRectangle();
                // console.log(JSON.stringify(rectangle),"rectangle format");
                return rectangle;
            }
            /**
             * 绘制矩形围栏
             * @param bounds
             * @returns {*}
             */
            function drawRectangle(bounds) {
                var nw = addLatLngOffset(bounds[0].lat,bounds[0].lng);
                var se = addLatLngOffset(bounds[3].lat,bounds[3].lng);
                var _bounds = {
                    north: nw.lat,
                    south: se.lat,
                    east: se.lng,
                    west: nw.lng
                };
                if(map){
                    var options = new Drawing('fence','default').style;//fenceOptions;
                    // options.fillColor = fenceColor.default;
                    // options.strokeColor = fenceColor.default;
                    options.map = map;
                    options.bounds = _bounds;
                    var b = limitFenceRectangle(bounds);
                    (b) && (options.bounds = b);
                    return new google.maps.Rectangle(options);
                }
            }
            /**
             * 绘制圆形围栏
             * @param circle
             * @returns {*}
             */
            function drawCircle(circle) {
                var center = addLatLngOffset(circle.point.lat,circle.point.lng);
                var radius = circle.distance;
                if(map){
                    var options = new Drawing('fence','default').style;//fenceOptions;
                    // options.fillColor = fenceColor.default;
                    // options.strokeColor = fenceColor.default;
                    options.map = map;
                    options.center = center;
                    options.radius = radius;
                    return new google.maps.Circle(options);
                }
            }

            /**
             * 绘制围栏
             * @param fences
             */
            function drawAreas(fences) {
                var state = $state.current.name;
                var isEditState = (state === "fence.edit");
                var isAddState = (state === "fence.add");
                var drawing = new Drawing('fence');
                initFence();
                for(var i=0;i<fences.length;i++){
                    var fence = fences[i];
                    var type = fence.type;
                    // console.log(map.center.toString(),"map center");
                    var tmp,mapBounds;
                    if(type){
                        type = type.toLowerCase();
                        if(type === "polygon"){
                            var bounds = fence.polygon.points;
                            tmp = drawRectangle(bounds);
                        }else if(type === "round"){
                            var circle = fence;
                            tmp = drawCircle(circle);
                        }
                        mapBounds = tmp.getBounds();
                        if(isEditState){
                            selectedShape = tmp;
                            fenceBounds = mapBounds;
                        }
                        // // (i !== 0) && mapBounds.extend(map.center);
                        if(mapBounds){
                            map.fitBounds(mapBounds);      // # auto-zoom
                            map.panToBounds(mapBounds);    // # auto-center
                        }
                        geoFences[fence.id] = tmp;
                    }
                };
                if(isAddState){
                    // drawingManager.setOptions({
                    //     drawingControl: true
                    // });
                    drawing.showTool();
                    // fenceDrawingManager.setOptions({
                    //     drawingControl: true
                    // });
                }else{
                    // console.log('is edit fence');
                    // drawingManager.setOptions({
                    //     drawingControl: false
                    // });
                    drawing.hideTool();
                    // fenceDrawingManager.setOptions({
                    //     drawingControl: false
                    // });
                    if(isEditState){
                        var _editFence = fences[0];
                        // showFenceDevice(_editFence.id);
                        selectedShape.setEditable(true);
                        var type = _editFence.type;
                        if(type){
                            type = type.toLowerCase();
                            if(type === "polygon"){
                                google.maps.event.addListener(selectedShape,'bounds_changed', function (event) {
                                    // console.log(selectedShape.getBounds(),"bounds_changed");
                                    var fencePath = {
                                        rectangle: formatFenceRectangle(selectedShape),
                                        acreage: getAcreage(selectedShape,"rectangle")
                                    };
                                    $rootScope.$emit('newFenceRectangle',fencePath);
                                });
                            }else if(type === "round"){
                                // 修改半径
                                google.maps.event.addListener(selectedShape, 'radius_changed', function(event) {
                                    // console.log(selectedShape,"radius_changed");
                                    var fencePath = {
                                        circle: formatFenceCircle(selectedShape),
                                        acreage: getAcreage(selectedShape,"circle")
                                    };
                                    $rootScope.$emit('newFenceCircle',fencePath);
                                });

                                // 修改圆心
                                google.maps.event.addListener(selectedShape, 'center_changed', function(event) {
                                    // console.log(selectedShape.getCenter(),'center_changed');
                                    var fencePath = {
                                        circle: formatFenceCircle(selectedShape),
                                        acreage: getAcreage(selectedShape,"circle")
                                    };
                                    $rootScope.$emit('newFenceCircle',fencePath);
                                });
                            }
                            $rootScope.$on('editFenceRadius',function (event,args) {
                                limitCircleRadius(args.radius);
                            });
                            // 修改圆形 圆心 - （此处应加偏）
                            $rootScope.$on('editFenceCenter',function (event,args) {
                                // console.log(args);
                                var circle = args;
                                var _center = validLatLng(circle.center.lat,circle.center.lng);
                                // console.log(_center,"if center valid");
                                if(_center){
                                    var center = addLatLngOffset(_center.lat,_center.lng);
                                    selectedShape.setCenter(center);
                                    refreshBounds();
                                }
                            });
                            // 修改矩形 - （此处应加偏）
                            $rootScope.$on('editFenceBounds',function (event,args) {
                                var nw = args.northWest;
                                var se = args.southEast;
                                nw = addLatLngOffset(nw.lat,nw.lng);
                                se = addLatLngOffset(se.lat,se.lng);
                                if(nw && se){
                                    var bounds = {
                                        north: nw.lat,
                                        south: se.lat,
                                        east: se.lng,
                                        west: nw.lng
                                    };
                                    // console.log(bounds);
                                    selectedShape.setBounds(bounds);
                                    refreshBounds();
                                }
                            });
                        }
                    }
                }
                // setTimeout(function () {
                //     setZoomToFence();
                // },1000);
            }
            
            function setZoomToFence() {
                map.fitBounds(fenceBounds);
                map.panToBounds(fenceBounds);
            }

            function showFenceDevice(fence) {
                initFence();
                fenceService.getFenceDevice(fence[0].id,function (data) {
                    drawOnMap(data,false,true);
                    $timeout(function () {
                        drawAreas(fence);
                    },0);
                });
            }

            /**
             * 限制圆形围栏面积
             * @param radius
             */
            function limitCircleRadius(radius) {
                var r = parseInt(radius);
                var maxR = Math.round(Math.sqrt(maxFenceArea/Math.PI));
                if(r > 0){
                    if(r > maxR){
                        r = maxR;
                        httpService.myAlert("info",circleExceedTips);
                    }else{
                        selectedShape.setRadius(r);
                        refreshBounds();
                    }
                }
            }
            /**
             * 限制矩形围栏面积
             * @param radius
             */
            function limitFenceRectangle(points) {
                if(points){
                    var ne = new google.maps.LatLng(points[1].lat,points[1].lng);
                    var sw = new google.maps.LatLng(points[2].lat,points[2].lng);
                    var nw = new google.maps.LatLng(points[0].lat,points[0].lng);
                    var se = new google.maps.LatLng(points[3].lat,points[3].lng);
                }else{
                    var shape = selectedShape.getBounds();
                    var rectangle = JSON.stringify(shape);
                    rectangle = JSON.parse(rectangle);
                    var ne = shape.getNorthEast();
                    var sw = shape.getSouthWest();
                    var nw = new google.maps.LatLng(rectangle.north,rectangle.west);
                    var se = new google.maps.LatLng(rectangle.south,rectangle.east);
                }
                var w1 = google.maps.geometry.spherical.computeDistanceBetween(ne, nw);
                var h1 = google.maps.geometry.spherical.computeDistanceBetween(ne, se);
                var area = Math.round(w1*h1);
                var bounds;
                // console.log(area,"rec area");
                if(area > maxFenceArea){
                    // 航向
                    // 东北-西南
                    // var headingNEtoSW = google.maps.geometry.spherical.computeHeading(ne, sw);
                    // // 西南-东北
                    // var headingSWtoNE = google.maps.geometry.spherical.computeHeading(sw, ne);
                    // // 矩形对角线/2 - 长度
                    // var radius = google.maps.geometry.spherical.computeDistanceBetween(ne, sw)/2;
                    // // 矩形中心
                    // var center = google.maps.geometry.spherical.computeOffset(ne, radius, headingNEtoSW);
                    // // 最大面积对应宽和高
                    // var w2 = Math.sqrt(maxFenceArea*(w1/h1));
                    // var h2 = Math.sqrt(maxFenceArea*(h1/w1));
                    // // 最大面积矩形对应 - 矩形对角线/2 - 长度
                    // var radius2 = Math.sqrt(w2*w2 + h2*h2);
                    // var ne2 = google.maps.geometry.spherical.computeOffset(center, radius2, headingSWtoNE);
                    // var sw2 = google.maps.geometry.spherical.computeOffset(center, radius2, headingNEtoSW);
                    // ne2 = JSON.stringify(ne2);
                    // ne2 = JSON.parse(ne2);
                    // sw2 = JSON.stringify(sw2);
                    // sw2 = JSON.parse(sw2);
                    // bounds = {
                    //     north: ne2.lat,
                    //     east: ne2.lng,
                    //     south: sw2.lat,
                    //     west: sw2.lng
                    // };
                    // console.log(rectangle,radius,"test rec area");
                    // console.log(headingNEtoSW,headingSWtoNE,"heading");
                    // console.log(radius2,"radius2");
                    // console.log(ne2,sw2,"ne2,sw2");
                    // console.log(w2,h2,w2*h2,w2*h2>maxFenceArea,"area");
                    // console.log(center.toString(),"center");

                    // selectedShape.setBounds(bounds);
                    httpService.myAlert("info",rectangleExceedTips);
                }
                return bounds;
            }

            /**
             * 计算圆面积
             * @param radius
             * @returns {number}
             */
            function getCircleArea(radius) {
                var area = radius * radius * Math.PI;
                // if(area > maxFenceArea){
                //     area = maxFenceArea;
                // }
                return area;
            }

            /**
             * 计算矩形面积
             * @param north
             * @param south
             * @param west
             * @param east
             * @returns {number}
             */
            function getRectangleArea(north,south,west,east) {
                var ne = {
                    lat: north,
                    lng: east
                };
                var nw = {
                    lat: north,
                    lng: west
                };
                var se = {
                    lat: south,
                    lng: east
                };
                // console.log(ne,nw,se,"format area");
                var width = google.maps.geometry.spherical.computeDistanceBetween(ne,nw);
                var height = google.maps.geometry.spherical.computeDistanceBetween(ne,se);
                var area = Math.round(width*height);
                // console.log(area,area > maxFenceArea);
                if(area > maxFenceArea){
                    // area = maxFenceArea;
                    httpService.myAlert("info",rectangleExceedTips);
                }
                return area;
            }

            /**
             * 判断围栏类型，计算其面积
             * @param shape
             * @param type
             * @returns {Number}
             */
            function getAcreage(shape,type) {
                var _shape = shape;
                var acreage = _shape;
                if(type === "circle"){
                    acreage = getCircleArea(_shape.radius);
                }else if(type === "rectangle"){
                    var ne = _shape.northEast ? _shape.northEast : _shape.getBounds().getNorthEast();
                    var sw = _shape.southWest ? _shape.southWest : _shape.getBounds().getSouthWest();
                    var north = ne.lat;
                    var south = sw.lat;
                    var west = sw.lng;
                    var east = ne.lng;
                    acreage = getRectangleArea(north,south,west,east);
                }
                // console.log(acreage,type,"面积");
                return parseInt(acreage);
            }

            /**
             * 编辑图形后自动缩放地图
             */
            function refreshBounds() {
                var bounds = selectedShape.getBounds();
                map.fitBounds(bounds);      // # auto-zoom
                map.panToBounds(bounds);    // # auto-center
            }

            function getMaxFenceArea() {
                // 单位： m²
                return Math.round(maxFenceArea);
            }
            // 距离测量
            function initMeasureDistance() {
                var infoWindow = new InfoWindow();
                // 右键菜单
                map.addListener('rightclick', function(event) {
                    if(measurePath){
                        delMeasureMenu.show(event.latLng);
                    }else{
                        measureMenu.show(event.latLng);
                    }
                });
                // 自定义范围，右键事件
                var measureMenu = new ContextMenu(map, new MenuAction().measureDistance);//getMenuOptions(0)
                var delMeasureMenu = new ContextMenu(map, new MenuAction().delMeasureDistance);
                google.maps.event.addListener(measureMenu, 'menu_item_selected', function(latLng, eventName){
                    switch(eventName){
                        case 'measure_distance'://距离计算
                            drawDistance(latLng);
                            break;
                    }
                });
                google.maps.event.addListener(delMeasureMenu, 'menu_item_selected', function(latLng, eventName){
                    switch(eventName){
                        case 'quit_distance_menu'://退出计算
                            // console.log('退出计算',measurePath);
                            infoWindow.closeMeasureDistance();
                            break;
                    }
                });
                /**
                 * 绘制路径
                 * 默认自动生成一小段路径，每次编辑后自动测算距离
                 * @param latLng
                 */
                function drawDistance(latLng) {
                    // console.log(latLng);
                    var point = latLng;
                    var zoom = map.getZoom();
                    var point2 = {
                        lat: point.lat() + Math.random()/(zoom*zoom/2),
                        lng: point.lng() + Math.random()/(zoom*zoom/4)
                    }; //随机点
                    var flightPlanCoordinates = [
                        point,
                        point2
                    ];
                    measurePath = new google.maps.Polyline({
                        path: flightPlanCoordinates,
                        geodesic: true,
                        strokeColor: '#000000',
                        strokeOpacity: 1.0,
                        strokeWeight: 3,
                        editable: true
                    });
                    getPath();
                    google.maps.event.addListener(measurePath, "dragend", getPath);
                    google.maps.event.addListener(measurePath.getPath(), "insert_at", getPath);
                    google.maps.event.addListener(measurePath.getPath(), "remove_at", getPath);
                    google.maps.event.addListener(measurePath.getPath(), "set_at", getPath);

                    function getPath() {
                        var path = measurePath.getPath();
                        var distance = google.maps.geometry.spherical.computeLength(path);
                        // var len = path.getLength();
                        // var coordStr = "";
                        // for (var i = 0; i < len; i++) {
                        //     coordStr += path.getAt(i).toUrlValue(6) + "<br>";
                        // }
                        infoWindow.measureDistance(distance);
                    }
                    measurePath.setMap(map);
                }
            }
            // 距离测量 - 结果展示窗口
            function InfoWindow(note) {
                this.note = note;
                this.infoDiv = null;
                this.infoWindow = null;
            }
            InfoWindow.prototype = {
                constructor: InfoWindow,
                measureDistance: function (note) {
                    this.note = note;
                    var _this = this;
                    var closeBtn = document.createElement('div');
                    closeBtn.id = 'distanceCloseBtn';
                    closeBtn.className = "dd dd-close-thin";
                    closeBtn.style.marginLeft = '10px';
                    this.infoDiv = document.getElementById("distanceNote");
                    if(!this.infoDiv){
                        this.infoDiv = document.createElement('div');
                        this.infoDiv.id = 'distanceNote';
                        this.infoDiv.style.backgroundColor = "#fff";
                        this.infoDiv.style.border = "1px solid #666";
                        this.infoDiv.style.padding = "5px 10px";
                        this.infoDiv.style.borderRadius = "3px";
                        this.infoDiv.style.marginBottom = '20px';
                        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.infoDiv);
                    }
                    this.infoDiv.innerHTML = $filter("unitFilter")(this.note,"distance");
                    if(!document.getElementById("distanceCloseBtn")){
                        this.infoDiv.appendChild(closeBtn);
                        closeBtn.addEventListener('click', function() {
                            _this.closeMeasureDistance();
                        });
                    }
                },
                closeMeasureDistance: function () {
                    measurePath.setMap(null);
                    measurePath = null;
                    this.infoDiv.remove();
                },
            }
            return {
                /**
                 * @description 添加地图js到document
                 */
                loadMap: function () {
                    loadMap();
                },
                // 清除搜索结果 - 并更新视图
                clearSMarkers: function () {
                    clearDevice();
                    sMarkers = {};
                    sPoly = {};
                    sMarkerCluster = {};
                    sBounds = {};

                    if(oBounds){
                        map.fitBounds(oBounds);      // # auto-zoom
                        map.panToBounds(oBounds);    // # auto-center
                    }
                },
                // 显示／隐藏 marker-cluster
                toggleMarkerCluster: function () {
                    $rootScope.$emit('showLoadingYellow','toggle cluster');
                    if(checkCluster(oMarkerCluster)){
                        oMarkers && oMarkerCluster.clearMarkers();
                        if(activeDevice){
                            for(var i=0;i<activeDevice.length;i++)
                            {
                                var id = activeDevice[i];
                                sMarkerCluster[id].clearMarkers();
                            }
                        }
                        reloadMap();
                    }else{
                        oMarkerCluster = getCluster(oMarkers);
                        if(activeDevice){
                            for(var i=0;i<activeDevice.length;i++)
                            {
                                var _id = activeDevice[i];
                                (!checkCluster(sMarkerCluster[_id])) && (sMarkerCluster[_id] = getCluster(sMarkers[_id]));
                            }
                        }
                        setTimeout(function(){
                            $rootScope.$emit('hideLoadingYellow','toggle cluster');
                        },100);
                    }
                },
                // 删除选择的搜索范围框
                deleteSHape: function () {
                    if (selectedShape) {
                        selectedShape.setMap(null);
                        drawingManager.setOptions({
                            drawingControl: true
                        });
                    }
                },
                /**
                 * @description 根据 设备ID 展示所有有效 gps点
                 * @param id 设备ID
                 */
                showDevice: function (id,last,callback) {
                    var _activeDevice = judgeDevice(id);
                    if(_activeDevice){
                        var header = {
                            sort: "timestamps",
                            last: last
                        };
                        deviceService.getDeviceGps(id,header,function (data) {
                            drawOnMap(data,true,true);
                        });
                        callback(_activeDevice);
                    }
                },
                /**
                 * @description 显示搜索范围内设备的所有gps点
                 * @param id 设备ID
                 */
                showRangeDevice: function (id,callback) {
                    $rootScope.$emit('showLoadingYellow','range device');
                    var _mapArray = getRangeDeviceGps(id);
                    var _activeDevice = judgeDevice(id);
                    if(_activeDevice){
                        drawOnMap(_mapArray,true,true);
                        callback(_activeDevice);
                    }
                },
                clearShowingDevice: function () {
                    angular.forEach(activeDevice,function (value) {
                        removeDevice(value);
                    });
                    activeDevice = [];
                },
                /**
                 * 清空搜索结果
                 */
                clearSearch:function () {
                    $rootScope.$emit('showLoadingYellow','clear device');
                    clearDevice();
                    this.deleteSHape();
                    map.fitBounds(oBounds);      // # auto-zoom
                    map.panToBounds(oBounds);    // # auto-center
                    $rootScope.$emit('searchRange',null);//更新 map.ctrl 中搜索结果列表设备
                },
                /**
                 * 列表竖向高度不足以铺满时，自适应高度；高度超过时，滚动条控制。
                 */
                autoListDivHeight: function () {
                    autoListDivHeight();
                },
                // 根据服务器返回围栏数据计算围栏面积
                getShapeAcreage: function (array) {
                    var fence = array;
                    var shape = {};
                    var type;
                    if(fence.type.toLowerCase() === "round"){
                        shape.center = fence.point;
                        shape.radius = fence.distance;
                        type = "circle";
                    }else if(fence.type.toLowerCase() === "polygon"){
                        var ne = fence.polygon.points[1];
                        var sw = fence.polygon.points[2];
                        shape.northEast = new google.maps.LatLng(ne.lat, ne.lng);
                        shape.southWest = new google.maps.LatLng(sw.lat, sw.lng);
                        type = "rectangle";
                    }
                    return getAcreage(shape,type);
                },
                // 绘制地图
                initMap: function(mapArray, polyLine) {
                    var thisFactory = this;
                    if(!google.maps){//无效
                        loadMap(curLang);
                        setTimeout(init,0);
                    }else{
                        setTimeout(init,0);
                    }
                    function init() {
                        initMarkerMap();
                        // thisFactory.init(mapArray, polyLine);
                        mapDiv = angular.element('#map')[0];

                        var _gpsArray = mapArray;

                        center = {
                            lat: 0,
                            lng: 0
                        }; //地图中心点

                        /**
                         * ROADMAP (normal, default 2D map)
                         * SATELLITE (photographic map)
                         * HYBRID (photographic map + roads and city names)
                         * TERRAIN (map with mountains, rivers, etc.)
                         * @type {any}
                         */
                        map = new google.maps.Map(mapDiv, {
                            // center: center,
                            zoom: 15,
                            scaleControl: true,
                            zoomControl: true,
                            zoomControlOptions: {
                                position: google.maps.ControlPosition.RIGHT_BOTTOM,
                            },
                            streetViewControl: false,
                            mapTypeId: google.maps.MapTypeId.HYBRID,
                            mapTypeControlOptions: {
                                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,//DROPDOWN_MENU,HORIZONTAL_BAR
                                position: google.maps.ControlPosition.LEFT_BOTTOM,
                            },
                        });
                        thisFactory.clearSMarkers();

                        drawingManager.setMap(map);
                        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
                            if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                                var radius = event.overlay.getRadius();
                                searchRadius = radius;
                                searchArray = new Array();
                            }
                        });
                        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
                            if (e.type !== google.maps.drawing.OverlayType.MARKER) {
                                // Switch back to non-drawing mode after drawing a shape.
                                drawingManager.setDrawingMode(null);
                                // To hide:
                                drawingManager.setOptions({
                                    drawingControl: false
                                });
                                // Add an event listener that selects the newly-drawn shape when the user
                                // mouses down on it.
                                var newShape = e.overlay;
                                newShape.type = e.type;
                                google.maps.event.addListener(newShape, 'click', function(event) {
                                    setSelection(newShape);
                                });
                                google.maps.event.addListener(newShape, 'rightclick', function(event) {
                                    shapeMenu.show(event.latLng);
                                    setSelection(newShape);
                                    searchRadius = newShape.radius;
                                    setsearchArray(e, newShape.center, newShape.radius);
                                });
                                setSelection(newShape);
                            }
                        });
                        google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
                            var polygonArray = getPolygonArray(polygon.getPath());
                            setsearchArray(polygon,polygonArray);
                            google.maps.event.addListener(polygon, 'rightclick', function(event) {
                                var polygonArray = getPolygonArray(polygon.getPath());
                                setsearchArray(polygon,polygonArray);
                            });
                        });

                        // 取消选择形状
                        function clearSelection() {
                            if (selectedShape) {
                                selectedShape.setEditable(false);
                                selectedShape = null;
                            }
                        }
                        // 选中形状
                        function setSelection(shape) {
                            clearSelection();
                            selectedShape = shape;
                            shape.setEditable(true);
                            // selectColor(shape.get('fillColor') || shape.get('strokeColor'));
                        }
                        // 删除选中形状
                        function deleteSelectedShape() {
                            if (selectedShape) {
                                selectedShape.setMap(null);
                                thisFactory.clearSMarkers();
                                $rootScope.$emit('searchRange',null);//更新 map.ctrl 中搜索结果列表设备
                                angular.element('#mapSearch').removeClass();
                                // google.maps.event.trigger(map, 'resize');
                            }
                            // To show:
                            drawingManager.setOptions({
                                drawingControl: true
                            });
                        }

                        // 自定义范围，右键事件
                        var shapeMenu = new ContextMenu(map, new MenuAction().searchRange);//getShapeMenuOptions()
                        google.maps.event.addListener(shapeMenu, 'menu_item_selected', function(latLng, eventName){
                            switch(eventName){
                                case 'shape_click':
                                    deleteSelectedShape();
                                    break;
                                case 'shape_search_click':
                                    $rootScope.$emit('showLoadingYellow');
                                    searchMap(searchArray).then(function (response) {
                                        var resData = response.data;

                                        resolveDevices(resData);

                                        // formatData(resData);
                                        //
                                        // thisFactory.checkDevice(resData);
                                        // thisFactory.showRangeDevice(rangeDevice[0].id);


                                        // thisFactory.pushDevices(devices);//显示全部device
                                    },function (response) {
                                        httpService.error(response);
                                        $rootScope.$emit('hideLoadingYellow');
                                    });
                                    shapeMenu.hide();
                                    break;
                            }
                        });
                        if(_gpsArray.length > 0){
                            drawOnMap(_gpsArray,polyLine);
                            // var legend = document.getElementById('test');
                            // map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
                        }else{
                            // httpService.myAlert('danger',$filter('chFilter')('useful_info_none'));
                        }
                        initMeasureDistance();
                    }
                },
                initFence: function (array) {
                    var thisFactory = this;
                    var state = $state.current.name;
                    var _gpsArray = array;
                    var drawing = new Drawing('fence');
                    mapDiv = angular.element('#map')[0];
                    var druidChengDu = {lat: 30.5557502, lng: 104.06571};
                    center = druidChengDu;
                    /**
                     * ROADMAP (normal, default 2D map)
                     * SATELLITE (photographic map)
                     * HYBRID (photographic map + roads and city names)
                     * TERRAIN (map with mountains, rivers, etc.)
                     * @type {any}
                     */
                    map = new google.maps.Map(mapDiv, {
                        center: center,
                        zoom: 15,
                        scaleControl: true,
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            position: google.maps.ControlPosition.LEFT_BOTTOM,
                        },
                    });
                    //控制地图的缩放级别
                    // google.maps.event.addListener(map, 'zoom_changed',function() {
                    //     console.log(map.getZoom());
                    //     // if (map.getZoom() > MaxZoomLevel) map.setZoom(MaxZoomLevel);
                    // });
                    // Try HTML5 geolocation.
                    if (navigator.geolocation && ((state === "fence.add") || (state === "fence.device"))) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var tmp = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            map.setCenter(tmp);
                        });
                    }
                    setTimeout(function () {
                        // fenceDrawingManager.setMap(map);
                        drawingManager.setMap(map);
                        /**
                         * overlayType: CIRCLE
                         * listening: radius_changed, center_changed
                         */
                        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
                            var newShape = e.overlay;

                            setSelection(newShape);
                            google.maps.event.addListener(newShape, 'rightclick', function(event) {
                                shapeMenu.show(event.latLng);
                                setSelection(newShape);
                                searchRadius = newShape.radius;
                                setsearchArray(e, newShape.center, newShape.radius);
                            });

                            //fenceDrawingManager
                            // drawingManager.setDrawingMode(null);
                            // // To hide:
                            // drawingManager.setOptions({
                            //     drawingControl: false
                            // });
                            drawing.hideTool();

                            if (e.type === google.maps.drawing.OverlayType.CIRCLE) {
                                // console.log(e.type);

                                searchRadius = newShape.radius;
                                searchArray = new Array();

                                var fencePath = {
                                    circle: formatFenceCircle(e.overlay),
                                    acreage: getAcreage(e.overlay,e.type)
                                };

                                $rootScope.$emit('newFenceCircle',fencePath);
                            }else{
                                newShape.type = e.type;
                                google.maps.event.addListener(newShape, 'click', function(event) {
                                    setSelection(newShape);
                                });

                                setSelection(newShape);
                            }

                            // 修改半径
                            google.maps.event.addListener(newShape, 'radius_changed', function(event) {
                                // console.log(newShape.getRadius(),"radius_changed");
                                var fencePath = {
                                    circle: formatFenceCircle(e.overlay),
                                    acreage: getAcreage(e.overlay,e.type)
                                };
                                $rootScope.$emit('newFenceCircle',fencePath);
                            });

                            // 修改圆心 - （此处应去偏）
                            google.maps.event.addListener(newShape, 'center_changed', function(event) {
                                // console.log(newShape.getCenter(),'center_changed');
                                var fencePath = {
                                    circle: formatFenceCircle(e.overlay),
                                    acreage: getAcreage(e.overlay,e.type)
                                };
                                $rootScope.$emit('newFenceCircle',fencePath);
                            });

                        });
                        /**
                         * overlayType: RECTANGLE
                         * listening: bounds_changed
                         */
                        google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(e) {
                            // console.log(e.type);
                            if (e.type === google.maps.drawing.OverlayType.RECTANGLE) {
                                // fenceDrawingManager.setDrawingMode(null);
                                // fenceDrawingManager.setOptions({
                                //     drawingControl: false
                                // });
                                drawingManager.setDrawingMode(null);
                                drawingManager.setOptions({
                                    drawingControl: false
                                });
                            }

                            var fencePath = {
                                "rectangle": formatFenceRectangle(e),
                                acreage: getAcreage(e,e.type)
                            };
                            // console.log(fencePath);
                            $rootScope.$emit('newFenceRectangle',fencePath);

                            // 修改矩形（图） - （此处应去偏）
                            google.maps.event.addListener(e,'bounds_changed', function (event) {
                                // console.log(e.getBounds(),"bounds");
                                var fencePath = {
                                    rectangle: formatFenceRectangle(e),
                                    acreage: getAcreage(e,e.type)
                                };
                                $rootScope.$emit('newFenceRectangle',fencePath);
                            });
                        });
                    },0);
                    // 修改圆形 半径
                    $rootScope.$on('editFenceRadius',function (event,args) {
                        limitCircleRadius(args.radius);
                        // var circle = args;
                        // var radius = parseInt(circle.radius);
                        // if(radius > 0){
                        //     selectedShape.setRadius(radius);
                        //     refreshBounds();
                        // }
                    });
                    // 修改圆形 圆心 - （此处应加偏）
                    $rootScope.$on('editFenceCenter',function (event,args) {
                        // console.log(args);
                        var circle = args;
                        var _center = latlngValid(circle.center.lat,circle.center.lng);
                        if(_center){
                            var center = addLatLngOffset(_center[0],_center[1]);
                            selectedShape.setCenter(center);
                            refreshBounds();
                        }
                    });
                    // 修改矩形 - （此处应加偏）
                    $rootScope.$on('editFenceBounds',function (event,args) {
                        // console.log("editFenceBounds");
                        var nw = args.northWest;
                        var se = args.southEast;
                        nw = addLatLngOffset(nw.lat,nw.lng);
                        se = addLatLngOffset(se.lat,se.lng);
                        if(nw && se){
                            var bounds = {
                                north: nw.lat,
                                south: se.lat,
                                east: se.lng,
                                west: nw.lng
                            };
                            // console.log(bounds);
                            selectedShape.setBounds(bounds);
                            refreshBounds();
                        }
                    });

                    // 取消选择形状
                    function clearSelection() {
                        if (selectedShape) {
                            selectedShape.setEditable(false);
                            selectedShape = null;
                        }
                    }
                    // 选中形状
                    function setSelection(shape) {
                        clearSelection();
                        selectedShape = shape;
                        shape.setEditable(true);
                        // selectColor(shape.get('fillColor') || shape.get('strokeColor'));
                    }
                    // 删除选中形状
                    function deleteSelectedShape() {
                        if (selectedShape) {
                            selectedShape.setMap(null);
                            thisFactory.clearSMarkers();
                            $rootScope.$emit('searchRange',null);//更新 map.ctrl 中搜索结果列表设备
                            angular.element('#mapSearch').removeClass();
                            // google.maps.event.trigger(map, 'resize');
                        }
                        // To show:
                        // fenceDrawingManager.setOptions({
                        //     drawingControl: true
                        // });
                        drawingManager.setOptions({
                            drawingControl: true
                        });
                    }

                    // 自定义范围，右键事件
                    var shapeMenu = new ContextMenu(map, new MenuAction().fence);//getFenceMenuOptions()
                    google.maps.event.addListener(shapeMenu, 'menu_item_selected', function(latLng, eventName){
                        switch(eventName){
                            case 'fence_click':
                                deleteSelectedShape();
                                break;
                        }
                    });
                    if(state === "fence.edit") {
                        showFenceDevice(_gpsArray);
                    } else{
                        drawAreas(_gpsArray);
                    }
                    initMeasureDistance();
                },
                drawAreas: function (array) {
                    // initFence();
                    drawAreas(array);
                },
                highLightFence: function (id) {
                    var fence = geoFences[id];
                    // console.log(map.center.toString(),"map center");
                    var bounds = fence.getBounds();
                    map.fitBounds(bounds);      // # auto-zoom
                    map.panToBounds(bounds);    // # auto-center
                    var colors = new Drawing('fence').color;
                    angular.forEach(geoFences,function (value,key) {
                        value.setOptions({strokeColor: colors.default,fillColor: colors.default,strokeWeight: 2});
                    });
                    fence.setOptions({strokeColor: colors.highLight,fillColor: colors.highLight,strokeWeight: 3});
                    // marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);//polygon no setZIndex function
                },
                // 格式化矩形围栏地理位置为服务器所需格式
                formatPolygonRequestArray: function (north_west,south_east) {
                    var data = [];
                    var nw = north_west;
                    var se = south_east;
                    nw = validLatLng(nw.lat,nw.lng);
                    se = validLatLng(se.lat,se.lng);
                    var bounds = selectedShape.getBounds();
                    var north,south,west,east;
                    var lat = [];
                    var lng =[];
                    if(nw && se){//已去偏
                        north = nw.lat;
                        south = se.lat;
                        west = nw.lng;
                        east = se.lng;
                    }else if(bounds){//未去偏
                        var ne = bounds.getNorthEast();
                        var sw = bounds.getSouthWest();
                        ne = removeLatLngOffset(ne.lat,ne.lng);
                        sw = removeLatLngOffset(sw.lat,sw.lng);
                        if(ne && sw){
                            north = ne.lat;
                            south = sw.lat;
                            west = sw.lng;
                            east = ne.lng;
                        }else{
                            return;
                        }
                    }else{
                        return;
                    }
                    lat.push(north);
                    lat.push(south);
                    lng.push(west);
                    lng.push(east);
                    for(var i=0;i<2;i++){
                        for(var j=0;j<2;j++){
                            var tmp = {
                                lat: lat[i],
                                lng: lng[j]
                            }
                            data.push(tmp);
                        }
                    }
                    // console.log(data);
                    return data;
                },
                pushMarkers: function (array) {
                    drawOnMap(array,false,true);
                    fenceBounds.extend(map.getCenter());
                    map.fitBounds(fenceBounds);      // # auto-zoom
                    map.panToBounds(fenceBounds);    // # auto-center
                },
                removeMarker: function (id) {
                    removeDevice(id);
                },
                validLatLng: function (point) {
                    var lat = parseFloat(point.lat);
                    var lng = parseFloat(point.lng)
                    return validLatLng(lat,lng);
                },
                /**
                 * 最大围栏面积
                 * @returns {number}
                 */
                getMaxFenceArea: function () {
                    return getMaxFenceArea();
                },
            }
        }
    ])
    // modal service
    .factory('modalService',[
        "$modal","$timeout",
        function ($modal,$timeout) {
            var loading = getLoading();
            var loadingShadow = getLoading(true);
            function getLoading(backdrop) {
                var template = backdrop ? '/layout/load.tpl.html' : '/layout/load-yellow.tpl.html';
                return $modal({
                    templateUrl: template,
                    controller: 'loading.ctrl',
                    backdrop: false,
                    show: false,
                });
            }
            return {
                getModal: function(templateUrl, controller, resolve, backdrop, container,onHide) {
                    var _mo = {
                        templateUrl: templateUrl,
                        show:false
                    };
                    controller ? _mo.controller = controller : _mo.controller = "myModal.ctrl";
                    resolve ? _mo.resolve = resolve : {resolveType: null};
                    // 默认无阴影
                    backdrop ? _mo.backdrop = backdrop : _mo.backdrop = false;
                    _mo.container = container ? (_mo.container = container) : "body";
                    onHide ? _mo.onHide = onHide : null;
                    var modal = $modal(_mo);
                    return modal;
                },
                modal:function (params,resolve,scope,onHide) {
                    var modal = $modal({
                        templateUrl: params && params.template,
                        controller: params && params.controller || 'home.ctrl',
                        resolve: {
                            modalParams: function(){
                                return resolve;
                            }
                        },
                        // container: container || 'body',
                        scope: scope,
                        backdrop: false,
                        onHide: onHide,
                        show: true,
                    });
                    modal.$promise.then(modal.show);
                },
                confirm:function (resolve,scope) {
                    var confirmModal = $modal({
                        templateUrl: '/discovery/sure.tpl.html',
                        controller: "confirm.ctrl",
                        resolve: {
                            confirmParams: function(){
                                return resolve;
                            }
                        },
                        // container: container || 'body',
                        scope: scope,
                        backdrop: false,
                        show: true,
                    });
                    confirmModal.$promise.then(confirmModal.show);
                },
                save:function (resolve,scope) {
                    var confirmModal = $modal({
                        templateUrl: '/discovery/save.tpl.html',
                        controller: "confirm.ctrl",
                        resolve: {
                            confirmParams: function(){
                                return resolve;
                            }
                        },
                        // container: container || 'body',
                        scope: scope,
                        backdrop: false,
                        show: true,
                    });
                    confirmModal.$promise.then(confirmModal.show);
                },
                loading:function (backdrop,scope) {
                    var template = backdrop ? '/layout/load.tpl.html' : '/layout/load-yellow.tpl.html';
                    var loadingModal = $modal({
                        templateUrl: template,
                        controller: 'loading.ctrl',
                        scope: scope,
                        backdrop: false,
                        show: false,
                    });
                    return loadingModal;
                },
                showLoadingShadow: function () {
                    // console.log('show loading shadow');
                    this.hideLoading();
                    $timeout(function () {
                        loadingShadow.$promise.then(loadingShadow.show);
                    },0);
                    // loadingShadow.$promise.then(loadingShadow.show);
                },
                hideLoadingShadow: function () {
                    // console.log('hide loading shadow');
                    $timeout(function () {
                        loadingShadow.$promise.then(loadingShadow.hide);
                    },0);
                    // loadingShadow.$promise.then(loadingShadow.hide);
                },
                showLoading: function () {
                    // console.log('show loading');
                    this.hideLoadingShadow();
                    $timeout(function () {
                        loading.$promise.then(loading.show);
                    },0);
                    // loading.$promise.then(loading.show);
                },
                hideLoading: function () {
                    // console.log('hide loading');
                    $timeout(function () {
                        loading.$promise.then(loading.hide);
                    },0);
                    // loading.$promise.then(loading.hide);
                },
            };
        }
    ])
    // modal service
    .factory('formService',[
        '$filter',
        function ($filter) {
            // 用户信息长度限制
            var addUserLimit = {
                username: [3,30],
                phone: [3,20],
                password: [3,12],
                address: 100
            };
            return {
                getUserLimit: function () {
                  return addUserLimit;
                },
                getError: function () {
                    var reg = new Array();
                    reg.username = {
                        regVal: 'default',
                        regList: [
                            { name: 'default', tips: $filter('chFilter')('username','input') },
                            { name: 'required', tips: $filter('chFilter')('username','blank')},
                            { name: 'minlength', tips: $filter('chFilter')('username','min_length') },
                            { name: 'maxlength', tips: $filter('chFilter')('username','max_length') },
                            { name: 'pattern', tips: $filter('chFilter')('username','pattern') },
                            { name: 'pass', tips: 'ok' }
                        ]
                    };
                    reg.email = {
                        regVal: 'default',
                        regList: [
                            { name: 'default', tips: $filter('chFilter')('email','input') },
                            { name: 'required', tips: $filter('chFilter')('email','blank') },
                            { name: 'email', tips: $filter('chFilter')('email','pattern') },
                            { name: 'pattern', tips: $filter('chFilter')('email','pattern') },
                            { name: 'pass', tips: 'ok' }
                        ]
                    };
                    reg.phone = {
                        regVal: 'default',
                        regList: [
                            { name: 'default', tips: $filter('chFilter')('phone','input') },
                            { name: 'required', tips: $filter('chFilter')('phone','blank') },
                            { name: 'minlength', tips: $filter('chFilter')('phone','min_length') },
                            { name: 'maxlength', tips: $filter('chFilter')('phone','max_length') },
                            { name: 'pattern', tips: $filter('chFilter')('phone','pattern') },
                            { name: 'pass', tips: 'ok' }
                        ]
                    };
                    reg.password = {
                        regVal: 'default',
                        regList: [
                            { name: 'default', tips: $filter('chFilter')('password','input') },
                            { name: 'required', tips: $filter('chFilter')('password','blank') },
                            { name: 'minlength', tips: $filter('chFilter')('password','min_length') },
                            { name: 'maxlength', tips: $filter('chFilter')('password','max_length') },
                            { name: 'pattern', tips: $filter('chFilter')('password','pattern') },
                            { name: 'pass', tips: 'ok' }
                        ]
                    };
                    reg.address = {
                        regVal: 'default',
                        regList: [
                            { name: 'default', tips: '' },
                            { name: 'maxlength', tips: $filter('chFilter')('address','max_length') },
                            { name: 'pass', tips: 'ok' }
                        ]
                    };
                    reg.Repassword = {
                        regVal: 'default',
                        regList: [
                            { name: 'default', tips: $filter('chFilter')('re_password','input') },
                            { name: 'required', tips: $filter('chFilter')('password','blank') },
                            { name: 'minlength', tips: $filter('chFilter')('password','min_length') },
                            { name: 'maxlength', tips: $filter('chFilter')('password','max_length') },
                            { name: 'pattern', tips: $filter('chFilter')('password','pattern') },
                            { name: 'pass', tips: 'ok' }
                        ]
                    };
                    return reg;
                },
                getUserPattern: function() {
                    var pattern = {
                        username: new RegExp("^[A-Za-z0-9.+-_@]{1,}$"),
                        email: new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"),
                        phone: new RegExp("^[0-9+-]{1,}$"),
                        password: new RegExp("^[A-Za-z0-9]{1,}$")
                    };
                    return pattern;
                },
                checkRegStatus: function (type,err) {
                    var errors = this.getError()[type];
                    var errorNote;
                    for (var attr in err) {
                        if (err[attr] === true) {
                            errorNote = errors[attr];
                            return errorNote;
                        };
                    };
                    return;
                },
            };
        }
    ])
    // 并发请求
    .factory('jsonService',[
        '$q','httpService',
        function($q,httpService){
        return {
            get: function (urls,params) {
                var promises = urls.map( function(url){
                    var deffered  = $q.defer();
                    var param,sort = "-updated_at";
                    if(params){
                        if(params.begin || params.end){
                            param = {
                                begin: params.begin,
                                end: params.end
                            };
                        }else{
                            param = {
                                last: -3,
                            };
                        }
                        sort = params.sort;
                    }
                    var header = {
                        url: url,
                        params: param,
                        sort: sort
                    };
                    httpService.jsonHttp(header).
                    success(function(data){
                        deffered.resolve(data);
                    }).
                    error(function(error){
                        deffered.reject();
                    });
                    return deffered.promise;
                });
                return $q.all(promises);
            },
            post: function (url,datas,limit,offset,sort) {
                var promises = datas.map( function(pData){
                    var deffered  = $q.defer();
                    httpService.set("post",url,pData,limit,offset,sort).
                    success(function(data){
                        deffered.resolve(data);
                    }).
                    error(function(error){
                        deffered.reject();
                    });
                    return deffered.promise;
                });
                return $q.all(promises);
            }
        }

    }])
    // chart
    .factory('chartService', [
        'jsonService', 'httpService', '$q', 'apiService', '$filter', 'timeService','deviceService','$timeout',
        function (jsonService, httpService, $q, apiService, $filter,timeService,deviceService,$timeout) {
            var color = ["#7ED321", "#F6A623", "#2DC9D7", "#BD0FE1", "#50E3C2", "#4990E2", "#FF556A", "#F8E81C", "#D0011B", "#417505"];
            var validTime = 10;//有效上传时间范围
            var allDevice,anlyDevice,allDeviceKey,anlyDeviceKey,chartSeries;
            allDeviceKey = ["altitude", "horizontal", "vertical", "speed", "used_star", "temperature", "humidity", "light", "pressure", "signal_strength", "battery_voltage", "percentage","fix_time"];//, "timestamp" - 定位时长（old）
            return {
                getColor:function () {
                    return color;
                },
                // 计算上传历时
                getUpdateTime: function (time, valid) {
                    /**
                     * 精确到秒
                     * 不在有效时间范围内：隐藏
                     */
                    if(valid === "undefined" || valid === true){
                        var minutes = (new Date(time)).getMinutes();
                        var seconds = (new Date(time)).getSeconds();
                        var finalSeconds;
                        if(minutes < validTime){
                            finalSeconds = minutes*60 + seconds;
                        }else if(minutes >= (60-validTime)){
                            finalSeconds = (minutes - 60)*60 + seconds;
                        };
                    }
                    else{
                        finalSeconds = validTime * 60;
                    };
                    return finalSeconds;
                },
                // 格式化日期为毫秒数，并筛选有效时间范围
                isRangeTime: function (time, time_begin, time_end) {
                    var minTime = Date.UTC(2010,1,1);//最小时间
                    var maxTime = Date.UTC(2030,1,1);//最大时间
                    var _time = timeService.toUTC(time);//time本身为UTC时间
                    var timeBegin = time_begin ? timeService.toUTC(time_begin) : null;
                    var timeEnd = time_end ? timeService.toUTC(time_end) : null;
                    if((timeBegin && (_time < timeBegin)) || (timeEnd && (timeEnd < _time)) || (_time < minTime) || (_time > maxTime)){
                        _time = null;
                    };
                    return _time;
                },
                // 有效电压值
                validVoltage: function (voltage, key) {
                    var valid = true;
                    var isLimitKey = ((key === "signal_strength" || key === "dimension" || key === "horizontal" || key === "vertical" || key === "speed" || key === "course" || key === "battery_voltage"));
                    ((voltage === 0) && isLimitKey) && (valid = false);
                    return valid;
                },
                // 保存所有设备
                setDeviceAll: function (data) {
                    allDevice = data;
                },
                // 保存选中的设备
                setDeviceAnly: function (data) {
                    anlyDevice = data;
                },
                // 获取选中的设备
                getDeviceAnly: function () {
                    return anlyDevice;
                },
                // 删除一个设备
                delDeviceAnly: function (index) {
                    anlyDevice.splice(index,1);
                },
                // 保存已选择的对比项
                setKeyAnly: function (data) {
                    anlyDeviceKey = data;
                },
                // 获取已选择的对比项
                getKeyAnly: function () {
                    return anlyDeviceKey;
                },
                // 删除一个对比项
                delKeyAnly: function (index) {
                    anlyDeviceKey.splice(index,1);
                },
                // 获取所有对比项
                getKeyAll: function () {
                    return allDeviceKey;
                },
                // 设置series数据
                setChartSeries: function (device, deviceKey,header) {
                    var series;
                    var mLen = device ? device.length : 0;
                    var kLen = deviceKey ? deviceKey.length : 0;
                    if(kLen === 1){
                        series = this.getDeviceMore(device,deviceKey,header);
                    }else if((mLen === 1) && (kLen > 1)){
                        series = this.getDeviceOnly(device,deviceKey,header);
                    };
                    chartSeries = series;
                },
                // 获取保存的chart-series
                getChartSeries:function () {
                    return chartSeries;
                },
                //检查已选择的设备和对比项合法
                validChoose: function (mlen, klen) {
                    var valid = true;
                    var note;
                    if(mlen < 1 || klen < 1){
                        (mlen < 1) && (note = $filter("chFilter")("choose_a_device"));
                        (mlen >= 1) && (klen < 1) && (note = $filter("chFilter")("choose_a_data_type"));
                        httpService.myAlert('danger',note);
                        valid = false;
                    };
                    return valid;
                },
                // 多个设备单个对比项
                getDeviceMore: function (device, deviceKey,header) {
                    var _chartSeries = new Array();
                    var tmpDevice = device;
                    var tmpKey = deviceKey[0];//对比项
                    var isPerAge = (tmpKey === "percentage");//定位成功率
                    var thisFactory = this;
                    var notEmpty = 0;
                    jsonGet(isPerAge).then(function(datas){
                        angular.forEach(datas, function (value,index) {
                            var resData = value;
                            var resLen = value.length;
                            notEmpty += resLen;
                            var seriesTmp;  //当前设备series
                            var tmpChartDevice = new Array();//当前设备series->data
                            for(var i=0;i<resLen;i++){
                                var curData = resData[i];
                                var lng = curData.longitude;
                                var lat = curData.latitude;
                                var checkPoint;//点有效
                                var time = isPerAge ? curData.date : curData.timestamp;
                                // console.log(time);
                                time = thisFactory.isRangeTime(time);
                                if(isPerAge){
                                    checkPoint = time;
                                }else{
                                    checkPoint = ((time && thisFactory.validVoltage(curData.battery_voltage,tmpKey)));
                                };
                                if(checkPoint){
                                    var tmpVal = resData[i][tmpKey];
                                    !isPerAge && ((tmpKey === "timestamp") ? (tmpVal = thisFactory.getUpdateTime(time,thisFactory.validLatLng(tmpKey,lat,lng))) : (checkPoint = thisFactory.validLatLng(tmpKey,lat,lng)));
                                    // var unit = $filter('unitFilter')(tmpKey,'chart');
                                    if(checkPoint){
                                        // console.log($filter('unitFilter')(time,"updated_at"),tmpVal);
                                        (tmpVal !== undefined) && (tmpVal !== null) && tmpChartDevice.push([time,tmpVal]);
                                        var deviceMark = tmpDevice[index].mark ? tmpDevice[index].mark : tmpDevice[index].uuid;
                                        seriesTmp = {
                                            name: deviceMark,
                                            data: tmpChartDevice,
                                        };
                                    };
                                };
                            };
                            seriesTmp && _chartSeries.push(seriesTmp);
                        });
                        if(!notEmpty || notEmpty < 1){
                            httpService.myAlert(2,'数据为空！');
                        }
                    });
                    /**
                     *  对比项
                     *  特殊：定位成功率
                     */
                    function jsonGet(isAge) {
                        var http,url;
                        var urls = [];
                        var sort = isAge ? "date" : "timestamp";
                        if(isAge){
                            // url = apiService.gpsCount();
                            // var datas = [];
                            // var urls = [];
                            angular.forEach(tmpDevice ,function (value,index) {
                                // var data = {
                                //     device_id: value.id
                                // };
                                // datas.push(data);
                                urls.push(apiService.gpsCount(value.id));
                            });
                            // http = jsonService.get(urls,header);
                        }else{
                            // var urls = [];
                            angular.forEach(tmpDevice ,function (value,index) {
                                urls.push(apiService.deviceGps(value.id));
                            });
                            // var header = {
                            //   sort: sort
                            // };
                            header.sort = sort;
                            // http = jsonService.get(urls,header);
                        };
                        http = jsonService.get(urls,header);
                        return http;
                    };
                    return _chartSeries;
                },
                // 单个设备多个对比项
                getDeviceOnly: function (device, deviceKey,header) {
                    var tmpDevice = device;
                    var tmpDeviceKey = deviceKey;
                    var _chartSeries = [];
                    var deviceId = tmpDevice[0].id;
                    var isPerAge = (tmpDeviceKey.toString().indexOf('percentage') >= 0);
                    var thisFactory = this;
                    var thisDevKeyData = {};
                    var notEmpty = 0;
                    // var header = {
                    //     sort: 'timestamp'
                    // };
                    header.sort = "timestamp";
                    deviceService.getDeviceGps(deviceId,header,function (data) {
                        var resLen = data.length;
                        notEmpty += resLen;
                        angular.forEach(tmpDeviceKey, function (value, index) {
                            var validIndex = 0;
                            thisDevKeyData[value] = new Array();
                            for(var i=0;i<resLen;i++){
                                var resData = data;
                                var lng = resData[i].longitude;
                                var lat = resData[i].latitude;
                                var time = resData[i].timestamp;
                                time = thisFactory.isRangeTime(time);
                                var validPoint = time;
                                if(validPoint){
                                    if(value === "percentage"){
                                        validPoint = false;
                                    }
                                    else{
                                        validPoint = thisFactory.validVoltage(resData[i].battery_voltage,value);
                                        if(validPoint){
                                            var tmpVal = resData[i][value];
                                            (value === "timestamp") ? (tmpVal = thisFactory.getUpdateTime(time,thisFactory.validLatLng(value,lat,lng))) : (validPoint = thisFactory.validLatLng(value,lat,lng));
                                            var tmp = [time,tmpVal];
                                            thisDevKeyData[value].push(tmp);
                                            validIndex++;
                                        };
                                    };
                                }
                            };
                            // var unit = $filter('unitFilter')(value,'chart');
                            if(thisDevKeyData[value]){
                                var seriesTmp = {
                                    name: value,//$filter('chFilter')(value,'gps')
                                    data: thisDevKeyData[value],
                                    yAxis: index,
                                    pointInterval: 1,
                                    dataGrouping: {
                                        enabled: false
                                    }
                                };
                                (value !== "percentage") && _chartSeries.push(seriesTmp);
                            };
                        });
                        if(isPerAge){
                            setPerAge(tmpDeviceKey.indexOf("percentage"));
                        }else if(!notEmpty || notEmpty < 1){
                            httpService.myAlert(2,'数据为空！');
                        }
                    });
                    function setPerAge(i) {
                        // var pData = {
                        //     device_id: deviceId
                        // };
                        var yAxis = i;
                        var seriesTmp = {
                            name: "percentage",//$filter('chFilter')(value,'gps')
                            data: [],
                            yAxis: yAxis,
                            pointInterval: 1,
                            dataGrouping: {
                                enabled: false
                            }
                        };
                        deviceService.getDeviceGpsCount(deviceId,header,function (data) {
                            var resLen = data.length;
                            notEmpty += resLen;
                            angular.forEach(data, function (value, index) {
                                var time = value.date;
                                time = thisFactory.isRangeTime(time);
                                time && seriesTmp.data.push([time,value.percentage]);
                            });
                            if(!notEmpty || notEmpty < 1){
                                httpService.myAlert(2,'数据为空！');
                            }
                            _chartSeries.splice(yAxis,0,seriesTmp);
                        });
                    };
                    return _chartSeries;
                },
                // 有效经纬度
                validLatLng: function (key,lat,lng) {
                    var isLimitKey = ((key === "altitude" || key === "dimension" || key === "horizontal" || key === "vertical" || key === "speed" || key === "course" || key === "used_star"));
                    if(isLimitKey){// 经纬度无效无数据
                        return ((lat > -90) && (lat < 90) && (lng > -180) && (lng < 180));
                    }
                    else{// 经纬度无效有数据
                        return true;
                    }
                },
                // 清空数据
                clear: function () {
                    allDevice = anlyDevice = anlyDeviceKey = chartSeries = null;
                },
            };
        }
    ])
    // 清空 factory 中保存的数据，不刷新页面
    .factory('clearService', [
        "chartService","httpService",
        function (chartService,httpService) {
            return {
                clear: function (){
                    httpService.clear();
                    chartService.clear();
                },
            };
        }
    ])
    // 设备
    .factory('deviceService',[
    "httpService","apiService","$filter",'$q','$http','biologicalService','$timeout','langService',
        function (httpService,apiService,$filter,$q,$http,biologicalService,$timeout,langService) {
            var allDevice,anlyDevice,allDeviceKey,anlyDeviceKey,chartSeries;
            allDeviceKey = ["altitude", "horizontal", "vertical", "speed", "used_star", "temperature", "humidity", "light", "pressure", "signal_strength", "battery_voltage", "timestamp","percentage"];//, "timestamp"
            var lang = $filter('chFilter')(langService.getCurrentLang(),"lang_code");
            return {
                listDevices: function (headers,callback,errorCallback) {
                    var sort = headers && headers.sort || "-updated_at";
                    var limit = headers && headers.limit || null;
                    var offset = headers && headers.offset || null;
                    var request = {
                        url: apiService.device(),
                        method: "get",
                        sort: sort,
                        limit: limit,
                        offset: offset
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updateDevice: function (id,data,callback) {
                    var request = {
                        url: apiService.device(id),
                        method: "put",
                        data: data
                    };
                    httpService.http(request,callback);
                },
                getDeviceBiologicalInfo: function (id,callback,errorCallback) {
                    biologicalService.getBiologicalByDeviceID(id,callback,errorCallback);
                },
                getDeviceByID: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.device(id),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getDeviceByIDs: function (header,data,callback,errorCallback) {
                    var request = {
                        url: apiService.deviceByIDs(),
                        method: "post",
                        data: data,
                        sort: header && header.sort || 'mark',
                        limit: header && header.limit,
                        offset: header && header.offset,

                    };
                    httpService.http(request,callback,errorCallback);
                },
                getDeviceNotAuth: function (header,data,callback,errorCallback) {
                    var request = {
                        url: apiService.deviceNotAuth(),
                        method: "post",
                        data: data,
                        sort: 'mark',
                        limit: header && header.limit,
                        offset: header && header.offset,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                gpsList: function (headers,callback,errorCallback) {
                    var limit = headers && headers.limit || null;
                    var offset = headers && headers.offset || null;
                    var request = {
                        url: apiService.gps(),
                        method: "get",
                        sort: "-updated_at,-timestamp",
                        limit: limit,
                        offset: offset,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                behaviorList: function (headers,callback) {
                    var limit = headers && headers.limit || null;
                    var offset = headers && headers.offset || null;
                    var request = {
                        url: apiService.behavior(),
                        method: "get",
                        sort: "-updated_at,-timestamp",
                        limit: limit,
                        offset: offset,
                    };
                    httpService.http(request,callback);
                },
                getDeviceGps: function (id,headers,callback,errorCallback) {
                    var _params;
                    if(headers){
                        if(headers.begin && headers.end){
                            _params = {
                                begin: headers.begin,
                                end: headers.end,
                            };
                        }else{
                            _params = {
                                last: headers.last || "-6",
                            };
                        }
                    };
                    //last: -3,-6,-12
                    var request = {
                        url: apiService.deviceGps(id),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: headers && headers.sort || "-updated_at,-timestamp",
                        params: _params
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getDeviceSMS: function (id,headers,callback) {
                    var request = {
                        url: apiService.deviceSMS(id),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: "-timestamp",
                    };
                    httpService.http(request,callback);
                },
                getDeviceBehavior: function (id,headers,callback) {
                    var _params = {
                        begin: headers && headers.begin,
                        end: headers && headers.end
                    };
                    var request = {
                        url: apiService.deviceBehavior(id),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: "-updated_at,-timestamp",
                        params: _params
                    };
                    httpService.http(request,callback);
                },
                getDeviceGpsCount: function (id,headers,callback) {
                    var params;
                    if(headers){
                        if(headers.begin && headers.end){
                            params = {
                                begin: headers.begin,
                                end: headers.end,
                            };
                        }else{
                            params = {
                                last: headers.last || "-6",
                            };
                        }
                    };
                    var request = {
                        url: apiService.gpsCount(id),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: headers && headers.sort || "date",
                        params: params,
                    };
                    httpService.http(request,callback);
                },
                listSetting: function (headers,callback) {
                    var request = {
                        url: apiService.setting(),
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: '-updated_at',
                        method: "get",
                    };
                    httpService.http(request,callback);
                },
                getDeviceSetting: function (id,callback) {
                    var request = {
                        url: apiService.deviceSetting(id),
                        method: "get",
                    };
                    httpService.http(request,callback);
                },
                updateDeviceSetting: function (id,data,callback) {
                    var request = {
                        url: apiService.deviceSetting(id),
                        method: "put",
                        data: data
                    };
                    httpService.http(request,callback);
                },
                downloadDevice: function (fileType,data,callback) {
                    var request = {
                        url: apiService.downloadFile(fileType),
                        method: "post",
                        data: data,
                        responseType: 'arraybuffer',
                    };
                    httpService.http(request,callback);
                },
                getLocationByLatLng: function (devices) {
                    var promises = devices.map( function(device){
                        var lastValidGps = device.last_valid_gps || device.last_gps;
                        var lat = lastValidGps && lastValidGps.latitude;
                        var lng = lastValidGps && lastValidGps.longitude;
                        var url = apiService.googleMapLocation(lat,lng);
                        var deffered  = $q.defer();
                        if(lat && lng){
                            if(lat === '-'){
                                device.location = '-';
                                deffered.resolve(device);
                            }else{
                                $http({
                                    method: "get",
                                    url: url,
                                    params: {
                                        key: "AIzaSyCFTe1HMY5kFxMs3Vq8qhzdrtbgrDy-isM",
                                        latlng: lat + "," + lng,
                                        // language: langService.getBroswerLang()
                                    }
                                }).success(function (data,status,headers) {
                                    var tmp = "";
                                    var _status = data.status.toLowerCase();
                                    if(_status === "ok"){
                                        var dataLoc = data;
                                        var len = dataLoc.results.length;
                                        // var _city = dataLoc.results[len-3] && dataLoc.results[len-3].formatted_address;
                                        var _city;
                                        angular.forEach(dataLoc.results,function (value,index) {
                                            if(value.types.indexOf('political') >= 0){//只需要精确到县/区
                                                !_city && (_city =  value.formatted_address);
                                            }
                                        })
                                        tmp = _city;
                                    }else if(status === "zero_results"){
                                        tmp = lat + "/" + lng;
                                    }else{
                                        tmp = lat + "/" + lng;
                                    };
                                    device.location = tmp;
                                    // console.log(device);
                                    deffered.resolve(device);
                                }).error(function (error,status) {
                                    device.location = '-';
                                    deffered.resolve(device);
                                    // deffered.reject();
                                });
                            }
                        }else{
                            deffered.resolve(device);
                        }
                        return deffered.promise;
                    });
                    // $q.all(promises).then(function (data,status) {
                    //     console.log(data);
                    // });
                    return $q.all(promises);
                },
                getMapLocation: function (params,callback,errorCallback) {
                    //params: lat,lng,language,types
                    params.language = lang;
                    var request = {
                        url: apiService.mapLocation(),
                        method: "get",
                        params: params,
                        type: -1 // no error alert
                    };
                    httpService.http(request,callback,errorCallback);
                },
                // 数据分析
                setAll: function (data) {
                    allDevice = data;
                },
                getAll: function (limit,offset,sort) {
                    var currentUrl = apiService.device();
                    var deffered  = $q.defer();
                    httpService.get(currentUrl,limit,offset,sort).then(
                        function(response){
                            deffered.resolve(response);
                        },function(response){
                            httpService.error(response);
                            deffered.reject();
                        });
                    return deffered.promise;
                },
                setAnly: function (data) {
                    anlyDevice = data;
                },
                getAnly: function () {
                    return anlyDevice;
                },
                delAnly: function (index) {
                    anlyDevice.splice(index,1);
                },
                setKeyAnly: function (data) {
                    anlyDeviceKey = data;
                },
                getKeyAnly: function () {
                    return anlyDeviceKey;
                },
                delKeyAnly: function (index) {
                    anlyDeviceKey.splice(index,1);
                },
                getKeyAll: function () {
                    return allDeviceKey;
                },
                setChartSeries: function (series) {
                    chartSeries = series;
                },
                getChartSeries:function () {
                    return chartSeries;
                }
            }
        }
    ])
    // 生物
    .factory('biologicalService',[
        "httpService","apiService","$q","authService",
        function (httpService,apiService,$q,authService) {
            var toBindUser,toBindDevice;
            return {
                listBiological: function (headers,callback,scrollCallback) {
                    var request = {
                        url: apiService.biological(),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: headers && headers.sort || "bid"
                    };
                    httpService.http(request,callback,null,scrollCallback);
                },
                addBiological: function (data,callback) {
                    var request = {
                        url: apiService.updateBiological(),
                        method: "post",
                        data: data
                    };
                    httpService.http(request,callback);
                },
                updateBiological: function (bio,data,callback) {
                    var id = bio.id;
                    var type = bio.type || "bird";
                    var request = {
                        url: apiService.updateBiologicalInfo(id,type),
                        method: "post",
                        data: data
                    };
                    httpService.http(request,callback);
                },
                deleteBiological: function (bio,callback) {
                    var id = bio.id;
                    var type = bio.type || "camel";
                    var request = {
                        url: apiService.updateBiological(id,type),
                        method: "delete",
                    };
                    httpService.http(request,callback);
                },
                //user
                getBiologicalByDeviceID: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.deviceBiological(id),
                        method: "get",
                        type: 'biological',
                    };
                    httpService.http(request,callback,errorCallback);
                },
            }
        }
    ])
    // 用户
    .factory('accountService',[
        "httpService","apiService","$rootScope","timeService","langService","$timeout",
        function (httpService,apiService,$rootScope,timeService,langService,$timeout) {
            var profilePageSize;
            return {
                login: function (data,callback,errorCallback) {
                    var request = {
                        url: apiService.login(),
                        method: "post",
                        data: data,
                        type: "login",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getMe: function (callback,errorCallback) {
                    var request = {
                        url: apiService.me(),
                        method: "get",
                        type: "login",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                listCompanyAccount: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.company(),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: "username"
                    };
                    httpService.http(request,callback,errorCallback);
                },
                listAccountIdleDevice: function (headers,callback,errorCallback) {
                    var sort = headers && headers.sort || "sn,mark";
                    var request = {
                        url: apiService.deviceUserIdle(),
                        method: "get",
                        sort: sort
                    };
                    httpService.http(request,callback,errorCallback);
                },
                deleteAccount: function (id,callback) {
                    var request = {
                        url: apiService.user(id),
                        method: "delete",
                    };
                    httpService.http(request,callback);
                },
                createAccount: function (data,callback) {
                    var postData = data;
                    postData.role = "user";
                    var request = {
                        url: apiService.createAccount(),
                        method: "post",
                        data: postData
                    };
                    httpService.http(request,callback);
                },
                getAccountByID: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.account(id),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updateMe: function (data,callback,errorCallback) {
                    var request = {
                        url: apiService.updateInfo(),
                        method: "put",
                        data: data
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updatePasswordMe: function (data,callback,errorCallback) {
                    var request = {
                        url: apiService.password(),
                        method: "put",
                        data: data
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updateProfile: function (data,callback,errorCallback) {
                    var request = {
                        url: apiService.userProfile(),
                        method: "put",
                        data: data
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updateAccountPassword: function (id,data,callback,errorCallback) {
                    var request = {
                        url: apiService.password(id),
                        method: "put",
                        data: data
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getDeviceListByUserID: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.deviceUser(id),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                addDeviceToAccount: function (id,data,callback) {
                    var postData = {
                        id: data
                    };
                    var request = {
                        url: apiService.updateUserDevice(id),
                        method: "post",
                        data: postData
                    };
                    httpService.http(request,callback);
                },
                removeDeviceFromAccount: function (id,data,callback) {
                    var delData = {
                        id: data
                    };
                    var request = {
                        url: apiService.updateUserDevice(id),
                        method: "delete",
                        data: delData
                    };
                    httpService.http(request,callback);
                },
                getMessageUnread: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.messageUnread(),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: '-timestamp',
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getCompanyBill: function (callback,errorCallback) {
                    var request = {
                        url: apiService.companyBillInfo(),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getCompanyChargeList: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.companyPayList(),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getCompanyMonthBill: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.companyMonthPay(),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getDeviceDetailBill: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.companyMonthPay(headers && headers.month),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                /**
                 * 只保留用户请求ID的设备
                 * @param data
                 * @param callback
                 * @param errorCallback
                 */
                updateUserAuthDevice: function (data,callback,errorCallback) {
                    var request = {
                        url: apiService.deviceAuth(),
                        method: "post",
                        data: data,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                addUserAuthDevice: function (userID,data,callback,errorCallback) {
                    var request = {
                        url: apiService.addDeviceAuth(userID),
                        method: "post",
                        data: data,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                removeUserAuthDevice: function (userID,data,callback,errorCallback) {
                    var request = {
                        url: apiService.removeDeviceAuth(userID),
                        method: "post",
                        data: data,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                editUserAuthDevice: function (userID,data,callback,errorCallback) {
                    var request = {
                        url: apiService.editDeviceAuth(userID),
                        method: "post",
                        data: data,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updateUserAuth: function (userID,data,callback,errorCallback) {
                    var request = {
                        url: apiService.userAuth(userID),
                        method: "post",
                        data: data,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                /**
                 * 初始化用户信息和用户配置
                 * @param array
                 */
                initMyAccount: function (array) {
                    var service = this;
                    var mySelf = array;
                    var permission = mySelf.permissions;
                    (!$rootScope.accountLogin) && ($rootScope.accountLogin = {});
                    // if(mySelf.role !== "admin"){
                    //     this.myAlert("danger",$filter("chFilter")("user_not_permitted_visit","tips"));
                    //     // authService.logout();
                    // }else{
                    //     var _aShow = this.getAccountShow();
                    //     _aShow.push("profile");
                    //     authDevices = mySelf.auth_devices;
                    //     angular.forEach(_aShow, function (value) {
                    //         var key = value;
                    //         (mySelf[key]) && (myAccountInfo[key] = mySelf[key]);
                    //     });
                    // }
                    //accountLogin
                    angular.forEach(mySelf, function (value,key) {
                        $rootScope.accountLogin[key] = value;
                        if(key === 'profile' && value){
                            $rootScope.$emit('initUserProfile',value);

                            timeService.setProfileTimezone(value.time_zone);
                            service.setProfilePageSize(value.page_size);
                            langService.setCurrentLang(value.language);
                        }else if(key === 'role'){
                            $rootScope.navs = httpService.getNav(value,permission);
                        }
                    });
                    $timeout(function () {
                        $rootScope.loaded = 1; //标记网页初始化已完成
                    },0);
                },
                getMyAccount: function () {
                    // console.log(myAccountInfo,"get");
                    return $rootScope.accountLogin;
                },
                setProfilePageSize: function (number) {
                    profilePageSize = number;
                },
                getProfilePageSize: function () {
                    return profilePageSize;
                },
            }
        }
    ])
    // 围栏
    .factory('fenceService',[
        "httpService","apiService",
        function (httpService,apiService) {
            return {
                listFence: function (header,callback,errorCallback) {
                    var request = {
                        url: apiService.area(),
                        method: "get",
                        limit: header && header.limit,
                        offset: header && header.offset,
                        sort: '-updated_at',
                    };
                    httpService.http(request,callback,errorCallback);
                },
                addFence: function (putData,callback,errorCallback) {
                    var request = {
                        url: apiService.area(),
                        method: "post",
                        data: putData
                    };
                    httpService.http(request,callback,errorCallback);
                },
                updateFence: function (fenceID,putData,callback,errorCallback) {
                    var request = {
                        url: apiService.area(fenceID),
                        method: "put",
                        data: putData,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getFenceByID: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.area(id),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                deleteFenceByID: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.area(id),
                        method: "delete",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getFenceDevice: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.areaDevice(id),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                setFenceDevice: function (id,putData,callback,errorCallback) {
                    var request = {
                        url: apiService.areaDevice(id),
                        method: "put",
                        data: putData,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                addDeviceToFence: function (id,putData,callback,errorCallback) {
                    var request = {
                        url: apiService.areaAddDevice(id),
                        method: "put",
                        data: putData,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                removeDeviceFromFence: function (id,putData,callback,errorCallback) {
                    var request = {
                        url: apiService.areaRemoveDevice(id),
                        method: "put",
                        data: putData,
                    };
                    httpService.http(request,callback,errorCallback);
                },
                listDeviceInFence: function (id,callback,errorCallback) {
                    var request = {
                        url: apiService.deviceArea(id),
                        method: "get",
                    };
                    httpService.http(request,callback,errorCallback);
                },
            }
        }
    ])
    // 消息通知
    .factory('messageService',[
        "httpService","apiService",
        function (httpService,apiService) {
            return {
                openWS: function () {
                    // 连接 websocket
                    return new WebSocket(apiService.wsUrl());
                },
                getAll: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.message(),
                        urlType: 2,
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: '-timestamp',
                    };
                    httpService.http(request,callback,errorCallback);
                },
                getUnread: function (headers,callback,errorCallback) {
                    var request = {
                        url: apiService.messageUnread(),
                        urlType: 2,
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: '-timestamp',
                    };
                    httpService.http(request,callback,errorCallback);
                },
                setRead: function (IDArray,callback,errorCallback) {
                    var putData = {
                        id: IDArray
                    };
                    var request = {
                        url: apiService.message(),
                        urlType: 2,
                        method: "put",
                        data: putData
                    };
                    httpService.http(request,callback,errorCallback);
                },
                deleteByIDArray: function (IDArray,callback,errorCallback) {
                    var putData = {
                            id: IDArray
                        };
                    var request = {
                        url: apiService.message(),
                        urlType: 2,
                        method: "delete",
                        data: putData,
                    };
                    httpService.http(request,callback,errorCallback);
                },
            }
        }
    ])
    // 搜索
    .factory('searchService',[
        "httpService","apiService",
        function (httpService,apiService) {
            return {
                deviceBySN: function (sn,callback,errorCallback) {
                    var request = {
                        url: apiService.searchDeviceBySN(sn),
                        method: "get",
                        limit: 20
                    };
                    httpService.http(request,callback,errorCallback);
                },
                deviceByMark: function (headers,mark,callback,errorCallback) {
                    var request = {
                        url: apiService.searchDevice(mark),
                        method: "get",
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: (headers && headers.sort) || "-updated_at",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                deviceByUUID: function (headers,putData,callback,errorCallback) {
                    var request = {
                        url: apiService.searchDeviceOnly(),
                        method: "post",
                        data: putData,
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: (headers && headers.sort) || "-updated_at",
                    };
                    httpService.http(request,callback,errorCallback);
                },
                gps: function (headers,putData,callback,errorCallback) {
                    var request = {
                        url: apiService.searchGps(),
                        method: "post",
                        data: putData,
                        limit: headers && headers.limit,
                        offset: headers && headers.offset,
                        sort: (headers && headers.sort) || "-updated_at,-timestamp",
                    };
                    httpService.http(request,callback,errorCallback);
                },
            }
        }
    ])
    // 下载
    .factory('downloadService',[
        "httpService","apiService",
        function (httpService,apiService) {
            return {
                //单个文件
                downloadByType: function (postData,type,params,callback,errorCallback) {
                    var request = {
                        url: apiService.downloadDeviceGps(type,true,params),
                        method: "POST",
                        data: postData,
                        responseType: "arraybuffer",
                        // params: params
                    };
                    httpService.http(request,callback,errorCallback);
                },
                // 多个文件
                downloadByTypeMultiple: function (postData,type,params,callback,errorCallback) {
                    var request = {
                        url: apiService.downloadDeviceGps(type,false,params),
                        method: "POST",
                        data: postData,
                        responseType: "arraybuffer",
                        // params: params
                    };
                    httpService.http(request,callback,errorCallback);
                },
            }
        }
    ])
    ;
}(app);
