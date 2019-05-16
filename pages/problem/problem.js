// pages/problem/problem.js
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '2',
    previewImg: new Array(),
    content: [{
      title: '标题1',
      text: '内容xxxx',
      imgs: [
        '../../source/multimedia/image/testpic.png',
        '../../source/multimedia/image/testpic.png'
      ]
    }]
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });

    if (event.detail == "" || event.detail == null)
      return;
    var imgsData = this.data.content[event.detail].imgs;
    for (let i = 0; i < imgsData.length; i++) {
      imgsData[i] = baseurl + "file/img?picName=" + imgsData[i]
    }
    this.setData({
      previewImg: imgsData
    });
  },
  previewImg: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      urls: this.data.previewImg,
      current: current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: baseurl + 'common/common',
      method: "GET",
      success: function(res) {
        res = res.data;
        if (res.status) {
          let commonListData = new Array();
          let tData = res.data;
          for (let i = 0; i < tData.length; i++) {
            commonListData.push({
              title: tData[i].title,
              text: tData[i].prrobelm,
              imgs: JSON.parse(tData[i].images)
            })
          }
          that.setData({
            content: commonListData
          })
        } else {
          console.log("没有数据");
        }

      },
      fail: function(err) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})