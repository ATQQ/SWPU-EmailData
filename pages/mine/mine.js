// pages/mine/mine.js
const app = getApp();
const baseurl = app.globalData.baseUrl;
Page({
  //test push
  /**
   * 页面的初始数据
   */
  data: {
    secondsure: true,
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
      case 'logout':
        wx.showModal({
          title: '提示',
          content: '确定退出？',
          success: function (res) {
            if (res.confirm) {
              wx.showToast({
                title: '请稍等...',
                icon: 'loading',
                mask:true,
                duration: 2000        //  2秒后自动关闭
              })
              // 确定删除
              wx.request({
                url: baseurl + "user/logout",
                method: "GET",
                header: app.globalData.header,
                success: function (res) {
                  res = res.data;
                  if (res.status == 1) {
                    // 重定向到登录页面
                    wx.redirectTo({
                      url: '../index/index',
                      success: function (res) {
                        wx.showToast({
                          title: '退出成功',
                          icon: 'loading',
                          duration: 1000        //  2秒后自动关闭
                        })
                      }
                    })
                  }
                }
              })
            } else if (res.cancel) {
              console.log('取消删除')
            }
          }
        })


        break;
      default:
        break;
    }
  },
  //刷新数据
  refreshData: function (name, email, username) {
    this.setData({
      userInfo: {
        idNumber: username,
        name: name,
        imgSrc: '../../source/multimedia/image/testpic.png'
      },
      Useremail: [
        email
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var token = wx.getStorageSync('token');
    if (token === null || token === '') {
      wx.showToast({
        title: '登陆过期',
        mask: true,
        icon: 'none'
      })
      //重定向到登录页面
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      // 请求数据
      var that = this;

      wx.request({
        url: baseurl + 'email/get',
        method: "GET",
        header: app.globalData.header,
        success: function (res) {
          wx.setStorageSync('userData', JSON.stringify(res.data));
          console.log(res);
          res = res.data;
          //刷新数据
          that.refreshData(res.data.name, res.data.email, res.data.username);
        },
        fail: function () {
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            mask: true
          })
        }
      })
    }
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