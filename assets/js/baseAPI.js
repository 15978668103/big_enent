
//每次调用 $.get 请求之类的  会先调用这个函数
$.ajaxPrefilter(function (options) {

    console.log(options.url)

    //发起请求前统一拼接
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url







    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }




    //成功或者失败,都会调用complete 回调函数
    options.complete=function(res){

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
          }
        
    }




})
