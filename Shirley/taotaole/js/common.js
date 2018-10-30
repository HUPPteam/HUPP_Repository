//mui组件会影响a标签的跳转
$(function () {
    $('body').on('tap', 'a', function () {
        //打开关于页面
        mui.openWindow({
            url: $(this).attr('href')
        });
    });
});

//获取地址栏参数的信息
//url: 地址字符串;name: 要获取的信息
//页面加载时记得location.href获取一下url***
// var url = location.href;
//paramName指的是数组中的name,age等信息
function getUrlInfo(url, paramName) {
    //获取字符串
    var params = url.substr(url.indexOf('?') + 1);
    // console.log(params);
    //获取url的一级数组
    var param = params.split('&');
    // console.log(param);
    //获取url的二级数组
    for (i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        // console.log(current);
        if (current[0] == paramName) {
            return current[1];
        }
    }
    return null;
}
//  var result =getUrlInfo(url,'keyWord');
//     console.log(result);


//封装登录函数
function getLogin() {
    var urseInfo = null;
    $.ajax({
        //文档接口给的是查询登录接口
        url: "/user/queryUserMessage",
        type: 'get',
        //此处需要做同步处理,让用户未登录状态无法看到会员页面
        async: false,
        success: function (res) {
            //处于未登录的状态直接不给机会的跳转到登录页面
            if (res.error && res.error == 400) {
                location.href = "login.html";
            }
            userInfo = res; //将res的结果返回给userInfo变量
        }
    });
}