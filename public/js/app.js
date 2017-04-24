var app = angular.module('myApp',['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/',{
        templateUrl:'tpls/Login.html',
        controller:'mainCtrl'
    });

    $routeProvider.when('/main',{
        templateUrl:'tpls/Main.html',
        controller:'userCtrl'
    });

}]);

app.controller('mainCtrl',['$http','$rootScope','$scope','$location',function($http, $rootScope, $scope, $location)
    {
       $scope.doLogin=function() {
           var newUser = {
           name: $scope.uName,
           password: $scope.uPass

       };
           $scope.uName="";
           $scope.uPass="";

           var req = {
               method: 'POST',
               url: '/login',
               headers: {'Content-Type': 'application/json'},
               data: newUser
           };
           $http(req).then(function (response) {
            //$rootScope.token=response.data.token;
               console.log(response.data.password+newUser.password);
            if (angular.equals(response.data.password,newUser.password)) {
                $location.path("/main");
            }
           });

       }




    }]);