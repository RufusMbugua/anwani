/**
 * @ngdoc app ClientApp
 * @name AnwaniPublic
 */
//    TODO(Rufus): Complete all JsDocs for the Angular Code
var app = angular.module("ClientApp",
    [
        'ui.router',
        'restangular',
        'smart-table',
        'chart.js',
        'textAngular',
        'angularMoment',
        'ui.bootstrap',
        'highcharts-ng',
        'mgcrea.ngStrap.scrollspy',
        'mgcrea.ngStrap.helpers.dimensions',
        'duScroll', 'sn.skrollr',
        'pascalprecht.translate',
        'ngCookies',
        'angular-google-analytics',
            ['$translateProvider', function(
            $translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: "/translations/",
                suffix: '.json'
            });
            $translateProvider.preferredLanguage('en_US');
            // $translateProvider.useCookieStorage();
        }]
    ]);

/**
 * @name GoogleAnalyticsConfig
 * @memberof ClientApp
 * @param AnalyticsProvider
 */
app.config(function (AnalyticsProvider) {
    // Add configuration code as desired - see below
    AnalyticsProvider
        .setAccount('UA-69669161-2')
        .setPageEvent('$stateChangeSuccess')
        .setDomainName('none');
});
/**
 * @memberof ClientApp
 * @name MainRuntime
 * @param $http
 * @param $rootScopr
 * @param snSkrollr
 */
app.run(['$http', '$rootScope', 'snSkrollr','$translate', function(
    $http, $rootScope,
    snSkrollr ,$translate) {
    $rootScope.date = new Date();
    $rootScope.title = 'Anwani';
    $rootScope.messages = [];
    $rootScope.menu = [];
    snSkrollr.init();
    $rootScope.languages = [{
        'label': 'English',
        'value': 'en_US'
    }, {
        'label': 'Francais',
        'value': 'fre_FRE'
    }];

    $rootScope.currentLanguage = $translate.proposedLanguage();

}]);
;// I control the main demo.
app.controller("accountCtrl", ['$scope', '$filter', '$timeout', '$state',
  'Restangular', '$http', '$rootScope',
  function(scope, filter, timeout, state, Restangular, $http, rootScope) {}
]);
;// I control the main demo.
app.controller("homeCtrl", ['$scope', '$filter', '$timeout', '$state',
  'Restangular', '$http', '$rootScope', '$translate',
  function(scope, filter, timeout, state, Restangular, $http, rootScope,
    translate) {
    scope.lang = 'en_US';
    scope.toggleLanguage = function toggleLanguage(item) {
      translate.use(item);
      rootScope.currentLanguage=item;
      console.log(rootScope.currentLanguage)
    };

    scope.features=[
      {
        title:'Free Registration',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:true,
        business:true,
        government:true
      },
      {
        title:'Create Address',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:true,
        business:true,
        government:true
      },
      {
        title:'Manage Address',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:true,
        business:true,
        government:true
      },
      {
        title:'Customize Address',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:true,
        government:true
      },
      {
        title:'Basic Dashboard',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:true,
        business:true,
        government:true
      },
      {
        title:'Advanced Dashboard',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:true,
        government:true
      },
      {
        title:'Advanced Analytics',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:true,
        government:true
      },
      {
        title:'Share Address',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:true,
        business:true,
        government:true
      },
      {
        title:'Add Maps View',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:true,
        business:true,
        government:true
      },
      {
        title:'App Assistance',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:true,
        government:false
      },
      {
        title:'Database Access/Storage',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:true,
        government:true
      },
      {
        title:'Multi Location Management',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:true,
        government:true
      },
      {
        title:'Population Data Tool',
        subtitle:'Lorem ipsum dolor sit amet',
        citizen:false,
        business:false,
        government:true
      }
    ]
  }
]);
;app.directive('isActiveNav', ['$location', function($location) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      scope.location = $location;
      scope.$watch('location.path()', function(currentPath) {
        if ('#' + currentPath == element[0].hash) {
          element.parent().addClass('active');
        } else {
          element.parent().removeClass('active');
        }
      });
    }
  };
}]);

app.directive('isActiveLink', ['$location', function($location) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      scope.location = $location;
      scope.$watch('location.path()', function(currentPath) {
        if ('#' + currentPath == element[0].hash) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }
  };
}]);
;app.config(function($stateProvider, $urlRouterProvider) {

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
;angular.module('templates-dist', ['../public/app/partials/home/about.html', '../public/app/partials/home/banner.html', '../public/app/partials/home/features.html', '../public/app/partials/home/footer.html', '../public/app/partials/home/header-clean.html', '../public/app/partials/home/header.html', '../public/app/partials/home/index.html', '../public/app/partials/home/partners.html', '../public/app/partials/home/pricing.html', '../public/app/partials/home/sub-header.html']);

angular.module("../public/app/partials/home/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/about.html",
    "<div class=\"padded-sides about\">\n" +
    "  <div class=\"row white padded-bottom\" style=\"padding-top:12%\">\n" +
    "\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <div class=\"col-md-4 slighted-above centered\">\n" +
    "        <span class=\"black-text\" translate>about.first.share</span>\n" +
    "        <a class=\"symbol facebook\" href=\"https://www.facebook.com/Anwani-937650086328395/\">&#xe227;</a>\n" +
    "        <a class=\"symbol twitter\" href=\"https://twitter.com/appanwani\">&#xe286;</a>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-offset-8 centered col-md-4 slighted-above\">\n" +
    "        <span style=\"display:block\" class='black-text' translate>about.first.featured</span>\n" +
    "        <img  class=\"col-xs-4 col-xs-offset-4\" src=\"images/coders.png\" alt=\"\">\n" +
    "        <!--<img src=\"images/techcrunch.png\" alt=\"\">-->\n" +
    "        <!--<img src=\"images/techmoran.png\" alt=\"\">-->\n" +
    "      </div>\n" +
    "      <div class=\"col-md-offset-4 col-md-4\">\n" +
    "        <h3 style=\"color:black !important;margin-top:70px\" class=\"centered\" translate>about.first.title</h3>\n" +
    "        <p class=\"centered gray-text\" translate>about.first.description</p>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div style=\"padding:0 15%\" class=\"row\">\n" +
    "\n" +
    "      <div class=\"col-md-12\" ng-if=\"currentLanguage=='en_US'\" style=\"padding:20px 0\">\n" +
    "        <iframe style=\"margin:0 auto\" width=\"100%\" height=\"50%\" src=\"https://www.youtube.com/embed/kVgkBnyOkfA\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-12\" ng-if=\"currentLanguage=='fre_FRE'\" style=\"padding:20px 0\">\n" +
    "        <iframe style=\"margin:0 auto\" width=\"100%\" height=\"50%\" src=\"https://www.youtube.com/embed/_a6k0b1E55s\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "      </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "    <div class=\"circled\"><i class=\"\"></i></div>\n" +
    "    <img src=\"images/Anwani Citizen.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">\n" +
    "    <h5 class=\"centered black-text\" translate>about.second.col_1.title</h5>\n" +
    "      <div  class='col-xs-6 col-xs-offset-3 col-md-8 col-md-offset-2' style=\"padding:0;margin-bottom:10px\">\n" +
    "        <!--href=\"mailto:contact@coders4africa.com?subject=Anwani Citizen\"-->\n" +
    "        <a  ui-sref=\"pricing\" class='btn btn-default' style=\"width:100%\" translate>about.second.col_1.description\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "    <div class=\"circled\"><i class=\"\"></i></div>\n" +
    "    <img src=\"images/Anwani Biz.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">\n" +
    "    <h5 class=\"centered black-text\" translate>about.second.col_2.title</h5>\n" +
    "      <div  class='col-xs-6 col-xs-offset-3 col-md-8 col-md-offset-2' style=\"padding:0;margin-bottom:10px\">\n" +
    "        <!--href=\"mailto:contact@coders4africa.com?subject=Anwani Business\"-->\n" +
    "        <a ui-sref=\"pricing\" class='btn btn-default' style=\"width:100%\" translate>about.second.col_2.description\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "    <div class=\"circled\"><i class=\"\"></i></div>\n" +
    "    <img src=\"images/Anwani Gov.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">\n" +
    "    <h5 class=\"centered black-text\" translate>about.second.col_3.title</h5>\n" +
    "      <div  class='col-xs-6 col-xs-offset-3 col-md-8 col-md-offset-2' style=\"padding:0;margin-bottom:10px\">\n" +
    "        <!--href=\"mailto:contact@coders4africa.com?subject=Anwani Government\" -->\n" +
    "        <a ui-sref=\"pricing\" class='btn btn-default' style=\"width:100%\" translate>about.second.col_3.description\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "    <!--<div class=\"col-md-4\">-->\n" +
    "      <!--<div class=\"circled\"><i class=\"\"></i></div>-->\n" +
    "      <!--<img src=\"images/physical.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">-->\n" +
    "      <!--<h5 class=\"centered black-text\" translate>about.second.col_1.title</h5>-->\n" +
    "      <!--<p class='black-text' translate>about.second.col_1.description-->\n" +
    "      <!--</p>-->\n" +
    "    <!--</div>-->\n" +
    "    <!--<div class=\"col-md-4\">-->\n" +
    "      <!--<div class=\"circled\"><i class=\"\"></i></div>-->\n" +
    "      <!--<img src=\"images/service_delivery.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">-->\n" +
    "      <!--<h5 class=\"centered black-text\" translate>about.second.col_2.title</h5>-->\n" +
    "      <!--<p class='black-text' translate>about.second.col_2.description</p>-->\n" +
    "    <!--</div>-->\n" +
    "    <!--<div class=\"col-md-4\">-->\n" +
    "      <!--<div class=\"circled\"><i class=\"\"></i></div>-->\n" +
    "      <!--<img src=\"images/citizen_empowerment.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">-->\n" +
    "      <!--<h5 class=\"centered black-text\" translate>about.second.col_3.title</h5>-->\n" +
    "      <!--<p class='black-text' translate>about.second.col_3.description</p>-->\n" +
    "    <!--</div>-->\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../public/app/partials/home/banner.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/banner.html",
    "<div class=\"banner padded-sides\">\n" +
    "    <div class=\"row description\">\n" +
    "      <div class=\"col-md-4 padded-top\"\n" +
    "      sn-skrollr\n" +
    "      data--100p-top=\"font-size:0.5em !important\"\n" +
    "      >\n" +
    "        <h3 class=\"white-text\" translate>banner.col_1.title</h3>\n" +
    "        <p class=\"white-text\" translate>banner.col_1.description</p>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-4 padded-top right\"\n" +
    "      sn-skrollr\n" +
    "      data--100p-top=\"font-size:0.5em !important\"\n" +
    "      >\n" +
    "        <h5 class=\"white-text hidden-xs hidden-sm\" style=\"margin-bottom:0.2em\" translate>banner.col_2.title</h5>\n" +
    "        <p class=\"white-text hidden-xs hidden-sm\" translate>banner.col_2.description</p>\n" +
    "        <!--<button class=\"btn btn-default btn-large btn-blue hidden-xs hidden-sm\" translate>banner.col_2.button</button> <span class=\"white-text hidden-xs hidden-sm\" translate>banner.col_2.option</span>-->\n" +
    "        <a href=\"https://play.google.com/store/apps/details?id=com.coders4africa.app.anwani\">\n" +
    "          <img alt=\"Get it on Google Play\"\n" +
    "               src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-4 right\">\n" +
    "        <img\n" +
    "        sn-skrollr\n" +
    "        data-start=\"width:80%\"\n" +
    "        data--80-top=\"width:20%\"\n" +
    "        class=\"phone img-responsive\" src=\"images/phone_banner.jpg\" alt=\"\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "");
}]);

angular.module("../public/app/partials/home/features.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/features.html",
    "<div class=\"row gray padded translate features\">\n" +
    "  <div class=\"col-md-12\">\n" +
    "    <h3 class=\"centered\" translate>features.top.title</h3>\n" +
    "    <h4 style=\"margin-bottom:50px\" class=\"gray\" translate>features.top.description</h4>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4 \" style=\"padding-top:30px\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4 class=\"col-md-10 col-xs-offset-2\" translate>features.first.col_1.title</h4>\n" +
    "      <div class=\"col-xs-2 no-padding\"><img src=\"images/create_address.png\" class=\"img-responsive\" alt=\"\"></div>\n" +
    "      <div class=\"col-xs-10 gray-text\" translate>features.first.col_1.description</div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4 class=\"col-md-10 col-xs-offset-2\" translate>features.first.col_2.title</h4>\n" +
    "      <div class=\"col-xs-2 no-padding\"><img src=\"images/existing_address.png\" class=\"img-responsive\" alt=\"\"></div>\n" +
    "      <div class=\"col-xs-10 gray-text\" translate>features.first.col_2.description</div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4 class=\"col-md-10 col-xs-offset-2\" translate>features.first.col_3.title</h4>\n" +
    "      <div class=\"col-xs-2 no-padding\"><img src=\"images/manage_address.png\" class=\"img-responsive\" alt=\"\"></div>\n" +
    "      <div class=\"col-xs-10 gray-text\" translate>features.first.col_3.description</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4 right\" style=\"padding-top:30px\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4 class=\"col-md-10 col-xs-offset-2\" translate>features.second.col_1.title</h4>\n" +
    "      <div class=\"col-xs-2 no-padding\"><img src=\"images/reply_all.png\" class=\"img-responsive\" alt=\"\"></div>\n" +
    "      <div class=\"col-xs-10 gray-text\" translate>features.second.col_1.description</div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4 class=\"col-md-10 col-xs-offset-2\" translate>features.second.col_2.title</h4>\n" +
    "      <div class=\"col-xs-2 no-padding\"><img src=\"images/camera.png\" class=\"img-responsive\" alt=\"\"></div>\n" +
    "      <div class=\"col-xs-10 gray-text\" translate>features.second.col_2.description</div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4 class=\"col-md-10 col-xs-offset-2\" translate>features.second.col_3.title</h4>\n" +
    "      <div class=\"col-xs-2 no-padding\"><img src=\"images/map.png\" class=\"img-responsive\" alt=\"\"></div>\n" +
    "      <div class=\"col-xs-10 gray-text\" translate>features.second.col_3.description</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4 right\">\n" +
    "  <img\n" +
    "  sn-skrollr\n" +
    "  data-start=\"width:20%\"\n" +
    "  data-40p-top=\"width:100%\"\n" +
    "  src=\"images/phone_image.png\" alt=\"\" class=\"img-responsive\" style=\"margin:auto\">\n" +
    "<p class=\"gray-text centered\" style=\"font-size:0.8em\" translate>features.tertiary</p>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../public/app/partials/home/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/footer.html",
    "<footer class=\"row white\">\n" +
    "  <div class=\"col-md-4 centered\">\n" +
    "    <span class=\"block gray-text\" translate>footer.col_1.description</span>\n" +
    "    <a class=\"symbol facebook\" href=\"https://www.facebook.com/Anwani-937650086328395/\">&#xe227;</a>\n" +
    "    <a class=\"symbol twitter\" href=\"https://twitter.com/appanwani\">&#xe286;</a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4 centered right\">\n" +
    "    <span class=\"gray-text\" translate>footer.col_2.description</span>\n" +
    "    <a href=\"https://play.google.com/store/apps/details?id=com.coders4africa.app.anwani\">\n" +
    "      <img alt=\"Get it on Google Play\"\n" +
    "           src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4 centered right\"><span class=\"gray-text\" >Copyright &copy 2015 Anwani App</span> </div>\n" +
    "</footer>\n" +
    "");
}]);

angular.module("../public/app/partials/home/header-clean.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/header-clean.html",
    "<nav id=\"main\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n" +
    "        <span class=\"sr-only\" translate>header.nav</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" ui-sref=\"home\">\n" +
    "        <img src=\"images/anwani_logo.png\" style=\"width:100px\" class=\"img-responsive\" alt=\"\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "    <form action=\"\"class=\"navbar-form navbar-right\">\n" +
    "      <label for=\"\" translate>header.lang</label>\n" +
    "      <select class=\"form-control\" name=\"\" id=\"\" ng-model=\"lang\" ng-change=\"toggleLanguage(lang)\"\n" +
    "        ng-options=\"lang.value as lang.label for lang in languages\">\n" +
    "      </select>\n" +
    "    </form>\n" +
    "  <ul class=\"nav navbar-nav navbar-right\" >\n" +
    "    <li ui-sref=\"home\"><a style=\"text-transform:uppercase !important\" translate>header.links.one</a></li>\n" +
    "  </ul>\n" +
    "\n" +
    "</div>\n" +
    "</div>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../public/app/partials/home/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/header.html",
    "<nav id=\"main\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n" +
    "        <span class=\"sr-only\" translate>header.nav</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"#\">\n" +
    "        <img src=\"images/anwani_logo.png\" style=\"width:100px\" class=\"img-responsive\" alt=\"\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "    <form action=\"\"class=\"navbar-form navbar-right\">\n" +
    "      <label for=\"\" translate>header.lang</label>\n" +
    "      <select class=\"form-control\" name=\"\" id=\"\" ng-model=\"lang\" ng-change=\"toggleLanguage(lang)\"\n" +
    "        ng-options=\"lang.value as lang.label for lang in languages\">\n" +
    "      </select>\n" +
    "    </form>\n" +
    "  <ul class=\"nav navbar-nav navbar-right\" >\n" +
    "    <li bs-scrollspy du-scrollspy du-smooth-scroll href=\"#home\" data-target=\"#home\"><a style=\"text-transform:uppercase !important\" translate>header.links.one</a></li>\n" +
    "    <li bs-scrollspy du-scrollspy du-smooth-scroll href=\"#about\" data-target=\"#about\"><a style=\"text-transform:uppercase !important\" translate>header.links.two</a></li>\n" +
    "    <li bs-scrollspy du-scrollspy du-smooth-scroll href=\"#features\" data-target=\"#features\"><a style=\"text-transform:uppercase !important\" translate>header.links.three</a></li>\n" +
    "    <!--<li><a href=\"admin/#/login\" class=\"btn btn-warning btn-sm\" style=\"margin-top:10px;padding:5px;margin-left: 20px;\" translate>header.links.four</a></li>-->\n" +
    "  </ul>\n" +
    "\n" +
    "</div>\n" +
    "</div>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../public/app/partials/home/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/index.html",
    "<div ui-view=\"header\"></div>\n" +
    "<div id=\"home\" ui-view=\"banner\"></div>\n" +
    "<div id=\"about\" ui-view=\"about\"></div>\n" +
    "<div id=\"features\" ui-view=\"features\"></div>\n" +
    "<div ui-view=\"partners\"></div>\n" +
    "<div ui-view=\"sub-header\"></div>\n" +
    "<div ui-view=\"footer\"></div>\n" +
    "<script>\n" +
    "    $(document).ready(function(){\n" +
    "        adjustHeights('nav a');\n" +
    "        function adjustHeights(elem) {\n" +
    "            var fontstep = 2;\n" +
    "            if ($(elem).height()>$(elem).parent().height() || $(elem).width()>$(elem).parent().width()) {\n" +
    "                $(elem).css('font-size',(($(elem).css('font-size').substr(0,2)-fontstep)) + 'px').css('line-height',(($(elem).css('font-size').substr(0,2))) + 'px');\n" +
    "                adjustHeights(elem);\n" +
    "            }\n" +
    "        }\n" +
    "    })\n" +
    "</script>");
}]);

angular.module("../public/app/partials/home/partners.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/partners.html",
    "<div class=\"row padded-sides\">\n" +
    "  <div class=\"col-md-12 white\">\n" +
    "    <h4 class=\"gray-text centered\" translate>partners</h4>\n" +
    "    <div class=\"seperator\"></div>\n" +
    "    <div class=\"col-md-4 col-md-offset-4 row images\">\n" +
    "    <!--<img class=\"col-xs-4\" src=\"images/unhcr.png\" alt=\"\">-->\n" +
    "    <img class=\"col-xs-4 col-xs-offset-4\" src=\"images/coders.png\" alt=\"\">\n" +
    "    <!--<img class=\"col-xs-4\" src=\"images/techmoran.png\" alt=\"\">-->\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../public/app/partials/home/pricing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/pricing.html",
    "<div ui-view=\"header\" autoscroll=\"true\"></div>\n" +
    "<div class=\"row padded\">\n" +
    "    <div class=\"col-md-12 white padded\">\n" +
    "        <div class=\"inner\">\n" +
    "            <table class=\"features-table table retable\" data-retable-type=\"row\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th></th>\n" +
    "                    <th translate>pricing.header.first.one</th>\n" +
    "                    <th translate>pricing.header.first.two</th>\n" +
    "                    <th translate>pricing.header.first.three</th>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th></th>\n" +
    "                    <th class=\"citizen\" translate>pricing.header.second.one</th>\n" +
    "                    <th class=\"business\" translate>pricing.header.second.two</th>\n" +
    "                    <th class=\"government\" translate>pricing.header.second.three</th>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th></th>\n" +
    "                    <th translate>pricing.header.third.one</th>\n" +
    "                    <th translate>pricing.header.third.two</th>\n" +
    "                    <th translate>pricing.header.third.three</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr ng-repeat=\"feature in features\">\n" +
    "                    <td style=\"text-align: left;width:25%\">\n" +
    "                        <div ng-bind=\"feature.title\"></div>\n" +
    "                        <div ng-bind=\"feature.subtitle\" class=\"gray-text\"></div>\n" +
    "                    </td>\n" +
    "                    <td valign=\"middle\">\n" +
    "                        <i ng-if=\"feature.citizen\" class=\"ion-checkmark citizen\"></i>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <i ng-if=\"feature.business\" class=\"ion-checkmark business\"></i>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <i ng-if=\"feature.government\" class=\"ion-checkmark government\"></i>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "                <tfoot>\n" +
    "                <td></td>\n" +
    "                <td>\n" +
    "                    <a class=\"btn btn-dark citizen\" translate>pricing.footer.one</a>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <a href=\"mailto:contact@coders4africa.com?subject=Anwani Business\" class=\"btn btn-dark business\" translate>pricing.footer.two</a>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <a href=\"mailto:contact@coders4africa.com?subject=Anwani Government\" class=\"btn btn-dark government\" translate>pricing.footer.three</a>\n" +
    "                </td>\n" +
    "                </tfoot>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ui-view=\"sub-header\"></div>\n" +
    "<div ui-view=\"footer\"></div>");
}]);

angular.module("../public/app/partials/home/sub-header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/app/partials/home/sub-header.html",
    "<div class=\"row\">\n" +
    "  <nav id=\"sub\" class=\"col-md-6 col-md-offset-3\">\n" +
    "    <ul class=\"nav navbar-nav row\" style=\"width:100%\">\n" +
    "      <li class=\"col-xs-4\" bs-scrollspy du-scrollspy du-smooth-scroll href=\"#home\" data-target=\"#home\"><a class=\"centered\" translate>header.links.one</a></li>\n" +
    "      <li class=\"col-xs-4\" bs-scrollspy du-scrollspy du-smooth-scroll href=\"#about\" data-target=\"#about\"><a class=\"centered\" translate>header.links.two</a></li>\n" +
    "      <li class=\"col-xs-4\" bs-scrollspy du-scrollspy du-smooth-scroll href=\"#features\" data-target=\"#features\"><a class=\"centered\" translate>header.links.three</a></li>\n" +
    "    </ul>\n" +
    "  </nav>\n" +
    "</div>\n" +
    "");
}]);
