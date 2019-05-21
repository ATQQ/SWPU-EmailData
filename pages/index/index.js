//index.js
//获取应用实例
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({
  data: {
    account: '',
    password: '',
    remember:false,
    rememberText: "记住密码?"
  },
  // 切换记住密码状态
  rememberChange:function(e){
    this.setData({
      remember: e.detail
    })
  },
  // 输入事件
  accountInput: function(e) {
    this.setData({
      account: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
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
    var that=this;
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
              //判断是否勾选记住密码
              if(that.data.remember){
                console.log(that.data);
                wx.setStorageSync('nowData', JSON.stringify(that.data))
              }else{
                wx.setStorageSync('nowData', "")
                // wx.clearStorageSync();
              }

              //判断是否为首次登陆
              switch (res.data.status) {
                case 0:
                  //跳转到修改密码
                  wx.redirectTo({
                    url: '../resetPwd/index',
                  })
                  console.log("需要改密码");
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
    // var datas=wx.getStorageSync('nowData');
    // console.log(datas);
    // if(datas!=""){
    //   this.data=JSON.parse(datas);
    // }
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    var datas = wx.getStorageSync('nowData');
    console.log(datas);
    if (datas != "") {
      datas = JSON.parse(datas);
      this.setData({
        account:datas.account,
        password:datas.password,
        remember:datas.remember
      })
    }
  }
})