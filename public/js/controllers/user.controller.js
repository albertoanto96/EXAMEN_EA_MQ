(function() {
    'use strict';
    var app = angular.module('myApp');
    app.controller('userCtrl', ['userSRV','$scope', function (userSRV,$scope) {

        $scope.users = [];
        $scope.subjects=[];
        $scope.subjectsd=[];
        $scope.subjectsdb = [];
        $scope.subjectsdet=[];

        angular.element(document).ready(function () {
            userSRV.getSubjects(function (subjects) {
                $scope.subjectsdb = subjects;
            });
        });

        $scope.showSubjects=function(){
            userSRV.getSubjects(function (sub) {
                $scope.subjects = sub;
            });
        };

        $scope.userdetail=function () {

            var user={
                name:$scope.userN
            };
            userSRV.userdetail(user,function (result) {
               $scope.subjectsd=result.subjects
               $scope.users=result.user;

            });
            $scope.userN="";
        };

        $scope.addSubj=function () {
            var subj={
                name:$scope.newsubjname,
                when:$scope.newS
            };
            $scope.newsubjname="";
            $scope.newS="";

            userSRV.addSubj(subj);

        }

        $scope.addToSubj=function(){
            var us= {
               name: $scope.userToAdd,
                subject:$scope.subjectToAdd.split("\n")[0]

        };
            userSRV.addUserToSubj(us);
            $scope.userToAdd="";
            $scope.subjectToAdd=""

        };
        $scope.usersSubj=function () {
            var subj={
                name:$scope.usersF.split("\n")[0]
            };
            userSRV.usersFromSubj(subj,function(result){
                $scope.subjects ="";
                $scope.users=result;
            });
            $scope.usersF="";
        };

        $scope.userAdd = function(){
            var newUser = {
            name: $scope.userName,
            password: $scope.userPass,
                subject:$scope.usersF.split("\n")[0],
                title:$scope.titration
        };

        userSRV.pushUser(newUser,function (users) {
            $scope.userName = "";
            $scope.userPass = "";
            $scope.subjects ="";
            $scope.usersF="";
            $scope.titration="";
            $scope.users = users;
            console.log(users)
        });
            };
        $scope.filterdb=function(){
            userSRV.filterdb($scope.filterDB,function (subjects) {
                $scope.subjects = subjects;
                $scope.userName = "";
                $scope.userPass = "";
                $scope.filterDB="";
            })

        };
        $scope.showList = function() {
            userSRV.getUsers(function (users) {
                console.log(users)
                $scope.subjects ="";
                $scope.users = users;
            });
        };
        $scope.update=function(){
            var data = {
                name: $scope.userName,
                password:$scope.userPass,
                new:$scope.newPass
            };
            $scope.newPass="";
            $scope.userName = "";
            $scope.userPass = "";
            userSRV.updateUser(data,function (list) {
                $scope.users=list
            });

        };
        $scope.detailSubj=function(){
            var data={
                name: $scope.subjL.split("\n")[0]
            };
            userSRV.detailSubj(data,function (res) {
                $scope.subjectsdet=res;
            });
            $scope.subjL="";
        };
        $scope.remove = function() {
            var data = {
                name: $scope.userName,
                password:$scope.userPass
            };

            userSRV.removeUsers(data,function (list) {
                $scope.userName = "";
                $scope.userPass = "";
                $scope.users = list;

            });


            /*
            var deltedUsers = [];
            angular.forEach($scope.users,function (user) {
                if(user.done){deltedUsers.push(user.name);}
            });
            userSRV.removeUsers(deltedUsers,function (list) {
                $scope.users = list;
            });
            */

        };
    }]);
})();