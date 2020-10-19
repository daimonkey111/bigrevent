//每次调用$.get ,$.post,$.ajax时，先调用这个ajaxPrefilter函数
$.ajaxPrefilter(function (option) {
    // console.log(option);
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    // 统一为有权限的接口，设置 headers 请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局挂载complete 函数
    option.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
            // console.log(1);
            //强制删除token ，且返回到登录页面
            localStorage.removeItem("token");
            location.href = "/login.html"
        }

    }


})