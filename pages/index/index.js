//index.js
//获取应用实例
const app = getApp()
const baseurl = app.globalData.baseUrl;
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
    var data=this.data;
    wx.redirectTo({
      url: '../mine/mine',
    })
    var that=this;
    // wx.request({
    //   method:"POST",
    //   url: baseurl+'user/logintest',
    //   data:{
    //     "username":data.account,
    //     "password":data.password
    //   },
    //   success:function(res){
    //     console.log(res.data);
    //   },
    //   fail:function(res){
    //     console.log("无权限");
    //   }
    // })
  },

  onLoad: function () {
  
  }
})
