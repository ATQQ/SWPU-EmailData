//index.js
//获取应用实例
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({
  data: {
    pwd1: '',
    pwd2: '',
    errmsg: false
  },
  // 输入事件
  firstPassword: function (e) {
    this.setData({
      pwd1: e.detail
    })
  },
  secondPassword: function (e) {
    this.setData({
      pwd2: e.detail
    })
  },
  // 登录
  btnSure: function () {
    var pwd1 = this.data.pwd1;
    var pwd2 = this.data.pwd2;

    //判断内容是否合法
    if (pwd1 == null || pwd1.length < 7) {
      wx.showToast({
        title: '密码长度为(7-16)位',
        icon: "none"
      })
      return;
    }

    if (pwd2 != pwd1) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: "none"
      })
      this.setData({
        pwd2: '',
        errmsg: true
      })
      return;
    }
    //发送请求
    wx.request({
      url: baseurl + 'user/user',
      header: app.globalData.header,
      method: "PUT",
      data: JSON.stringify({
        "password": pwd2,
      }),
      success: function (res) {
        res = res.data;
        if (res.status) {
          wx.showToast({
            title: '修改完成',
            mask: true,
            icon: 'success'
          })
          // 重定向到个人信息页面
          wx.redirectTo({
            url: '../mine/mine',
          })
        }else{
          wx.showToast({
            title: '登录失效',
            mask: true,
            icon: 'none'
          })
          // 重定向到首页
          wx.redirectTo({
            url: '../index/index',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络错误',
          mask: true,
          icon: 'none'
        })
      }
    })

  },

  onLoad: function () {

  }
})