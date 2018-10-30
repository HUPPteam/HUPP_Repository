$(function () {
    //addAddress页面加载时渲染出列表信息(2个进入口,此处共用一个页面,细节需要处理户干部给他)
    var isEdit = Number(getUrlInfo(location.href,'isEdit')); //url中获取的isEdit是字符串'0/1'
    // isEdit=0是添加按钮进入,isEdit=1是编辑按钮进入
    if (isEdit) {
        //编辑功能(editAddress从address页面中获取),此处isEdit=1
        if(localStorage.getItem('editAddress')){
            //使用数据时是从数组里面获取,此处应该把本地存储的字符串转化为JSON数组
            var getAddress  =JSON.parse(localStorage.getItem('editAddress'));
            // console.log(getAddress);
            var html =template('editTpl',getAddress);
            $('#editForm').html(html);
            $('#editTitle').html('编辑收货地址');
        }
    }else{
        //添加功能,此处isEdit=0
        console.log(isEdit);
        var html =template('editTpl',{});
        console.log(html);
        $('#editForm').html(html);
    }

    // 初始化三级联动下拉选择框
    var picker = new mui.PopPicker({ layer: 3 });
    // 为picker选择器添加数据
    picker.setData(cityData);
    // 点击显示citydata数据
    $('#selectCity').on('tap', function () {

        // 显示picker选择器
        picker.show(function(selectItems) {

            // 将用户选择的内容显示在文本框中
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });

    });

    //点击添加地址
    $('#addAddress').on('tap', function () {
        var username = $('[name=username]').val().trim();
        var postCode = $('[name=postCode]').val().trim();
        var city = $('[name=city]').val().trim();
        var detail = $('[name=detail]').val().trim();

        //判断用户地址信息
        if (!username) {
            mui.toast("请输入收货人姓名!");
            return;
        }
        if (!postCode) {
            mui.toast("邮政编码不能为空!");
            return;
        }
        if (!city) {
            mui.toast("请选择所在区域!");
            return;
        }
        if (!detail) {
            mui.toast("请输入详细地址!");
            return;
        }


        var data ={
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        };
        //添加/编辑获取数据的接口不一样,需要重置
        if(isEdit){
            //编辑接口
            var url ="/address/updateAddress";
            data.id =getAddress.id;
        }else{
            //添加接口
            var url="/address/addAddress";
        }

        //用ajax发送数据请求
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    if(isEdit){
                        mui.toast('恭喜!地址修改成功!');
                    }else{
                        mui.toast('恭喜!地址添加成功!');
                    }

                    setTimeout(function () {
                        location.href = "address.html";
                    }, 2000);
                }
            }
        });
    });






});





