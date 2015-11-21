app.controller('SubscribersCtrl', ['$scope', 'filterFilter','$http','$rootScope','$state',
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
}]);