(function(angular){

    angular
        .module("movieCat.home", [])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider
                .when("/home_page", {
                    templateUrl: "/home/view.html"
                })
                .otherwise({
                    redirectTo: "/home_page"
                })
        }])

})(angular)