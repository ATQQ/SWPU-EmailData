// pages/myfeedback/myfeedback.js
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:true,
    activeName:1,
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
    popUpData:null,
    previewImg:new Array()
  },
  prewiewImg:function(e){
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      urls: this.data.previewImg,
      current: current
    })
    // var src = res.currentTarget.dataset.src;
    // console.log(src);
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

      // 设置预览图片数组
      var tArr=new Array();
      var tt = tData.problem.images;
      for(let i=0;i<tt.length;i++){
        tArr.push(baseurl + "file/img?picName=" +tt[i]);
      }
      tt=tData.reply.images
      for (let i = 0; i < tt.length; i++) {
        tArr.push(baseurl + "file/img?picName=" + tt[i]);
      }
      this.setData({
        previewImg:tArr
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
    // 获取当前用户的附加信息
    var userData = JSON.parse(wx.getStorageSync('userData')).data;
    var that=this;
    wx.request({
      url: baseurl+'feedback/feedback',
      method:"GET",
      data:{
        "username": userData.username
      },
      success:function(res){
        // console.log(res.data)
        res=res.data;
        if(res.status){
          //临时存储格式化后的反馈信息数组
          let tdatas=new Array();
          for(let i=0;i<res.data.length;i++){
            let temp=res.data[i];
            // 如果未回复
            if(temp.status==0){
              tdatas.push({
                "id": temp.id,
                "time": (new Date(temp.date)).Format('yyyy-MM-dd hh:mm:ss'),
                "problem": {
                  "text": temp.problem,
                  "images": JSON.parse(temp.proimg)
                },
                "status":false
              })
            }else{
              tdatas.push({
                "id": temp.id,
                "time": (new Date(temp.date)).Format('yyyy-MM-dd hh:mm:ss'),
                "problem": {
                  "text": temp.problem,
                  "images": JSON.parse(temp.proimg)
                },
                "reply":{
                  "text":temp.reply,
                  "images": JSON.parse(temp.repimg)
                },
                "status": true
              })
            }
            
          }

          // 设置为获取到的数据
          that.setData({
            messageData: tdatas,
            isEmpty: false
          })

          // console.log(tdatas);
        }else{
          that.setData({
            messageData:[],
            isEmpty:true
          })
        }
      },
      fail:function(err){

      }
    })
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

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3)/3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}