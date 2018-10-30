$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true,
        bounce: true,
        deceleration: 0.0005
    });

    $.ajax({
        url: "/category/queryTopCategory",
        type: 'get',
        success: function (res) {
            // console.log(res);
            var html = template('cate_l', res);
            // console.log(html);
            $('#cateLeft').html(html);

            //如果一级目录有数据的话,二级会获取数据,此处最后实现
            if (res.rows.length) {
                //设置当前状态
                $('#cateLeft').find('li').eq(1).addClass('current');
                //获取一级侧边栏的id
                var id = res.rows[1].id;
                // console.log(id);
                //根据一级侧边栏的id获取二级侧边栏的id,此处是整个功能中先实现了一级二级渲染数据后实现的,要跟随一级侧边栏页面加载时出现数据,为了优化代码性能,可以封装
                // $.ajax({
                //     url: "/category/querySecondCategory",
                //     type: 'get',
                //     data: {
                //         id: id
                //     },
                //     success: function (res) {
                //         // console.log(res);
                //         var html = template('cate_r', res);
                //         console.log(html);
                //         $('#cateRight').html(html);
                //     }
                // });
                getCateId(id);
            }
        }
    });

    //给一级侧边添加点击事件,得出id是二级侧边栏获取数据需要的
    $('#cateLeft').on('tap', 'li', function () {
        // console.log(123);
        //点击事件后获取li的自定义id
        var id = $(this).attr('data-id');
        //console.log(id);

        //设置当前状态
        $(this).addClass('current').siblings('li').removeClass
            ('current');

        //获取二级侧边栏数据
        // $.ajax({
        //     url: "/category/querySecondCategory",
        //     type: 'get',
        //     data: {
        //         id: id
        //     },
        //     success: function (res) {
        //         // console.log(res);
        //         var html = template('cate_r', res);
        //         // console.log(html);
        //         $('#cateRight').html(html);
        //     }
        // });
        getCateId(id);
    });

    //封装函数也是最后完成
    function getCateId(id) {
        $.ajax({
            url: "/category/querySecondCategory",
            type: 'get',
            data: {
                id: id
            },
            success: function (res) {
                // console.log(res);
                var html = template('cate_r', res);
                // console.log(html);
                $('#cateRight').html(html);
            }
        });
    }

});