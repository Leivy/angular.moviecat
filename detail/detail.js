(function(angular){
    angular
        .module("movieCat.detail", [])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider
                .when("/details/:id", {
                    templateUrl: "/detail/detail.html",
                    controller: "DetailController"
                })
        }])
        .controller("DetailController", ["$scope", "$routeParams", "jsonp", function($scope, $routeParams, jsonp){
            //1. 获取用户传进来的id
            var id = $routeParams.id;
            //2. 发送jsonp请求，获取id对应的电影数据
            jsonp("http://api.douban.com/v2/movie/subject/" + id, {}, function(data){
                $scope.data = data;
                $scope.$apply();
                // console.log(data);
            })
        }])
})(angular)