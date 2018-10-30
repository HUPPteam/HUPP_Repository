$(function () {
	//由于获取了关键字数据,下面的搜索历史也要用到这里的数据,应该建立一个存储关键字数据的数组;
	var keyArr = [];
	// var keyWord = $('.search').find('input:first-of-type').val();
	//判断是否有接收到数据
	if (localStorage.getItem('keyArr')) {
		keyArr = JSON.parse(localStorage.getItem('keyArr'));
		var html = template('historyTpl', {res:keyArr});
		$('#history').html(html);
	}	
	
	//实现输入关键字后点击搜索的功能
	$('#btn').on('tap', function(){
		// var keyWord =$(this).siblings('input').val();
		var keyWord =$('.search').find('input:first-of-type').val();
		//判断是否输入了关键字
		if (keyWord){
			//存储在本地
			keyArr.push(keyWord);
			localStorage.setItem('keyArr',JSON.stringify(keyArr));
			location.href="search-list.html?keyWord=" + keyWord;
		} else {
			mui.toast('请输入关键字');
		}
	});

	//实现清除历史功能
	$('.clear').on('tap',function(){
		localStorage.removeItem('keyArr',keyArr);
		$('#history').html('');
		//完全清除本地localStorage数组的数据
		keyArr =[];
	});

	//实现点击历史内容也可跳转到商品页面
	$('#history').on('tap','li',function(){
		var keyWord =$('.search').find('input:first-of-type').val();
		location.href="search-list.html?keyWord=" + keyWord;
	})
});