$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^[\s]{6,12}$/, "密码必须6-12位"],
        samePwd: function (value) {
            if (value !== $("[name=oldPwd]").val()) {

            }
        }
    })

})