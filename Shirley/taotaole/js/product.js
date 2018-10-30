getLogin();
$(function () {
    var id = getUrlInfo(location.href, 'id');
    // console.log(id);
    //产品区域的渲染需要用到productId,num,size,分别设置初始值
    var productId = 0; //null/0的使用,如果需要初始值设置0,不需要设置null
    var size = null; //不设置初始值后面用到会undefined
    var num = 0;
    var numTemp =1;
    //首先向后台请求数据
    $.ajax({
        url: "/product/queryProductDetail",
        type: 'get',
        data: {
            id: id  //此处id由数据库请勿得来,记得去search-list页面设置a跳转页面时候将id一起带到product页面
        },
        success: function (res) {
            // console.log(res);
            productId = res.id; //res下一级pic带来的数据
            num = res.num;
            var html = template('productTpl', res);
            $('#productList').html(html);

            //获得slider插件对象,图片滚动
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    //选码区点击事件绑定,注意页面渲染的元素需要用到事件委托手段
    $('#productList').on('tap', '.size span', function () {
        //点击码数后的当前状态
        $(this).addClass('current').siblings('span').removeClass('current');
        //记录下来用户选择的码数
        size = $(this).html();
        // console.log(size);
    })

    //首先是increase功能+
    $('#productList').on('tap', '#increase', function () {
        //设置中间变量对value进行对比分析
        numTemp = $('#productNum').val();
        // console.log(numTemp);
        numTemp++;
        if (numTemp > num) {
            numTemp = num;
        }
        $('#productNum').val(numTemp);
    });

    //然后是reduce功能-
    $('#productList').on('tap', '#reduce', function () {
        //设置中间变量对value进行对比分析
        numTemp = $('#productNum').val();
        // console.log(numTemp);
        numTemp--;
        if (numTemp < 1) {
            numTemp = 1;
        }
        $('#productNum').val(numTemp);
    });

    //实现购物车功能(查看购物车前确认是登录的) 
    $('#addCart').on('tap', function () {
        if (!size) {
            mui.toast('请选择正确的码数!');
            return;
        }
        //添加尺码发送请求
        $.ajax({
            url: "/cart/addCart",
            type: 'post',
            data: {
                productId: id,
                num: numTemp,
                size: size
            },
            success: function (res) {
                if (res.success){
                    mui.confirm('添加成功,去购车看看?', '温馨提示',function(message){
                        if(message.index ==1){
                            location.href ="cart.html";
                        }
                    })
                }
            }
        });
    })

});