//1.先做页面根据产品刷新加载的功能
var url = location.href;
var keyword = getUrlInfo(url, 'keyWord');
var html = ''; //页面中的数据,加载功能完成后考虑拿此处作为全局变量
var page = 1; //当前页
var price =1; //接口文档中默认1为升排序,2为降排序
var num =1; //接口文档中默认1为升排序,2为降排序
var This =null;
$(function () {
	//实现上拉加载功能
	mui.init({
		pullRefresh: {
			container: '#refresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
			up: {
				height: 50,//可选.默认50.触发上拉加载拖动距离
				auto: true,//可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});

	//实现价格排序功能
	$('#priceSort').on('tap',function(){
		//新的加载需要重置默认值
		price =price ==1 ?2:1;
		html ="";
		page =1;
		num =null;
		//重置上拉加载
		mui('#refresh').pullRefresh().refresh(true);
		getData();		
	});

	//实现销量排序功能
	$('#productSort').on('tap',function(){
		// console.log(123);
		num =num ==1 ?2:1;
		html ="";
		page =1;
		price =null;
		mui('#refresh').pullRefresh().refresh(true);
		getData();		
	});
});

function getData() {
	//***页面加载的时候没有this指向window,点击发生时调用的getDate函数需要存储一个this指向getDate,此处强行赋值this,最后完成
	if(!This){
		This =this;
	}
	$.ajax({
		url: "/product/queryProduct",
		type: "get",
		data: {
			page: page++,
			pageSize: 3,
			proName: keyword,
			price: price,
			num: num
		},
		success: function (res) {
			// console.log(res);
			//判断后台是否有数据传入
			if (res.data.length) {
				//+=加载刷新的时候保存上一页的数据
				html += template('productTpl', res);
				// console.log(html);
				$('#proDetail').html(html);
				// 告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(false);
			}else {
				// 告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(true);
			}
		}
	});
}