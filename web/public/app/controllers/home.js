// I control the main demo.
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
