// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsBarcurrent: 'mine',
    userInfo: {
      imgSrc: '../../source/multimedia/image/testpic.png',
      name: '小邹',
      idNumber: '201731061422',
    },
    noticePWD: "由于XXX原因,暂时只能通过使用浏览器更改密码,如有不便,敬请谅解",
    emailShow: false,
    pwdShow: false,
    PWDweb: 'www.baidu.com',
    Useremail: [
      "2604395430@qq.com",
      "dafafaf@qq.com"
    ],
    superitems: [
      {
        icon: 'mail',
        name: '查看邮箱',
        key: 'mail'
      },
      {
        icon: 'collection',
        name: '密码服务',
        key: 'password'
      }
    ],
    funitems: [
      {
        name: '功能'
      }
    ]
  },
  // 复制邮箱
  copy: function (res) {
    wx.setClipboardData({
      data: res.currentTarget.dataset.key,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  // 常用功能
  superFun: function (res) {
    const key = res.currentTarget.dataset.key;
    console.log(key);
    switch (key) {
      case 'mail':
        this.setData({
          emailShow: true
        })
        break;
      case 'password':
        this.setData({
          pwdShow: true
        })
        break;
    }
  },
  // 关闭弹窗
  emailClose: function () {
    this.setData({
      emailShow: false
    })
  },
  pwdClose: function () {
    this.setData({
      pwdShow: false
    })
  },
  // 页面跳转
  funClick: function (res) {
    const key = res.currentTarget.dataset.key;
    console.log(key);
    switch (key) {
      case 'problem':
        wx.navigateTo({
          url: '../problem/problem',
          success: function (res) {
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 2500        //  2秒后自动关闭
            })
          }
        })
        break;
      case 'feedback':
        wx.navigateTo({
          url: '../feedback/feedback',
          success: function (res) {
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 2500        //  2秒后自动关闭
            })
          }
        })
        break;
      case 'myfeedback':
        wx.navigateTo({
          url: '../myfeedback/myfeedback',
          success: function (res) {
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 2500        //  2秒后自动关闭
            })
          }
        })
        break;
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})