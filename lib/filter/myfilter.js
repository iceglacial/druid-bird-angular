/**
 * Creator: WangChengting-iceglacial
 * Email: iceglacial@sina.com
 * Create Time: 2016/10/26 上午10.32.
 * description:
 */
+ function(app) {
    app
    // grid 单位 filter
    .filter('unitFilter', function($filter, langService,timeService) {
            return function(value, scope) {
                var lang = langService.getCurrentLang();
                var serverDatetimeFormat = "yyyy-MM-ddTHH:mm:ss.sss'Z'";
                var datetimeFormat = "yyyy-MM-dd HH:mm:ss";
                var dateFormat = "yyyy-MM-dd";
                var timeFormat = "HH:mm:ss";
                var profileTimeOffset = timeService.getProfileTimeOffset();
                //获取字段名
                var filVal,unit,cname;
                if(scope && (scope !== "chart")){
                    if(scope.col) {cname = scope.col.colDef.name;}
                    else {cname = scope;}
                }else{
                    cname = value;
                }
                if(value !== "-" && value !== undefined){
                    if(cname && cname.indexOf("last_gps") >= 0){
                        cname = cname.split(".")[1];
                    }
                    switch (cname && cname.toLowerCase()) {
                        case "updated_at": case "timestamp": case "downloaded_at": case "fix_time"://UTC："+0000"
                            unit = "s";
                            filVal =  $filter('date')(value,datetimeFormat,profileTimeOffset);
                            // console.log(profileTimeOffset,value,filVal);
                            break;
                        case "reverse_timezone": //UTC："+0000"
                            filVal =  $filter('date')(value,dateFormat,profileTimeOffset);
                            break;
                        case "server_date": //UTC："+0000"
                            filVal =  $filter('date')(value,serverDatetimeFormat,timeService.getLocalTimeOffset());
                            break;
                        case "search_date": //UTC："+0000"
                            filVal =  $filter('date')(value,dateFormat,profileTimeOffset);
                            break;
                        case "localdate"://本地时间
                            filVal =  $filter('date')(value,datetimeFormat,profileTimeOffset);
                            break;
                        case "localtime":
                            filVal =  $filter('date')(value,timeFormat) + " UTC " + timeService.getLocalTimeOffset();
                            break;
                        case "month":
                            var time = new Date(2017,value-1);
                            filVal = $filter('date')(time,'MMM');
                            break;
                        case "distance":
                            filVal = filterMeters(value);
                            break;
                        case "percentage":
                            unit = '%';
                            break;
                        case "temperature":
                            unit = '℃';
                            break;
                        case "light":
                            unit = 'lx';
                            break;
                        case "pressure":
                            unit = 'hPa';
                            break;
                        case "humidity":
                            unit = '%RH';
                            break;
                        case "dimension":
                            if(value === 0) {filVal =  "-";}
                            else if(value === 1) {filVal =  "2D";}
                            else if(value === 2) {filVal =  "3D";}
                            break;
                        case "latitude": case "longitude": case "course":
                            unit = '°';
                            break;
                        case "speed":
                            unit = 'm/s';
                            break;
                        case "horizontal": case "vertical": case "altitude":
                            unit = 'm';
                            break;
                        case "signal_strength":
                            unit = 'ASU';
                            break;
                        case "behavior_sampling_freq": case "env_sampling_freq": case "gprs_freq": case "gprs_version": case "freq":
                            filVal = filterTime(value);
                            break;
                        case "battery_voltage": case "behavior_voltage_threshold": case "env_voltage_threshold": case "gprs_voltage_threshold": case "ota_voltage_threshold": case "voltage":
                            unit = "V";
                            break;
                        case "activity_expend": case "sleep_expend": case "crawl_expend": case "fly_expend": case "other_expend": case "peck_expend": case "run_expend":
                            unit = '%';
                            break;
                        case "owner":
                            switch (value.toLowerCase()){
                                case "fromdruidold":
                                    if(lang === 'zh' || lang === 1) {filVal = '一代平台';}
                                    else {filVal = 'Druid V1';}
                                    break;
                                case "fromdruid":
                                    if(lang === 'zh' || lang === 1) {filVal = '二代平台';}
                                    else {filVal = 'Druid V2';}
                                    break;
                            }
                            break;
                        case "src_name":
                            if(lang === 'zh' || lang === 1) {filVal = '发送人';}
                            else {filVal = 'From';}
                            break;
                        case "level":
                            switch (value){
                                case 0:
                                    if(lang === 'zh' || lang === 1) {filVal = '普通';}
                                    else {filVal = 'Normal';}
                                    break;
                                case 1:
                                    if(lang === 'zh' || lang === 1) {filVal = '警告';}
                                    else {filVal = 'Warning';}
                                    break;
                                case 2:
                                    if(lang === 'zh' || lang === 1) {filVal = '严重';}
                                    else {filVal = 'Danger';}
                                    break;
                            }
                            break;
                        case "type":
                            switch (value){
                                case 0:
                                    if(lang === 'zh' || lang === 1) {filVal = '系统通知';}
                                    else {filVal = 'System Notification';}
                                    break;
                                case 1:
                                    if(lang === 'zh' || lang === 1){filVal = '用户消息';}
                                    else {filVal = 'Account Notification';}
                                    break;
                                case 2:
                                    if(lang === 'zh' || lang === 1) {filVal = '设备消息';}
                                    else {filVal = 'Device Notification';}
                                    break;
                            }
                            break;
                        case "role":
                            filVal = $filter('chFilter')(value,'role');
                            break;
                        case "behavior_sampling_mode": case "gprs_mode": case "env_sampling_mode":
                            switch (value){
                                case 0:
                                    if(lang === 'zh' || lang === 1) {filVal = '暂时关闭';}
                                    else {filVal = '-';}
                                    break;
                                case 1:
                                    if(lang === 'zh' || lang === 1) {filVal = '打开';}
                                    else {filVal = 'ON';}
                                    break;
                                case 2:
                                    if(lang === 'zh' || lang === 1) {filVal = '关闭';}
                                    else {filVal = 'OFF';}
                                    break;
                            }
                            break;
                        case "language":
                            switch(value){
                                case 0:
                                    filVal = "English";
                                    break;
                                case 1:
                                    filVal = "中文";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            filVal = "";
                            unit = "";
                            break;
                    };
                    // console.log("-value:",value,"-cname:",cname,"-unit:",unit,"-filVal:",filVal);
                    if(scope && (value !== undefined) && (value !== null)){
                        if(!filVal) {filVal = value.toString() + " " + unit;}
                    }else{
                        filVal = unit;
                    }
                }else{
                    filVal = value;
                };
                // 毫秒转换-精确到秒
                function filterTime(time){
                    var unit = {
                        month: " Month",
                        week: " Week",
                        day: " Day",
                        hour: " Hour",
                        minute: " Minute",
                        seconds: " Second"
                    };
                    var tmp = "";
                    var oneMin = 60;
                    var oneHour = oneMin*60;
                    var oneDay = oneHour*24;
                    var oneWeek = oneDay*7;
                    var oneMonth = oneDay*30;
                    var seconds = time%60;
                    var min = Math.floor(time%oneMonth%oneWeek%oneDay%oneHour/oneMin);
                    var hour = Math.floor(time%oneMonth%oneWeek%oneDay/oneHour);
                    var day = Math.floor(time%oneMonth%oneWeek/oneDay);
                    var week = Math.floor(time%oneMonth/oneWeek);
                    var month = Math.floor(time/oneMonth);
                    // (month > 0) && (tmp += month + unit.month);
                    // (week > 0) && (tmp += ((tmp.length > 0) && " ") + week + unit.week) && ((week > 1) && (tmp += "s"));
                    day = month * 30 + week * 7 + day;
                    (day > 0) && (tmp += ((tmp.length > 0) && " ") + day + unit.day) && ((day > 1) && (tmp += "s"));
                    (hour > 0) && (tmp += ((tmp.length > 0) && " ") + hour + unit.hour) && ((hour > 1) && (tmp += "s"));
                    (min > 0) && (tmp += ((tmp.length > 0) && " ") + min + unit.minute)  && ((min > 1) && (tmp += "s"));
                    (seconds > 0) && (tmp += ((tmp.length > 0) && " ") + seconds + unit.seconds);
                    return tmp;
                };
                function filterMeters(meter) {
                    var km = 1000;
                    if(meter < 1000){
                        return meter.toFixed(2) + " m";
                    }else{
                        return (meter/km).toFixed(2) + " km";
                    }
                }
                return filVal;
            };
        })
    //中文过滤器
    .filter('chFilter', function(langService, formService, $filter) {
        return function(value, scope, check) {
            var lang = langService.getCurrentLang();
            value = angular.lowercase(value);
            var maxArea = 314159265;//围栏最大面积
            var user_limit = formService.getUserLimit();//表单限制
            var filVal = value;
            switch (value){
                case "uuid": case "id":
                    filVal = angular.uppercase(value);
                    break;
                case "mark":
                    if(lang === 'zh' || lang === 1) {filVal = '设备编号';}
                    else {filVal = 'S/N';}
                    break;
                case "longitude":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '经度';}
                    else {filVal = 'Longitude';}
                    break;
                case "latitude":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '纬度';}
                    else {filVal = 'Latitude';}
                    break;
                case "used_star":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '定位卫星数';}
                    else {filVal = 'SatCount';}
                    break;
                case "updated_at":
                    switch (scope){
                        case "device_set":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '最后修改时间';}
                            else {filVal = 'Last Modification';}
                            break;
                        case "device_list":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '最后通信时间';}
                            else {filVal = 'Last Network session';}
                            break;
                        case "gps": case "chart": case "behavior": case "bird":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '上传时间';}
                            else {filVal = 'Uploading Time';}
                            break;
                        case "user":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '最后更新时间';}
                            else {filVal = 'Last Upload Time';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '上传';}
                            else {filVal = 'Connected At';}
                            break;
                    }
                    break;
                case "timestamp":
                    switch (scope){
                        case "device_list":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '最后采集时间';}
                            else {filVal = 'Last Data';}
                            break;
                        case "gps": case "behavior": case "bird":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '采集时间';}
                            else {filVal = 'Acquisition Time';}
                            break;
                        case "chart":
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '定位时长';}
                            else {filVal = 'Time for Positioning';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '采集';}
                            else {filVal = 'Updated At';}
                            break;
                    }
                    break;
                case "fix_time":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '定位时长';}
                    else {filVal = 'Time for Positioning';}
                    break;
                case "speed":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '速度';}
                    else {filVal = 'Velocity';}
                    break;
                case "altitude":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '海拔高度';}
                    else {filVal = 'Altitude';}
                    break;
                case "battery_voltage": case "device_voltage":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '电压';}
                    else {filVal = 'Voltage';}
                    break;
                case "dimension":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '定位模式';}
                    else {filVal = 'Fix Mode';}
                    break;
                case "choose_dimension":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '选择定位模式';}
                    else {filVal = 'Choose Mode';}
                    break;
                case "horizontal":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '水平精度';}
                    else {filVal = 'HorAccuracy';}
                    break;
                case "vertical":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '垂直精度';}
                    else {filVal = 'VerAccuracy';}
                    break;
                case "course":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '航向';}
                    else {filVal = 'Azimuth';}
                    break;
                case "light":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '光照';}
                    else {filVal = 'Light Intensity';}
                    break;
                case "humidity":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '湿度';}
                    else {filVal = 'Humidity';}
                    break;
                case "pressure":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '气压';}
                    else {filVal = 'Air Pressure';}
                    break;
                case "signal_strength":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '网络信号强度';}
                    else {filVal = 'Network SigStrength';}
                    break;
                case "biological_type":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '生物类型';}
                    else {filVal = 'Biotype';}
                    break;
                case "owner":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '来源';}
                    else {filVal = 'Source';}
                    break;
                case "device":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '设备';}
                    else {filVal = 'Device';}
                    break;
                case "please_enter":
                    if(lang === 'zh' || lang === 1 || lang === 1) {filVal = '请输入';}
                    else {filVal = 'Please Enter ';}
                    break;
                case "search":
                    if(lang === 'zh' || lang === 1) {filVal = '搜索';}
                    else {filVal = 'Search';}
                    break;
                case "search_range_device":
                    if(lang === 'zh' || lang === 1) {filVal = '搜索设备';}
                    else {filVal = 'Search for Devices';}
                    break;
                case "delete_search_range":
                    if(lang === 'zh' || lang === 1) {filVal = '取消选定区域 ';}
                    else {filVal = 'Cancel Selection';}
                    break;
                case "confirm":
                    if(lang === 'zh' || lang === 1) {filVal = '确认';}
                    else {filVal = 'Confirm';}
                    break;
                case "save":
                    switch (scope){
                        case "mode":
                            if(lang === 'zh' || lang === 1) {filVal = '省电模式';}
                            else {filVal = 'Power-Saving  Mode';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '保存';}
                            else {filVal = 'Save';}
                            break;
                    }
                    break;
                case "nosave":
                    if(lang === 'zh' || lang === 1) {filVal = '不保存';}
                    else {filVal = 'Do Not Save';}
                    break;
                case "cancel":
                    if(lang === 'zh' || lang === 1) {filVal = '取消';}
                    else {filVal = 'Cancel';}
                    break;
                case "submit":
                    if(lang === 'zh' || lang === 1) {filVal = '提交';}
                    else {filVal = 'Submit';}
                    break;
                case "advanced_search":
                    if(lang === 'zh' || lang === 1) {filVal = '高级搜索';}
                    else {filVal = 'Advanced Search';}
                    break;
                case "login":
                    if(lang === 'zh' || lang === 1) {filVal = '登录';}
                    else {filVal = 'Login';}
                    break;
                case "logout":
                    if(lang === 'zh' || lang === 1) {filVal = '注销';}
                    else {filVal = 'Logout';}
                    break;
                case "switch_account":
                    if(lang === 'zh' || lang === 1) {filVal = '切换账号';}
                    else {filVal = 'Switch Account';}
                    break;
                case "latest_notification":
                    if(lang === 'zh' || lang === 1) {filVal = '最新通知';}
                    else {filVal = 'Latest Notification';}
                    break;
                case "view_all":
                    if(lang === 'zh' || lang === 1) {filVal = '查看全部';}
                    else {filVal = 'View All';}
                    break;
                case "view_details":
                    if(lang === 'zh' || lang === 1) {filVal = '查看详情';}
                    else {filVal = 'View Details';}
                    break;
                case "close":
                    if(lang === 'zh' || lang === 1) {filVal = '关闭';}
                    else {filVal = 'Close';}
                    break;
                case "edit_per_pro":
                    if(lang === 'zh' || lang === 1) {filVal = '编辑个人资料';}
                    else {filVal = 'Edit Personal Profile';}
                    break;
                case "retrieve_password":
                    if(lang === 'zh' || lang === 1) {filVal = '找回密码';}
                    else {filVal = 'Retrieve Password';}
                    break;
                case "enter":
                    if(lang === 'zh' || lang === 1) {filVal = '输入';}
                    else {filVal = 'Enter ';}
                    break;
                case "remember_login_state":
                    if(lang === 'zh' || lang === 1) {filVal = '记住登录';}
                    else {filVal = 'Remember Me';}
                    break;
                case "forget":
                    if(lang === 'zh' || lang === 1) {filVal = '忘记';}
                    else {filVal = 'Forget ';}
                    break;
                case "username": case "account_name":
                    switch (scope){
                        case "placeholder":
                            if(lang === 'zh' || lang === 1) {filVal = '字母、数字或两者的组合（' + user_limit.username[0] + '-' + user_limit.username[1] + '）';}
                            else {filVal = 'Letter/Number/Combination (' + user_limit.username[0] + '-' + user_limit.username[1] + ' digits)';}
                            break;
                        case "input":
                            if(lang === 'zh' || lang === 1) {filVal = '请输入用户名。';}
                            else {filVal = 'Enter username.';}
                            break;
                        case "blank":
                            if(lang === 'zh' || lang === 1) {filVal = '用户名不能为空。';}
                            else {filVal = 'Username cannot be null.';}
                            break;
                        case "min_length":
                            if(lang === 'zh' || lang === 1) {filVal = '用户名不能少于' + user_limit.username[0] + '个字符。';}
                            else {filVal = 'Username cannot be less than ' + user_limit.username[0] + ' characters.';}
                            break;
                        case "max_length":
                            if(lang === 'zh' || lang === 1) {filVal = '用户名不能大于' + user_limit.username[1] + '个字符。';}
                            else {filVal = 'Username cannot be greater than ' + user_limit.username[1] + ' characters.';}
                            break;
                        case "pattern":
                            if(lang === 'zh' || lang === 1) {filVal = '用户名不能包括中文、特殊字符。';}
                            else {filVal = 'Username cannot include Chinese and special characters.';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '用户名';}
                            else {filVal = 'Username';}
                            // console.log("username default----------",value,scope,filVal);
                            break;
                    }
                    break;
                case "password":
                    switch (scope){
                        case "placeholder":
                            if(lang === 'zh' || lang === 1) {filVal = '字母、数字或两者的组合（' + user_limit.password[0] + '-' + user_limit.password[1] + '）';}
                            else {filVal = 'Letter/Number/combination (' + user_limit.password[0] + '-' + user_limit.password[1] + ' digits)';}
                            break;
                        case "input":
                            if(lang === 'zh' || lang === 1) {filVal = '请输入密码。';}
                            else {filVal = 'Enter password.';}
                            break;
                        case "blank":
                            if(lang === 'zh' || lang === 1) {filVal = '密码不能为空。';}
                            else {filVal = 'Password cannot be null.';}
                            break;
                        case "min_length":
                            if(lang === 'zh' || lang === 1) {filVal = '密码不能少于' + user_limit.password[0] + '个字符。';}
                            else {filVal = 'Password cannot be less than ' + user_limit.password[0] + ' characters.';}
                            break;
                        case "max_length":
                            if(lang === 'zh' || lang === 1) {filVal = '密码不能大于' + user_limit.password[1] + '个字符。';}
                            else {filVal = 'Password cannot be greater than ' + user_limit.password[1] + ' characters.';}
                            break;
                        case "pattern":
                            if(lang === 'zh' || lang === 1) {filVal = '密码格式错误。';}
                            else {filVal = 'Password format error.';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '密码';}
                            else {filVal = 'Password';}
                            break;
                    }
                    break;
                case "re_password":
                    switch (scope){
                        case "input":
                            if(lang === 'zh' || lang === 1) {filVal = '请确认密码。';}
                            else {filVal = 'Enter the user password again.';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '请重复输入密码';}
                            else {filVal = 'Enter Password Again Please';}
                            break;
                    }
                    break;
                case "confirm_password":
                    if(lang === 'zh' || lang === 1) {filVal = '确认密码';}
                    else {filVal = 'Confirm New Password';}
                    break;
                case "email":
                    switch (scope){
                        case "placeholder":
                            if(lang === 'zh' || lang === 1) {filVal = 'abc@abc.com';}
                            else {filVal = 'abc@abc.com';}
                            break;
                        case "input":
                            if(lang === 'zh' || lang === 1) {filVal = '请输入邮箱。';}
                            else {filVal = 'Enter email.';}
                            break;
                        case "blank":
                            if(lang === 'zh' || lang === 1) {filVal = '邮箱不能为空。';}
                            else {filVal = 'Email cannot be null.';}
                            break;
                        case "pattern":
                            if(lang === 'zh' || lang === 1) {filVal = '邮箱格式错误。';}
                            else {filVal = 'Email Format Error.';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '邮箱';}
                            else {filVal = 'Email';}
                            break;
                    }
                    break;
                case "phone":
                    switch (scope){
                        case "placeholder":
                            if(lang === 'zh' || lang === 1) {filVal = '联系电话';}
                            else {filVal = 'Phone Number';}
                            break;
                        case "input":
                            if(lang === 'zh' || lang === 1) {filVal = '请输入联系电话。';}
                            else {filVal = 'Enter phone.';}
                            break;
                        case "blank":
                            if(lang === 'zh' || lang === 1) {filVal = '联系电话不能为空。';}
                            else {filVal = 'Phone cannot be null.';}
                            break;
                        case "min_length":
                            if(lang === 'zh' || lang === 1) {filVal = '联系电话不能少于' + user_limit.phone[0] + '个字符。';}
                            else {filVal = 'Phone cannot be less than ' + user_limit.phone[0] + ' characters.';}
                            break;
                        case "max_length":
                            if(lang === 'zh' || lang === 1) {filVal = '联系电话不能大于' + user_limit.phone[1] + '个字符。';}
                            else {filVal = 'Phone cannot be greater than ' + user_limit.phone[1] + ' characters.';}
                            break;
                        case "pattern":
                            if(lang === 'zh' || lang === 1) {filVal = '联系电话格式错误。';}
                            else {filVal = 'Phone Format Error.';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '联系方式';}
                            else {filVal = 'Phone';}
                            break;
                    }
                    break;
                case "address":
                    switch (scope){
                        case "placeholder":
                            if(lang === 'zh' || lang === 1) {filVal = '地址信息';}
                            else {filVal = 'Address Info';}
                            break;
                        case "max_length":
                            if(lang === 'zh' || lang === 1) {filVal = '地址不能大于' + user_limit.address + '个字符。';}
                            else {filVal = 'Address cannot be greater than ' + user_limit.address + ' characters.';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '地址';}
                            else {filVal = 'Address';}
                            break;
                    }
                    break;
                case "role":
                    if(lang === 'zh' || lang === 1) {filVal = '用户类型';}
                    else {filVal = 'User Type';}
                    break;
                case "company": case "company_name":
                    if(lang === 'zh' || lang === 1) {filVal = '公司';}
                    else {filVal = 'Institution';}
                    break;
                case "export":
                    if(lang === 'zh' || lang === 1) {filVal = '导出';}
                    else {filVal = 'Export';}
                    break;
                case "choose_export":
                    if(lang === 'zh' || lang === 1) {filVal = '导出数据';}
                    else {filVal = 'Export to File';}
                    break;
                case "choose_type":
                    if(lang === 'zh' || lang === 1) {filVal = '导出类型';}
                    else {filVal = 'Export File';}
                    break;
                case "export_selected_file_to":
                    if(lang === 'zh' || lang === 1) {filVal = '导出选中设备到';}
                    else {filVal = 'Export Selected File to';}
                    break;
                case "single_file":
                    if(lang === 'zh' || lang === 1) {filVal = '单个文件';}
                    else {filVal = 'A Single File';}
                    break;
                case "multiple_file_base_on_device":
                    if(lang === 'zh' || lang === 1) {filVal = '多个文件(按设备)';}
                    else {filVal = 'Multiple Files (Based on Devices)';}
                    break;
                case "export_device_gps":
                    if(lang === 'zh' || lang === 1) {filVal = '导出环境数据';}
                    else {filVal = 'Export Env Data to File';}
                    break;
                case "selection_exit":
                    if(lang === 'zh' || lang === 1) {filVal = '退出选择';}
                    else {filVal = 'Cancel';}
                    break;
                case "kml_export":
                    if(lang === 'zh' || lang === 1) {filVal = '导出为 Kml';}
                    else {filVal = 'Export to .kml';}
                    break;
                case "excel_export":
                    if(lang === 'zh' || lang === 1) {filVal = '导出为 Excel';}
                    else {filVal = 'Export to .xlsx';}
                    break;
                case "csv_export":
                    if(lang === 'zh' || lang === 1) {filVal = '导出为 CSV';}
                    else {filVal = 'Export to .csv';}
                    break;
                case "csv_export_multiple":
                    if(lang === 'zh' || lang === 1) {filVal = '导出为单个 CSV';}
                    else {filVal = 'Export to one .csv';}
                    break;
                case "select_all":
                    if(lang === 'zh' || lang === 1) {filVal = '全选';}
                    else {filVal = 'Select All';}
                    break;
                case "see_on_map":
                    if(lang === 'zh' || lang === 1) {filVal = '在地图上标记';}
                    else {filVal = 'View On The Map';}
                    break;
                case "see_all_devices_on_map":
                    if(lang === 'zh' || lang === 1) {filVal = '在地图上查看所有设备';}
                    else {filVal = 'View All Devices On The Map';}
                    break;
                case "see_a_device_on_map":
                    if(lang === 'zh' || lang === 1) {filVal = '在地图上查看该设备';}
                    else {filVal = 'View This Device On The Map';}
                    break;
                case "device_parameter": case "modify_auth_device": case "device_set":
                    if(lang === 'zh' || lang === 1) {filVal = '设备配置';}
                    else {filVal = 'Device Setting';}
                    break;
                case "organism_info": case "view_auth_organism": case "biological_info":
                    if(lang === 'zh' || lang === 1) {filVal = '生物信息';}
                    else {filVal = 'Animal Info';}
                    break;
                case "basic_info":
                    if(lang === 'zh' || lang === 1) {filVal = '基本信息';}
                    else {filVal = 'Basic Info';}
                break;
                case "organism_measurement":
                    if(lang === 'zh' || lang === 1) {filVal = '生物体征';}
                    else {filVal = 'Measurement';}
                    break;
                case "organism_sample":
                    if(lang === 'zh' || lang === 1) {filVal = '生物样品';}
                    else {filVal = 'Organism Sample';}
                    break;
                case "operate":
                    if(lang === 'zh' || lang === 1) {filVal = '操作';}
                    else {filVal = 'Operate';}
                    break;
                case "setting":
                    if(lang === 'zh' || lang === 1) {filVal = '设置';}
                    else {filVal = 'Settings';}
                    break;
                case "temperature":
                    if(lang === 'zh' || lang === 1) {filVal = '温度';}
                    else {filVal = 'Temperature';}
                    break;
                case "previous":
                    if(lang === 'zh' || lang === 1) {filVal = '上一页';}
                    else {filVal = 'Previous';}
                    break;
                case "next":
                    if(lang === 'zh' || lang === 1) {filVal = '下一页';}
                    else {filVal = 'Next';}
                    break;
                case "data_length":
                    if(lang === 'zh' || lang === 1) {filVal = ' 条数据';}
                    else {filVal = ' Pieces of Total';}
                    break;
                case "person_info":
                    if(lang === 'zh' || lang === 1) {filVal = '个人信息';}
                    else {filVal = 'Personal Profile';}
                    break;
                case "account_info":
                    if(lang === 'zh' || lang === 1) {filVal = '账户列表';}
                    else {filVal = 'Account List';}
                    break;
                case "account":
                    if(lang === 'zh' || lang === 1) {filVal = '用户';}
                    else {filVal = 'User';}
                    break;
                case "edit_info":
                    if(lang === 'zh' || lang === 1) {filVal = '修改资料';}
                    else {filVal = 'Edit Profile';}
                    break;
                case "change_password":
                    if(lang === 'zh' || lang === 1) {filVal = '修改密码';}
                    else {filVal = 'Change Password';}
                    break;
                case "create_account_full":
                    if(lang === 'zh' || lang === 1) {filVal = '您是超级管理员,您有权限可以';}
                    else {filVal = 'As an administrator, you have the permission to ';}
                    break;
                case "create_account":
                    if(lang === 'zh' || lang === 1) {filVal = '新建账户';}
                    else {filVal = 'Create Account';}
                    break;
                case "admin_password_tip":
                    if(lang === 'zh' || lang === 1) {filVal = '请输入当前管理账号密码';}
                    else {filVal = 'Please Enter Administrator Password';}
                    break;
                case "password_auth":
                    if(lang === 'zh' || lang === 1) {filVal = '管理员密码';}
                    else {filVal = 'Password of Admin';}
                    break;
                case "reset_password":
                    if(lang === 'zh' || lang === 1) {filVal = '重置密码';}
                    else {filVal = 'Reset Password';}
                    break;
                case "new_password":
                    if(lang === 'zh' || lang === 1) {filVal = '新密码';}
                    else {filVal = 'New Password';}
                    break;
                case "custom_password":
                    if(lang === 'zh' || lang === 1) {filVal = '旧密码';}
                    else {filVal = 'Old Password';}
                    break;
                case "delete": case "delete_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '删除';}
                    else {filVal = 'Delete';}
                    break;
                case "clear":
                    if(lang === 'zh' || lang === 1) {filVal = '清除';}
                    else {filVal = 'Clear';}
                    break;
                case "device_no": case "number":
                    if(lang === 'zh' || lang === 1) {filVal = '序号';}
                    else {filVal = 'No.';}
                    break;
                case "device_number":
                    if(lang === 'zh' || lang === 1) {filVal = '设备数量';}
                    else {filVal = 'Managed Devices';}
                    break;
                case "auth_device_setting":
                    if(lang === 'zh' || lang === 1) {filVal = '修改设备配置';}
                    else {filVal = 'Modify Device Setting';}
                    break;
                case "auth_organism_info":
                    if(lang === 'zh' || lang === 1) {filVal = '查看/修改生物信息';}
                    else {filVal = 'View/Modify Animal Info';}
                    break;
                case "user_auth":
                    if(lang === 'zh' || lang === 1) {filVal = '用户授权';}
                    else {filVal = 'User Permission';}
                    break;
                case "choose_mode_set":
                    if(lang === 'zh' || lang === 1) {filVal = '选择预置模式，进行快捷设置';}
                    else {filVal = 'Choose a pre-defined mode for quick setting';}
                    break;
                case "choose_please":
                    if(lang === 'zh' || lang === 1) {filVal = '请选择';}
                    else {filVal = 'choose please ';}
                    break;
                case "choose_device_auth":
                    if(lang === 'zh' || lang === 1) {filVal = '请选择设备并分配权限！';}
                    else {filVal = 'Choose Devices and Assign Permissions!';}
                    break;
                case "data_analysis_choose_note":
                    if(lang === 'zh' || lang === 1) {filVal = '选择多个设备时，只能对比单项数据。';}
                    else {filVal = 'Only one fields of data can be selected when comparing multiple devices.';}
                    break;
                case "choose_only_one_data_type":
                    if(lang === 'zh' || lang === 1) {filVal = '多个设备只能选择单个对比项。';}
                    else {filVal = 'You can choose only one data field for more than one device.';}
                    break;
                case "choose_only_one_device":
                    if(lang === 'zh' || lang === 1) {filVal = '多个对比项只能选择单个设备。';}
                    else {filVal = 'You can choose only one device for more than one data field.';}
                    break;
                case "choose_a_device":
                    if(lang === 'zh' || lang === 1) {filVal = '至少选择一个设备！';}
                    else {filVal = 'Please choose at least one device.';}
                    break;
                case "choose_a_data_type":
                    if(lang === 'zh' || lang === 1) {filVal = '至少选择一个对比项！';}
                    else {filVal = 'Please choose at least one type of data.';}
                    break;
                case "chosen":
                    if(lang === 'zh' || lang === 1) {filVal = '已选择';}
                    else {filVal = ' Chosen';}
                    break;
                case "select_device":
                    if(lang === 'zh' || lang === 1) {filVal = '选择设备';}
                    else {filVal = 'Select Device';}
                    break;
                case "add_device":
                    if(lang === 'zh' || lang === 1) {filVal = '添加设备';}
                    else {filVal = 'Add Device';}
                    break;
                case "data_contrastive_analysis":
                    if(lang === 'zh' || lang === 1) {filVal = '数据对比分析';}
                    else {filVal = 'Data Visualization';}
                    break;
                case "add_data_type":
                    if(lang === 'zh' || lang === 1) {filVal = '选择对比项';}
                    else {filVal = 'Select Data Fields';}
                    break;
                case "date":
                    if(lang === 'zh' || lang === 1) {filVal = '时间';}
                    else {filVal = 'Date';}
                    break;
                case "start_date":
                    if(lang === 'zh' || lang === 1) {filVal = '起始时间';}
                    else {filVal = 'from';}
                    break;
                case "end_date":
                    if(lang === 'zh' || lang === 1) {filVal = '截止时间';}
                    else {filVal = 'to';}
                    break;
                case "range_date":
                    if(lang === 'zh' || lang === 1) {filVal = '起止时间';}
                    else {filVal = 'Date Range';}
                    break;
                case "generating_chart":
                    if(lang === 'zh' || lang === 1) {filVal = '生成图表';}
                    else {filVal = 'Generating Charts';}
                    break;
                case "search_result":
                    if(lang === 'zh' || lang === 1) {filVal = '搜索结果';}
                    else {filVal = 'search result';}
                    break;
                case "click_to_search":
                    if(lang === 'zh' || lang === 1) {filVal = '点击这里使用' + scope + '搜索';}
                    else {filVal = 'Click here to use ' + scope + ' to search.';}
                    break;
                case "search_mark":
                    if(lang === 'zh' || lang === 1) {filVal = '搜索设备编号';}
                    else {filVal = 'Search Device S/N';}
                    break;
                case "filter_box":
                    if(lang === 'zh' || lang === 1) {filVal = '筛选框';}
                    else {filVal = 'Filter Box';}
                    break;
                case "druid_copyright":
                    if(lang === 'zh' || lang === 1) {filVal = '版权所有 © 成都德鲁伊科技有限公司';}
                    else {filVal = 'Copyright ©️ Chengdu Druid Technology.';}
                    break;
                case "phone_fax":
                    if(lang === 'zh' || lang === 1) {filVal = '电话/传真';}
                    else {filVal = 'Phone/Fax';}
                    break;
                case "account_management": case "account_edit": case "edit":
                    if(lang === 'zh' || lang === 1) {filVal = '编辑';}
                    else {filVal = 'Edit';}
                    break;
                case "view":
                    if(lang === 'zh' || lang === 1) {filVal = '查看';}
                    else {filVal = 'View';}
                    break;
                case "auth_management":
                    if(lang === 'zh' || lang === 1) {filVal = '授权';}
                    else {filVal = 'Permit';}
                    break;
                case "add_confirm":
                    if(lang === 'zh' || lang === 1) {filVal = '确认添加';}
                    else {filVal = 'Confirm';}
                    break;
                case "selected":
                    if(lang === 'zh' || lang === 1) {filVal = '已选';}
                    else {filVal = 'Selected';}
                    break;
                case "back":
                    switch (scope){
                        case "bird":
                            if(lang === 'zh' || lang === 1) {filVal = '背部';}
                            else {filVal = 'Back';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '返回';}
                            else {filVal = 'Back';}
                            break;
                    }
                    break;
                case "request_time_out":
                    if(lang === 'zh' || lang === 1) {filVal = '请求超时，请重试。';}
                    else {filVal = 'Request time out, please try again.';}
                    break;
                case "account_created":
                    if(lang === 'zh' || lang === 1) {filVal = '用户新建成功！';}
                    else {filVal = 'Account created successfully.';}
                    break;
                case "account_info_updated":
                    if(lang === 'zh' || lang === 1) {filVal = '用户信息修改成功!';}
                    else {filVal = 'Account info updated successfully.';}
                    break;
                case "password_changed":
                    if(lang === 'zh' || lang === 1) {filVal = '密码修改成功!';}
                    else {filVal = 'Password changed successfully.';}
                    break;
                case "password_not_match":
                    if(lang === 'zh' || lang === 1) {filVal = '两次输入密码不一致,请重新输入!';}
                    else {filVal = 'The two passwords you typed do not match.';}
                    break;
                case "change_success":
                    if(lang === 'zh' || lang === 1) {filVal = '修改成功!';}
                    else {filVal = 'Changed successfully.';}
                    break;
                case "selected_none":
                    if(lang === 'zh' || lang === 1) {filVal = '请至少选择一条数据！';}
                    else {filVal = 'Please choose at least one data field.';}
                    break;
                case "useful_info_none":
                    if(lang === 'zh' || lang === 1) {filVal = '无有效GPS点位。';}
                    else {filVal = 'No useful GPS info.';}
                    break;
                case "device_latest_loc":
                    if(lang === 'zh' || lang === 1) {filVal = '设备最新位置';}
                    else {filVal = 'Latest location ';}
                    break;
                case "hardware_version":
                    if(lang === 'zh' || lang === 1) {filVal = '硬件版本';}
                    else {filVal = 'Hardware Version';}
                    break;
                case "firmware_version":
                    if(lang === 'zh' || lang === 1) {filVal = '固件';}
                    else {filVal = 'FW Version';}
                    break;
                case "select_item_to_filter":
                    if(lang === 'zh' || lang === 1) {filVal = '选择筛选项';}
                    else {filVal = 'Select Filter';}
                    break;
                case "add_item_to_filter":
                    if(lang === 'zh' || lang === 1) {filVal = '添加筛选项';}
                    else {filVal = 'Add Filter';}
                    break;
                case "to":
                    if(lang === 'zh' || lang === 1) {filVal = '至';}
                    else {filVal = 'to';}
                    break;
                case "choose_range":
                    if(lang === 'zh' || lang === 1) {filVal = '选择范围';}
                    else {filVal = 'Select Range';}
                    break;
                case "hide_markers":
                    if(lang === 'zh' || lang === 1) {filVal = '显示标记';}
                    else {filVal = 'Show Markers';}
                    break;
                case "show_markers":
                    if(lang === 'zh' || lang === 1) {filVal = '显示集群';}
                    else {filVal = 'Show Cluster';}
                    break;
                case "empty_search_info":
                    if(lang === 'zh' || lang === 1) {filVal = '请输入搜索数据！';}
                    else {filVal = 'Please enter the search data.';}
                    break;
                case "src_name":
                    if(lang === 'zh' || lang === 1) {filVal = '发送人';}
                    else {filVal = 'From';}
                    break;
                // scope: device_set
                case "downloaded_at":
                    if(lang === 'zh' || lang === 1) {filVal = '配置生效时间';}
                    else {filVal = 'Setting Transmitted';}
                    break;
                case "updated_by":
                    if(lang === 'zh' || lang === 1) {filVal = '修改人';}
                    else {filVal = 'Last Modification';}
                    break;
                case "behavior_sampling_freq":
                    if(lang === 'zh' || lang === 1) {filVal = '行为采样间隔';}
                    else {filVal = 'Bhv Acquisition Interval';}
                    break;
                case "behavior_sampling_mode":
                    if(lang === 'zh' || lang === 1) {filVal = '行为采样';}
                    else {filVal = 'Bhv Acquisition';}
                    break;
                case "behavior_voltage_threshold":
                    if(lang === 'zh' || lang === 1) {filVal = '行为电压门限';}
                    else {filVal = 'Bhv Voltage Threshold';}
                    break;
                case "env_sampling_freq":
                    if(lang === 'zh' || lang === 1) {filVal = '环境采样间隔';}
                    else {filVal = 'Env Acquisition Interval';}
                    break;
                case "env_sampling_mode":
                    if(lang === 'zh' || lang === 1) {filVal = '环境采样';}
                    else {filVal = 'Env Acquisition';}
                    break;
                case "env_voltage_threshold":
                    if(lang === 'zh' || lang === 1) {filVal = '环境电压门限';}
                    else {filVal = 'Env Voltage Threshold';}
                    break;
                case "gprs_freq":
                    if(lang === 'zh' || lang === 1) {filVal = '网络通信间隔';}
                    else {filVal = 'Network Interval';}
                    break;
                case "gprs_mode":
                    if(lang === 'zh' || lang === 1) {filVal = '网络通信';}
                    else {filVal = 'Network';}
                    break;
                case "gprs_version":
                    if(lang === 'zh' || lang === 1) {filVal = 'GPRS反转门限';}
                    else {filVal = 'GPRS Reversal Threshold';}
                    break;
                case "gprs_voltage_threshold":
                    if(lang === 'zh' || lang === 1) {filVal = 'GPRS电压门限';}
                    else {filVal = 'GPRS Voltage Threshold';}
                    break;
                case "ota_voltage_threshold":
                    if(lang === 'zh' || lang === 1) {filVal = 'OTA电压门限';}
                    else {filVal = 'OTA Voltage Threshold';}
                    break;
                case "sp_number":
                    if(lang === 'zh' || lang === 1) {filVal = '短信sp号码';}
                    else {filVal = 'SMS Sent To';}
                    break;
                case "device_list":
                    if(lang === 'zh' || lang === 1) {filVal = '设备浏览';}
                    else {filVal = 'Device List';}
                    break;
                case "data_export":
                    if(lang === 'zh' || lang === 1) {filVal = '数据导出';}
                    else {filVal = 'Data Export';}
                    break;
                // scope: nav
                case "data_analysis":
                    if(lang === 'zh' || lang === 1) {filVal = '数据分析';}
                    else {filVal = 'Visualize';}
                    break;
                case "original_data":
                    if(lang === 'zh' || lang === 1) {filVal = '数据分类';}
                    else {filVal = 'Data Category';}
                    break;
                case "gps": case "env":
                    if(lang === 'zh' || lang === 1) {filVal = '环境数据';}
                    else {filVal = 'Env Data';}
                    break;
                case "behavior": case "bhv":
                    if(lang === 'zh' || lang === 1) {filVal = '行为数据';}
                    else {filVal = 'Bhv Data';}
                    break;
                case "sms":
                    if(lang === 'zh' || lang === 1) {filVal = '短信数据';}
                    else {filVal = 'SMS Data';}
                    break;
                case "user_info":
                    if(lang === 'zh' || lang === 1) {filVal = '账户信息';}
                    else {filVal = 'Account Info';}
                    break;
                case "user_center":
                    if(lang === 'zh' || lang === 1) {filVal = '用户中心';}
                    else {filVal = 'User Center';}
                    break;
                case "push_notification":
                    if(lang === 'zh' || lang === 1) {filVal = '消息通知';}
                    else {filVal = 'Notification';}
                    break;
                case "company_bill":
                    if(lang === 'zh' || lang === 1) {filVal = '消费账单';}
                    else {filVal = 'Account Bill';}
                    break;
                case "fence":
                    if(lang === 'zh' || lang === 1) {filVal = '地理围栏';}
                    else {filVal = 'GeoFence';}
                    break;
                case "fence.list":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏列表';}
                    else {filVal = 'GeoFence List';}
                    break;
                case "fence.device":
                    if(lang === 'zh' || lang === 1) {filVal = '设备所属';}
                    else {filVal = 'Device & Fence';}
                    break;
                /**
                 * device_list
                 * note(scope: bird)
                 */
                case "description": case "note":
                    if(lang === 'zh' || lang === 1) {filVal = '备注';}
                        else {filVal = 'Remark';}
                        break;
                case "location":
                    switch (scope){
                        case "bird":
                            if(lang === 'zh' || lang === 1) {filVal = '释放地点';}
                            else {filVal = 'Releasing Site';}
                            break;
                        default:
                            if(lang === 'zh' || lang === 1) {filVal = '位置';}
                            else {filVal = 'Location';}
                            break;
                    }
                    break;
                case "permission":
                    if(lang === 'zh' || lang === 1) {filVal = '权限';}
                    else {filVal = 'Permission';}
                    break;
                case "druid":
                    var _lang = lang; //当前语言
                    (check) && (_lang = check); // 输出指定语言
                    if(_lang.indexOf("zh") >= 0) {filVal = '德鲁伊科技';}
                    else {filVal = 'Druid Technology';}
                    break;
                // gps / chart
                case "percentage":
                    if(lang === 'zh' || lang === 1) {filVal = '定位成功率';}
                    else {filVal = 'Success Rate of Positioning';}
                    break;
                // behavior
                case "activity_percent":
                    if(lang === 'zh' || lang === 1) {filVal = '活动时间';}
                    else {filVal = 'Activity Time';}
                    break;
                case "activity_intensity":
                    if(lang === 'zh' || lang === 1) {filVal = '活动强度';}
                    else {filVal = 'Activity Intensity';}
                    break;
                case "activity_time":
                    if(lang === 'zh' || lang === 1) {filVal = '相对活动强度';}
                    else {filVal = 'Relative Activity Intensity';}
                    break;
                case "activity_expend":
                    if(lang === 'zh' || lang === 1) {filVal = '活动时间占比';}
                    else {filVal = 'Activity (%)';}
                    break;
                case "sleep_time":
                    if(lang === 'zh' || lang === 1) {filVal = '相对静止强度';}
                    else {filVal = 'Relative Inactivity Intensity  ';}
                    break;
                case "sleep_expend":
                    if(lang === 'zh' || lang === 1) {filVal = '静止时间占比';}
                    else {filVal = 'Inactivity (%)';}
                    break;
                case "total_expend":
                    if(lang === 'zh' || lang === 1) {filVal = '活动总强度';}
                    else {filVal = 'Activity Intensity';}
                    break;
                // role
                case "user":
                    if(lang === 'zh' || lang === 1) {filVal = '普通用户';}
                    else {filVal = 'User';}
                    break;
                case "admin":
                    if(lang === 'zh' || lang === 1) {filVal = '管理员';}
                    else {filVal = 'Admin';}
                    break;
                // scope: bird; check: checkbox
                case "head":
                    if(lang === 'zh' || lang === 1) {filVal = '头';}
                    else {filVal = 'Head';}
                    break;
                case "breast":
                    if(lang === 'zh' || lang === 1) {filVal = '胸';}
                    else {filVal = 'Breast';}
                    break;
                case "covert":
                    if(lang === 'zh' || lang === 1) {filVal = '腹';}
                    else {filVal = 'Belly';}
                    break;
                case "tail":
                    if(lang === 'zh' || lang === 1) {filVal = '尾';}
                    else {filVal = 'Tail';}
                    break;
                case "anal":
                    if(lang === 'zh' || lang === 1) {filVal = '肛';}
                    else {filVal = 'Vent';}
                    break;
                case "throat":
                    if(lang === 'zh' || lang === 1) {filVal = '咽';}
                    else {filVal = 'Throat';}
                    break;
                case "neck":
                    if(lang === 'zh' || lang === 1) {filVal = '颈部';}
                    else {filVal = 'Neck';}
                    break;
                case "beak":
                    if(lang === 'zh' || lang === 1) {filVal = '喙部';}
                    else {filVal = 'Beak';}
                    break;
                case "leg":
                    if(lang === 'zh' || lang === 1) {filVal = '腿部';}
                    else {filVal = 'Leg';}
                    break;
                // scope: bird;
                case "bid":
                    if(lang === 'zh' || lang === 1) {filVal = '生物识别号';}
                    else {filVal = 'Animal ID';}
                    break;
                case "label":
                    if(lang === 'zh' || lang === 1) {filVal = '安装位置';}
                    else {filVal = 'Installation Position';}
                    break;
                case "species":
                    if(lang === 'zh' || lang === 1) {filVal = '物种';}
                    else {filVal = 'Species';}
                    break;
                case "age":
                    if(lang === 'zh' || lang === 1) {filVal = '年龄';}
                    else {filVal = 'Age';}
                    break;
                case "gender":
                    if(lang === 'zh' || lang === 1) {filVal = '性别';}
                    else {filVal = 'Sex';}
                    break;
                case "weight":
                    if(lang === 'zh' || lang === 1) {filVal = '重量';}
                    else {filVal = 'Weight';}
                    break;
                case "beek_length":
                    if(lang === 'zh' || lang === 1) {filVal = '喙长';}
                    else {filVal = 'Beak Length';}
                    break;
                case "head_length":
                    if(lang === 'zh' || lang === 1) {filVal = '头长';}
                    else {filVal = 'Head Length';}
                    break;
                case "wing_length":
                    if(lang === 'zh' || lang === 1) {filVal = '翅长';}
                    else {filVal = 'Wing Length';}
                    break;
                case "tarsus_long":
                    if(lang === 'zh' || lang === 1) {filVal = '跗跖 长';}
                    else {filVal = 'Tarsometatarsus Long';}
                    break;
                case "tarsus_short":
                    if(lang === 'zh' || lang === 1) {filVal = '跗跖 短';}
                    else {filVal = 'Tarsometatarsus Short';}
                    break;
                case "primary_feather_length":
                    if(lang === 'zh' || lang === 1) {filVal = '第九初羽长';}
                    else {filVal = '9th Primary';}
                    break;
                case "swab":
                    if(lang === 'zh' || lang === 1) {filVal = '拭子';}
                    else {filVal = 'Swab';}
                    break;
                case "feather":
                    if(lang === 'zh' || lang === 1) {filVal = '羽毛';}
                    else {filVal = 'Feather';}
                    break;
                case "blood":
                    if(lang === 'zh' || lang === 1) {filVal = '血液采样';}
                    else {filVal = 'Blood Sample';}
                    break;
                /**
                 * scope: show
                 */
                case true:
                    if(lang === 'zh' || lang === 1) {filVal = '显示';}
                    else {filVal = 'Show ';}
                    break;
                case false:
                    if(lang === 'zh' || lang === 1) {filVal = '隐藏';}
                    else {filVal = 'Hide ';}
                    break;
                /**
                 * scope: lang
                 */
                case "en": case "en-us":
                    switch (scope){
                        case "lang_turn":
                            if(lang === 'zh' || lang === 1) {filVal = 'Chinese';}
                            else {filVal = '中文';}
                            break;
                        default:
                            filVal = 'English';
                            break;
                    }
                    break;
                case "zh": case "zh-cn":
                    switch (scope){
                        case "lang_turn":
                            if(lang === 'zh' || lang === 1) {filVal = 'English';}
                            else {filVal = '英文';}
                            break;
                        default:
                            filVal = '中文';
                            break;
                    }
                    break;
                case "language":case "lang":
                    if(lang === 'zh' || lang === 1) {filVal = '语言';}
                    else {filVal = 'Language';}
                    break;
                case "timezone":
                    if(lang === 'zh' || lang === 1) {filVal = '时区';}
                    else {filVal = 'Time Zone';}
                    break;
                /**
                 * scope: chart_type
                 */
                case "line":
                    if(lang === 'zh' || lang === 1) {filVal = '折线图';}
                    else {filVal = 'Line Chart';}
                    break;
                case "column":
                    if(lang === 'zh' || lang === 1) {filVal = '柱状图';}
                    else {filVal = 'Bar Chart';}
                    break;
                case "scatter":
                    if(lang === 'zh' || lang === 1) {filVal = '点状图';}
                    else {filVal = 'Scatter Diagram';}
                    break;
                /**
                 * scope: tips
                 */
                case "click_to_view_device_details":
                    if(lang === 'zh' || lang === 1) {filVal = '点击查看设备详细信息';}
                    else {filVal = 'Click To See Detailed Device Info';}
                    break;
                case "ask_druid_to_retrieve_password":
                    if(lang === 'zh' || lang === 1) {filVal = '请联系您的管理员或德鲁伊工作人员为您重置密码。';}
                    else {filVal = 'Please contact your administrator or Druid to reset password！';}
                    break;
                case "mark_selected_msg_as_read":
                    if(lang === 'zh' || lang === 1) {filVal = '标记选中消息为已读';}
                    else {filVal = 'Mark selected notification as read';}
                    break;
                case "delete_selected_msg":
                    if(lang === 'zh' || lang === 1) {filVal = '删除选中消息';}
                    else {filVal = 'Delete selected notification';}
                    break;
                case "unread":
                    if(lang === 'zh' || lang === 1) {filVal = '未读';}
                    else {filVal = '未读';}
                    break;
                case "have_read":
                    if(lang === 'zh' || lang === 1) {filVal = '已读';}
                    else {filVal = 'read';}
                    break;
                case "login_auth_expired":
                    if(lang === 'zh' || lang === 1) {filVal = '登录授权已过期！';}
                    else {filVal = 'Authorized login expired!';}
                    break;
                case "request_error":
                    if(lang === 'zh' || lang === 1) {filVal = '请求格式错误！';}
                    else {filVal = 'Request format incorrect!';}
                    break;
                case "account_error":
                    if(lang === 'zh' || lang === 1) {filVal = '账号或密码错误！';}
                    else {filVal = 'Account or password incorrect!';}
                    break;
                case "operation_not_permitted":
                    if(lang === 'zh' || lang === 1) {filVal = '您无权限进行此操作！';}
                    else {filVal = 'This operation is not permitted.';}
                    break;
                case "internal_error":
                    if(lang === 'zh' || lang === 1) {filVal = '发生内部错误，请联系德鲁伊科技有限公司！';}
                    else {filVal = 'Internal error, please contact Druid!';}
                    break;
                case "exceed_map_device_compare":
                    if(lang === 'zh' || lang === 1) {filVal = '最多支持对比' + check + '个设备路线！';}
                    else {filVal = 'You can choose a maximum of' + check + 'devices at one time.';}
                    break;
                /**
                 * scope: mode
                 */
                case "realtime":
                    if(lang === 'zh' || lang === 1) {filVal = '实时模式';}
                    else {filVal = 'Real-Time Mode';}
                    break;
                case "standard":
                    if(lang === 'zh' || lang === 1) {filVal = '标准模式';}
                    else {filVal = 'Standard Mode';}
                    break;
                case "standby":
                    if(lang === 'zh' || lang === 1) {filVal = '待机模式';}
                    else {filVal = 'Standby Mode';}
                    break;
                case "custom":
                    if(lang === 'zh' || lang === 1) {filVal = '自定义模式';}
                    else {filVal = 'Custom Mode';}
                    break;
                case "env_acquisition":
                    if(lang === 'zh' || lang === 1) {filVal = '环境采样';}
                    else {filVal = 'Env Acquisition';}
                    break;
                case "behavior_acquisition":
                    if(lang === 'zh' || lang === 1) {filVal = '行为采样';}
                    else {filVal = 'Bhv Acquisition';}
                    break;
                case "gprs_acquisition":
                    if(lang === 'zh' || lang === 1) {filVal = '网络通信';}
                    else {filVal = 'Network';}
                    break;
                case "time_interval":
                    if(lang === 'zh' || lang === 1) {filVal = '时间间隔';}
                    else {filVal = 'Time Interval';}
                    break;
                case "threshold_voltage":
                    if(lang === 'zh' || lang === 1) {filVal = '电压门限';}
                    else {filVal = 'Voltage Threshold';}
                    break;
                /**
                 * scope: data-inside
                 */
                case "deleted_user":
                    if(lang === 'zh' || lang === 1) {filVal = '成功删除用户' + check + '!';}
                    else {filVal = 'Account \"' + check + '\" deleted successfully.';}
                    break;
                case "selected_device_max":
                    if(lang === 'zh' || lang === 1) {filVal = '最多选择' + check + '个设备！';}
                    else {filVal = 'Choose a maximum of ' + check + ' devices.';}
                    break;
                case "selected_items_max":
                    if(lang === 'zh' || lang === 1) {filVal = '最多选择' + check + '个对比项！';}
                    else {filVal = 'Choose a maximum of ' + check + ' comparative items.';}
                    break;
                case "delete_user_sure":
                    if(lang === 'zh' || lang === 1) {filVal = '确定要删除用户' + check + ' ？';}
                    else {filVal = 'Are you sure you want to delete account <span class=\"yellow\">' + check + '</span> ？';}
                    break;
                /**
                 * scope: fence
                 */
                case "center":
                    if(lang === 'zh' || lang === 1) {filVal = '圆心';}
                    else {filVal = 'Center';}
                    break;
                case "radius":
                    if(lang === 'zh' || lang === 1) {filVal = '半径';}
                    else {filVal = 'Radius';}
                    break;
                case "nw_corner":
                    if(lang === 'zh' || lang === 1) {filVal = '左上角';}
                    else {filVal = 'Left-top';}
                    break;
                case "se_corner":
                    if(lang === 'zh' || lang === 1) {filVal = '右下角';}
                    else {filVal = 'Right-bot';}
                    break;
                case "fence_name":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏名';}
                    else {filVal = 'Geofence Name';}
                    break;
                case "device_count":
                    if(lang === 'zh' || lang === 1) {filVal = '设备数量';}
                    else {filVal = 'Device No.';}
                    break;
                case "notification_type":
                    if(lang === 'zh' || lang === 1) {filVal = '通知类型';}
                    else {filVal = 'Notification Type';}
                    break;
                case "fence_list":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏列表';}
                    else {filVal = 'GeoFence List';}
                    break;
                case "create_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '新建围栏';}
                    else {filVal = 'Add Geofence';}
                    break;
                case "edit_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '编辑围栏';}
                    else {filVal = 'Edit Geofence';}
                    break;
                case "add_devices":
                    if(lang === 'zh' || lang === 1) {filVal = '添加设备';}
                    else {filVal = 'Add Devices';}
                    break;
                case "quick_search":
                    if(lang === 'zh' || lang === 1) {filVal = '快速查找';}
                    else {filVal = 'Quick Search';}
                    break;
                case "device_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '设备所属';}
                    else {filVal = 'Device Fence';}
                    break;
                case "fence_range":
                    if(lang === 'zh' || lang === 1) {filVal = '范围';}
                    else {filVal = 'Range';}
                    break;
                case "fence_area":
                    if(lang === 'zh' || lang === 1) {filVal = '面积';}
                    else {filVal = 'Area';}
                    break;
                case "view_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '查看围栏';}
                    else {filVal = 'View fence';}
                    break;
                case "remove_device_from_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '移除围栏';}
                    else {filVal = 'Remove Fence';}
                    break;
                case "fence_name_maxlength_placeholder":
                    if(lang === 'zh' || lang === 1) {filVal = check +'个字符！';}
                    else {filVal = check +'characters';}
                    break;
                case "fence_name_maxlength_tip":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏名称不得多于' + check +'个字符！';}
                    else {filVal = 'Fence name must be less than ' + check +' characters.';}
                    break;
                case "rectangle_exceed":
                    if(lang === 'zh' || lang === 1) {filVal = '超过围栏最大面积限制（' + maxArea + ' m²），请编辑围栏面积！';}
                    else {filVal = 'Exceed the max limit of area of Geofence (' + maxArea + ' m²) ,please reset.';}
                    break;
                case "circle_exceed":
                    if(lang === 'zh' || lang === 1) {filVal = '超过围栏最大面积限制，已自动更改围栏面积至 ' + maxArea + ' m²!';}
                    else {filVal = 'Exceed max area limit! Automatically resized to ' + maxArea + ' m².';}
                    break;
                case "data_error":
                    if(lang === 'zh' || lang === 1) {filVal = '请检查数据！';}
                    else {filVal = 'Please check the fence data.';}
                    break;
                case "empty_fence_name":
                    if(lang === 'zh' || lang === 1) {filVal = '请输入围栏名称！';}
                    else {filVal = 'Please enter the fence name.';}
                    break;
                case "empty_fence_range":
                    if(lang === 'zh' || lang === 1) {filVal = '请绘制围栏！';}
                    else {filVal = 'Please draw a Geofence.';}
                    break;
                case "edit_fence_success":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏修改成功！';}
                    else {filVal = 'Geofence updated.';}
                    break;
                case "exceed_fence_area":
                    if(lang === 'zh' || lang === 1) {filVal = '超过围栏最大面积，约：' + maxArea + ' m²。';}
                    else {filVal = 'Exceed the max limit of area of Geofence: ' + maxArea + ' m².';}
                    break;
                case "delete_fence_success":
                    if(lang === 'zh' || lang === 1) {filVal = '成功删除围栏 \"' + check + '\" 。';}
                    else {filVal = 'Delete Geofence \"' + check + '\" successfully.';}
                    break;
                case "confirm_delete_fence":
                    if(lang === 'zh' || lang === 1) {filVal = '确定要删除围栏 <span class=\"yellow\">\"' + check + '\"</span>  ?';}
                    else {filVal = 'Confirm to delete Geofence <span class=\"yellow\">\"' + check + '\"</span>  ?';}
                    break;
                case "nosave_fence_ask":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏 <span class=\"yellow\">\"' + check + '\"</span>  未保存，确认离开？';}
                    else {filVal = 'Geofence  <span class=\"yellow\">\"' + check + '\"</span>  not saved, confirm to leave?';}
                    break;
                case "nosave_fence_ask_save":
                    if(lang === 'zh' || lang === 1) {filVal = '围栏 <span class=\"yellow\">\"' + check + '\"</span>  未保存，是否保存？';}
                    else {filVal = 'Geofence  <span class=\"yellow\">\"' + check + '\"</span>  not saved, what do you want?';}
                    break;
                case "confirm_remove_device":
                    if(lang === 'zh' || lang === 1) {filVal = '确认将围栏 <span class=\"yellow\">\"' + check.fence + '\"</span>  从设备<span class=\"yellow\">\"' + check.device + '\"</span> 移除？';}
                    else {filVal = 'Confirm to remove Geofence <span class=\"yellow\">\"' + check.fence + '\"</span>  from Device <span class=\"yellow\">\"' + check.device + '\"</span> ?';}
                    break;
                    // 计费
                case "sum":
                    if(lang === 'zh' || lang === 1) {filVal = '金额';}
                    else {filVal = 'Sum';}
                    break;
                case "balance":
                    if(lang === 'zh' || lang === 1) {filVal = '余额';}
                    else {filVal = 'Balance';}
                    break;
                case "expense":
                    if(lang === 'zh' || lang === 1) {filVal = '消费';}
                    else {filVal = 'Expense';}
                    break;
                case "expense_record":
                    if(lang === 'zh' || lang === 1) {filVal = '消费记录';}
                    else {filVal = 'Expense Record';}
                    break;
                case "expense_date":
                    if(lang === 'zh' || lang === 1) {filVal = '消费时间';}
                    else {filVal = 'Expense Date';}
                    break;
                case "expense_sum":
                    if(lang === 'zh' || lang === 1) {filVal = '消费金额';}
                    else {filVal = 'Expense Sum';}
                    break;
                case "recharge_record":
                    if(lang === 'zh' || lang === 1) {filVal = '充值记录';}
                    else {filVal = 'Recharge Record';}
                    break;
                case "recharge":
                    if(lang === 'zh' || lang === 1) {filVal = '充值';}
                    else {filVal = 'Recharge';}
                    break;
                case "deduction_rule":
                    if(lang === 'zh' || lang === 1) {filVal = '扣费规则';}
                    else {filVal = 'Fee Deduction Rule';}
                    break;
                case "device_expense_detail":
                    if(lang === 'zh' || lang === 1) {filVal = '设备消费明细';}
                    else {filVal = 'Device Expense Detail';}
                    break;
                case "monthly_bill":
                    if(lang === 'zh' || lang === 1) {filVal = '账单消费时间';}
                    else {filVal = 'Monthly Bill';}
                    break;
                case "page_show":
                    if(lang === 'zh' || lang === 1) {filVal = '分页显示';}
                    else {filVal = 'Page Show';}
                    break;
                case "pieces_one_page":
                    if(lang === 'zh' || lang === 1) {filVal = '条/页';}
                    else {filVal = 'Pieces/Page';}
                    break;
                case "image":
                    switch (scope){
                        case "start": case "begin":
                            if(lang === 'zh' || lang === 1) {filVal = "/images/pin-begin_4040.png";}
                            else {filVal = "/images/pin-begin-en_4040.png";}
                            break;
                        case "end":
                            if(lang === 'zh' || lang === 1) {filVal = "/images/pin-end_4040.png";}
                            else {filVal = "/images/pin-end-en_4040.png";}
                            break;
                        case "search":
                            filVal = "/images/pin-search1414.png";
                            break;
                        case "search-start": case "search-begin":
                            if(lang === 'zh' || lang === 1) {filVal = "/images/pin-search-begin_4040.png";}
                            else {filVal = "/images/pin-search-begin-en_4040.png";}
                            break;
                        case "search-end":
                            if(lang === 'zh' || lang === 1) {filVal = "/images/pin-search-end_4040.png";}
                            else {filVal = "/images/pin-search-end-en_4040.png";}
                            break;
                        default:
                            filVal = "/images/pin-origin_1616.png";
                            break;
                    }
                    break;
                case "empty_data":
                    if(lang === 'zh' || lang === 1) {filVal = "数据为空！";}
                    else {filVal = "No data for visualization.";}
                    break;
                case "location_undefined":
                    if(lang === 'zh' || lang === 1) {filVal = "找不到该地址";}
                    else {filVal = "Unnamed location";}
                    break;
                default:
                    switch (scope){
                        case "searchTips":
                            var data = value.data;
                            var type = value.type;
                            var length = value.length;
                            if(lang === 'zh' || lang === 1){
                                (type === "gps") && (filVal = "根据&nbsp;<span class='type'>GPS数据</span>&nbsp;:&nbsp;\“" + data + "\”&nbsp;找到&nbsp;<span class='num'>" + length + "</span>&nbsp;条数据");
                                (type === "mark" || type === "uuid") && function(){
                                    var _sInfo = data;
                                    var single = _sInfo[type];
                                    single && (_sInfo = single);
                                    filVal = "根据&nbsp;<span class='type'>" + $filter('chFilter')(type) + "</span> " + (single ? '=' : ':') + "&nbsp;\“" + _sInfo + "\”&nbsp;找到&nbsp;<span class='num'>"+length+"</span>&nbsp;个设备";
                                }();
                            }else{
                                (type === "gps") && (filVal = "<span class='num'>" + length + "</span> sets of env data" + ((length>1)?" have":" has") + " been found when <span class='type'>Filter</span> is \“" + data + "\”");
                                (type === "mark" || type === "uuid") && function(){
                                    var _sInfo = data;
                                    var single = _sInfo[type];
                                    single && (_sInfo = single);
                                    filVal = "<span class='num'>" + length + "</span> device" + ((length>1)?" have":" has") + " been found when &nbsp;<span class='type'>" + $filter('chFilter')(type) + "</span> " + (single ? '=' : ':') + "&nbsp;\“" + _sInfo + "\”";
                                }();
                            }
                            break;
                        case "$locale":
                            if(lang === 'zh' || lang === 1){
                                (value === "am") && (filVal = "\u4e0a\u5348");
                                (value === "pm") && (filVal = "\u4e0b\u5348");

                                (value === "sunday") && (filVal = "\u661f\u671f\u65e5");
                                (value === "monday") && (filVal = "\u661f\u671f\u4e00");
                                (value === "tuesday") && (filVal = "\u661f\u671f\u4e8c");
                                (value === "wednesday") && (filVal = "\u661f\u671f\u4e09");
                                (value === "thursday") && (filVal = "\u661f\u671f\u56db");
                                (value === "friday") && (filVal = "\u661f\u671f\u4e94");
                                (value === "saturday") && (filVal = "\u661f\u671f\u516d");

                                (value === "before_christ") && (filVal = "\u516c\u5143\u524d");
                                (value === "anno_domini") && (filVal = "\u516c\u5143");

                                (value === "bc") && (filVal = "\u516c\u5143\u524d");
                                (value === "ad") && (filVal = "\u516c\u5143");

                                (value === "january") && (filVal = "\u4e00\u6708");
                                (value === "february") && (filVal = "\u4e8c\u6708");
                                (value === "march") && (filVal = "\u4e09\u6708");
                                (value === "april") && (filVal = "\u56db\u6708");
                                (value === "May") && (filVal = "\u4e94\u6708");
                                (value === "june") && (filVal = "\u516d\u6708");
                                (value === "july") && (filVal = "\u4e03\u6708");
                                (value === "august") && (filVal = "\u516b\u6708");
                                (value === "september") && (filVal = "\u4e5d\u6708");
                                (value === "october") && (filVal = "\u5341\u6708");
                                (value === "november") && (filVal = "\u5341\u4e00\u6708");
                                (value === "december") && (filVal = "\u5341\u4e8c\u6708");

                                (value === "sun") && (filVal = "\u5468\u65e5");
                                (value === "mon") && (filVal = "\u5468\u4e00");
                                (value === "tue") && (filVal = "\u5468\u4e8c");
                                (value === "wed") && (filVal = "\u5468\u4e09");
                                (value === "thu") && (filVal = "\u5468\u56db");
                                (value === "fri") && (filVal = "\u5468\u4e94");
                                (value === "sat") && (filVal = "\u5468\u516d");

                                (value === "jan") && (filVal = "1\u6708");
                                (value === "feb") && (filVal = "2\u6708");
                                (value === "mar") && (filVal = "3\u6708");
                                (value === "apr") && (filVal = "4\u6708");
                                (value === "may") && (filVal = "5\u6708");
                                (value === "jun") && (filVal = "6\u6708");
                                (value === "jul") && (filVal = "7\u6708");
                                (value === "aug") && (filVal = "8\u6708");
                                (value === "sep") && (filVal = "9\u6708");
                                (value === "oct") && (filVal = "10\u6708");
                                (value === "nov") && (filVal = "11\u6708");
                                (value === "dec") && (filVal = "12\u6708");

                                (value === "fullDate") && (filVal = "y\u5e74M\u6708d\u65e5EEEE");
                                (value === "longDate") && (filVal = "y\u5e74M\u6708d\u65e5");
                                (value === "medium") && (filVal = "y\u5e74M\u6708d\u65e5 ah:mm:ss");
                                (value === "mediumDate") && (filVal = "y\u5e74M\u6708d\u65e5");
                                (value === "mediumTime") && (filVal = "ah:mm:ss");
                                (value === "short") && (filVal = "y/M/d ah:mm");
                                (value === "shortDate") && (filVal = "y/M/d");
                                (value === "shortTime") && (filVal = "ah:mm");

                                (value === "CURRENCY_SYM") && (filVal = "\u00a5");
                                (value === "DECIMAL_SEP") && (filVal = ".");
                                (value === "GROUP_SEP") && (filVal = ",");

                                (value === "negPre") && (filVal = "-\u00a4");
                                (value === "posPre") && (filVal = "\u00a4");

                                (value === "context_button_title") && (filVal = "图表导出菜单");
                                (value === "download_jpeg") && (filVal = "下载JPEG图片");
                                (value === "download_pdf") && (filVal = "下载PDF文件");
                                (value === "download_png") && (filVal = "下载PNG文件");
                                (value === "download_svg") && (filVal = "下载SVG文件");
                                (value === "print_chart") && (filVal = "打印图表");

                                (value === "unit_day") && (filVal = "天");
                                (value === "unit_week") && (filVal = "周");
                                (value === "unit_month") && (filVal = "个月");
                                (value === "unit_year") && (filVal = "年");
                                (value === "all") && (filVal = "全部");
                            }
                            else{
                                (value === "am") && (filVal = "AM");
                                (value === "pm") && (filVal = "PM");

                                (value === "sunday") && (filVal = "Sunday");
                                (value === "monday") && (filVal = "Monday");
                                (value === "tuesday") && (filVal = "Tuesday");
                                (value === "wednesday") && (filVal = "Wednesday");
                                (value === "thursday") && (filVal = "Thursday");
                                (value === "friday") && (filVal = "Friday");
                                (value === "saturday") && (filVal = "Saturday");

                                (value === "before_christ") && (filVal = "Before Christ");
                                (value === "anno_domini") && (filVal = "Anno Domini");

                                (value === "bc") && (filVal = "BC");
                                (value === "ad") && (filVal = "AD");

                                (value === "january") && (filVal = "January");
                                (value === "february") && (filVal = "February");
                                (value === "march") && (filVal = "March");
                                (value === "april") && (filVal = "April");
                                (value === "May") && (filVal = "May");
                                (value === "june") && (filVal = "June");
                                (value === "july") && (filVal = "July");
                                (value === "august") && (filVal = "August");
                                (value === "september") && (filVal = "September");
                                (value === "october") && (filVal = "October");
                                (value === "november") && (filVal = "November");
                                (value === "december") && (filVal = "December");

                                (value === "sun") && (filVal = "Sun");
                                (value === "mon") && (filVal = "Mon");
                                (value === "tue") && (filVal = "Tue");
                                (value === "wed") && (filVal = "Wed");
                                (value === "thu") && (filVal = "Thu");
                                (value === "fri") && (filVal = "Fri");
                                (value === "sat") && (filVal = "Sat");

                                (value === "jan") && (filVal = "Jan");
                                (value === "feb") && (filVal = "Feb");
                                (value === "mar") && (filVal = "Mar");
                                (value === "apr") && (filVal = "Apr");
                                (value === "may") && (filVal = "May");
                                (value === "jun") && (filVal = "Jun");
                                (value === "jul") && (filVal = "Jul");
                                (value === "aug") && (filVal = "Aug");
                                (value === "sep") && (filVal = "Sep");
                                (value === "oct") && (filVal = "Oct");
                                (value === "nov") && (filVal = "Nov");
                                (value === "dec") && (filVal = "Dec");

                                (value === "fullDate") && (filVal = "EEEE, MMMM d, y");
                                (value === "longDate") && (filVal = "MMMM d, y");
                                (value === "medium") && (filVal = "MMM d, y h:mm:ss a");
                                (value === "mediumDate") && (filVal = "MMM d, y");
                                (value === "mediumTime") && (filVal = "h:mm:ss a");
                                (value === "short") && (filVal = "M/d/yy h:mm a");
                                (value === "shortDate") && (filVal = "M/d/yy");
                                (value === "shortTime") && (filVal = "h:mm a");

                                (value === "CURRENCY_SYM") && (filVal = "$");
                                (value === "DECIMAL_SEP") && (filVal = ".");
                                (value === "GROUP_SEP") && (filVal = ",");

                                (value === "negPre") && (filVal = "-\u00a4");
                                (value === "posPre") && (filVal = "\u00a4");

                                (value === "context_button_title") && (filVal = "chart context menu");
                                (value === "download_jpeg") && (filVal = "Download JPEG image");
                                (value === "download_pdf") && (filVal = "Download PDF document");
                                (value === "download_png") && (filVal = "Download PNG image");
                                (value === "download_svg") && (filVal = "Download SVG vector image");
                                (value === "print_chart") && (filVal = "print chart");

                                (value === "unit_day") && (filVal = "d");
                                (value === "unit_week") && (filVal = "w");
                                (value === "unit_month") && (filVal = "m");
                                (value === "unit_year") && (filVal = "y");
                                (value === "all") && (filVal = "all");
                            }
                            break;
                        case "update":
                            var deviceData = value.data;
                            var nameType = value.type;
                            if(lang === 'zh' || lang === 1){
                                (nameType === "device_setting") && (filVal = "此操作将修改设备: " + deviceData + " 的配置信息");
                                (nameType === "biological_info") && (filVal = "此操作将修改设备: " + deviceData + " 的生物信息");
                            }
                            else{
                                (nameType === "device_setting") && (filVal = "Are you sure you want to update the " + $filter("chFilter")("device_set") + " of " + deviceData + " ?");
                                (nameType === "biological_info") && (filVal = "Are you sure you want to update the " + $filter("chFilter")("device_set") + " of " + deviceData + " ?");
                            }
                            break;
                        case "pay_rule":
                            var rule = value.split(',');
                            var ruleType = parseInt(rule[0]);
                            var ruleCase = parseInt(rule[1]);
                            var ruleMoney = parseFloat(rule[2]);
                            if(lang === 'zh' || lang === 1){
                                if(ruleType === 1){
                                  if(ruleCase === 1){
                                      filVal = "按小时计费，" + ruleMoney + "元 / 小时";
                                  }
                                  else if(ruleCase === 2){
                                      filVal = "按天计费，" + ruleMoney + "元 / 天";
                                  }
                                  else if(ruleCase === 3){
                                      filVal = "按月计费，" + ruleMoney + "元 / 月";
                                  }
                                }else if(ruleType === 2){
                                    if(ruleCase === 1){
                                        filVal = "中国移动";
                                    }
                                    else if(ruleCase === 2){
                                        filVal = "中国联通";
                                    }
                                    else if(ruleCase === 3){
                                        filVal = "中国电信";
                                    }
                                }
                            }
                            else{
                                if(ruleType === 1){
                                    if(ruleCase === 1){
                                        filVal = "Based on Hour, " + $filter('currency')(ruleMoney,"¥") + " a Hour";
                                    }
                                    else if(ruleCase === 2){
                                        filVal = "Based on Day, " + $filter('currency')(ruleMoney,"¥") + " a Day";
                                    }
                                    else if(ruleCase === 3){
                                        filVal = "Based on Month, " + $filter('currency')(ruleMoney,"¥") + " a Month";
                                    }
                                }
                                else if(ruleType === 2){
                                    if(ruleCase === 1){
                                        filVal = "China Mobile";
                                    }
                                    else if(ruleCase === 2){
                                        filVal = "China Unicom";
                                    }
                                    else if(ruleCase === 3){
                                        filVal = "China Telecom";
                                    }
                                }
                            }
                            break;
                        case "timezone":
                            var simple = "UTC ";
                            if(value >= 0){
                                simple += "+";
                            }
                            var hour = parseInt(value/60);
                            var minute = Math.abs(value%60);
                            filVal = simple + hour.toString();
                            if(minute > 0){
                                filVal += ":" + minute.toString();
                            }
                            switch(value){
                                case -720:
                                    if(lang === 'zh' || lang === 1){ filVal += "（国际换日线）"; }
                                    else{ filVal += "(IDL)"; }
                                    break;
                                case -660:
                                    if(lang === 'zh' || lang === 1){ filVal += "（中途岛标准时间）"; }
                                    else{ filVal += "(MIT)"; }
                                    break;
                                case -600:
                                    if(lang === 'zh' || lang === 1){ filVal += "（夏威夷-阿留申标准时间）"; }
                                    else{ filVal += "(HST)"; }
                                    break;
                                case -570:
                                    if(lang === 'zh' || lang === 1){ filVal += "（马克萨斯群岛标准时间）"; }
                                    else{ filVal += "(MSIT)"; }
                                    break;
                                case -540:
                                    if(lang === 'zh' || lang === 1){ filVal += "（阿拉斯加标准时间）"; }
                                    else{ filVal += "(AKST)"; }
                                    break;
                                case -480:
                                    if(lang === 'zh' || lang === 1){ filVal += "（太平洋标准时间）"; }
                                    else{ filVal += "(PST)"; }
                                    break;
                                case -420:
                                    if(lang === 'zh' || lang === 1){ filVal += "（北美山区标准时间）"; }
                                    else{ filVal += "(MST)"; }
                                    break;
                                case -360:
                                    if(lang === 'zh' || lang === 1){ filVal += "（北美中部标准时间）"; }
                                    else{ filVal += "(CST)"; }
                                    break;
                                case -300:
                                    if(lang === 'zh' || lang === 1){ filVal += "（北美东部标准时间）"; }
                                    else{ filVal += "(EST)"; }
                                    break;
                                case -240:
                                    if(lang === 'zh' || lang === 1){ filVal += "（大西洋标准时间）"; }
                                    else{ filVal += "(AST)"; }
                                    break;
                                case -210:
                                    if(lang === 'zh' || lang === 1){ filVal += "（纽芬兰岛标准时间）"; }
                                    else{ filVal += "(NST)"; }
                                    break;
                                case -180:
                                    if(lang === 'zh' || lang === 1){ filVal += "（南美标准时间）"; }
                                    else{ filVal += "(SAT)"; }
                                    break;
                                case -120:
                                    if(lang === 'zh' || lang === 1){ filVal += "（巴西时间）"; }
                                    else{ filVal += "(BRT)"; }
                                    break;
                                case -60:
                                    if(lang === 'zh' || lang === 1){ filVal += "（佛得角标准时间）"; }
                                    else{ filVal += "(CVT)"; }
                                    break;
                                case 0:
                                    if(lang === 'zh' || lang === 1){ filVal += "（格林威治标准时间/欧洲西部时区）"; }
                                    else{ filVal += "(GMT/WET)"; }
                                    break;
                                case 60:
                                    if(lang === 'zh' || lang === 1){ filVal += "（佛得角标准时间 ）"; }
                                    else{ filVal += "(CET)"; }
                                    break;
                                case 120:
                                    if(lang === 'zh' || lang === 1){ filVal += "（欧洲东部时区）"; }
                                    else{ filVal += "(EET)"; }
                                    break;
                                case 180:
                                    if(lang === 'zh' || lang === 1){ filVal += "（莫斯科时区）"; }
                                    else{ filVal += "(MSK)"; }
                                    break;
                                case 210:
                                    if(lang === 'zh' || lang === 1){ filVal += "（伊朗标准时间）"; }
                                    else{ filVal += "(IRT)"; }
                                    break;
                                case 240:
                                    if(lang === 'zh' || lang === 1){ filVal += "（中东时区A）"; }
                                    else{ filVal += "(META)"; }
                                    break;
                                case 270:
                                    if(lang === 'zh' || lang === 1){ filVal += "（阿富汗标准时间）"; }
                                    else{ filVal += "(AFT)"; }
                                    break;
                                case 300:
                                    if(lang === 'zh' || lang === 1){ filVal += "（中东时区B）"; }
                                    else{ filVal += "(METB)"; }
                                    break;
                                case 330:
                                    if(lang === 'zh' || lang === 1){ filVal += "（印度标准时间）"; }
                                    else{ filVal += "(IDT)"; }
                                    break;
                                case 345:
                                    if(lang === 'zh' || lang === 1){ filVal += "（尼泊尔标准时间）"; }
                                    else{ filVal += "(NPT)"; }
                                    break;
                                case 360:
                                    if(lang === 'zh' || lang === 1){ filVal += "（孟加拉标准时间）"; }
                                    else{ filVal += "(BHT)"; }
                                    break;
                                case 390:
                                    if(lang === 'zh' || lang === 1){ filVal += "（缅甸标准时间）"; }
                                    else{ filVal += "(MRT)"; }
                                    break;
                                case 420:
                                    if(lang === 'zh' || lang === 1){ filVal += "（中南半岛标准时间）"; }
                                    else{ filVal += "(MST)"; }
                                    break;
                                case 480:
                                    if(lang === 'zh' || lang === 1){ filVal += "（东亚标准时间/中国标准时间(GMT)）"; }//BJT
                                    else{ filVal += "(EAT)"; }
                                    break;
                                case 510:
                                    if(lang === 'zh' || lang === 1){ filVal += "（朝鲜标准时间）"; }
                                    else{ filVal += "(KRT)"; }
                                    break;
                                case 540:
                                    if(lang === 'zh' || lang === 1){ filVal += "（远东标准时间）"; }
                                    else{ filVal += "(FET)"; }
                                    break;
                                case 570:
                                    if(lang === 'zh' || lang === 1){ filVal += "（澳大利亚中部标准时间）"; }
                                    else{ filVal += "(ACST)"; }
                                    break;
                                case 600:
                                    if(lang === 'zh' || lang === 1){ filVal += "（澳大利亚东部标准时间）"; }
                                    else{ filVal += "(AEST)"; }
                                    break;
                                case 630:
                                    if(lang === 'zh' || lang === 1){ filVal += "（澳大利亚远东标准时间）"; }
                                    else{ filVal += "(FAST)"; }
                                    break;
                                case 660:
                                    if(lang === 'zh' || lang === 1){ filVal += "（努阿图标准时间）"; }
                                    else{ filVal += "(VTT)"; }
                                    break;
                                case 690:
                                    if(lang === 'zh' || lang === 1){ filVal += "（诺福克岛标准时间）"; }
                                    else{ filVal += "(NFT)"; }
                                    break;
                                case 720:
                                    if(lang === 'zh' || lang === 1){ filVal += "（太平洋标准时间B）"; }
                                    else{ filVal += "(PSTB)"; }
                                    break;
                                case 765:
                                    if(lang === 'zh' || lang === 1){ filVal += "（查塔姆群岛标准时间）"; }
                                    else{ filVal += "(CIT)"; }
                                    break;
                                case 780:
                                    if(lang === 'zh' || lang === 1){ filVal += "（太平洋标准时间C）"; }
                                    else{ filVal += "(PSTC)"; }
                                    break;
                                case 840:
                                    if(lang === 'zh' || lang === 1){ filVal += "（太平洋标准时间D）"; }
                                    else{ filVal += "(PSTD)"; }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "fence":
                            switch (value){
                                case 1:
                                    if(lang === 'zh' || lang === 1) {filVal = '入界';}
                                    else {filVal = 'Enter Fence';}
                                    break;
                                case 2:
                                    if(lang === 'zh' || lang === 1) {filVal = '出界';}
                                    else {filVal = 'Exit Fence';}
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "platform":
                            switch (value){
                                case 1:
                                    if(lang === 'zh' || lang === 1) {filVal = '鸟类追踪';}
                                    else {filVal = 'Bird Tracking';}
                                    break;
                                case 2:
                                    if(lang === 'zh' || lang === 1) {filVal = '智能放牧';}
                                    else {filVal = 'Intelligent Pasturing';}
                                    break;
                                case 3:
                                    if(lang === 'zh' || lang === 1) {filVal = '畜牧';}
                                    else {filVal = 'Livestock';}
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "platform_type":
                            switch (value){
                                case 1:
                                    if(lang === 'zh' || lang === 1) {filVal = '鸟类追踪平台';}
                                    else {filVal = 'Bird Tracking Platform';}
                                    break;
                                case 2:
                                    if(lang === 'zh' || lang === 1) {filVal = '智能放牧平台';}
                                    else {filVal = 'Intelligent Pasturing Platform';}
                                    break;
                                case 3:
                                    if(lang === 'zh' || lang === 1) {filVal = '畜牧平台';}
                                    else {filVal = 'Livestock Platform';}
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "language":
                            switch (value){
                                case 0:
                                    filVal = 'English';
                                    break;
                                case 1:
                                    filVal = '中文';
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "lang_turn":
                            switch (value){
                                case 0:
                                    filVal = '中文';
                                    break;
                                case 1:
                                    filVal = 'English';
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "lang_code":
                            switch(value){
                                case 0:
                                    filVal = "en";
                                    break;
                                case 1:
                                    filVal = "zh-cn";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "last_month":
                            switch (value){
                                case -3:
                                    if(lang === 'zh' || lang === 1) {filVal = "最近三个月";}
                                    else {filVal = "The last three months";}
                                    break;
                                case -6:
                                    if(lang === 'zh' || lang === 1) {filVal = "最近半年";}
                                    else {filVal = "The last six months";}
                                    break;
                                case -12:
                                    if(lang === 'zh' || lang === 1) {filVal = "最近一年";}
                                    else {filVal = "The last year";}
                                    break;
                                default:
                                    if(lang === 'zh' || lang === 1) {filVal = "最近三个月";}
                                    else {filVal = "The last three months";}
                                    break;
                            }
                            break;
                        default:
                            filVal = value;
                            break;
                    }
                    break;
            }
            return filVal;
        };
    })
    // 过滤显示信息
    .filter('outFilter', function() {
        return function(value, scope) {
            if (scope === 'bird') {
                if ((value != 'time') && (value != 'id') && (value != 'updated_at') && (value != 'updated_by') && (value != 'device_id') && (value != 'timestamp'))
                {
                    return value;
                }
            }
            else if (scope === 'deviceset') {
                if ((value != 'id') && (value != 'uuid') && (value != 'device_id') && (value != 'company_id') && (value != 'updated_at') && (value != 'updated_by') && (value != 'firmware_id') && (value != 'firmware_version'))
                {
                    return value;
                }
            }
            else if (scope === 'user') {
                if ((value === 'username') || (value === 'email') || (value === 'phone') || (value === 'role') || (value === 'company_name') || value === "address")
                {
                    return value;
                }
            }
            else {
                return value;
            }
        };
    })
    // 高亮显示
    .filter('highLightFilter',[
        "$sce","voltageService",
        function ($sce,voltageService) {
        return function (value,type,info) {
           if(type === "search"){
               value = value.toString();
               info = info.toString();
               var _index = value.indexOf(info);
               var reg = new RegExp(info,"g");//全部替换
               var _value = (_index >= 0) ? value.replace(reg,"<span class='highlight'>" + info + "</span>") : _value;
               return $sce.trustAsHtml(_value);//转换为 html
            }else if(type === "color"){
                var _color = voltageService.setColor(value).color;
               return _color;
           };
        };
    }])
    // 选择框日期格式
    .filter('dateFilter',[
        '$filter',
        function ($filter) {
            return function (value) {
                var zone = "+0000";
                return $filter('date')(value,"dd/MM/yy",zone);
            }
        }
    ])
    // 格式化http返回错误
    .filter('errorFilter',[
        '$filter',
        function ($filter) {
            return function (value) {
                var tmp = value;
                if(tmp){
                    if(value.indexOf('permission') >= 0 ){
                        if(value.indexOf('setting') >= 0){
                            tmp = "你没有权限修改此设备的配置信息!";
                        }else if(value.indexOf('biological') >= 0){
                            tmp = "你没有权限查看此设备的生物信息!";
                        };
                    }else if(value.indexOf('invalid') >= 0){
                        if(value.indexOf('user') >= 0){
                            tmp = "用户名无效,请重新输入";
                        }else if(value.indexOf('password') >= 0){
                            tmp = "密码错误,请重新输入";
                        };
                    }else if(value.indexOf('exists') >= 0 && value.indexOf('user') >= 0){
                        tmp = "此用户名已存在!";
                    };
                };
                return tmp;
            }
        }
    ])
    //根据结果返回图片
    .filter('picFilter',[
        function () {
        return function (value,type) {
            var checkPic = ["images/icon/icon-grey2217.png","images/icon/icon-green2217.png"];
            var smsDiv = '<div class="pull-right sms"><img src="images/icon/icon-sim1818.png"/></div>';
            if(type === 'today_beh' || type === 'today_gps'){
                return checkPic[value];
            }else{
                return value;
            }
        }
    }])
    // 过滤数组项
    .filter('sameFilter', [
        function () {
            return function (value, array, type) {
                var filterVal = [];
                var anlyData = array ? JSON.stringify(array) : null;
                if(anlyData){
                    angular.forEach(value, function (val,index) {
                        var tmp = val.id ? val.id : val;
                        (anlyData.indexOf(tmp) < 0) && filterVal.push(val);
                    });
                }else{
                    filterVal = value;
                };
                return filterVal;
            };
        }
    ])
    // lang filter
    .filter('langFilter', [
        function () {
            return function (value) {
                var lang;
                if(value){
                    if(value.toLowerCase() === 'en-us'){
                        lang = "en";
                    }
                    else{
                        lang = value.toLowerCase();
                    }
                }
                return lang;
            };
        }
    ])
    // lang filter
    .filter('stateFilter', [
        'voltageService',
        function (voltageService) {
            return function (value,scope) {
                var filVal = '';
                var state;
                if(value !== undefined && value !== null){
                    switch(scope){
                        case 'voltage': case "battery_voltage":
                            state = voltageService.getState(value);
                            if(state === 0) { filVal = 'danger dd-battery-5';}
                            else if(state === 1) { filVal = 'warning dd-battery-50';}
                            else if(state === 2) { filVal = 'safe dd-battery-75';}
                            else if(state === 3) { filVal = 'full dd-battery-100';}
                            else{ filVal = 'dd-battery-5';} //no data
                        break;
                        case 'temperature':
                            if(value <= -5){ state = 0}
                            else if(value <= 5){ state = 1}
                            else if(value <= 30){ state = 2}
                            else if(value <= 60){ state = 3}
                            else if(value > 60){ state = 4};
                            if(state === 0) { filVal = 'black dd-temprature';}
                            else if(state === 1) { filVal = 'ice dd-temprature';}
                            else if(state === 2) { filVal = 'blue dd-temprature';}
                            else if(state === 3) { filVal = 'yellow dd-temprature';}
                            else if(state === 4) { filVal = 'danger dd-temprature';}
                            else{ filVal = 'dd-temprature';} //no data
                        break;
                        default: break;
                    }
                }
                return filVal;
            };
        }
    ])
    // lang filter
    .filter('arrayStringFilter', [
        '$filter',
        function ($filter) {
            /**
             *  转换字符串为数组
             *  "[a,b,c...,z]"
             */
            function getStr(str) {
                var _arr = [];
                str && (str = str.replace(/\s+/g, ''));
                if(str){
                    var _strs = str.slice(1,-1).split(',');
                    for(var i=0;i<_strs.length;i++){
                        var tmp = _strs[i].toLowerCase();
                        _arr.push(tmp);
                    }
                    return _arr;
                }
            };
            return function (value) {
                var filVal = getStr(value);
                return filVal;
            };
        }
    ])
    ;
}(app);
