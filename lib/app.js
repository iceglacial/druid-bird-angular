'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
        'ui.router', //ui-router
        'ngAnimate', //
        'mgcrea.ngStrap', //angular-strap
        'ngTouch',
        'ui.select',
        'ui.grid', //ui-grid
        'ui.grid.edit',
        'ui.grid.cellNav',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.grid.exporter',
        'ui.grid.pinning',
        'ui.grid.i18n',
        'ui.grid.resizeColumns',
        'ui.grid.autoResize',
        'jQueryScrollbar',
        'ngFileSaver', //文件下载
        'angular-svg-round-progressbar',
        'ngWebSocket',//消息推送
        'highcharts-ng', //图表
        'ngStorage',
        'ngLocale',//设置语言
        'ngCookies',
        'ngSanitize' //净化html
    ])
    //页面加载完成后检查登录
    .run(function($state, $rootScope, langService, authService, httpService, $timeout,accountService,$filter,modalService) {
        var loaded = false;
        modalService.showLoadingShadow();
        if (!authService.getAuth()) {
            modalService.hideLoadingShadow();
            $state.go('login');
        }else{
            accountService.getMe(function (data) {
                loaded = true;
                // $rootScope.accountLogin = data;
                // $rootScope.$emit('initUserProfile',data && data.profile);
                // timeService.setProfileTimezone(data.profile && data.profile.time_zone);
                // $rootScope.navs = httpService.getNav(data.role);
                accountService.initMyAccount(data);
                if(!$state.current.name){
                    $timeout(function () {
                        $state.go('home');
                    },0);
                };
            },function () {
                authService.logout();
            });
            checkLoaded();
        };
        // 判断超时10s
        function checkLoaded() {
            setTimeout(function () {
                if(!loaded) {
                    $rootScope.$emit('hideLoading', "loading");
                    httpService.myAlert('danger',$filter('chFilter')('request_time_out'));
                    // $state.go('home',null,{reload:true});
                };
            },10000);
        };
    })
    // 自定义
    .config([
        "$provide","$dropdownProvider","$modalProvider","$alertProvider","$selectProvider","$datepickerProvider",
        function($provide,$dropdownProvider,$modalProvider,$alertProvider,$selectProvider,$datepickerProvider) {
            // ui-grid滚动条样式
            $provide.decorator('uiGridViewportDirective', ['$delegate','uiGridConstants', function($delegate, uiGridConstants) {
                var directive = $delegate[0];
                var origLinkFn = $delegate[0].link;
                var newLinkFn = function($scope, $element, $attrs, controllers) {
                    var grid = controllers[0].grid;
                    if (typeof $element.scrollbar === 'function') {
                        $element.addClass('scrollbar-macosx');
                        $element.scrollbar();
                        grid.options.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
                        grid.options.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
                        if (grid.hasRightContainer()) {
                            var middleContainer = angular.element(grid.element).find('.ui-grid-render-container-body');
                            middleContainer.addClass('ui-grid-render-container-middle');
                        }
                    }
                };
                directive.compile = function() {
                    return function($scope, $element, $attrs) {
                        origLinkFn.apply(this, arguments);
                        newLinkFn.apply(this, arguments);
                    };
                };
                return $delegate;
            }]);
            $provide.decorator('GridOptions',['$delegate', 'i18nService', function($delegate, i18nService){
                var gridOptions;
                gridOptions = angular.copy($delegate);
                gridOptions.initialize = function(options) {
                    var initOptions;
                    initOptions = $delegate.initialize(options);
                    return initOptions;
                };
                //es is the language prefix you want
                if(window.location.pathname.indexOf('/en') > 0){
                    i18nService.setCurrentLang('en');
                }else{
                    i18nService.setCurrentLang('zh-cn');
                }
                return gridOptions;
            }]);
            angular.extend($dropdownProvider.defaults, {
                animation: 'am-fade',
                html: true,
                //		trigger: 'hover',
                placement: 'bottom-right'
            });
            angular.extend($modalProvider.defaults, {
                html: true
            });
            angular.extend($alertProvider.defaults, {
                animation: 'am-fade-and-slide-top',
                html: true,
                placement: 'top'
            });
            angular.extend($selectProvider.defaults, {
                animation: 'am-fade',
                sort: false,
                placement: "bottom-left",
                onSelect: function(){

                }
            });
            angular.extend($datepickerProvider.defaults, {
                dateFormat: 'yyyy-MM-dd',
                startWeek: 1
            });
    }])
// 动态修改时间插件语言
//     .config(function(tmhDynamicLocaleProvider) {
//         tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');
//     })
//     .config(function ($provide) {
//         $provide.decorator('datepickerDirective', function($delegate) {
//             angular.forEach($delegate, function (directive) {
//                 var originalCompile = directive.compile;
//                 var originalLink = directive.link;
//                 console.log($delegate);
//                 if (originalCompile) {
//                     directive.compile = function () {
//                         return function (scope) {
//                             scope.$on('$localeChangeSuccess', function () {
//                                 scope.move(0);
//                             });
//                             originalLink.apply(this, arguments);
//                         };
//                     }
//                 }
//             });
//             return $delegate;
//         });
//     })
// 初始化设置 ui-grid 语言
    // .config(function($provide){
    //     $provide.decorator('GridOptions',['$delegate', 'i18nService',
    //         function($delegate, i18nService){
    //         var gridOptions;
    //         gridOptions = angular.copy($delegate);
    //         gridOptions.initialize = function(options) {
    //             var initOptions;
    //             initOptions = $delegate.initialize(options);
    //             return initOptions;
    //         };
    //         //es is the language prefix you want
    //         i18nService.setCurrentLang('ko');
    //         return gridOptions;
    //     }]);
    // })
// 解决【ng-click】触发两次事件---影响input选择框!!!
// app.config(['$provide', function ($provide) {
//     $provide.decorator('ngClickDirective',['$delegate','$timeout', function ($delegate,$timeout) {
//         var original = $delegate[0].compile;
//         var delay = 500;
//         $delegate[0].compile = function (element, attrs, transclude) {
//
//             var disabled = false;
//             function onClick(evt) {
//                 if (disabled) {
//                     evt.preventDefault();
//                     evt.stopImmediatePropagation();
//                 } else {
//                     disabled = true;
//                     $timeout(function () { disabled = false; }, delay, false);
//                 }
//             }
//             //   scope.$on('$destroy', function () { iElement.off('click', onClick); });
//             element.on('click', onClick);
//
//             return original(element, attrs, transclude);
//         };
//         return $delegate;
//     }]);
// }]);