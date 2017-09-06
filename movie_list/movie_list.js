(function(angular){
        angular
            .module("movieCat.movieList", [])
            .config(["$routeProvider", function($routeProvider){
                $routeProvider
                    //  /in_theaters/2
                    //  /coming_soon/2
                    //  /top250/2
                    //  /search/2
                    

                    .when("/:type/:page?", {
                        templateUrl: "/movie_list/view.html",
                        controller: "MovieListController"
                    })
            }])
            .controller("MovieListController", ["$scope", "$http", "$sce", "jsonp", "$window", "$routeParams", "$route", function($scope, $http, $sce, jsonp, $window, $routeParams, $route){

                var page = $routeParams.page || 1;
                var count = 20;

                //根据当前路由中传入的type参数值 我们就可以确定用户访问的是哪个页面
                //再根据页面对请求数据的url地址进行相应的更改！

                //http://api.douban.com/v2/movie/in_theaters
                //http://api.douban.com/v2/movie/coming_soon
                //http://api.douban.com/v2/movie/top250
                //http://api.douban.com/v2/movie/search
    
                $scope.isMaskHide = false;

                //获取用户在搜索框中输入的内容
                var q = $routeParams.q;

                jsonp("http://api.douban.com/v2/movie/" + $routeParams.type, {
                    start: (page - 1) * count,
                    count: 20,
                    //将用户输入的内容作为参数，来请求数据
                    q: q
                }, function(res){
                    $scope.data = res;
    
                    console.log(res);
                    $scope.totalCount =  res.total;
                    $scope.currentPage = res.start / res.count  + 1;
                    $scope.totalPage = $window.Math.ceil(res.total / res.count);

                    $scope.isMaskHide = true;

                    $scope.$apply();
                    
                })
    
                $scope.goPage = function(page){

                    if(page <= 0){
                        page = 1;
                    }
    
                    if(page > $scope.totalPage){
                        page = $scope.totalPage;
                    }
                    $route.updateParams({
                        page: page
                    });
                }
            }])
    })(angular)