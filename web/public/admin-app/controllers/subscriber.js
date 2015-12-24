app.controller('SubscribersCtrl', ['$scope', 'filterFilter','$http','$rootScope','$state','CONSTANTS',
    function (scope, filterFilter,http,rootScope,state,CONSTANTS) {

        scope.add = function add(){
            http.post(CONSTANTS.API_URL+'subscribers/signup',scope.subscriber).then(function(result){
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
app.run(['$http','$rootScope','CONSTANTS',function(http,rootScope,CONSTANTS){
    if(rootScope.user) {
        get_subscribers();
    }
    function get_subscribers(){
        http.get(CONSTANTS.API_URL+'subscribers'
        ).then(function(result){
                rootScope.subscribers = result.data.docs;
            });
    };
}]);