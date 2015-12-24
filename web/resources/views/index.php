<html ng-app='ClientApp'>

<!-- Head -->
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="libs/styles/lato.css">
	<link rel="stylesheet" href="libs/styles/semantic.css">
	<link rel="stylesheet" href="dist/styles.css">
	<link rel="stylesheet" href="libs/styles/font-awesome.css">
	<link rel="stylesheet" href="libs/styles/ionicons.css">
	<link rel="stylesheet" href="libs/styles/angular-aside.css">
	<link rel="stylesheet" href="libs/styles/angular-chart.css">
	<link rel="stylesheet" href="libs/styles/leaflet.awesome-markers.css">
	<link rel="stylesheet" href="libs/styles/retable.css">
	<!-- <link href='https:/api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' /> -->
	<link rel="stylesheet" href="libs/styles/leaflet.css">
	<script src="libs/js/jquery.js"></script>
	<script src="libs/js/angular.js"></script>

	<script src="libs/js/leaflet.js"></script>
	<script src="libs/js/leaflet-src.js"></script>
	<script src="libs/js/angular-leaflet-directive.js"></script>
	<script src="libs/js/leaflet.label.js"></script>
	<script src="libs/js/leaflet.markercluster-src.js"></script>
	<script src="libs/js/leaflet.markercluster.js"></script>

	<link rel="stylesheet" href="libs/styles/leaflet.css" />
	<link rel="stylesheet" href="libs/styles/leaflet.label.css" />
	<link rel="stylesheet" href="libs/styles/MarkerCluster.css" />
	<link rel="stylesheet" href="libs/styles/MarkerCluster.Default.css" />

	<link rel="apple-touch-icon" sizes="57x57" href="images/icons/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="images/icons/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/icons/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="images/icons/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/icons/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="images/icons/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="images/icons/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="images/icons/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="images/icons/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="images/icons/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="images/icons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="images/icons/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="images/icons/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<meta description="The APP that allows you to create a real address in less than a minute...">
	<meta robots="index,follow">
	<title ng-bind="title"></title>
</head>
<body style="height:auto !important">
<div id="skrollr-body">
	<!-- Header -->
	<header>

	</header>
	<section ui-view>

	</section>
	<!-- <footer>

</footer> -->

	<script src="libs/js/angular-ui-router.js"></script>
	<script src="libs/js/lodash.compat.js"></script>
	<script src="libs/js/restangular.js"></script>
	<script src="libs/js/smart-table.min.js"></script>
	<script src="libs/js/Chart.js"></script>
	<script src="libs/js/angular-chart.js"></script>
	<script src="libs/js/bootstrap.js"></script>
	<script src="libs/js/angular-scroll.js"></script>
	<script src="libs/js/angular-strap.js"></script>
	<script src="libs/js/angular-strap.tpl.js"></script>
	<script src="libs/js/angular-aside.js"></script>
	<script src='libs/js/textAngularSetup.js'></script>
	<script src='libs/js/textAngular-sanitize.js'></script>
	<script src='libs/js/textAngular.js'></script>
	<script src='libs/js/moment.js'></script>
	<script src='libs/js/angular-moment.js'></script>
	<script src='libs/js/headroom.js'></script>
	<script src='libs/js/ui-bootstrap-tpls.js'></script>
	<script src='libs/js/highcharts.js'></script>
	<script src='libs/js/highcharts-ng.js'></script>
	<script src='libs/js/jQuery.headroom.js'></script>
	<script src='libs/js/angular-translate.js'></script>
	<script src='libs/js/angular-translate-loader-static-files.js'></script>
	<script src='libs/js/angular-translate-storage-cookie.js'></script>
	<script src='libs/js/angular-cookies.js'></script>
	<script src='libs/js/angular-skrollr.js'></script>
	<script src='libs/js/skrollr.js'></script>
	<script src='libs/js/rangy-core.js'></script>
	<script src='libs/js/rangy-selectionsaverestore.js'></script>
	<script src='libs/js/scrollReveal.js'></script>
	<script src='libs/js/Chart.StackedBar.js'></script>
	<script src='libs/js/retable.js'></script>
	<script src="libs/js/responsive.table.js"></script>
	<script src='libs/js/angular-google-analytics.js'></script>
	<!--[if lt IE 9]>
	<script src='libs/js/html5shiv.js'></script>
	<![endif]-->
	<script src="dist/app.js"></script>
	<script src="/localhost:35729/livereload.js"></script>




	<script>
		Highcharts.setOptions({
			colors: ['#e62020','#2C3E50','#D2D7D3','#F2F1EF'],
			plotOptions: {
				series: {
					dataLabels: {
						enabled: false,
					},
					borderRadius:2,
					borderWidth: 0
				}
			},
			legend:{
				enabled:true
			},
			xAxis:{
				lineWidth: 0,
				minorGridLineWidth: 0,
				lineColor: 'transparent',
				labels: {
					enabled: false
				},
				minorTickLength: 0,
				tickLength: 0
			},
			yAxis:{
				gridLineWidth: 0,
				labels: {
					enabled: false
				}
			}
		});

	</script>
</div>
</body>
</html>
