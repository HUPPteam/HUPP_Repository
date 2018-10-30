$(function () {
    //address页面加载时查询用户存储的地址信息
    var address = null;
    $.ajax({
        url: "/address/queryAddress",
        type: 'get',
        success: function (res) {
            console.log(res);
            address =res; //res中的address赋值给address,获取address.length
            var html = template('addressTpl', { res });
            // console.log(html);
            $('#addressBox').html(html);
        }
    });


    //删除收货地址
    $('#addressBox').on('tap', '.deleteBtn', function () {
        var id = $(this).data('id');
        var li = $(this).parent().parent()[0];
        mui.confirm('确认要删除吗?', function (message) {
            if (message.index == 1) {
                $.ajax({
                    url: "/address/deleteAddress",
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.success) {
                            location.reload();
                        }

                    }
                })
            }
        });
    });

    //编辑收货地址
    $('#addressBox').on('tap', '.editBtn', function () {
        var id = $(this).data('id');
        // console.log(id);
        for(var i=0;i<address.length;i++){
            console.log(address.length);
            if(address[i].id ==id){
                //将地址信息存储到本地去,addAddress还要用到
               var editAddress =address[i];
               localStorage.setItem('editAddress',JSON.stringify(address[i]));
               break;
            }
        }
        location.href ="addAddress.html?isEdit=1";
    });
});


