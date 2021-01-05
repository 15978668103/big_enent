$(function () {

  getUIserinfo()




  //确定退出登录模块
  var layer = layui.layer

  $('#btn_tuichu').on('click', function () {

    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something

      // 1.清空本地存储中的token
      localStorage.removeItem('token')
      //2 重新跳转到登录页面
      location.href = '/login.html'

      layer.close(index);
    });

  })



})





function getUIserinfo() {

  $.ajax({

    type: 'GET',
    url: '/my/userinfo',

    // 注释掉 然后在baseAPI中 封装了 以后可以直接调用

    // headers: {
    //     Authorization: localStorage.getItem('token') || ''
    // },

    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },






      //封装到baseAPI里边方便以后调用
    //成功或者失败,都会调用complete 回调函数
    // options: function(res) {
     
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }


  })



}



// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text_avent').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text_avent')
      .html(first)
      .show()
  }
}