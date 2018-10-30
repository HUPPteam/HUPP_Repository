$(function () {
    $('#login-btn').on('tap', function () {
        //获取到用户输入的表单的信息
        var username = $('[name="username"]').val().trim();
        var password = $('[name ="password"]').val().trim();
        if (!username) {
            mui.toast("账号为空");
            return;
        }
        if (!password) {
            mui.toast("密码不能为空");
            return;
        }

        $.ajax({
            url: "/user/login",
            type: 'post',
            data: {
                username: username,
                password: password
            },
            // beforeSend: function () {
            //     $('#login-btn').html('正在登录中......');
            // },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    mui.toast('正在登录中......');
                    setTimeout(function () {
                        $('#login-btn').html('已登录成功!');
                    }, 2000);
                    //开启跳转页面定时器
                    setTimeout(function () {
                        location.href = "user.html";
                    }, 3000);
                } else {
                    $('#login-btn').html('登录');
                    mui.toast('登录失败!');
                }
            }
        });
    });
});