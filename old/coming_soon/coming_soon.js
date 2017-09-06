(function(angular){

    //angular中提供了一个$http的服务
    //$http服务就是用来和服务器做交互，请求数据的

    angular
        .module("movieCat.comingSoon", [])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider
                .when("/coming_soon/:page?", {
                    templateUrl: "/coming_soon/view.html",
                    controller: "ComingSoonController"
                })
        }])
        .controller("ComingSoonController", ["$scope", "$http", "$sce", "jsonp", "$window", "$routeParams", "$route", function($scope, $http, $sce, jsonp, $window, $routeParams, $route){
            //1. 向服务器请求数据  $http
            // $http({
            //     method: "GET",
            //     url: "/in_theaters/data.json"
            // }).then(function(response){
            //     //成功的回调
            //     // console.log(response.data)
            //     $scope.data = response.data;
            // }, function(){
            //     //失败的回调
            // })

            // $http.get("/in_theaters/data.json", {
            //     params: {
            //         name: 'zs'
            //     }
            // }).then(function(response){
            //     $scope.data = response.data;
            // }, function(){

            // }) 

            //如果要使用$http服务中的jsonp方法来发送跨域请求
            //首先要将请求的地址加到白名单中
            //通过$sce.trustAsResourceUrl
            // var url = $sce.trustAsResourceUrl("http://api.douban.com/v2/movie/in_theaters");

            //直接调用jsonp使用已经被加到白名单中的url，来进行请求即可
            // $http.jsonp(url, {
            //     params: {
            //         jsonpCallbackParam: 'callback'
            //     }
            // }).then(function(data){
            //     console.log(data);
            // }, function(err){
            //     console.log(err);
            // })

            // $http.post
            // $http.jsonp

            //page表示的当前要访问的页码
            var page = $routeParams.page || 1;
            //向后台请求数据的时候，我们需要通过page计算出来对应的start
            var count = 20;

            //start = (page - 1) * count;
            //1     0
            //2     20
            //3     40

            jsonp("http://api.douban.com/v2/movie/coming_soon", {
                start: (page - 1) * count,
                count: 20
            }, function(res){
                $scope.data = res;

                console.log(res);

                //数据的总条数，其实在返回来的数据中，就有  total属性表示就是总条数
                $scope.totalCount =  res.total;

                //当前第几页
                //每页有20条 count
                //第一页； start: 0     19       start / count + 1 =  1
                //第二页； start: 20     39                           2
                //第三页； start: 40     59                           3

                //当前第几页 = start / count + 1;
                $scope.currentPage = res.start / res.count  + 1;

                //一共多少页
                //总页数 = Math.ceil(数据总条数 / count)
                $scope.totalPage = $window.Math.ceil(res.total / res.count);



                //手动触发脏监测
                $scope.$apply();
            })

            $scope.goPage = function(page){
                //因为我们已经写好 分页的路由
                //用户可以通过在连接后面加上页码来访问指定的页码的数据
                //我们只需要对连接中的页面进行修改，就能够显示指定页面的内容

                // console.log($route);
                // $route.updateParams方法可以用来修改路由中指定的参数部分的内容
                // $route.updateParams({要修改的参数名称(跟路由规则中定义的参数名称一样: 要改成的值)})

                //如果要修改现有的参数，需要将参数名对应
                //如果不对应，就会使用?的形式新增一个 参数名=值

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