'use strict';

// signup controller
app.controller('RegisterFormController', ['$scope', '$http', '$state', 'localStorageService', '$rootScope','CONSTANTS',
    function (scope, http, state, localStorageService, rootScope,CONSTANTS) {
        scope.subscriber = {};
        scope.authError = null;

        /**
         * @description Register Regular User
         */
        scope.register = function () {
            scope.authError = null;
            // Try to create
            http.post(CONSTANTS+API_URL+'subscribers/signup', scope.subscriber)
                .then(function(response) {
                    if (!response.data) {
                        scope.authError = response;
                    }else{
                        rootScope.newUser = response.data;
                        state.go('welcome');
                    }
                }, function(x) {
                    scope.authError = 'Server Error';
                });
        };
        /**
         * @description Function for Registering a Subsriber
         *
         */
        scope.registerSubscriber = function registerSubscriber(){

            http.post(CONSTANTS.API_URL+'subscribers/signup', scope.subscriber)
                .then(function(response) {
                    if (!response.data) {
                        scope.authError = response;
                    }else{
                        rootScope.newUser = response.data;
                        state.go('welcome');
                    }
                }, function(x) {
                    scope.authError = 'Server Error';
                });
        }
    }])
;