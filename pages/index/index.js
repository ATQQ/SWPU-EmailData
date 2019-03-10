//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    account:'',
    password:''
  },
  // 输入事件
  accountInput:function (e) {
    this.setData({
      account:e.detail
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail
    })
  },
  // 登录
  btnLogin:function () {
    console.log(this.data.account);
    console.log(this.data.password);
    wx.redirectTo({
      url: '../mine/mine',
    })
  },

  onLoad: function () {
  
  }
})
