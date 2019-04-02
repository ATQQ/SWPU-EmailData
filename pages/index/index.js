//index.js
//获取应用实例
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({
  data: {
    account: '',
    password: ''
  },
  // 输入事件
  accountInput: function(e) {
    this.setData({
      account: e.detail
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail
    })
  },
  // 登录
  btnLogin: function() {
    var username = this.data.account;
    var password = this.data.password;

    //判断内容是否合法
    if (username == null || username.length < 7) {
      wx.showToast({
        title: '账号不合法',
        icon: "none"
      })
      return;
    }

    if (password == null || password.length < 7) {
      wx.showToast({
        title: '密码不合法',
        icon: "none"
      })
      return;
    }
    //发送请求
    wx.request({
      url: baseurl + 'user/login',
      method: "POST",
      data: {
        "username": username,
        "password": password
      },
      success: function(res) {
        res = res.data;
        switch (res.status) {
          case -1:
            wx.showToast({
              title: '账号不存在',
              mask: true,
              icon: 'none'
            })
            break;
          case 0:
            wx.showToast({
              title: '密码错误',
              mask: true,
              icon: 'none'
            })
            break;
          case 1:
            var power = res.data.power;
            if (power != 1) {
              wx.showToast({
                title: '没有权限',
                mask: true,
                icon: 'none'
              })
            } else {
              wx.setStorageSync('token', res.data.token);
              //保存请求头信息
              app.globalData.header.Cookie = 'JSESSIONID=' + res.data.token;
              app.globalData.header.token=res.data.token;

              wx.showToast({
                title: '登陆成功',
                mask: true,
                icon: 'success'
              })
              console.log(res.data.status);
              //重定向
              // wx.redirectTo({
              //   url: '../mine/mine',
              // })
              //判断是否为首次登陆

              switch (res.data.status) {
                case 0:
                  //跳转到修改密码
                  //跳转到首页
                  wx.redirectTo({
                    url: '../mine/mine',
                  })
                  break;
                case 1:
                  //跳转到首页
                  wx.redirectTo({
                    url: '../mine/mine',
                  })
                  break;
                default:
                  wx.showToast({
                    title: '未知错误',
                    mask: true,
                    icon: 'none'
                  })
                  break;
              }
            }
            break;
          default:
            wx.showToast({
              title: '未知错误',
              mask: true,
              icon: 'none'
            })
            break;
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          mask: true,
          icon: 'none'
        })
      }
    })

  },

  onLoad: function() {

  }
})