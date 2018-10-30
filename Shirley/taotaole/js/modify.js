$(function () {
    $('#modify-btn').on('tap', function () {
        //获取用户信息
        var oldPass = $('[name="oldPass"]').val().trim();
        var newPass = $('[name="newPass"]').val().trim();
        var confirmNewPass = $('[name="confirmNewPass"]').val().trim();
        var vCode = $('[name="vCode"]').val().trim();

        //对用户信息做验证
        if (!oldPass) {
            mui.toast("请输入原密码!");
            return;
        }
        if (!newPass) {
            mui.toast("请输入新密码!");
            return;
        }
        if (newPass !== confirmNewPass) {
            mui.toast("两次输入的密码不一致!");
            return;
        }
        if (!vCode) {
            mui.toast("验证码为空!");
            return;
        }

        //用ajax发送数据请求
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: oldPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    mui.toast('恭喜!修改密码成功!');
                    setTimeout(function () {
                        location.href = "login.html";
                    }, 2000);
                } 
            }
        });
    });

    $('#getCode').on('tap', function () {
        $.ajax({
            url: "/user/vCodeForUpdatePassword",
            type: 'get',
            success: function (res) {
                console.log(res.vCode);
            }
        });
    });
});