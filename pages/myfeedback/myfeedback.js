// pages/myfeedback/myfeedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName:"1",
    showPopup:false,
    messageData:[
      {
        id:'123',
        time: '2019-02-26,18:35:44',
        problem:{
          text: '我们家的发动机悬置装置生产技术是十分有保障的，完全达得到您刚才所描述的参数以及性能。但具体数据希望您能发一个详细文件。',
          images:[
            "../../source/multimedia/image/testpic.png",
            "../../source/multimedia/image/testpic.png"
          ]
        },
        reply:{
          text:'sssdfa颠三倒四发顺丰',
          images: [
            "../../source/multimedia/image/testpic.png",
            "../../source/multimedia/image/testpic.png"
          ]
        },
        status:true
      },
      {
        id:'234',
        time: '2019-02-26,18:35:44',
        problem: {
          text: '我们家的发动机悬置装置生产技术是十分有保障的，完全达得到您刚才所描述的参数以及性能。但具体数据希望您能发一个详细文件。',
          images: [

          ]
        },
        reply: {
          text: '',
          images: [

          ]
        },
        status: false
      }
    ],
    popUpData:null
  },
  prewiewImg:function(res){
    var src=res.dataset.currentTarget.src;
    console.log(src);
  },
  onChange(event) {
    console.log(event.detail);
    this.setData({
      activeName: event.detail
    });
  },
  messageClick:function (res) {
    var index = res.currentTarget.dataset.index;
    var tData=this.data.messageData[index];
    if(!tData.status){
      wx.showToast({
        title: '请赖心等待回复',
        icon: 'loading',
        maxk:true,
        duration: 2000        //  2秒后自动关闭
      })
    }else{
      this.setData({
        popUpData:tData,
        showPopup:true
      })
    }
  },
  closePopup:function () {
    this.setData({
      showPopup:false
    })
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