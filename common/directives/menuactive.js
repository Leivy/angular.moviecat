(function (angular) {

    angular
        .module("movieCat.directives", [])
        .directive("menuActive", ["$location", function ($location) {
            return {
                templateUrl: "/common/directives/menuactive.html",
                link: function (scope, ele, attrs) {

                    scope.location = $location;
                    scope.$watch("location.url()", function() {

                        //获取当前页面url路径
                        var url = $location.url();

                        //获取到所有的a标签
                        var as = ele.find("a");
                        for (var i = 0; i < as.length; i++) {
                            //获取到a标签href属性
                            var curUrl = as.eq(i).attr("href");
                            //将href属性前面的#！截掉
                            curUrl = curUrl.slice(2);

                            // /in_theaters/2
                            // /in_theaters
                            //判断当前页面的url是否是以a标签href属性的值开头的
                            if (url.startsWith(curUrl)) {
                                //清除所有li的active类样式
                                ele.find("li").removeClass("active");
                                //将当前a标签所在的li标签加上一个active类
                                as.eq(i).parent().addClass("active");
                            }
                        }
                    })

                }
            }
        }])

})(angular)