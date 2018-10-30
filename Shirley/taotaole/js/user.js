//页面加载就要处理未登录的状态,未登录的用户是看不见改页面
//通过ajax向服务器发送请求数据(登录信息由数据库生成)
//设userInfo的初始值为空
// var urseInfo = null;
// $.ajax({
//     //文档接口给的是查询登录接口
//     url: "/user/queryUserMessage",
//     type: 'get',
//     //此处需要做同步处理,让用户未登录状态无法看到会员页面
//     async: false,
//     success: function (res) {
//         //处于未登录的状态直接不给机会的跳转到登录页面
//         if (res.error && res.error == 400) {
//             location.href = "login.html";
//         }
//         userInfo =res; //将res的结果返回给userInfo变量
//     }
// });
//***以上代码可以做正退封装,以便设置每次进入都必须通过登录来进入相关页面***
getLogin();

//实现退出登录功能(思路可以首先考虑实现)
$(function () {
    $('#logout').on('tap', function () {
        $.ajax({
            url: "/user/logout",
            type: 'get',
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    mui.toast('正在退出登录.....');
                    //退出成功,跳转到首页
                    setTimeout(function(){
                        location.href = "index.html";
                    }, 2000);
                }
            }
        });
    });

    //个人信息模块要根据登录的数据动态生成
    var html = template('userInfo', userInfo);
    $('#userCenter').html(html);
});

