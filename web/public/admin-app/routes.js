/**
 * @ngdoc config $stateProvider
 * @memberof ClientApp
 * @name stateProvider
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param JQ_CONFIG
 */
app.config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
    function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

        // For any unmatched url, redirect to /state1
        /**
         * @memberof stateProvider
         * @name urlRouterProvider
         * @param  /login {string} default route
         * @return {[type]}
         */
        $urlRouterProvider.otherwise("/login");

        // Now set up the states
        /**
         * [state description]
         * @param  {[type]} 'test'       [description]
         * @param  {[type]} {                                                            url: '/test' [description]
         * @param  {[type]} views:       {                                                                          '':           {        controller: 'publicCtrl' [description]
         * @param  {[type]} templateUrl: 'app/partials/public/index.html' [description]
         * @param  {[type]} }                                                            }            }             [description]
         * @return {[type]}              [description]
         */
        $stateProvider.state('app', {
            templateUrl: '../admin-app/partials/app.html'
        })
            .state('app.dashboard', {
                url: '/dashboard',
                views:{
                    '':{
                        templateUrl: '../admin-app/partials/app_dashboard.html'
                    },
                    'address-search@app.dashboard':{
                        controller:'AddressesCtrl',
                        templateUrl: '../admin-app/partials/addresses/card.html'
                    }
                },
                //resolve: {
                //  deps: ['$ocLazyLoad',
                //    function($ocLazyLoad) {
                //      return $ocLazyLoad.load('chart.js').then(
                //        function() {
                //          return $ocLazyLoad.load(
                //            'js/controllers/dashboard.js');
                //        }
                //      );
                //    }
                //  ]
                //}
                data: {
                    permissions: {
                        only: ['admin', 'subscriber'],
                        redirectTo:'login'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                templateUrl: '../admin-app/partials/ui-profile.html'
            })
            .state('welcome', {
                url: '/welcome',
                templateUrl: '../admin-app/partials/welcome.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: '../admin-app/partials/ui-login.html'
            })
            .state('access',{

            })
            .state('not-authorized',{
                url:'/not-authorized',
                templateUrl:'../admin-app/partials/ui-not-authorized.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: '../admin-app/partials/ui-register.html'
            })
            .state('forgot', {
                url: '/forgot',
                templateUrl: '../admin-app/partials/ui-forgotpwd.html'
            })
            .state('app.address', {
                url:'/address',
                controller:'AddressesCtrl',
                templateUrl:'../admin-app/partials/address.html',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo:'not-authorized'
                    }
                }
            })
            .state('app.address.new', {
                url: '/new',
                templateUrl: '../admin-app/partials/address-add.html'
            })
            .state('app.address.view', {
                url: '/view',
                templateUrl: '../admin-app/partials/address-view.html'
            })
            .state('app.address.one', {
                url: '/one',
                views:{
                    '':{
                        templateUrl: '../admin-app/partials/address-view-one.html'
                    },
                    'map@app.address.one':{
                        controller:'MapsCtrl',
                        templateUrl: '../admin-app/partials/ui-map.html'
                    }
                }
            })
            .state('app.subscriber', {
                url:'/subscriber',
                controller:'SubscribersCtrl',
                templateUrl:'../admin-app/partials/subscriber.html',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo:'not-authorized'
                    }
                }
            })
            .state('app.subscriber.new', {
                url: '/new',
                templateUrl: '../admin-app/partials/subscriber-add.html'
            })
            .state('app.subscriber.view', {
                url: '/view',
                templateUrl: '../admin-app/partials/subscriber-view.html'
            })
            .state('app.subscriber.one', {
                url: '/one',
                views:{
                    '':{
                        templateUrl: '../admin-app/partials/subscriber-view-one.html'
                    }
                }
            })
            .state('app.users', {
                url: '/users',
                controller:'UsersCtrl',
                templateUrl: '../admin-app/partials/users.html',
                data: {
                    permissions: {
                        only: ['admin','subscriber'],
                        redirectTo:'not-authorized'
                    }
                }
            })
            .state('app.users.new', {
                url: '/add',
                templateUrl: '../admin-app/partials/users-add.html'
            })
            .state('app.users.view', {
                url: '/view',
                templateUrl: '../admin-app/partials/users-view.html'
            })

            .state('app.users.one', {
                url: '/one',
                templateUrl: '../admin-app/partials/users-view-one.html'
            })
            .state('app.map', {
                url: '/map',
                controller:"MapsCtrl",
                templateUrl: '../admin-app/partials/ui-map.html'
            })
        ;
    }
]);
