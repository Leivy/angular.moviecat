(function(angular){
    angular
        //在主模块中引入ngRoute模块，那么通过主模块引入的其他模块，都可以使用ngRoute中的内容了
        .module("movieCat", [
            "ngRoute",
            "movieCat.service",
            "movieCat.home", 
            //old
            // "movieCat.inTheaters",
            // "movieCat.comingSoon"
            "movieCat.detail",  //detail模块中的路由 /detail/:id
            "movieCat.movieList",  //movieList  /:type/:page
            "movieCat.directives",
        ])
        .controller("SearchController", ["$scope", "$location", function($scope, $location){
            $scope.search = function(){
                //让用户直接跳转到 /search
                //将用户当前的输入内容，传递到search
                
                $location.url("/search?q=" + $scope.searchTxt);
            }
        }])
})(angular)