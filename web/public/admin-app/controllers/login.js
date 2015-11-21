'use strict';

/**
 * @ngdoc controller
 * @name LoginCtrl
 * @memberof AdminApp
 * @param $scope {service} controller scope
 * @param $http {service} Angular HTTP Request Service
 * @param $state {service} UI Router State Service
 * @param localStorageService {service} Stores Data in Local Storage / Sessions on the Browser
 * @param $rootScope {service} Angular Root Scope Service
 * @param Permission {service} Sets Access Permissions based on the user type
 *
 */
app.controller('LoginCtrl', ['$scope', '$http', '$state', 'localStorageService', '$rootScope','Permission',
    function (scope, http, state, localStorageService, rootScope,Permission) {
        scope.subscriber = {};
        rootScope._subscriber = false;
        rootScope._admin = false;
        scope.authError = null;
        scope.login = function () {
            scope.authError = null;
            // Try to login
            http.post('http://anwani-devapi.c4asolution.com/subscribers/login', scope.subscriber)
                .then(function successCallback(response) {
                    if (!response.data.subscriber) {
                        scope.authError = 'Email or Password not right';
                    } else {
                        //console.log(response.data.subscriber);
                        // User Object
                        rootScope.user = response.data.subscriber;
                        localStorageService.set('user', response.data.subscriber);

                        // Token Object
                        rootScope.token = response.data.token;
                        localStorageService.set('token', response.data.token);

                        http.defaults.headers.post = { 'Authorization' : 'Bearer '+localStorageService.get('token') };
                        http.defaults.headers.get = { 'Authorization' : 'Bearer '+localStorageService.get('token') };

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
                        state.go('app.dashboard');
                        get_addresses();
                        get_users();
                        get_subscribers();
                    }
                }, function errorCallback(x) {
                    scope.authError = x.data.error.message;
                });

        };

        function get_users(){
                http.get('http://anwani-devapi.c4asolution.com/users?page=1&per_page=10'
                ).then(function(result){
                        rootScope.users = result.data.docs;
                    });

        }
        function get_addresses(){
                http.get('http://anwani-devapi.c4asolution.com/addresses',
                    {
                        params:{
                            page:1,
                            per_page:10
                        }
                    }
                ).then(function(result){
                        rootScope.addresses = result.data.docs;
                    });

        }
        function get_subscribers(){
            http.get('http://anwani-devapi.c4asolution.com/subscribers?page=1&per_page=10'
            ).then(function(result){
                    rootScope.subscribers = result.data.docs;
                });
        }
    }])
;