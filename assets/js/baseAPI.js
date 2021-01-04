
//每次调用 $.get 请求之类的  会先调用这个函数
$.ajaxPrefilter(function(options){

    console.log(options.url)

    //发起请求前统一拼接
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})
