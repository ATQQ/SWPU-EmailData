// pages/feedback/feedback.js
const app = getApp()
const baseurl = app.globalData.baseUrl;
var imgArray = new Array(); //存放保存过后的图片名数组
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    images: []
  },
  previewImage: function(e) {
    var current = e.target.dataset.src;
    // console.log(current)
    wx.previewImage({
      urls: this.data.images,
      current: current
    })
  },
  btnAdd: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 最多只允许选择一个图像
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          images: res.tempFilePaths //  显示选中图像
        })
      }
    })
  },
  textinput: function(res) {
    // console.log(res.detail.value);
    this.setData({
      text: res.detail.value
    })
  },
  sureSubmit: function(e) {
    // 获取当前用户的附加信息
    var userData = JSON.parse(wx.getStorageSync('userData')).data;
    //上传的图片内容
    var imgs = this.data.images;
    //输入的反馈内容
    var text = this.data.text;
    // 开始上传图片
    for (let i = 0; i < imgs.length; i++) {
      wx.uploadFile({
        url: baseurl + 'file/save',
        filePath: imgs[i],
        name: 'file',
        success: function(res) {
          let resData = JSON.parse(res.data);
          imgArray.push(resData.image);
          // 当所有图片上传完成后
          //提交反馈信息
          if (i + 1 == imgs.length) {
            wx.request({
              url: baseurl+'feedback/feedback',
              method:"POST",
              data:{
                'username': userData.username,
                'email': userData.email,
                'problem': text,
                'proimg': JSON.stringify(imgArray)
              },
              success:function(res){
                if(res.data.status){
                  imgArray = new Array(); //重置上传的图片数组
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000, //  2秒后自动关闭
                    complete: function () {
                      setTimeout(function(){
                        wx.navigateBack({
                          delta: 1
                        });
                      },1000);
                    }
                  })
                }else{
                  wx.showToast({
                    title: '反馈失败',
                    duration: 1000 //  2秒后自动关闭
                  })
                }
              },
              fail:function(res){
                wx.showToast({
                  title: '网络异常',
                  duration: 1000 //  2秒后自动关闭
                })
              }
            })
            return;
          }
        }
      })
    }

    //
    if (imgs.length == 0) {
      wx.request({
        url: baseurl + 'feedback/feedback',
        method: "POST",
        data: {
          'username': userData.username,
          'email': userData.email,
          'problem': text,
          'proimg': JSON.stringify(imgArray)
        },
        success: function (res) {
          if (res.data.status) {
            imgArray = new Array(); //重置上传的图片数组
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000, //  1秒后自动关闭
              complete: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1000);
              }
            })
          } else {
            wx.showToast({
              title: '反馈失败',
              duration: 1000
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络异常',
            duration: 1000 //  2秒后自动关闭
          })
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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