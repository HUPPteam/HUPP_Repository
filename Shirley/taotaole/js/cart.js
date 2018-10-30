getLogin();
$(function () {
    //给购物车渲染页面数据
    var carts = [];
    var numDelete = [];  //获取要删除数据信息

    $.ajax({
        url: "/cart/queryCart",
        type: 'get',
        success: function (res) {
            carts = res;
            // console.log(carts);
            var html = template('cartTpl', { res });
            $('#cartBox').html(html);

        }
    });

    //删除功能
    $('#cartBox').on('tap', '.deleteBtn', function () {
        //设置自定义属性id,删除数据根据id来删除
        var id = $(this).data('id');
        deleteProduct([id]);
    });

    //批量删除
    // $(".numDel").on("tap",function(){
    //     deleteProduct(numDelete);
    //     console.log(numDelete);
    // });


    //进入编辑功能
    $('#cartBox').on('tap', '.editBtn', function () {
        //首先获取productId.num.size信息
        var id = $(this).data('id');
        console.log(id);
        var item = getId(carts, id);
        console.log(item);

    });


    //多出需要用到删除功能,对此需要封装函数
    function deleteProduct(id) {
        $.ajax({
            url: "/cart/deleteCart",
            type: "get",
            data: {
                id: [id]
            },
            success: function (res) {
                // console.log(id);
                if (res.success) {
                    mui.toast("删除成功");
                    // setTimeout(function () {
                    location.reload();
                    // }, 1000);
                } else {
                    location.href = "login.html";
                    mui.toast("删除失败");
                    return;
                }
            }
        })
    }
    //获取id
    function getId(res, id) {
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            if (res[i].id == id) {
                return res[id];
            }
        }
    }
});

