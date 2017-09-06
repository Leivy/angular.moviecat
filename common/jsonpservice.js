(function (angular) {

    angular
        .module("movieCat.service", [])
        .factory("jsonp", ["$window", function ($window) {
            return function (url, params, callback) {

                var document = $window.document;

                //创建script标签
                var script = document.createElement("script");

                //将参数对象中的内容转换成  key=value&key=value
                var paramsStr = "";
                for (var k in params) {
                    paramsStr += k + "=" + params[k] + "&"
                }
                url = url + "?" + paramsStr;

                //获取一个随机的函数名
                var cbName = "jsonp" + parseInt(Math.random() * 1000000000 + 10000000) + +new Date();

                //用生成的随机的函数名将函数存到window中去
                window[cbName] = function (data) {
                    callback(data);
                    //销毁script标签
                    document.head.removeChild(script);
                    //销毁window中的回调函数
                    delete window[cbName];
                };

                //通过传参的形式，告诉后台，返回的数据调用的函数应该是谁！！
                url = url + "callback=" + cbName;

                //将script的src属性设置为我们拼接好的url
                script.src = url;

                // console.log(cbName);
                //加script标签加入到页面中
                document.head.appendChild(script);
            }
        }])

})(angular)