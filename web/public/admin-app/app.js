'use strict';

/**
 * @ngdoc app AdminApp
 * @name AnwaniAdmin
 * @param ngAnimate {package}
 * @param ngTouch {package}
 * @param ui.router {package}
 * @param ui.bootstrap {package}
 * @param ui.load {package}
 * @param ui.jq {package}
 * @param oc.lazyload {package}
 * @param perfect_scrollbar {package}
 * @param angular-inview {package}
 * @param angular-loading-bar {package}
 * @param LocalStorageModule {package}
 * @param smart-table {package}
 * @param permission {package}
 * @param uiGmapgoogle-maps {package}
 * @param ui.mask {package}
 * @param angularMoment {package}
 */
var app = angular.module('AdminApp', [
    'ngAnimate',
    //    'ngCookies',
    //    'ngResource',
    //    'ngSanitize',
    'ngTouch',
    //    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    // 'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'perfect_scrollbar',
    'angular-inview',
    'angular-loading-bar',
    'LocalStorageModule',
    'smart-table',
    'permission',
    'uiGmapgoogle-maps',
    'ui.mask',
    'angularMoment'
]);
app.config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
app.config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;
        }
    ]);

/**
 * @ngdoc run
 * @description Sets the HTTP Headers including but not limited to the Authentication TOKEN.
 */
app.run(
    ['localStorageService', '$rootScope','$http','$state','Permission',
        function (localStorageService, rootScope,http,state,Permission) {


            var user = localStorageService.get('user');
            var token = localStorageService.get('token');
            rootScope.users=[];
            rootScope.subscribers=[];
            rootScope.addresses_shared = [];

            if (!rootScope.user && !rootScope.token) {

                http.defaults.headers.post = { "Content-Type": "application/json;charset=utf-8"};
                http.defaults.headers.get = { "Content-Type": "application/json;charset=utf-8"};
            }
            if(user && token){
                rootScope.user = user;
                rootScope.token = token;
                http.defaults.headers.post = { 'Authorization' : 'Bearer '+localStorageService.get('token') };
                http.defaults.headers.get = { 'Authorization' : 'Bearer '+localStorageService.get('token') }
            }


            rootScope.logout = function logout()
            {
                localStorageService.remove('user');
                localStorageService.remove('token');
                state.go('login');
                rootScope.user=null;
                http.defaults.headers.post = { "Content-Type": "application/json;charset=utf-8"};
                http.defaults.headers.get = { "Content-Type": "application/json;charset=utf-8"};

            };
            if(rootScope.user){
                //console.log(rootScope.user);
                if (rootScope.user.role) {
                    if (rootScope.user.role == "subscriber") {
                        rootScope._subscriber = true;
                        rootScope._admin = false;

                    }
                    else if (rootScope.user.role == "admin") {
                        rootScope._admin = true;
                        rootScope._subscriber = false;
                    }
                }
            }

            Permission.defineRole('subscriber', function (stateParams) {
                // If the returned value is *truthy* then the user has the role, otherwise they don't
                if(rootScope.user){
                    if (rootScope.user.role == "subscriber"){
                        return true
                    }
                }
                else{
                    return false
                }
            })
                .defineRole('admin', function (stateParams) {
                    // If the returned value is *truthy* then the user has the role, otherwise they don't
                    if(rootScope.user){
                        if (rootScope.user.role == "admin"){
                            return true
                        }
                    }
                    else{
                        return false
                    }
                });
            rootScope.state = state;
        }
    ]);

/**
 * @ngdoc       constant
 * @name        'CONSTANTS'
 * @description The URL that points to the instance of the API
 */
app.factory('CONSTANTS',function(){
    return {
        API_URL:'http://anwaniapi.mybluemix.net/'
    }
});