// pages/demo/demo.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurls: new Array()
  },
  chooseFile:function(){
    wx.getFileSystemManager();
  },
  // 上传
  uploadimg: function() {
    var imgPaths = this.data.imageurls;
    wx.uploadFile({
      url: baseUrl + 'test/saveImage',
      filePath: imgPaths[0],
      name: 'file',
      formData: {
        'user': 'sugar'
      },
      success: function(res) {
        console.log(res.data);
      }
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      urls: this.data.imageurls,
      current: current
    })
  },
  chooseimg: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 最多只允许选择一个图像
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        that.setData({
          imageurls: res.tempFilePaths //  显示选中图像
        })
        //  输出返回的路径个数
        // console.log(res.tempFilePaths.length)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.request({
      url: baseUrl + 'test/getImages',
      method: 'GET',
      success: function(res) {
        // that.setData({
        //   imageurls:new Array()
        // })
        console.log(res);
      },
      fail: function() {
        console.log('fail error');
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