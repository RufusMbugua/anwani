/**
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
    'CONSTANTS',
    function (scope, filterFilter,http,rootScope,state,CONSTANTS) {

        /**
         * Add a user
         * @memberof UsersCtrl
         * @function add
         */
        scope.add = function add(){
            http.post(CONSTANTS.API_URL+'users/signup',scope.user).then(function(result){
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
app.run(['$http','$rootScope','CONSTANTS',function(http,rootScope,CONSTANTS){
    get_users();
    function get_users(){
        if(rootScope.user){
            http.get(CONSTANTS.API_URL+'users'
            ).then(function(result){
                    rootScope.users = result.data.docs;
                });
        }

    }
}]);