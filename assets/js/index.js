$(function () {
    getUserInfo()
    var layer = layui.layer
    //点击退出按钮退出页面
    $("#outbtn").on("click", function () {

        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            location.href = "/login.html"
            localStorage.removeItem("token")
            layer.close(index);
        });

    })



})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: '/my/userinfo',
        // hearder是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户资料失败")
            }
            // console.log(res);
            renderadvatar(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
                localStorage.removeItem("token");
                location.href = '/login.html'


            }

        }
        //无论调用否成功都会执行的函数complete
        // complete: function (res) {
        //     // console.log(res);
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
        //         console.log(1);
        //         //强制删除token ，且返回到登录页面
        //         localStorage.removeItem("token");
        //         location.href = "/login.html"
        //     }
        // }

    })

}

//获取用户头像信息
function renderadvatar(user) {
    // 获取用户名 
    var username = user.nickname || user.username
    console.log(username);
    // 渲染用户名
    $("#welcome").html('欢迎' + username)
    if (user.user_pic == null) {
        var a = username[0].toUpperCase()
        $(".text-avatar").html(a).show()
        $(".layui-nav-img").hide()
    } else {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()

    }

}