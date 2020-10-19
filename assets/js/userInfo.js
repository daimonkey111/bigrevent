$(function () {
    //添加表单验证
    var form = layui.form
    // console.log(form);
    form.verify({
        nickname: [
            /^[a-zA-Z0-9_]{6,12}$/,
            "昵称必须在6-12位"
        ]
    })

    readUserInfo()
    function readUserInfo() {
        $.ajax({
            type: "get",
            url: '/my/userinfo',
            // data: {},
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg("获取用户失败 ")
                }
                //利用form.val()属性快速给表单赋值
                form.val("formuserInfo", res.data)


                // $(".username").val(res.data.username)
            }
        })
    }
    //表单重置
    $(".resetbtn").on("click", function (e) {
        e.preventDefault()
        readUserInfo()
    })

    //获取更新的用户信息
    $(".layui-form").on("submit", function (e) {
        //阻止表单默认提交
        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                layer.msg("更改用户信息成功")
                // 调用父页面的方法，重新渲染用户头像与用户名信息
                window.parent.getUserInfo()

            }
        })



    })



})
