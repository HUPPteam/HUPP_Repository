$(function(){
	$('#register-btn').on('tap',function(){
		//获取用户信息
		var username =$('[name="username"]').val().trim();
		var mobile =$('[name="mobile"]').val().trim();
		var password =$('[name="password"]').val().trim();
		var confirm =$('[name="confirm"]').val().trim();
		var vCode =$('[name="vCode"]').val().trim();
		
		//对用户信息做验证
		if(!username){
			mui.toast("账号为空");
			return;
		}
		if(!mobile || !(mobile.length == 11)){
			mui.toast("手机号格式不正确")
			return;
		}
		if(!password){
			mui.toast("密码不能为空");
			return;
		}
		if(confirm !== password){
			mui.toast("密码输入不一致");
			return;
		}
		if(!vCode){
			mui.toast("验证码为空");
			return;
		}

		//用ajax发送数据请求
		$.ajax({
			url: "/user/register",
			type: "post",
			data: {
				username: username,
				password: password,
				mobile: mobile,
				vCode: vCode
			},
			success: function(res){
				console.log(res);
				if(res.success){
					mui.toast('恭喜!已注册成功!');
					setTimeout(function(){
						location.href ="login.html";
					}, 2000);
				}else{
					if(res.error ==403){
						mui.toast('用户名已存在,请重新注册!');
					}else{
						mui.toast('注册失败,,请重新注册!');
					}
					// setTimeout(function(){
					// 	location.href ="register.html";
					// },3000);
				}
			}
		});
	 });

	 $('#getCode').on('tap',function(){
		$.ajax({
			url: "/user/vCode",
			type: 'get',
			success: function(res){
				console.log(res.vCode);
			}
		});
	 });
});