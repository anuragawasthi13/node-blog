var blogApp = angular.module("blogApp", []);
var cl = console.log;
blogApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

blogApp.controller("indexCtrl", ['$scope', '$http', function($scope, $http) {
    cl("angular controller :::  indexCtrl");
    var req = {
            method: 'GET',
            url: '/posts'
        }
    $http(req).then(function(response) {
        console.log(JSON.stringify(response.data));
        $scope.posts = response.data;
    },function(err){
        cl("error",err);
    });
}]);

blogApp.controller("postCtrl",['$scope','$http',function($scope,$http){
    cl("angular controller :::  postCtrl");
    var url = window.location.href;
    var url_parts = url.split('/');
    var postId=url_parts[url_parts.length-1];
    cl("postId is --->   ",postId);

    var req = {
            method: 'POST',
            url: '/post',
            data:{
                "postId":postId
            }
        }
    $http(req).then(function(response) {
        console.log(JSON.stringify(response.data));
        $scope.post = response.data;
    },function(err){
        cl("error",err);
    });
}])