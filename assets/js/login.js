$(function () {
    $(".loginbtn").on("click", function () {
        $(".loginform").hide();
        $(".login-res").show()
    })
    $(".loginzhuce").on("click", function () {
        $(".login-res").hide();
        $(".loginform").show()
    })

    // 从layui里面获取form
    var form = layui.form
    // console.log(form);
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //第二次输入密码验证
        repwd: function (value) {
            if (value != $(".input-pwd").val()) {
                return "两次密码输入不一样"
            }
        }
    })
    //从layui里面获取layui.layer
    var layer = layui.layer


    //注册表单事件
    $(".loginzhuceform").on("submit", function (e) {

        e.preventDefault()
        $.ajax({
            type: "post",
            url: ' http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $(".username").val(),
                password: $(".input-pwd").val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                $(".loginzhuce").click();
                layer.msg("注册成功，请登录")
            }
        })
    })
    // 登录表单事件
    $(".loginform").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: $(this).serialize(),//快速获取表带里的内容
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                return layer.msg("登录成功");
                location.href="/index.html"

            }
        })
    })


})