<!DOCTYPE html>
<html lang="en" ng-app="AdminApp" class="no-js {{app.settings.layoutBoxed ? 'boxed' : ''}}">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Anwani Dashboard</title>
  <meta name="description" content="AngularJs Bootstrap Admin Theme, Angular, Admin, Admin theme">
  <meta name="keywords" content="AngularJS" , "admin", "widgets", "admin panel", "flat ui", "ui", "web app", "app", "backend", "angular", "dashboard", "bootstrap", "charts", "ui kit", "responsive" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon" />
  <link rel="stylesheet" href="../libs/styles/bootstrap.css" media="screen" title="no title" charset="utf-8">
  <!-- Favicon -->
  <!-- CSS FRAMEWORK - START -->
  <link rel='stylesheet' href='../libs/styles/loading-bar.css' type='text/css' media='all' />
  <!-- Angular Loader -->
  <!--     <link href="../bower_components/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" /> -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
  <link href="../libs/styles/animate.css" rel="stylesheet" type="text/css" />
  <!-- CSS FRAMEWORK - END -->
  <link rel="stylesheet" href="../css/app.css">
</head>

<body ng-controller="AppCtrl" class="{{app.settings.layoutBoxed ? 'boxed' : ''}}">
  <div ui-view class="row" style="margin:0 !important"></div>
  <!-- JS FRAMEWORK - START -->
  <script src="../libs/js/jquery.js" type="text/javascript"></script>
  <!-- Angular Scripts -->
  <script src="../libs/js/angular.js"></script>
  <script src='//maps.googleapis.com/maps/api/js?sensor=false'></script>
  <script src="../libs/js/angular-animate.js"></script>
  <!--    <script src="../libs/angular-cookies/angular-cookies.js"></script>-->
  <!--    <script src="../libs/angular-resource/angular-resource.js"></script>-->
  <!--    <script src="../libs/angular-sanitize/angular-sanitize.js"></script>-->
  <script src="../libs/js/angular-touch.js"></script>
  <script src="../libs/js/angular-ui-router.js"></script>
  <!--<script src="../libs/ngstorage/ngStorage.js"></script>-->
  <!-- <script src="../bower_components/angular-ui-utils/index.js"></script> -->
  <script src="../libs/js/ui-bootstrap-tpls.js"></script>
  <!-- Angular ui bootstrap -->
  <script src="../libs/js/ocLazyLoad.js"></script>
  <!-- lazyload -->
  <script type='text/javascript' src='../libs/js/loading-bar.js'></script>
  <script src="../libs/js/perfect-scrollbar.js" type="text/javascript"></script>
  <script src="../libs/js/angular-perfect-scrollbar.js" type="text/javascript"></script>
  <script src="../libs/js/angular-inview.js" type="text/javascript"></script>
  <script src='../libs/js/Chart.js'></script>
  <script src="../libs/js/angular-chart.js" type="text/javascript"></script>
  <script src="../libs/js/angular-local-storage.js"></script>
  <script src="../libs/js/smart-table.min.js"></script>
  <script src="../libs/js/smart-table.min.js"></script>
  <script src="../libs/js/angular-google-maps.js"></script>
  <script src="../libs/js/angular-permission.js"></script>
  <script src="../libs/js/lodash.js"></script>
  <script src="../libs/js/moment.js"></script>
  <script src="../libs/js/mask.js"></script>
  <script src="../libs/js/angular-moment.js"></script>
  <script src="../libs/js/angular-simple-logger.js"></script>
  <!-- JS FRAMEWORK - END -->
  <!-- App JS - Start -->
  <script src="../dist/admin-app.js"></script>
  <!-- App JS - End -->
  <script src="//localhost:35729/livereload.js"></script>
</body>

</html>
