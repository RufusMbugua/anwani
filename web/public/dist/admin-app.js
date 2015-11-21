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
    ]);;// lazyload config

app.constant('JQ_CONFIG', {
  easyPieChart: [
    'libs/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
  ],
  plot: ['libs/flot/jquery.flot.js',
    'libs/flot/jquery.flot.pie.js',
    'libs/flot/jquery.flot.resize.js',
    'libs/flot.tooltip/js/jquery.flot.tooltip.js',
    'libs/flot.orderbars/js/jquery.flot.orderBars.js',
    'libs/flot-spline/js/jquery.flot.spline.js'
  ],
  knob: ['libs/jquery-knob/dist/jquery.knob.min.js',
    'js/jq/chart-knobs.js'
  ],
  isotobe: ['js/uport_isotobe.js',
    'js/uport_isotobe_script.js'
  ],
  dataTable: [
    'libs/datatables/media/js/jquery.dataTables.min.js',
    'libs/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
    'libs/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
  ],
  footable: ['libs/footable/dist/footable.all.min.js',
    'libs/footable/css/footable.core.css'
  ],
  fullcalendar: ['libs/moment/moment.js',
    'libs/fullcalendar/dist/fullcalendar.min.js',
    'libs/fullcalendar/dist/fullcalendar.css',
    'libs/fullcalendar/dist/fullcalendar.theme.css'
  ],
  vectorMap: [
    'libs/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
    'libs/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
    'libs/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
    'libs/bower-jvectormap/jquery-jvectormap-1.2.2.css'
  ],
  sortable: ['libs/html5sortable/jquery.sortable.js'],
  nestable: ['libs/nestable/jquery.nestable.js'],
  moment: ['libs/moment/moment.js'],
  daterangepicker: ['libs/moment/moment.js',
    'libs/bootstrap-daterangepicker/daterangepicker.js',
    'libs/bootstrap-daterangepicker/daterangepicker-bs3.css'
  ],
  tagsinput: [
    'libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
    'libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.css'
  ],
  jqueryui: ['libs/jquery-ui/ui/minified/jquery-ui.min.js',
    'libs/jquery-ui/themes/smoothness/jquery-ui.css',
    'js/controllers/ui.slider.js'
  ],
  TouchSpin: [
    'libs/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
    'libs/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'
  ],
  chosen: ['libs/chosen/chosen.jquery.min.js',
    'libs/bootstrap-chosen/bootstrap-chosen.css'
  ],
  wysiwyg: ['libs/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
    'libs/bootstrap-wysiwyg/external/jquery.hotkeys.js'
  ],
  sparkline: [
    'libs/jquery.sparkline/dist/jquery.sparkline.retina.js'
  ]
})

// oclazyload config
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  // We configure ocLazyLoad to use the lib script.js as the async loader
  $ocLazyLoadProvider.config({
    debug: true,
    events: true,
    modules: [{
        name: 'ngMorris',
        files: [
          'libs/raphael/raphael.js',
          'libs/mocha/mocha.js',
          'libs/morrisjs/morris.js',
          'libs/ngmorris/src/ngMorris-full.js',
          'libs/morrisjs/morris.css'
        ]
      }, {
        name: 'cgNotify',
        files: [
          'libs/angular-notify/dist/angular-notify.min.js',
          'libs/angular-notify/dist/angular-notify.min.css'
        ]
      }, {
        name: 'countTo',
        files: [
          'libs/angular-count-to/build/angular-count-to.min.js'
        ]
      },

      {
        name: 'angularFileUpload',
        files: [
          'libs/angular-file-upload/angular-file-upload.min.js'
        ]
      },
      /*{
          name: 'textAngular',
          series: true,
          files: [
              'libs/textAngular/dist/textAngular.css',
              'libs/textAngular/dist/textAngular-rangy.min.js',
              'libs/textAngular/dist/textAngular.min.js'
          ]
      },*/
      {
        name: 'vr.directives.slider',
        files: [
          'libs/venturocket-angular-slider/build/angular-slider.min.js',
          'libs/venturocket-angular-slider/build/angular-slider.css'
        ]
      }, {
        name: 'ngGrid',
        files: [
          'libs/ng-grid/build/ng-grid.min.js',
          'libs/ng-grid/ng-grid.min.css',
          'libs/ng-grid/ng-grid.bootstrap.css'
        ]
      }, {
        name: 'ui.grid',
        files: [
          'libs/angular-ui-grid/ui-grid.min.js',
          'libs/angular-ui-grid/ui-grid.min.css',
          'libs/angular-ui-grid/ui-grid.bootstrap.css'
        ]
      }, {
        name: 'chart.js',
        files: [
          'libs/js/angular-chart.js',
          'libs/styles/angular-chart.css'
        ]

      }, {
        name: 'angular-rickshaw',
        files: [
          'libs/rickshaw/rickshaw.min.css',
          'libs/rickshaw/rickshaw.min.js',
          'libs/angular-rickshaw/rickshaw.js'
        ]

      }, {
        name: 'xeditable',
        files: [
          'libs/angular-xeditable/dist/js/xeditable.min.js',
          'libs/angular-xeditable/dist/css/xeditable.css'
        ]
      }, {
        name: 'ui.calendar',
        files: [
          'libs/angular-ui-calendar/src/calendar.js'
        ]
      }, {
        name: 'ngImgCrop',
        files: [
          'libs/ngImgCrop/compile/minified/ng-img-crop.js',
          'libs/ngImgCrop/compile/minified/ng-img-crop.css'
        ]
      }, {
        name: 'colorpicker.module',
        files: [
          'libs/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
          'libs/angular-bootstrap-colorpicker/css/colorpicker.css'
        ]
      }, {
        name: 'smart-table',
        files: [
          'libs/angular-smart-table/dist/smart-table.min.js'
        ]
      }
    ]
  });
}]);
;'use strict';

app.controller('AppCtrl', ['$scope',
  function($scope) {


    $scope.app = {
      name: 'Slant Admin - Angular',
      version: '1.0.0',
      color: {
        primary: '#673AB7',
        orange: '#FF6E40',
        info: '#26C6DA',
        success: '#46be8a',
        warning: '#fdb45d',
        danger: '#F44336',
        secondary: '#a9a9a9',
        text: '#767676'
      },
      settings: {
        menuProfile: true,
        menuFolded: false,
        chatFolded: true,
        layoutBoxed: false,
        searchFocus: false,
        pagetitle: 'Slant \\ AngularJS',
      }
    }

    $scope.menuChatToggle = function(type, value) {
      if (type == "menu" && !value) {
        $scope.app.settings.chatFolded = true;
      }
      if (type == "chat" && !value) {
        $scope.app.settings.menuFolded = true;
      }
    }


    $scope.changeMenuHeight = function() {
      //console.log($scope.settings.menuProfile);
      if ($scope.app.settings.menuFolded == true) {
        var navHeight = angular.element(
            "#main-content section.wrapper .content-wrapper").innerHeight() +
          90;
      } else {
        var navHeight = $(window).innerHeight() - 60;
      }
      //console.log(navHeight);
      angular.element("#main-menu-wrapper").height(navHeight);
    }

    $scope.$watch('app.settings.menuFolded', function() {
      $scope.changeMenuHeight();
    });


    $scope.$on('$viewContentLoaded', function(next, current) {
      angular.element(document).ready(function() {
        $scope.changeMenuHeight();
      });
    });

    $scope.ElementInView = function(inview, event, addclass, removeclass) {

      var id = event.inViewTarget.id;
      /*console.log(event);  */
      if (inview && id != "") {
        if (addclass != "") {
          $("#" + id).addClass(addclass);
        } else {
          $("#" + id).removeClass(removeclass);
        }
      }
      return false;
    }


    $scope.testLines = [];
    for (var i = 20; i >= 0; i--) {
      $scope.testLines.push(i);
    };

    $scope.lineInView = function(index, inview, inviewpart, event) {
      /*console.log(inview+" "+index+" "+inviewpart+" "+event);    */
      /*console.log(event.inViewTarget.id);  */
      return false;
    }



  }
]);
;/**
 * @ngdoc controller
 * @name AddressesCtrl
 * @memberof AdminApp
 * @param $scope {service} controller scope
 * @param $filterFilter {service}
 * @param $http {service} Angular HTTP Request Service
 * @param $rootScope {service} Angular Root Scope Service
 * @param $state {service} UI Router State Service
 */
app.controller('AddressesCtrl', ['$scope', 'filterFilter','$http','$rootScope','$state',
    function (scope, filterFilter,http,rootScope,state) {
        /**
         * Add an address
         * @memberof AddressesCtrl
         * @function add
         */
        scope.add = function add(){
            /**
             * @memberof add
             * @param scope.address {object}
             *
             */
            http.post('http://anwani-devapi.c4asolution.com/addresses/create',scope.address).then(function(result){
                console.log(result);
            });
        };
        /**
         * View an address
         * @memberof AddressesCtrl
         * @function view
         * @param address {object}  Instance of an Address parsed from the table
         */
        scope.view = function view(address){
            rootScope.address=address;
            state.go('app.address.one');
        };
        /**
         * Search for an Address
         * @memberof AddressesCtrl
         * @function search
         */
        scope.search = function search(){
            var criteria,category,search_string={};
            category = scope.search_data.category;
            criteria={};
            search_string=scope.search_data.string;
            criteria[category]=search_string;

            http.get('http://anwani-devapi.c4asolution.com/addresses/search',{params:criteria})
                .then(function(result){
                    scope.results = result.data;
                });
        }

    }]);

/**
 * @ngdoc runtime
 * @name AddressesCtrlRuntime
 * @memberof AdminApp
 * @param $http {service}
 * @param $rootScope {service}
 */
app.run(['$http','$rootScope',function(http,rootScope){
    get_addresses();
    function get_addresses(){
        if(rootScope.user){
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
    }
}]);;app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	$scope.items = [
	{
		"id": 1,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"id": 2,
		"title": "Comparing/creating differences",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 3,
		"title": "Designs in balance",
		"thumb": "data/blogs/v3.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 4,
		"title": "Art of visual communication",
		"thumb": "data/blogs/v4.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 5,
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"id": 6,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 7,
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"id": 8,
		"title": "Art of visual communication",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"id": 9,
		"title": "Comparing/creating differences",
		"thumb": "data/blogs/v3.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 10,
		"title": "Designs in balance",
		"thumb": "data/blogs/v4.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 11,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 12,
		"title": "Human perception and the complex nature",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"id": 13,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"id": 14,
		"title": "Art of visual communication",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 15,
		"title": "Comparing/creating differences",
		"thumb": "data/blogs/v3.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 16,
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/blogs/v4.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"id": 17,
		"title": "Designs in balance",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"id": 18,
		"title": "Human perception and the complex nature",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	},	{
		"id": 19,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"id": 20,
		"title": "Comparing/creating differences",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 21,
		"title": "Designs in balance",
		"thumb": "data/blogs/v3.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 22,
		"title": "Art of visual communication",
		"thumb": "data/blogs/v4.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 23,
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"id": 24,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 25,
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"id": 26,
		"title": "Art of visual communication",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"id": 27,
		"title": "Comparing/creating differences",
		"thumb": "data/blogs/v3.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 28,
		"title": "Designs in balance",
		"thumb": "data/blogs/v4.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"id": 29,
		"title": "What is Graphic Design?",
		"thumb": "data/blogs/v1.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"id": 30,
		"title": "Human perception and the complex nature",
		"thumb": "data/blogs/v2.png",
		"author": "Jason",
		"date": "May 11, 2015",
		"comments": 3,
	      "category":[
	        {"name":"images"},
	        {"name":"web"},
	      ],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}
	];
 
	// create empty search model (object) to trigger $watch on update
	$scope.search = {};
 
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};




 
	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems = $scope.items.length;
	$scope.entryLimit = 8; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
 	
	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		$scope.filtered = filterFilter($scope.items, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}]);;'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is ok.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' },
      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      { type: 'primary', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'orange', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'default', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'primary', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'images/c' + [slides.length % 4] + '.png',
        text: ['Carousels require the use of an id in the slide data caption',
                'Contrast and Similarity in Graphic Design are necessary to go',
                'Bacon ipsum dolor sit amet nulla dolor sit amet nulla',
                'Responsive treatment of angular apps'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ; 
  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size,windowClass) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/ui-modal-list.html',
        controller: 'ModalInstanceCtrl',
        windowClass: windowClass,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };


    $scope.openform = function (type) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/ui-modal-form'+type+'.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.section_modal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/ui-modal-section.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };




  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Profile', icon:'user', content:'You can use all Bootstrap plugins purely through the markup API without writing a single line of JavaScript. This is Bootstrap&apos;s first-class API and should be your first consideration when using in a plugin.' },
      { title:'Messages', icon:'envelope', content:'That said, in some situations it may be desirable to turn this functionality off. Therefore, we also provide the ability to.', disabled: true  },
      { title:'Settings', icon:'cog', content:'We also believe you should be able to use all Bootstrap plugins purely through the JavaScript API. All public APIs are single, chainable methods, and return the collection acted upon.' },
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

 $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 

app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

$scope.dtpick = {
        opened: false,
        opened2: false
      }

  $scope.open = function($event,type) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dtpick[type] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
}]);

  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);;/**
 * calendarDemoApp - 0.1.3
 */

app.controller('FullcalendarCtrl', ['$scope', function($scope) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */
    $scope.events = [
      {title:'All Day Event', start: new Date(y, m, 1), className: ['b-l b-2x b-info'], location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
      {title:'Dance class', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['b-l b-2x b-danger'], location:'London', info:'Two days dance training class.'},
      {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location:'Hongkong', info:'The most big racing of this year.'},
      {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location:'Rio', info:'Do not forget to watch.'},
      {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info:'Family party'},
      {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location:'HD City', info:'It is a long long event'},
      {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location:'Tokyo', info:'Tokyo Game Racing'},
      {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location:'New York', info:'Party all day'},
      {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location:'Home Town', info:'Repeat every day'},      
      {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-2x b-primary']},
      {title:'Feed cat', start: new Date(y, m+1, 6, 18, 0), className: ['b-l b-2x b-info']}
    ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function( date, jsEvent, view ){
      var time = new Date().getTime();
      if(time - $scope.lastClickTime <= $scope.precision){
          $scope.events.push({
            title: 'New Event',
            start: date,
            className: ['b-l b-2x b-info']
          });
      }
      $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function( event, jsEvent, view ){
      $scope.event = event;
      $scope.overlay.removeClass('left right top').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      var top = cal.height() - (wrap.offset().top - cal.offset().top + wrap.height());
      if( right > $scope.overlay.width() ) { 
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
      }else if ( left > $scope.overlay.width() ) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      }else{
        $scope.overlay.find('.arrow').addClass('top');
      }
      if( top < $scope.overlay.height() ) { 
        $scope.overlay.addClass('top').find('.arrow').removeClass('pull-up').addClass('pull-down')
      }
      (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        dayClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventMouseover: $scope.alertOnMouseOver
      }
    };
    
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'New Event',
        start: new Date(y, m, d),
        className: ['b-l b-2x b-info']
      });
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
      $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);
/* EOF */
;(function() {
    'use strict';

    /*  var app = angular.app.'examples', ['chart.js', 'ui.bootstrap']);*/

    //app.config(function(ChartJsProvider) {
    //    // Configure all charts
    //    ChartJsProvider.setOptions({
    //        colours: ['#FF6E40', '#FBC02E', '#673AB7', '#66bd78', '#f05050'],
    //        responsive: true
    //    });
    //    // Configure all doughnut charts
    //    ChartJsProvider.setOptions('Doughnut', {
    //        animateScale: true
    //    });
    //});

    app.controller('MenuCtrl', function($scope) {
        $scope.isCollapsed = true;
        $scope.charts = ['Line', 'Bar', 'Doughnut', 'Pie', 'Polar Area', 'Radar', 'Base'];
    });

    app.controller('LineCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
        $scope.onHover = function(points) {
            if (points.length > 0) {
                console.log('Point', points[0].value);
            } else {
                console.log('No point');
            }
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];

        $timeout(function() {
            $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
            $scope.series = ['Series C', 'Series D'];
        }, 3000);
    }]);

    app.controller('BarCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.options = {
            scaleShowVerticalLines: false
        };
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1)",
                highlightFill: "rgba(255,110,64,1)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1)",
                highlightFill: "rgba(103,58,183,1)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }];

        $timeout(function() {
            $scope.options = {
                scaleShowVerticalLines: true
            };
        }, 3000);
    }]);

    app.controller('DoughnutCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        $scope.data = [0, 0, 0];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }];

        $timeout(function() {
            $scope.data = [350, 450, 100];
        }, 500);
    }]);

    app.controller('PieCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        $scope.data = [300, 500, 100];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }];
    });

    app.controller('PolarAreaCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }, { // dark grey
                fillColor: "rgba(76,175,80,1.0)",
                strokeColor: "rgba(76,175,80,1.0)",
                highlightFill: "rgba(76,175,80,1.0)",
                highlightStroke: "rgba(76,175,80,1.0)"
        }, { // dark grey
                fillColor: "rgba(244,67,54,1.0)",
                strokeColor: "rgba(244,67,54,1.0)",
                highlightFill: "rgba(244,67,54,1.0)",
                highlightStroke: "rgba(244,67,54,1.0)"
        }];
    });

    app.controller('BaseCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
        $scope.type = 'PolarArea';

        $scope.toggle = function() {
            $scope.type = $scope.type === 'PolarArea' ? 'Pie' : 'PolarArea';
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }, { // dark grey
                fillColor: "rgba(76,175,80,1.0)",
                strokeColor: "rgba(76,175,80,1.0)",
                highlightFill: "rgba(76,175,80,1.0)",
                highlightStroke: "rgba(76,175,80,1.0)"
        }, { // dark grey
                fillColor: "rgba(244,67,54,1.0)",
                strokeColor: "rgba(244,67,54,1.0)",
                highlightFill: "rgba(244,67,54,1.0)",
                highlightStroke: "rgba(244,67,54,1.0)"
        }];
    });

    app.controller('RadarCtrl', function($scope) {
        $scope.labels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,0.5)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,0.5)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];
    });

    app.controller('StackedBarCtrl', function($scope) {
        $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.type = 'StackedBar';

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];
    });

    app.controller('DataTablesCtrl', function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,0.5)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,0.5)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];
        $scope.randomize = function() {
            $scope.data = $scope.data.map(function(data) {
                return data.map(function(y) {
                    y = y + Math.random() * 10 - 5;
                    return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
                });
            });
        };
    });

    app.controller('TicksCtrl', ['$scope', '$interval', function($scope, $interval) {
        var maximum = document.getElementById('container').clientWidth / 2 || 300;
        $scope.data = [
            []
        ];
        $scope.labels = [];
        $scope.options = {
            animation: false,
            showScale: false,
            showTooltips: false,
            pointDot: false,
            datasetStrokeWidth: 0.5
        };

        // Update the dataset at 25FPS for a smoothly-animating chart
        $interval(function() {
            getLiveChartData();
        }, 40);

        function getLiveChartData() {
            if ($scope.data[0].length) {
                $scope.labels = $scope.labels.slice(1);
                $scope.data[0] = $scope.data[0].slice(1);
            }

            while ($scope.data[0].length < maximum) {
                $scope.labels.push('');
                $scope.data[0].push(getRandomValue($scope.data[0]));
            }
        }
    }]);

    function getRandomValue(data) {
        var l = data.length,
            previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        return y < 0 ? 0 : y > 100 ? 100 : y;
    }

})();
;app.controller('ChatCtrl', ['$scope', '$http',
  function ($scope, $http) {
    //$http.get('data/chat-users.json').success(function(data) {
    //  $scope.users = data;
    //});
  }]);
;'use strict';

app.controller('ColorPickerCtrl', [
    '$scope',
    function ($scope) {
        $scope.hexPicker = { color: '' };
        $scope.rgbPicker = { color: '' };
        $scope.rgbaPicker = { color: '' };
        $scope.nonInput = { color: '' };
        $scope.resetColor = function () {
            $scope.hexPicker = { color: '#ff0000' };
        };
        $scope.resetRBGColor = function () {
            $scope.rgbPicker = { color: 'rgb(255,0,0)' };
        };
        $scope.resetRBGAColor = function () {
            $scope.rgbaPicker = { color: 'rgba(255,0,0, 0.25)' };
        };
        $scope.resetNonInputColor = function () {
            $scope.nonInput = { color: '#ffffff' };
        };
    }
]);;'use strict';

app.controller('CounttoCtrl', function($scope){

	$scope.countTo = 5343;
    	$scope.countFrom = 1001;
	
	$scope.countTo_facebook = 143;
    	$scope.countFrom_facebook = 0;

	$scope.countTo_twitter = 3454;
    	$scope.countFrom_twitter = 0;

	$scope.countTo_googleplus = 523;
    	$scope.countFrom_googleplus = 0;

	$scope.countTo_dribbble = 2523;
    	$scope.countFrom_dribbble = 0;

	$scope.countTo_linkedin = 3223;
    	$scope.countFrom_linkedin = 0;

	$scope.countTo_youtube = 1223;
    	$scope.countFrom_youtube = 0;

	$scope.countTo_skype = 3229;
    	$scope.countFrom_skype = 0;

	$scope.countTo_flickr = 1629;
    	$scope.countFrom_flickr = 0;
});

;    'use strict';

    /*  var app = angular.app.'examples', ['chart.js', 'ui.bootstrap']);*/

     //app.config(function(ChartJsProvider) {
     //    // Configure all charts
     //    ChartJsProvider.setOptions({
     //        colours: ['#FF6E40', '#FBC02E', '#673AB7', '#66bd78', '#f05050'],
     //        responsive: true
     //    });
     //    // Configure all doughnut charts
     //    ChartJsProvider.setOptions('Doughnut', {
     //        animateScale: true
     //    });
     //});

    app.controller('DashboardLineCtrl', ['$scope', '$timeout', function($scope,
      $timeout) {
      $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep'
      ];
      $scope.series = ['Page Views', 'Visitors'];
      $scope.data = [
        [23, 10, 13, 24, 12, 21, 19, 10, 24],
        [7, 13, 8, 10, 18, 11, 17, 9, 17]
      ];
      $scope.onClick = function(points, evt) {
        console.log(points, evt);
      };
      $scope.onHover = function(points) {
        if (points.length > 0) {
          console.log('Point', points[0].value);
        } else {
          console.log('No point');
        }
      };
      $scope.colours = [{ // grey
        fillColor: "rgba(255,110,64,1)",
        strokeColor: "rgba(255,110,64,1)",
        pointColor: "rgba(255,110,64,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,110,64,1)"
      }, { // dark grey
        fillColor: "rgba(103,58,183,1)",
        strokeColor: "rgba(103,58,183,1.0)",
        pointColor: "rgba(103,58,183,1.0)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(103,58,183,1.0)"
      }];

      $scope.options = {
        scaleShowVerticalLines: false,
        scaleShowLabels: true,
        scaleLineWidth: 1,
        scaleLineColor: "rgba(0,0,0,0.1)",
        scaleShowHorizontalLines: false,
        scaleGridLineWidth: 1,
        scaleShowGridLines: false,
        scaleGridLineColor: "rgba(0,0,0,0)",
        pointDotRadius: 5,
        pointHitDetectionRadius: 10,

      };


    }]);

    app.controller('DashboardBarCtrl', ['$scope', '$timeout', function($scope,
      $timeout) {
      $scope.options = {
        scaleShowVerticalLines: false
      };
      $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep'
      ];
      $scope.series = ['Page Views', 'Visitors'];
      $scope.data = [
        [23, 12, 16, 28, 10, 21, 19, 12, 24],
        [7, 13, 8, 10, 18, 11, 17, 9, 17]
      ];
      $scope.colours = [{ // grey
        fillColor: "rgba(255,110,64,1)",
        strokeColor: "rgba(255,110,64,1)",
        highlightFill: "rgba(255,110,64,1)",
        highlightStroke: "rgba(255,110,64,1)"
      }, { // dark grey
        fillColor: "rgba(103,58,183,1.0)",
        strokeColor: "rgba(103,58,183,1)",
        highlightFill: "rgba(103,58,183,1)",
        highlightStroke: "rgba(103,58,183,1.0)"
      }];

      $scope.options = {
        scaleShowVerticalLines: false,
        scaleShowLabels: true,
        scaleLineWidth: 1,
        scaleLineColor: "rgba(0,0,0,0.1)",
        scaleShowHorizontalLines: false,
        scaleGridLineWidth: 1,
        scaleShowGridLines: false,
        scaleGridLineColor: "rgba(0,0,0,0)",
        pointDotRadius: 5,
        pointHitDetectionRadius: 10,

      };


    }]);

    app.controller('DashboardPolarAreaCtrl', function($scope) {
      $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales',
        'Telesales', 'Corporate Sales'
      ];
      $scope.data = [300, 500, 100, 40, 120];
      $scope.colours = [{ // grey
        fillColor: "rgba(255,110,64,1)",
        strokeColor: "rgba(255,110,64,1)",
        highlightFill: "rgba(255,110,64,1)",
        highlightStroke: "rgba(255,110,64,1)"
      }, { // dark grey
        fillColor: "rgba(103,58,183,1.0)",
        strokeColor: "rgba(103,58,183,1)",
        highlightFill: "rgba(103,58,183,1)",
        highlightStroke: "rgba(103,58,183,1.0)"
      }, { // dark grey
        fillColor: "rgba(253,216,53,1.0)",
        strokeColor: "rgba(253,216,53,1)",
        highlightFill: "rgba(253,216,53,1)",
        highlightStroke: "rgba(253,216,53,1.0)"
      }, { // dark grey
        fillColor: "rgba(76,175,80,1.0)",
        strokeColor: "rgba(76,175,80,1)",
        highlightFill: "rgba(76,175,80,1)",
        highlightStroke: "rgba(76,175,80,1.0)"
      }, { // dark grey
        fillColor: "rgba(244,67,54,1.0)",
        strokeColor: "rgba(244,67,54,1)",
        highlightFill: "rgba(244,67,54,1)",
        highlightStroke: "rgba(244,67,54,1.0)"
      }];



      $scope.options = {
        scaleShowVerticalLines: false,
        scaleShowLabels: true,
        scaleLineWidth: 1,
        scaleLineColor: "rgba(0,0,0,0.1)",
        scaleShowHorizontalLines: false,
        scaleGridLineWidth: 1,
        scaleShowGridLines: false,
        scaleGridLineColor: "rgba(0,0,0,0)",
        pointDotRadius: 5,
        pointHitDetectionRadius: 10,

      };

    });

    app.controller('DashboardRadarCtrl', function($scope) {
      $scope.labels = ['Finance', 'Marketing', 'Hosting', 'Designing',
        'Coding', 'Networking', 'Pricing'
      ];

      $scope.data = [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
      ];

      $scope.onClick = function(points, evt) {
        console.log(points, evt);
      };
      $scope.colours = [{ // grey
        fillColor: "rgba(255,110,64,0.9)",
        strokeColor: "rgba(255,110,64,1)",
        pointColor: "rgba(255,110,64,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,110,64,1)"
      }, { // dark grey
        fillColor: "rgba(103,58,183,0.9)",
        strokeColor: "rgba(103,58,183,1.0)",
        pointColor: "rgba(103,58,183,1.0)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(103,58,183,1.0)"
      }];



      $scope.options = {
        scaleShowVerticalLines: false,
        scaleShowLabels: false,
        scaleLineWidth: 1,
        scaleLineColor: "rgba(0,0,0,0.1)",
        scaleShowHorizontalLines: false,
        scaleGridLineWidth: 1,
        scaleShowGridLines: false,
        scaleGridLineColor: "rgba(0,0,0,0)",
        pointDotRadius: 5,
        pointHitDetectionRadius: 10,

      };
    });


    function getRandomValue(data) {
      var l = data.length,
        previous = l ? data[l - 1] : 50;
      var y = previous + Math.random() * 10 - 5;
      return y < 0 ? 0 : y > 100 ? 100 : y;
    }

    // jVectorMap controller
    app.controller('JVectorMapDemoCtrl', ['$scope', function($scope) {
      $scope.world_markers = [{
        latLng: [41.90, 12.45],
        name: 'Vatican City'
      }, {
        latLng: [43.73, 7.41],
        name: 'Monaco'
      }, {
        latLng: [-0.52, 166.93],
        name: 'Nauru'
      }, {
        latLng: [-8.51, 179.21],
        name: 'Tuvalu'
      }, {
        latLng: [43.93, 12.46],
        name: 'San Marino'
      }, {
        latLng: [47.14, 9.52],
        name: 'Liechtenstein'
      }, {
        latLng: [7.11, 171.06],
        name: 'Marshall Islands'
      }, {
        latLng: [17.3, -62.73],
        name: 'Saint Kitts and Nevis'
      }, {
        latLng: [3.2, 73.22],
        name: 'Maldives'
      }, {
        latLng: [35.88, 14.5],
        name: 'Malta'
      }, {
        latLng: [12.05, -61.75],
        name: 'Grenada'
      }, {
        latLng: [13.16, -61.23],
        name: 'Saint Vincent and the Grenadines'
      }, {
        latLng: [13.16, -59.55],
        name: 'Barbados'
      }, {
        latLng: [17.11, -61.85],
        name: 'Antigua and Barbuda'
      }, {
        latLng: [-4.61, 55.45],
        name: 'Seychelles'
      }, {
        latLng: [7.35, 134.46],
        name: 'Palau'
      }, {
        latLng: [42.5, 1.51],
        name: 'Andorra'
      }, {
        latLng: [14.01, -60.98],
        name: 'Saint Lucia'
      }, {
        latLng: [6.91, 158.18],
        name: 'Federated States of Micronesia'
      }, {
        latLng: [1.3, 103.8],
        name: 'Singapore'
      }, {
        latLng: [1.46, 173.03],
        name: 'Kiribati'
      }, {
        latLng: [-21.13, -175.2],
        name: 'Tonga'
      }, {
        latLng: [15.3, -61.38],
        name: 'Dominica'
      }, {
        latLng: [-20.2, 57.5],
        name: 'Mauritius'
      }, {
        latLng: [26.02, 50.55],
        name: 'Bahrain'
      }, {
        latLng: [0.33, 6.73],
        name: 'São Tomé and Príncipe'
      }];

      $scope.usa_markers = [{
        latLng: [40.71, -74.00],
        name: 'New York'
      }, {
        latLng: [34.05, -118.24],
        name: 'Los Angeles'
      }, {
        latLng: [41.87, -87.62],
        name: 'Chicago'
      }, {
        latLng: [29.76, -95.36],
        name: 'Houston'
      }, {
        latLng: [39.95, -75.16],
        name: 'Philadelphia'
      }, {
        latLng: [38.90, -77.03],
        name: 'Washington'
      }, {
        latLng: [37.36, -122.03],
        name: 'Silicon Valley'
      }];
    }]);
;app.controller('FAQCtrl', ['$scope', function ($scope) {
	$scope.general = [
	{
		"title": "What is Graphic Design?",
		"answer": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Is account registration required?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Can I submit my own Bootstrap templates or themes?",
		"answer": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "What is the currency used for all transactions?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}
	];
 
	$scope.sellers = [
	{
		"title": "Who cen sell items?",
		"answer": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "I want to sell my items - what are the steps?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "How much do I get from each sale?",
		"answer": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Why sell my items here?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "What are the payment options?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "When do I get paid?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}
	];

 
	$scope.buyers = [
	{
		"title": "I want to buy a theme - what are the steps?",
		"answer": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Is this the latest version of an item?",
		"answer": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}
	];






}]);;app.controller('FileUploadCtrl', ['$scope', 'FileUploader', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'js/controllers/upload.php'
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
}]);;'use strict';

/* Controllers */

app.controller('FlotChartCtrl', ['$scope', function($scope) {
    $scope.chart1 = [ [1,8.5],[2,5.5],[3,8],[4,4],[5,4.5],[6,6],[7,6.8],[8,8],[9,5.2],[10,8],[11,8.8],[12,5] ];

    $scope.chart2 = [ [0,8],[1,4.5],[2,15.5],[3,3],[4,4],[5,8],[6,1],[7,8.5],[8,4],[9,9] ];

    $scope.chart3 = [ [0,5],[1,7.5],[2,4],[3,6.5],[4,7],[5,3.5],[6,4],[7,9],[8,3],[9,8] ];

    $scope.chart4_1 = [ [10, 80], [20, 120], [30, 50], [40, 90] ];

    $scope.chart4_2 = [ [10, 60],  [20, 80], [30, 50],  [40, 45] ];

    $scope.chart4_3 = [ [10, 50],  [20, 80], [30, 70],  [40, 90] ];


    $scope.chart5 = [ 
      { label: "Samsung", data: 40 }, 
      { label: "Apple", data: 10 },
      { label: "Dell", data: 20 },
      { label: "HP", data: 12 },
      { label: "Lenovo", data: 18 }
    ];


  }]);;app.controller('FormEditorCtrl', function($scope, $http, $timeout, $ocLazyLoad) {
  $scope.htmlVariable = '<h3>Try me!</h3><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
});;app.controller('FormSliderCtrl', function($scope) {

		$scope.scopes = [];
		    $scope.value = 5;
		    $scope.values = {
			    low : 4,
			    high: 7
		    };
		    $scope.scale = function(value) {
			    return Math.pow(value, 3);
		    };
		    $scope.inverseScale = function(value) {
			    var sign = value == 0?1:(value / Math.abs(value));
			    return sign * Math.pow(Math.abs(value), 1 / 3);
		    };
		    $scope.addScope = function() {
			    $scope.scopes.push({
				    values: {
					    low : 4,
					    high: 7
				    },
				    value : 5
			    });
		    };
		    $scope.translate = function(value) {
			    return '$' + value;
		    };
		    $scope.translateCombined = function(low, high) {
			    return $scope.translate(low.toFixed($scope.precision)) + " *** " + $scope.translate(high.toFixed($scope.precision));
		    };
		    $scope.translateRange = function(low, high) {
			    return $scope.translate((high - low).toFixed($scope.precision));
		    };
		    $scope.fireResizeEvent = function() {
			    $scope.$broadcast('refreshSlider');
		    };






});;'use strict';

/* Controllers */

  // Form controller
app.controller('FormValidationCtrl', ['$scope', function($scope) {
    $scope.notBlackListed = function(value) {
      var blacklist = ['bad@domain.com','verybad@domain.com'];
      return blacklist.indexOf(value) === -1;
    }
}]);
;app.controller('FormXeditableCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 
  function($scope, $filter, $http, editableOptions, editableThemes){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.html5 = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null
    };

    $scope.user = {
    	name: 'awesome',
    	desc: 'Awesome user \ndescription!',
      status: 2,
      agenda: 1,
      remember: false
    }; 

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'}
    ];

    $scope.agenda = [
      {value: 1, text: 'male'},
      {value: 2, text: 'female'}
    ];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.showAgenda = function() {
      var selected = $filter('filter')($scope.agenda, {value: $scope.user.agenda});
      return ($scope.user.agenda && selected.length) ? selected[0].text : 'Not set';
    };

    // editable table
    $scope.users = [
      {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
      {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
      {id: 3, name: 'awesome user3', status: 2, group: null}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('data/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user && user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.checkName = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('data/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null 
      };
      $scope.users.push($scope.inserted);
    };

}]);
;app.controller('ImgCropCtrl', ['$scope', function($scope) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="circle";

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
}]);;'use strict';

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
;;app.controller('MailCtrl', ['$scope', function($scope) {
  $scope.folds = [{
    name: 'Inbox',
    filter: '',
    icon: 'fa-inbox',
    badge: 'primary',
    count: '6'
  }, {
    name: 'Sent',
    filter: 'sent',
    icon: 'fa-send-o',
    badge: '',
    count: ''
  }, {
    name: 'Important',
    filter: 'important',
    icon: 'fa-star-o',
    badge: '',
    count: ''
  }, {
    name: 'Draft',
    filter: 'draft',
    icon: 'fa-edit',
    badge: 'orange',
    count: '2'
  }, {
    name: 'Trash',
    filter: 'trash',
    icon: 'fa-trash-o',
    badge: '',
    count: ''
  }];

  $scope.labels = [{
    name: 'Urgent',
    filter: 'urgent',
    color: 'danger'
  }, {
    name: 'Market',
    filter: 'market',
    color: 'warning'
  }, {
    name: 'Family',
    filter: 'family',
    color: 'success'
  }, {
    name: 'Work',
    filter: 'work',
    color: 'info'
  }];

  $scope.addLabel = function() {
    $scope.labels.push({
      name: $scope.newLabel.name,
      filter: angular.lowercase($scope.newLabel.name),
      color: 'secondary'
    });
    $scope.newLabel.name = '';
  }

  $scope.labelClass = function(label) {
    if (angular.lowercase(label) === 'urgent') {
      return 'danger';
    } else if (angular.lowercase(label) === 'market') {
      return 'primary';
    } else if (angular.lowercase(label) === 'family') {
      return 'success';
    } else if (angular.lowercase(label) === 'work') {
      return 'orange';
    } else {
      return 'secondary';
    }
  };

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function(
  $scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;
  mails.all().then(function(mails) {
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function(
  $scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function(mail) {
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [{
    name: 'James',
    email: 'james@gmail.com'
  }, {
    name: 'Luoris Kiso',
    email: 'luoris.kiso@hotmail.com'
  }, {
    name: 'Lucy Yokes',
    email: 'lucy.yokes@gmail.com'
  }];
}]);

app.directive('labelColor', function() {
  return function(scope, $el, attrs) {
    $el.css({
      'color': attrs.color
    });
  }
});
;app.controller('MapsCtrl',['$scope',function(scope){
    scope.map = {
        center:
        {
            latitude: -1.2833,
            longitude: 36.8167
        },
        zoom: 7
    };
}]);


;app.controller('MembersCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/members.json').success(function(data) {
      $scope.members = data;
    });
  }]);
;app.controller('MessagesWidgetCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('../data/messages.json').success(function(data) {
      $scope.messages = data;
    });
  }]);

;'use strict';

app.controller('MorrisCtrl', function($scope){
  $scope.barData = [
        { y: "2009", a: 175,  b: 165, c: 160, d: 140},
        { y: "2010", a: 150,  b: 140, c: 120, d: 110 },
        { y: "2011", a: 175,  b: 165, c: 60, d: 190 },
        { y: "2012", a: 60, b: 190, c: 60, d: 190 }
    ];

});;'use strict';

app.controller('NotifyCtrl', function($scope,notify){

    $scope.msg = 'Hello! This is a sample message!';
    $scope.template = '';

    $scope.positions = ['center', 'left', 'right'];
    $scope.position = $scope.positions[0];

    $scope.duration = 10000;

    $scope.demo = function(){
        notify({
            message: $scope.msg,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            duration: $scope.duration
        });
    };

    $scope.closeAll = function(){
        notify.closeAll();
    };

    $scope.demoMessageTemplate = function(){

        var messageTemplate = '<span>This is an example using a dynamically rendered Angular template for the message text. '+
        'I can have <a href="" ng-click="clickedLink()">hyperlinks</a> with ng-click or any valid Angular enhanced html.</span>';

        notify({
            messageTemplate: messageTemplate,
            classes: $scope.classes,
            scope:$scope,
            templateUrl: $scope.template,
            position: $scope.position,
        });       

    };

    $scope.clickedLink = function(){
        notify('You clicked a link!');
    };
});;'use strict';

// signup controller
app.controller('RegisterFormController', ['$scope', '$http', '$state', 'localStorageService', '$rootScope',
    function (scope, http, state, localStorageService, rootScope) {
        scope.subscriber = {};
        scope.authError = null;

        /**
         * @description Register Regular User
         */
        scope.register = function () {
            scope.authError = null;
            // Try to create
            http.post('http://anwani-devapi.c4asolution.com/subscribers/signup', scope.subscriber)
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

            http.post('http://anwani-devapi.c4asolution.com/subscribers/signup', scope.subscriber)
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
;;/**
 */

'use strict';

app.controller('RickshawCtrl', ['$scope', '$interval', function($scope, $interval) {
        $scope.renderers = [{
                id: 'area',
                name: 'Area'
            }, {
                id: 'line',
                name: 'Line'
            }, {
                id: 'bar',
                name: 'Bar'
            }, {
                id: 'scatterplot',
                name: 'Scatterplot'
            }];
        $scope.palettes = [
            'spectrum14',
            'spectrum2000',
            'spectrum2001',
            'colorwheel',
            'cool',
            'classic9',
            'munin'
        ];
        $scope.xAxes = [
            'none',
            'numeric',
            'decade',
            'year',
            'month',
            'week',
            'day',
            '6 hour',
            'hour',
            '15 minute',
            'minute',
            '15 second',
            'second',
            'decisecond',
            'centisecond'
        ];
        $scope.yAxes = [
            'none',
            'formatKMBT',
            'formatBase1024KMGTP'
        ];

        $scope.rendererChanged = function(id) {
            if (!$scope['options' + id]) {
                $scope['options' + id] = {};
            }
            $scope['options' + id].renderer = $scope['renderer' + id].id;
        };

        $scope.paletteChanged = function(id) {
            if (!$scope['features' + id]) {
                $scope['features' + id] = {};
            }
            $scope['features' + id].palette = $scope['palette' + id];
        };
        
        $scope.legendChanged = function(id) {
            if (!$scope['features' + id]) {
                $scope['features' + id] = {};
            }
            if ($scope['legend' + id]) {
                $scope['features' + id].legend = {
                    toggle: true,
                    highlight: true
                };
            }
            else {
                delete $scope['features' + id].legend;
            }
        };
        
        $scope.xAxisChanged = function(id) {
            if (!$scope['features' + id]) {
                $scope['features' + id] = {};
            }
            var xAxis = $scope['xAxis' + id];
            if (xAxis) {
                if (xAxis === 'none') {
                    delete $scope['features' + id].xAxis;
                }
                else if (xAxis === 'numeric') {
                    $scope['features' + id].xAxis = {
                    };
                }
                else {
                    $scope['features' + id].xAxis = {
                        timeUnit: xAxis
                    };
                }
            }
            else {
                delete $scope['features' + id].xAxis;
            }
            $scope['xAxisDisabled' + id] = true;
        };

        $scope.yAxisChanged = function(id) {
            if (!$scope['features' + id]) {
                $scope['features' + id] = {};
            }
            var yAxis = $scope['yAxis' + id];
            if (yAxis) {
                if (yAxis === 'none') {
                    delete $scope['features' + id].yAxis;
                }
                else {
                    $scope['features' + id].yAxis = {
                        tickFormat: yAxis
                    };
                }
            }
            else {
                delete $scope['features' + id].xAxis;
            }
            $scope['yAxisDisabled' + id] = true;
        };

        $scope.changeSeriesData = function(id) {
            var seriesList = [];
            for (var i = 0; i < 3; i++) {
                var series = {
                    name: 'Series ' + (i + 1),
                    data: []
                };
                for (var j = 0; j < 10; j++) {
                    series.data.push({x: j * 900, y: Math.random() * 10000});
                }
                seriesList.push(series);
            }
            $scope['series' + id] = seriesList;
        };

        $scope.options1 = {
            renderer: 'area'
        };
        $scope.series1 = [{
                name: 'Series 1',
                color: '#673AB7',
                data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
            }, {
                name: 'Series 2',
                color: '#FF6E40',
                data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
            }];

        $scope.options2 = {
            renderer: 'line'
        };
        $scope.features2 = {
            hover: {
                xFormatter: function(x) {
                    return 't=' + x;
                },
                yFormatter: function(y) {
                    return '$' + y;
                }
            }
        };
        $scope.series2 = [{
                name: 'Series 1',
                color: '#673AB7',
                data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
            }, {
                name: 'Series 2',
                color: '#FF6E40',
                data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
            }];

        $scope.options3 = {
            renderer: 'bar'
        };
        $scope.features3 = {
            palette: 'colorwheel'
        };
        $scope.series3 = [{
                name: 'Series 1',
                data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
            }, {
                name: 'Series 2',
                data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
            }];

        $scope.options4 = {
            renderer: 'bar'
        };
        $scope.features4 = {
            xAxis: {
                timeUnit: 'hour'
            }
        };
        $scope.series4 = [{
                name: 'Series 1',
                color: '#673AB7',
                data: [{x: 0 * 60, y: 230}, {x: 30 * 60, y: 1500}, {x: 60 * 60, y: 790}, {x: 90 * 60, y: 310}, {x: 120 * 60, y: 600}]
            }, {
                name: 'Series 2',
                color: '#FF6E40',
                data: [{x: 0 * 60, y: 300}, {x: 30 * 60, y: 2000}, {x: 60 * 60, y: 640}, {x: 90 * 60, y: 500}, {x: 120 * 60, y: 150}]
            }];

        $scope.options5 = {
            renderer: 'bar'
        };
        $scope.features5 = {
            yAxis: {
                tickFormat: 'formatKMBT'
            }
        };
        $scope.series5 = [{
                name: 'Series 1',
                color: '#673AB7',
                data: [{x: 0, y: 230}, {x: 1, y: 1500}, {x: 2, y: 790}, {x: 3, y: 310}, {x: 4, y: 600}]
            }, {
                name: 'Series 2',
                color: '#FF6E40',
                data: [{x: 0, y: 300}, {x: 1, y: 2000}, {x: 2, y: 640}, {x: 3, y: 500}, {x: 4, y: 150}]
            }];

        $scope.options6 = {
            renderer: 'line'
        };
        $scope.features6 = {
            legend: {
                toggle: true,
                highlight: true
            }
        };
        $scope.series6 = [{
                name: 'Series 1',
                color: '#673AB7',
                data: [{x: 0, y: 230}, {x: 1, y: 1500}, {x: 2, y: 790}, {x: 3, y: 310}, {x: 4, y: 600}]
            },
            {
                name: 'Series 2',
                color: '#FF6E40',
                data: [{x: 0, y: 300}, {x: 1, y: 2000}, {x: 2, y: 640}, {x: 3, y: 500}, {x: 4, y: 150}]
            }];

        $scope.series0 = [];

        $scope.options0 = {
            renderer: 'area'
        };
        $scope.renderer0 = $scope.renderers[0];
        $scope.palette0 = $scope.palettes[0];
        $scope.xAxis0 = 'none';
        $scope.yAxis0 = 'none';
        $scope.xAxisDisabled0 = false;
        $scope.yAxisDisabled0 = false;

        $scope.rendererChanged(0);
        $scope.paletteChanged(0);
        $scope.changeSeriesData(0);

        $scope.options100 = {
            renderer: 'line'
        };
        $scope.features100 = {
            xAxis: {
            },
            yAxis: {
                tickFormat: 'formatKMBT'
            }
        };
        $scope.series100 = [{
                name: 'Series 1',
                color: '#673AB7',
                data: []
            }, {
                name: 'Series 2',
                color: '#FF6E40',
                data: []
            }];
        $scope.x100 = 0;

        $scope.toggleRandomSeries = function(id) {
            $scope['random' + id] = !$scope['random' + id];
            if ($scope['random' + id]) {
                $scope['interval' + id] = $interval(function() {
                    var x = $scope['x' + id];
                    var series = $scope['series' + id];
                    for (var i = 0; i < series.length; i++) {
                        var name = series[i].name;
                        var color = series[i].color;
                        var data = series[i].data;
                        data.push({x: x, y: Math.random() * 10000});
                        series[i] = {
                            name: name,
                            color: color,
                            data: data
                        };
                    }
                    x++;
                    $scope['x' + id] = x;
                }, 1000);
            }
            else {
                $interval.cancel($scope['interval' + id]);
            }
        };
    }]);;app.controller('SearchPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	$scope.items = [
	{
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["web, images"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/2.png",
		"category": ["web, projects"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/3.png",
		"category": ["contacts, images"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/4.png",
		"category": ["web, profile"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/1.png",
		"category": ["videos, images"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/2.png",
		"category": ["messages"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/1.png",
		"category": ["web, images"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/2.png",
		"category": ["contacts, profile"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/3.png",
		"category": ["web, videos"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/4.png",
		"category": ["web, projects"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["messages, web"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Human perception and the complex nature",
		"thumb": "data/search/2.png",
		"category": ["contacts"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["web"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/2.png",
		"category": ["messages"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/3.png",
		"category": ["web, images"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/4.png",
		"category": ["map"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/1.png",
		"category": ["map, profile"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "Human perception and the complex nature",
		"thumb": "data/search/2.png",
		"category": ["map"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	},	{
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["web, images"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/2.png",
		"category": ["web, projects"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/3.png",
		"category": ["contacts, images"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/4.png",
		"category": ["web, profile"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/1.png",
		"category": ["videos, images"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/2.png",
		"category": ["messages"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/1.png",
		"category": ["web, images"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/2.png",
		"category": ["contacts, profile"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/3.png",
		"category": ["web, videos"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/4.png",
		"category": ["web, projects"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["messages, web"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Human perception and the complex nature",
		"thumb": "data/search/2.png",
		"category": ["contacts"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["web"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/2.png",
		"category": ["messages"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/3.png",
		"category": ["web, images"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/4.png",
		"category": ["map"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/1.png",
		"category": ["map, profile"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "Human perception and the complex nature",
		"thumb": "data/search/2.png",
		"category": ["map"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	},	{
		"title": "What is Graphic Design?",
		"thumb": "data/search/1.png",
		"category": ["web, images"],
		"description": "Distinguishing by comparing/creating differences. Some ways of creating contrast among elements in the design include using contrasting colors, sizes, shapes, locations, or relationships.",
	}, {
		"title": "Comparing/creating differences",
		"thumb": "data/search/2.png",
		"category": ["web, projects"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Designs in balance",
		"thumb": "data/search/3.png",
		"category": ["contacts, images"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}, {
		"title": "Art of visual communication",
		"thumb": "data/search/4.png",
		"category": ["web, profile"],
		"description": "Designs in balance (or equilibrium) have their parts arrangement planned, keeping a coherent visual pattern (color, shape, space).",
	}, {
		"title": "Keeping a coherent visual pattern",
		"thumb": "data/search/1.png",
		"category": ["videos, images"],
		"description": "concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance",
	}, {
		"title": "What is Graphic Design?",
		"thumb": "data/search/2.png",
		"category": ["messages"],
		"description": "For text, contrast is achieved by mixing serif and sans-serif on the page, by using very different type styles, or by using type in surprising or unusual ways.",
	}
	];
 
	// create empty search model (object) to trigger $watch on update
	$scope.search = {};
 
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};




 
	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems = $scope.items.length;
	$scope.entryLimit = 8; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
 	
	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		$scope.filtered = filterFilter($scope.items, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}]);;app.controller('SubscribersCtrl', ['$scope', 'filterFilter','$http','$rootScope','$state',
    function (scope, filterFilter,http,rootScope,state) {

        scope.add = function add(){
            http.post('http://anwani-devapi.c4asolution.com/subscribers/signup',scope.subscriber).then(function(result){
                console.log(result);
            });
        };

        scope.view = function view(subscriber){
            rootScope.chosenSubscriber=subscriber;
            state.go('app.subscriber.one');
        };

    }]);

/**
 * Get Subscribers on RUN
 */
app.run(['$http','$rootScope',function(http,rootScope){
    if(rootScope.user) {
        get_subscribers();
    }
    function get_subscribers(){
        http.get('http://anwani-devapi.c4asolution.com/subscribers?page=1&per_page=10'
        ).then(function(result){
                rootScope.subscribers = result.data.docs;
            });
    };
}]);;app.controller('ngGridDemoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('js/controllers/largeLoad.json').success(function (largeLoad) {    
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('js/controllers/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 36,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };



 $scope.mySelections2 = [];
    $scope.myData2 = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions2 = { 
      data: 'myData2',
      selectedItems: $scope.mySelections2,
      multiSelect: false,
      enableCellSelection: true
    };





$scope.myData3 = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions3 = { 
        data: 'myData3',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true}, 
                     {field:'age', displayName:'Age', enableCellEdit: true}]
    };






}]);
;app.controller('SmartTableCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.rowCollectionBasic = [
      {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
      {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
      {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
  ];

  $scope.removeRow = function(row) {
      var index = $scope.rowCollectionBasic.indexOf(row);
      if (index !== -1) {
          $scope.rowCollectionBasic.splice(index, 1);
      }
  };

  $scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
  $scope.selectedPredicate = $scope.predicates[0];

  var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
  var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
  var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
  var id = 1;

  function generateRandomItem(id) {

      var firstname = firstnames[Math.floor(Math.random() * 3)];
      var lastname = lastnames[Math.floor(Math.random() * 3)];
      var birthdate = dates[Math.floor(Math.random() * 3)];
      var balance = Math.floor(Math.random() * 2000);

      return {
          id: id,
          firstName: firstname,
          lastName: lastname,
          birthDate: new Date(birthdate),
          balance: balance
      }
  }

  $scope.rowCollection = [];

  for (id; id < 5; id++) {
      $scope.rowCollection.push(generateRandomItem(id));
  }

  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
  $scope.displayedCollection = [].concat($scope.rowCollection);

  //add to the real data holder
  $scope.addRandomItem = function addRandomItem() {
      $scope.rowCollection.push(generateRandomItem(id));
      id++;
  };

  //remove to the real data holder
  $scope.removeItem = function(row) {
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
      }
  }

  //  pagination
  $scope.itemsByPage=10;

  $scope.rowCollectionPage = [];
  for (var j = 0; j < 200; j++) {
    $scope.rowCollectionPage.push(generateRandomItem(j));
  }

  // pip
  var promise = null;
  $scope.isLoading = false;
  $scope.rowCollectionPip = [];
  $scope.getPage = function() {
    $scope.rowCollectionPip=[];
    for (var j = 0; j < 20; j++) {
      $scope.rowCollectionPip.push(generateRandomItem(j));
    }
  }

  $scope.callServer = function getData(tableState) {
      //here you could create a query string from tableState
      //fake ajax call
      $scope.isLoading = true;

      $timeout(function () {
          $scope.getPage();
          $scope.isLoading = false;
      }, 2000);
  };

 $scope.getPage();

}]);;app.controller('UiGridDemoCtrl', ['$scope', 'uiGridConstants', function($scope, uiGridConstants) {
    $scope.gridOptionsSimple = {
        rowHeight: 36,
        data: [
          {
              "name": "Ethel Price",
              "gender": "female",
              "company": "Enersol"
          },
          {
              "name": "Claudine Neal",
              "gender": "female",
              "company": "Sealoud"
          },
          {
              "name": "Beryl Rice",
              "gender": "female",
              "company": "Velity"
          },
          {
              "name": "Wilder Gonzales",
              "gender": "male",
              "company": "Geekko"
          },
          {
              "name": "Georgina Schultz",
              "gender": "female",
              "company": "Suretech"
          },
          {
              "name": "Carroll Buchanan",
              "gender": "male",
              "company": "Ecosys"
          },
          {
              "name": "Valarie Atkinson",
              "gender": "female",
              "company": "Hopeli"
          },
          {
              "name": "Schroeder Mathews",
              "gender": "male",
              "company": "Polarium"
          },
          {
              "name": "Lynda Mendoza",
              "gender": "female",
              "company": "Dogspa"
          },
          {
              "name": "Sarah Massey",
              "gender": "female",
              "company": "Bisba"
          },
          {
              "name": "Robles Boyle",
              "gender": "male",
              "company": "Comtract"
          },
          {
              "name": "Evans Hickman",
              "gender": "male",
              "company": "Parleynet"
          },
          {
              "name": "Dawson Barber",
              "gender": "male",
              "company": "Dymi"
          },
          {
              "name": "Bruce Strong",
              "gender": "male",
              "company": "Xyqag"
          },
          {
              "name": "Nellie Whitfield",
              "gender": "female",
              "company": "Exospace"
          },
          {
              "name": "Jackson Macias",
              "gender": "male",
              "company": "Aquamate"
          },
          {
              "name": "Pena Pena",
              "gender": "male",
              "company": "Quarx"
          },
          {
              "name": "Lelia Gates",
              "gender": "female",
              "company": "Proxsoft"
          },
          {
              "name": "Letitia Vasquez",
              "gender": "female",
              "company": "Slumberia"
          },
          {
              "name": "Trevino Moreno",
              "gender": "male",
              "company": "Conjurica"
          }
        ]
      };
      
      $scope.gridOptionsComplex = {
        enableFiltering: true,
        showFooter: true,
        rowHeight: 36,
        columnDefs: [
          { name: 'name', aggregationType: uiGridConstants.aggregationTypes.count, width: 150 },
          { name: 'gender', filter: { term: 'male' }, width: 150, enableCellEdit: false, 
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
              if (grid.getCellValue(row,col) === 'male') {
                return 'blue';
              } else if (grid.getCellValue(row,col) === 'female') {
                return 'pink';
              }
            } 
          },
          { name: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, width: 100 },
          { name: 'company', enableFiltering: false, width: 200 }
        ],
        data: [
          {
              "name": "Ethel Price",
              "gender": "female",
              "company": "Enersol",
              "age": 25
          },
          {
              "name": "Claudine Neal",
              "gender": "female",
              "company": "Sealoud",
              "age": 19
          },
          {
              "name": "Beryl Rice",
              "gender": "female",
              "company": "Velity",
              "age": 44
          },
          {
              "name": "Wilder Gonzales",
              "gender": "male",
              "company": "Geekko",
              "age": 26
          },
          {
              "name": "Georgina Schultz",
              "gender": "female",
              "company": "Suretech",
              "age": 53
          },
          {
              "name": "Carroll Buchanan",
              "gender": "male",
              "company": "Ecosys",
              "age": 64
          },
          {
              "name": "Valarie Atkinson",
              "gender": "female",
              "company": "Hopeli",
              "age": 35
          },
          {
              "name": "Schroeder Mathews",
              "gender": "male",
              "company": "Polarium",
              "age": 29
          },
          {
              "name": "Lynda Mendoza",
              "gender": "female",
              "company": "Dogspa",
              "age": 49
          },
          {
              "name": "Sarah Massey",
              "gender": "female",
              "company": "Bisba",
              "age": 40
          },
          {
              "name": "Robles Boyle",
              "gender": "male",
              "company": "Comtract",
              "age": 32
          },
          {
              "name": "Evans Hickman",
              "gender": "male",
              "company": "Parleynet",
              "age": 38
          },
          {
              "name": "Dawson Barber",
              "gender": "male",
              "company": "Dymi",
              "age": 21
          },
          {
              "name": "Bruce Strong",
              "gender": "male",
              "company": "Xyqag",
              "age": 61
          },
          {
              "name": "Nellie Whitfield",
              "gender": "female",
              "company": "Exospace",
              "age": 54
          },
          {
              "name": "Jackson Macias",
              "gender": "male",
              "company": "Aquamate",
              "age": 49
          },
          {
              "name": "Pena Pena",
              "gender": "male",
              "company": "Quarx",
              "age": 25
          },
          {
              "name": "Lelia Gates",
              "gender": "female",
              "company": "Proxsoft",
              "age": 54
          },
          {
              "name": "Alfred Oscar",
              "gender": "male",
              "company": "Transprop",
              "age": 34
          },
          {
              "name": "John Alfred",
              "gender": "male",
              "company": "Haymans",
              "age": 70
          },
          {
              "name": "Leonie Warren",
              "gender": "female",
              "company": "Hilltop",
              "age": 25
          },
          {
              "name": "Belinda Gosford",
              "gender": "female",
              "company": "Archison",
              "age": 42
          },
          {
              "name": "Tracey Misoni",
              "gender": "female",
              "company": "Verizona",
              "age": 34
          },
          {
              "name": "Trevino Moreno",
              "gender": "male",
              "company": "Conjurica",
              "age": 31
          }
        ]
      };
}]);
;app.controller('MessagesDropDownCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('../data/messages.json').success(function(data) {
      $scope.messages = data;
    });
  }]);



app.controller('NotificationsDropDownCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('../data/notifications.json').success(function(data) {
      $scope.notifications = data;
    });
  }]);;jQuery(function($) {

    'use strict';

    var SLANT_SETTINGS = window.SLANT_SETTINGS || {};



    /*--------------------------------
         Other Form component Scripts
     --------------------------------*/
    SLANT_SETTINGS.otherScripts = function() {

        /*---------------------------------*/

        // Slider
        if ($.isFunction($.fn.slider)) {
            $(".slider").each(function(i, el) {
                var $this = $(el),
                    $label_1 = $('<span class="ui-label"></span>'),
                    $label_2 = $label_1.clone(),

                    orientation = getValue($this, 'vertical', 0) != 0 ? 'vertical' : 'horizontal',

                    prefix = getValue($this, 'prefix', ''),
                    postfix = getValue($this, 'postfix', ''),

                    fill = getValue($this, 'fill', ''),
                    $fill = $(fill),

                    step = getValue($this, 'step', 1),
                    value = getValue($this, 'value', 5),
                    min = getValue($this, 'min', 0),
                    max = getValue($this, 'max', 100),
                    min_val = getValue($this, 'min-val', 10),
                    max_val = getValue($this, 'max-val', 90),

                    is_range = $this.is('[data-min-val]') || $this.is('[data-max-val]'),

                    reps = 0;


                // Range Slider Options
                if (is_range) {
                    $this.slider({
                        range: true,
                        orientation: orientation,
                        min: min,
                        max: max,
                        values: [min_val, max_val],
                        step: step,
                        slide: function(e, ui) {
                            var min_val = (prefix ? prefix : '') + ui.values[0] + (postfix ? postfix : ''),
                                max_val = (prefix ? prefix : '') + ui.values[1] + (postfix ? postfix : '');

                            $label_1.html(min_val);
                            $label_2.html(max_val);

                            if (fill)
                                $fill.val(min_val + ',' + max_val);

                            reps++;
                        },
                        change: function(ev, ui) {
                            if (reps == 1) {
                                var min_val = (prefix ? prefix : '') + ui.values[0] + (postfix ? postfix : ''),
                                    max_val = (prefix ? prefix : '') + ui.values[1] + (postfix ? postfix : '');

                                $label_1.html(min_val);
                                $label_2.html(max_val);

                                if (fill)
                                    $fill.val(min_val + ',' + max_val);
                            }

                            reps = 0;
                        }
                    });

                    var $handles = $this.find('.ui-slider-handle');

                    $label_1.html((prefix ? prefix : '') + min_val + (postfix ? postfix : ''));
                    $handles.first().append($label_1);

                    $label_2.html((prefix ? prefix : '') + max_val + (postfix ? postfix : ''));
                    $handles.last().append($label_2);
                }
                // Normal Slider
                else {

                    $this.slider({
                        range: getValue($this, 'basic', 0) ? false : "min",
                        orientation: orientation,
                        min: min,
                        max: max,
                        value: value,
                        step: step,
                        slide: function(ev, ui) {
                            var val = (prefix ? prefix : '') + ui.value + (postfix ? postfix : '');

                            $label_1.html(val);


                            if (fill)
                                $fill.val(val);

                            reps++;
                        },
                        change: function(ev, ui) {
                            if (reps == 1) {
                                var val = (prefix ? prefix : '') + ui.value + (postfix ? postfix : '');

                                $label_1.html(val);

                                if (fill)
                                    $fill.val(val);
                            }

                            reps = 0;
                        }
                    });

                    var $handles = $this.find('.ui-slider-handle');
                    //$fill = $('<div class="ui-fill"></div>');

                    $label_1.html((prefix ? prefix : '') + value + (postfix ? postfix : ''));
                    $handles.html($label_1);

                    //$handles.parent().prepend( $fill );

                    //$fill.width($handles.get(0).style.left);
                }

            })
        }



        /*------------- Color Slider widget---------------*/

        function hexFromRGB(r, g, b) {
            var hex = [
                r.toString(16),
                g.toString(16),
                b.toString(16)
            ];
            $.each(hex, function(nr, val) {
                if (val.length === 1) {
                    hex[nr] = "0" + val;
                }
            });
            return hex.join("").toUpperCase();
        }

        function refreshSwatch() {
            var red = $("#slider-red").slider("value"),
                green = $("#slider-green").slider("value"),
                blue = $("#slider-blue").slider("value"),
                hex = hexFromRGB(red, green, blue);
            $("#slider-swatch").css("background-color", "#" + hex);
        }


        if ($.isFunction($.fn.slider)) {

            $(function() {
                $("#slider-red, #slider-green, #slider-blue").slider({
                    orientation: "horizontal",
                    range: "min",
                    max: 255,
                    value: 127,
                    slide: refreshSwatch,
                    change: refreshSwatch
                });
                $("#slider-red").slider("value", 235);
                $("#slider-green").slider("value", 70);
                $("#slider-blue").slider("value", 60);
            });
        }

    };



    // Element Attribute Helper
    function getValue($el, data_var, default_val) {
        if (typeof $el.data(data_var) != 'undefined') {
            return $el.data(data_var);
        }

        return default_val;
    }


    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        SLANT_SETTINGS.otherScripts();
    });

    $(window).resize(function() {
    });

    $(window).load(function() {
    });

});
;/**
 * @ngdoc controller
 * @name UsersCtrl
 * @memberof AdminApp
 * @param $scope {service} controller scope
 * @param $filterFilter {service}
 * @param $http {service} Angular HTTP Request Service
 * @param $rootScope {service} Angular Root Scope Service
 * @param $state {service} UI Router State Service
 */
app.controller('UsersCtrl', ['$scope', 'filterFilter','$http','$rootScope','$state',
    function (scope, filterFilter,http,rootScope,state) {

        /**
         * Add a user
         * @memberof UsersCtrl
         * @function add
         */
        scope.add = function add(){
            http.post('http://anwani-devapi.c4asolution.com/users/signup',scope.user).then(function(result){
                console.log(result);
            });
        };
        /**
         * View a user
         * @memberof UsersCtrl
         * @function view
         * @param user {object}  Instance of a User parsed from the table
         * @kind function
         */
        scope.view = function view(user){
            rootScope.chosenUser=user;
            state.go('app.users.one');
        };
    }]);

/**
 * @ngdoc runtime
 * @name UsersCtrlRuntime
 * @memberof AdminApp
 * @param $http {service}
 * @param $rootScope {service}
 */
app.run(['$http','$rootScope',function(http,rootScope){
    get_users();
    function get_users(){
        if(rootScope.user){
            http.get('http://anwani-devapi.c4asolution.com/users?page=1&per_page=10'
            ).then(function(result){
                    rootScope.users = result.data.docs;
                });
        }

    }
}]);;'use strict';

// jVectorMap controller
app.controller('JVectorMapDemoCtrl', ['$scope', function($scope) {
    $scope.world_markers = [
      {latLng: [41.90, 12.45], name: 'Vatican City'},
      {latLng: [43.73, 7.41], name: 'Monaco'},
      {latLng: [-0.52, 166.93], name: 'Nauru'},
      {latLng: [-8.51, 179.21], name: 'Tuvalu'},
      {latLng: [43.93, 12.46], name: 'San Marino'},
      {latLng: [47.14, 9.52], name: 'Liechtenstein'},
      {latLng: [7.11, 171.06], name: 'Marshall Islands'},
      {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
      {latLng: [3.2, 73.22], name: 'Maldives'},
      {latLng: [35.88, 14.5], name: 'Malta'},
      {latLng: [12.05, -61.75], name: 'Grenada'},
      {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
      {latLng: [13.16, -59.55], name: 'Barbados'},
      {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
      {latLng: [-4.61, 55.45], name: 'Seychelles'},
      {latLng: [7.35, 134.46], name: 'Palau'},
      {latLng: [42.5, 1.51], name: 'Andorra'},
      {latLng: [14.01, -60.98], name: 'Saint Lucia'},
      {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
      {latLng: [1.3, 103.8], name: 'Singapore'},
      {latLng: [1.46, 173.03], name: 'Kiribati'},
      {latLng: [-21.13, -175.2], name: 'Tonga'},
      {latLng: [15.3, -61.38], name: 'Dominica'},
      {latLng: [-20.2, 57.5], name: 'Mauritius'},
      {latLng: [26.02, 50.55], name: 'Bahrain'},
      {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
    ];

    $scope.usa_markers = [
      {latLng: [40.71, -74.00], name: 'New York'},
      {latLng: [34.05, -118.24], name: 'Los Angeles'},
      {latLng: [41.87, -87.62], name: 'Chicago'},
      {latLng: [29.76, -95.36], name: 'Houston'},
      {latLng: [39.95, -75.16], name: 'Philadelphia'},
      {latLng: [38.90, -77.03], name: 'Washington'},
      {latLng: [37.36, -122.03], name: 'Silicon Valley'}
    ];
  }])
;;app.directive('setNgAnimate', ['$animate', function($animate) {
  return {
    link: function($scope, $element, $attrs) {
      $scope.$watch(function() {
        return $scope.$eval($attrs.setNgAnimate, $scope);
      }, function(valnew, valold) {
        $animate.enabled(!!valnew, $element);
      });
    }
  };
}]);
;/* ------------------------------
   ui.bootstrap tooltip directive
--------------------------------*/

app.directive('uiTooltip', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('mouseenter', '[tooltip]', function(e) {
        //console.log("tooltip triggered");
        var _this = $(this);
        var id = angular.element(_this).attr('tooltip-class');
        $(this).next(".tooltip").addClass(id);
      });

    }
  };
}]);



/* ------------------------------
   ui.bootstrap popover directive
--------------------------------*/

app.directive('uiPopover', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('mouseenter', '[popover]', function(e) {
        //console.log("tooltip triggered");
        var _this = $(this);
        var id = angular.element(_this).attr('popover-class');
        $(this).next(".popover").addClass(id);
      });

    }
  };
}]);


/* ------------------------------
   ui.bootstrap breadcrumb auto hidden directive
--------------------------------*/

app.directive('uiBreadcrumbAutoHidden', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('mouseenter', '.breadcrumb.auto-hidden a', function(e) {
        var _this = $(this);
        $(this).removeClass("collapsed");
      });

      el.on('mouseleave', '.breadcrumb.auto-hidden a', function(e) {
        var _this = $(this);
        $(this).addClass("collapsed");
      });

    }
  };
}]);
;app.directive('uiChatwindow', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('click', '.user-row', function(e) {
        var _this = $(this);
        $(".chaton").show() && e.preventDefault();
      });

      el.on('click', '.closewindow', function(e) {
        var _this = $(this);
        $(".chaton").hide() && e.preventDefault();
      });


      el.on('keypress', '.wid-add-task input', function(e) {
        if (e.keyCode == 13) {
          var _this = $(this);
          var msg = _this.val();
          var msg =
            '<li><label class="icheck icheck-white form-label "><input type="checkbox" value=""><i></i> ' +
            msg + '</label></li>';
          _this.parent().parent().find(".wid-all-tasks ul").append(
            msg);
          _this.val("");
          _this.focus();
          console.log("entered");
        }
      });



    }

  };
}]);
;'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq', ['ui.load']).
value('uiJqConfig', {}).
directive('uiJq', ['uiJqConfig', 'JQ_CONFIG', 'uiLoad', '$timeout', function uiJqInjectingFunction(
  uiJqConfig, JQ_CONFIG, uiLoad, $timeout) {

  return {
    restrict: 'A',
    compile: function uiJqCompilingFunction(tElm, tAttrs) {

      if (!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq +
          '" function does not exist');
      }
      var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

      return function uiJqLinkingFunction(scope, elm, attrs) {

        function getOptions() {
          var linkOptions = [];

          // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
          if (attrs.uiOptions) {
            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
            if (angular.isObject(options) && angular.isObject(
                linkOptions[0])) {
              linkOptions[0] = angular.extend({}, options,
                linkOptions[0]);
            }
          } else if (options) {
            linkOptions = [options];
          }
          return linkOptions;
        }

        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          elm.bind('change', function() {
            elm.trigger('input');
          });
        }

        // Call jQuery method and pass relevant options
        function callPlugin() {
          $timeout(function() {
            elm[attrs.uiJq].apply(elm, getOptions());
          }, 0, false);
        }

        function refresh() {
          // If ui-refresh is used, re-fire the the method upon every change
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function() {
              callPlugin();
            });
          }
        }

        if (JQ_CONFIG[attrs.uiJq]) {
          uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function() {
            callPlugin();
            refresh();
          }).catch(function() {

          });
        } else {
          callPlugin();
          refresh();
        }
      };
    }
  };
}]);
;app.directive('uiModule', ['MODULE_CONFIG', 'uiLoad', '$compile', function(
  MODULE_CONFIG, uiLoad, $compile) {
  return {
    restrict: 'A',
    compile: function(el, attrs) {
      var contents = el.contents().clone();
      return function(scope, el, attrs) {
        el.contents().remove();
        uiLoad.load(MODULE_CONFIG[attrs.uiModule])
          .then(function() {
            $compile(contents)(scope, function(clonedElement, scope) {
              el.append(clonedElement);
            });
          });
      }
    }
  };
}]);
;app.directive('uiNav', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      var _window = $(window),
        _mb = 768,
        wrap = $('.app-aside'),
        next,
        backdrop = '.dropdown-backdrop';
      // unfolded
      el.on('click', 'a', function(e) {
        console.log("hi");
        //next && next.trigger('mouseleave.wraplist');
        var _this = $(this);
        _this.parent().siblings(".active").toggleClass('active');
        _this.parent().toggleClass('active');
        _this.next().is('ul') && _this.find(".arrow").toggleClass(
          "open");

        if (_this.next().is('ul') && _this.find(".arrow").html() ==
          "keyboard_arrow_right") {
          _this.find(".arrow").html("keyboard_arrow_down") && e.preventDefault();
        } else {
          _this.find(".arrow").html("keyboard_arrow_right") && e.preventDefault();
        }

        // mobile
        //_this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
      });

    }
  };
}]);
;/* ------------------------------
   ui search page tabs
--------------------------------*/

app.directive('uiSearchtabs', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('click', '.search_data .nav-tabs li a', function(e) {
        $(".search_data .nav-tabs li a").removeClass("active");
        $(this).addClass("active");
      });

    }
  };
}]);
;app.directive('uiSectionbox', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('click', '.box header .actions i.box_toggle', function(e) {
        var _this = $(this);
        var txt = _this.html();
        if (txt == "expand_more") {
          _this.html("expand_less") && e.preventDefault();
        } else if (txt == "expand_less") {
          _this.html("expand_more") && e.preventDefault();
        }
        _this.parent().parent().parent().toggleClass("collapsed");
      });

      el.on('click', '.box header .actions i.box_close', function(e) {
        var _this = $(this);
        _this.parent().parent().parent().addClass("hide").hide() &&
          e.preventDefault();
      });

      angular.element(document).ready(function() {});
    }

  };
}]);



app.directive('menuheight', ['$timeout', function($window) {
  return function(scope, element, attrs) {
    var w = angular.element($window);
    var changeNavHeight = function() {
      //console.log($scope.settings.menuProfile);
      if (angular.element(".page-sidebar.collapseit").length ||
        angular.element(".page-sidebar.chat_shift").length) {
        var navHeight = angular.element(
            "#main-content section.wrapper .content-wrapper").innerHeight() +
          90;
      } else {
        var navHeight = $(window).innerHeight() - 60;
        //console.log("hi1 "+navHeight);
      }
      //console.log("hi "+navHeight);
      element.height(navHeight);
    };
    w.bind('resize', function() {
      changeNavHeight();
    });
    changeNavHeight();
  }
}]);

app.directive('searchgroup', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('focus', 'input.form-control', function(e) {
        var _this = $(this);
        _this.parent().parent().parent().addClass("focus");
      });
      el.on('blur', 'input.form-control', function(e) {
        var _this = $(this);
        _this.parent().parent().parent().removeClass("focus");
      });

      el.on('click', '.input-focus', function(e) {
        var _this = $(this);
        _this.parent().find(".form-control").focus();
        _this.parent().parent().addClass("focus");
      });


    }

  };
}]);


app.directive('inputgroup', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('focus', 'input.form-control', function(e) {
        var _this = $(this);
        _this.parent().addClass("focus");
      });
      el.on('blur', 'input.form-control', function(e) {
        var _this = $(this);
        _this.parent().removeClass("focus");
      });

      el.on('click', '.input-group-addon', function(e) {
        var _this = $(this);
        _this.parent().find(".form-control").focus();
        _this.parent().addClass("focus");
      });


    }

  };
}]);


app.directive('chatapifocus', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('focus', 'input.form-control', function(e) {
        var _this = $(this);
        _this.parent().find("i").addClass("primary");
      });
      el.on('blur', 'input.form-control', function(e) {
        var _this = $(this);
        _this.parent().find("i").removeClass("primary");
      });

      el.on('click', 'i', function(e) {
        var _this = $(this);
        _this.parent().find(".form-control").focus();
        _this.addClass("primary");
      });


    }

  };
}]);


app.directive('verticalrhythm', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('click', 'i', function(e) {
        var _this = $(this);
        _this.parent().toggleClass("vertical-test-on");
      });
    }

  };
}]);
;app.directive('uiTodowidget', ['$timeout', function($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {

      el.on('change', '.icheck input', function(e) {
        var _this = $(this);
        _this.parent().parent().toggleClass("checked") && e.preventDefault();
      });

      el.on('keypress', '.wid-add-task input', function(e) {
        if (e.keyCode == 13) {
          var _this = $(this);
          var msg = _this.val();
          var msg =
            '<li><label class="icheck icheck-white form-label "><input type="checkbox" value=""><i></i> ' +
            msg + '</label></li>';
          _this.parent().parent().find(".wid-all-tasks ul").append(
            msg);
          _this.val("");
          _this.focus();
        }
      });



    }

  };
}]);
;app.filter('startBlogFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});;'use strict';

/* Filters */
// need load the moment.js to use this filter.
app.filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow();
  }
});
;app.filter('startSearchFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});;jQuery(function($) {

    'use strict';

    var SLANT_SETTINGS = window.SLANT_SETTINGS || {};

    /*--------------------------------
        Knob Chart
     --------------------------------*/
    SLANT_SETTINGS.chartKnob = function() {


        if ($.isFunction($.fn.knob)) {

            $(".knob").knob({
                change: function(value) {
                    //console.log("change : " + value);
                },
                release: function(value) {
                    //console.log(this.$.attr('value'));
                    console.log("release : " + value);
                },
                cancel: function() {
                    console.log("cancel : ", this);
                },
                /*format : function (value) {
                    return value + '%';
                },*/
                draw: function() {

                    // "tron" case
                    if (this.$.data('skin') == 'tron') {

                        this.cursorExt = 0.3;

                        var a = this.arc(this.cv) // Arc
                            ,
                            pa // Previous arc
                            , r = 1;

                        this.g.lineWidth = this.lineWidth;

                        if (this.o.displayPrevious) {
                            pa = this.arc(this.v);
                            this.g.beginPath();
                            this.g.strokeStyle = this.pColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                            this.g.stroke();
                        }

                        this.g.beginPath();
                        this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                        this.g.stroke();

                        this.g.lineWidth = 2;
                        this.g.beginPath();
                        this.g.strokeStyle = this.o.fgColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                        this.g.stroke();

                        return false;
                    }
                }
            });

            // Example of infinite knob, iPod click wheel
            var v, up = 0,
                down = 0,
                i = 0,
                $idir = $("div.idir"),
                $ival = $("div.ival"),
                incr = function() {
                    i++;
                    $idir.show().html("+").fadeOut();
                    $ival.html(i);
                },
                decr = function() {
                    i--;
                    $idir.show().html("-").fadeOut();
                    $ival.html(i);
                };
            $("input.infinite").knob({
                min: 0,
                max: 20,
                stopper: false,
                change: function() {
                    if (v > this.cv) {
                        if (up) {
                            decr();
                            up = 0;
                        } else {
                            up = 1;
                            down = 0;
                        }
                    } else {
                        if (v < this.cv) {
                            if (down) {
                                incr();
                                down = 0;
                            } else {
                                down = 1;
                                up = 0;
                            }
                        }
                    }
                    v = this.cv;
                }
            });


        }


    };



    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        SLANT_SETTINGS.chartKnob();
        knob_clock();
    });

    $(window).resize(function() {});

    $(window).load(function() {});

});



function knob_clock() {
    var $s = $(".second"),
        $m = $(".minute"),
        $h = $(".hour");
    var d = new Date(),
        s = d.getSeconds(),
        m = d.getMinutes(),
        h = d.getHours();
    $s.val(s).trigger("change");
    $m.val(m).trigger("change");
    $h.val(h).trigger("change");
    setTimeout("knob_clock()", 1000);
}
;/*!
 * JavaScript - loadGoogleMaps( version, apiKey, language )
 *
 * - Load Google Maps API using jQuery Deferred. 
 *   Useful if you want to only load the Google Maps API on-demand.
 * - Requires jQuery 1.5
 * 
 * Copyright (c) 2011 Glenn Baker
 * Dual licensed under the MIT and GPL licenses.
 */
/*globals window, google, jQuery*/
var loadGoogleMaps = (function($) {
	
	var now = $.now(),
	
		promise;
	
	return function( version, apiKey, language ) {
		
		if( promise ) { return promise; }
		
			//Create a Deferred Object
		var	deferred = $.Deferred(),
		
			//Declare a resolve function, pass google.maps for the done functions
			resolve = function () {
				deferred.resolve( window.google && google.maps ? google.maps : false );
			},
			
			//global callback name
			callbackName = "loadGoogleMaps_" + ( now++ ),
			
			// Default Parameters
			params = $.extend(
			 {'sensor': false}
			 , apiKey ? {"key": apiKey} : {}
			 , language ? {"language": language} : {} 
			);;
		
		//If google.maps exists, then Google Maps API was probably loaded with the <script> tag
		if( window.google && google.maps ) {
			
			resolve();
		
		//If the google.load method exists, lets load the Google Maps API in Async.
		} else if ( window.google && google.load ) {
		
			google.load("maps", version || 3, {"other_params": $.param(params) , "callback" : resolve});

		//Last, try pure jQuery Ajax technique to load the Google Maps API in Async.
		} else {
			
			//Ajax URL params
			params = $.extend( params, {
				'v': version || 3,
				'callback': callbackName
			});
			
			//Declare the global callback
			window[callbackName] = function( ) {
				
				resolve();
				
				//Delete callback
				setTimeout(function() {
					try{
						delete window[callbackName];
					} catch( e ) {}
				}, 20);
			};
			
			//Can't use the jXHR promise because 'script' doesn't support 'callback=?'
			$.ajax({
				dataType: 'script',
				data: params,
				url: 'http://maps.google.com/maps/api/js'				
			});
			
		}
	
		promise = deferred.promise(); 
		
		return promise;
	};
	
}(jQuery));
;/* global console:false, google:false */
/*jshint unused:false */
'use strict';

app.controller('MapCtrl', ['$scope', function ($scope) {

    $scope.myMarkers = [];

    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function ($event, $params) {
      $scope.myMarkers.push(new google.maps.Marker({
        map: $scope.myMap,
        position: $params[0].latLng
      }));
    };

    $scope.setZoomMessage = function (zoom) {
      $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
      console.log(zoom, 'zoomed');
    };

    $scope.openMarkerInfo = function (marker) {
      $scope.currentMarker = marker;
      $scope.currentMarkerLat = marker.getPosition().lat();
      $scope.currentMarkerLng = marker.getPosition().lng();
      $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function (marker, lat, lng) {
      marker.setPosition(new google.maps.LatLng(lat, lng));
    };
  }])
;;'use strict';

(function () {
  //Setup map events from a google map object to trigger on a given element too,
  //then we just use ui-event to catch events from an element
  function bindMapEvents(scope, eventsStr, googleObject, element) {
    angular.forEach(eventsStr.split(' '), function (eventName) {
      //Prefix all googlemap events with 'map-', so eg 'click'
      //for the googlemap doesn't interfere with a normal 'click' event
      window.google.maps.event.addListener(googleObject, eventName, function (event) {
        element.triggerHandler('map-' + eventName, event);
        //We create an $apply if it isn't happening. we need better support for this
        //We don't want to use timeout because tons of these events fire at once,
        //and we only need one $apply
        if (!scope.$$phase){ scope.$apply();}
      });
    });
  }

  app.value('uiMapConfig', {});
  app.directive('uiMap',
    ['uiMapConfig', '$parse', function (uiMapConfig, $parse) {

      var mapEvents = 'bounds_changed center_changed click dblclick drag dragend ' +
        'dragstart heading_changed idle maptypeid_changed mousemove mouseout ' +
        'mouseover projection_changed resize rightclick tilesloaded tilt_changed ' +
        'zoom_changed';
      var options = uiMapConfig || {};

      return {
        restrict: 'A',
        //doesn't work as E for unknown reason
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          var map = new window.google.maps.Map(elm[0], opts);
          var model = $parse(attrs.uiMap);

          //Set scope variable for the map
          model.assign(scope, map);

          bindMapEvents(scope, mapEvents, map, elm);
        }
      };
    }]);

  app.value('uiMapInfoWindowConfig', {});
  app.directive('uiMapInfoWindow',
    ['uiMapInfoWindowConfig', '$parse', '$compile', function (uiMapInfoWindowConfig, $parse, $compile) {

      var infoWindowEvents = 'closeclick content_change domready ' +
        'position_changed zindex_changed';
      var options = uiMapInfoWindowConfig || {};

      return {
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          opts.content = elm[0];
          var model = $parse(attrs.uiMapInfoWindow);
          var infoWindow = model(scope);

          if (!infoWindow) {
            infoWindow = new window.google.maps.InfoWindow(opts);
            model.assign(scope, infoWindow);
          }

          bindMapEvents(scope, infoWindowEvents, infoWindow, elm);

          /* The info window's contents dont' need to be on the dom anymore,
           google maps has them stored.  So we just replace the infowindow element
           with an empty div. (we don't just straight remove it from the dom because
           straight removing things from the dom can mess up angular) */
          elm.replaceWith('<div></div>');

          //Decorate infoWindow.open to $compile contents before opening
          var _open = infoWindow.open;
          infoWindow.open = function open(a1, a2, a3, a4, a5, a6) {
            $compile(elm.contents())(scope);
            _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
          };
        }
      };
    }]);

  /*
   * Map overlay directives all work the same. Take map marker for example
   * <ui-map-marker="myMarker"> will $watch 'myMarker' and each time it changes,
   * it will hook up myMarker's events to the directive dom element.  Then
   * ui-event will be able to catch all of myMarker's events. Super simple.
   */
  function mapOverlayDirective(directiveName, events) {
    app.directive(directiveName, [function () {
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          scope.$watch(attrs[directiveName], function (newObject) {
            if (newObject) {
              bindMapEvents(scope, events, newObject, elm);
            }
          });
        }
      };
    }]);
  }

  mapOverlayDirective('uiMapMarker',
    'animation_changed click clickable_changed cursor_changed ' +
      'dblclick drag dragend draggable_changed dragstart flat_changed icon_changed ' +
      'mousedown mouseout mouseover mouseup position_changed rightclick ' +
      'shadow_changed shape_changed title_changed visible_changed zindex_changed');

  mapOverlayDirective('uiMapPolyline',
    'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');

  mapOverlayDirective('uiMapPolygon',
    'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');

  mapOverlayDirective('uiMapRectangle',
    'bounds_changed click dblclick mousedown mousemove mouseout mouseover ' +
      'mouseup rightclick');

  mapOverlayDirective('uiMapCircle',
    'center_changed click dblclick mousedown mousemove ' +
      'mouseout mouseover mouseup radius_changed rightclick');

  mapOverlayDirective('uiMapGroundOverlay',
    'click dblclick');

})();
;/**
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
;// A RESTful factory for retreiving mails from 'mails.json'
app.factory('mails', ['$http', function ($http) {
  var path = 'data/mail/mails.json';
  var mails = $http.get(path).then(function (resp) {
    return resp.data.mails;
  });

  var factory = {};
  factory.all = function () {
    return mails;
  };
  factory.get = function (id) {
    return mails.then(function(mails){
      for (var i = 0; i < mails.length; i++) {
        if (mails[i].id == id) return mails[i];
      }
      return null;
    })
  };
  return factory;
}]);;'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 *
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */

angular.module('ui.load', [])
	.service('uiLoad', ['$document', '$q', '$timeout', function($document, $q,
		$timeout) {

		var loaded = [];
		var promise = false;
		var deferred = $q.defer();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		this.load = function(srcs) {
			srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			var self = this;
			if (!promise) {
				promise = deferred.promise;
			}
			angular.forEach(srcs, function(src) {
				promise = promise.then(function() {
					return src.indexOf('.css') >= 0 ? self.loadCSS(src) : self.loadScript(
						src);
				});
			});
			deferred.resolve();
			return promise;
		}

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		this.loadScript = function(src) {
			if (loaded[src]) return loaded[src].promise;

			var deferred = $q.defer();
			var script = $document[0].createElement('script');
			script.src = src;
			script.onload = function(e) {
				$timeout(function() {
					deferred.resolve(e);
				});
			};
			script.onerror = function(e) {
				$timeout(function() {
					deferred.reject(e);
				});
			};
			$document[0].body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise;
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		this.loadCSS = function(href) {
			if (loaded[href]) return loaded[href].promise;

			var deferred = $q.defer();
			var style = $document[0].createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function(e) {
				$timeout(function() {
					deferred.resolve(e);
				});
			};
			style.onerror = function(e) {
				$timeout(function() {
					deferred.reject(e);
				});
			};
			$document[0].head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise;
		};
	}]);
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
