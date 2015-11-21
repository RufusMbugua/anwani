app.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  /**
   * Default Route
   * @param  {[type]} "/account/expenditure" [description]
   * @return {[type]}                        [description]
   */
  $urlRouterProvider.otherwise("/home");

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
  $stateProvider.state('test', {
      url: '/test',
      views: {
        '': {
          controller: 'publicCtrl',
          templateUrl: 'app/partials/test/index.html',
        }
      }
    })
    .state('home', {
      url: '/home',
      views: {
        '': {
          controller: 'homeCtrl',
          templateUrl: 'app/partials/home/index.html',
        },
        'about@home': {
          templateUrl: 'app/partials/home/about.html',
        },
        'header@home': {
          templateUrl: 'app/partials/home/header.html',
        },
        'features@home': {
          templateUrl: 'app/partials/home/features.html',
        },
        'footer@home': {
          templateUrl: 'app/partials/home/footer.html',
        },
        'banner@home': {
          templateUrl: 'app/partials/home/banner.html',
        },
        'sub-header@home': {
          templateUrl: 'app/partials/home/sub-header.html',
        },
        'partners@home': {
          templateUrl: 'app/partials/home/partners.html',
        }
      }
    })

      .state('pricing',{
        url:'/pricing',
        views:{
          '':{
            controller:'homeCtrl',
            templateUrl:'app/partials/home/pricing.html'
          },
          'header@pricing': {
            templateUrl: 'app/partials/home/header-clean.html',
          },
          'footer@pricing': {
            templateUrl: 'app/partials/home/footer.html',
          },
        }
      })
    .state('login', {
      url: '/login',
      views: {
        '': {
          controller: 'accountCtrl',
          templateUrl: 'app/partials/account/login.html',
        }
      }
    });
});
