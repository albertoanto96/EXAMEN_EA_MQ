(function() {
    'use strict';
    var app = angular.module('myApp');
    app.service('userSRV', ['$http',function ($http) {

        this.pushUser = function (newUser, callback) {
            var req = {
                method: 'POST',
                url: '/push',
                headers: {'Content-Type': 'application/json'},
                data: newUser

            };
            $http(req).then(function () {
                $http.get('/all').then(function (response) {
                    callback (response.data);

                });
            });
        };

        this.userdetail=function (user,callback) {
            var req = {
                method: 'POST',
                url: '/userdetail',
                headers: {'Content-Type': 'application/json'},
                data: user
            };
            $http(req).then(function (response) {
                console.log(response.data);
                callback(response.data);
            });
        }

        this.addSubj=function (subj) {
            var req = {
                method: 'POST',
                url: '/addSubj',
                headers: {'Content-Type': 'application/json'},
                data: subj
            };
            $http(req).then();
        };





        this.detailSubj=function (data,callback) {
            var req = {
                method: 'POST',
                url: '/detailsubj',
                headers: {'Content-Type': 'application/json'},
                data: data

            };
            $http(req).then(function (response) {
                callback(response.data);
            });
        };

        this.usersFromSubj=function(subject,callback){
            var req = {
                method: 'POST',
                url: '/userssubj',
                headers: {'Content-Type': 'application/json'},
                data: subject

            };

            $http(req).then(function (response) {
                    callback(response.data)
            });

        };

        this.addUserToSubj=function(u){
            var req = {
                method: 'PUT',
                url: '/updsub',
                headers: {'Content-Type': 'application/json'},
                data: u
            };
            $http(req).then(function (response) {
            });


        };
        this.getUsers = function (callback) {

            $http.get('/all').then(function (response) {
                callback (response.data);
            });

        };

        this.getSubjects=function(callback){
            $http.get('/subjects').then(function (response) {
                callback (response.data);
            });

        };
        this.removeUsers = function (data,callback) {
            var req = {
                method: 'DELETE',
                url: '/delete',
                headers: {'Content-Type': 'application/json'},
                data: data
            };
            $http(req).then(function (response) {

                callback(response.data)

            });
        };
        this.filterdb =function (data,callback) {

            var req = {
                method: 'GET',
                data: data,
                url: '/filterdb/'+data,
                headers: {'Content-Type': 'application/json'}

            };

             $http(req).then(function (response) {

              callback(response.data)

             });
        };
        this.updateUser=function(data,callback){
            var req = {
                method: 'PUT',
                url: '/update',
                headers: {'Content-Type': 'application/json'},
                data: data
            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        }
    }]);
})();