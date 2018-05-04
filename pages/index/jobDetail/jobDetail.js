// pages/index/jobDetail/jobDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basic: [
      { "code": "1", "text": "综合薪资", "title": "3500~4800元"},
      { "code": "2", "text": "发薪日", "title": "两班倒，无尘衣站着上班"},
      { "code": "3", "text": "底薪", "title": "两班倒，无尘衣站着上班"},
      { "code": "4", "text": "薪资结构", "title": "两班倒，无尘衣站着上班两班倒，无尘衣站着上班两班倒，无尘衣站着上班" },
    ], 
    listData: [
      { "code": "综合薪资", "text": "3500~4800元" },
      { "code": "工作方式", "text": "两班倒，无尘衣站着上班" },
      { "code": "发薪日", "text": "每月10日（26~25日）" },
    ], 
    addressimg: [
      { 
        "text": "面积大环境好",
        "img": 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 
      },
      { 
        "text": "物美价廉", 
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 
      },
      { 
        "text": "舒适宽敞", 
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 
      },
    ],
    eatimg: [
      {
        "text": "面积大环境好1",
        "img": 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      },
      {
        "text": "物美价廉",
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      },
      {
        "text": "舒适宽敞",
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      },
    ],
    sleepimg: [
      {
        "text": "面积大环境好2",
        "img": 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      },
      {
        "text": "物美价廉",
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      },
      {
        "text": "舒适宽敞",
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      },
    ],
    moneyimg: [
      {
        "text": "面积大环境好3",
        "img": 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      },
      {
        "text": "物美价廉",
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      },
      {
        "text": "舒适宽敞",
        "img": 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorColor:'rgb(173,173,173)',
    indicatorActiveColor:'#fff',
    currentTab: 0,
    currenttype:0,
    scrollHeight:"",
    upperThreshold:"",
    lowerThreshold:"",
  },
  
  previewImageaddress: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = [];
    var objkeys = Object.keys(this.data.addressimg);
    for (var i = 1; i <= objkeys.length; i++) {
      imgArr.push(this.data.addressimg[i-1]["img"]);
    }
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
  },
  previewImageeat: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = [];
    var objkeys = Object.keys(this.data.eatimg);
    for (var i = 1; i <= objkeys.length; i++) {
      imgArr.push(this.data.eatimg[i - 1]["img"]);
    }
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
  },
  previewImagesleep: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = [];
    var objkeys = Object.keys(this.data.sleepimg);
    for (var i = 1; i <= objkeys.length; i++) {
      imgArr.push(this.data.sleepimg[i - 1]["img"]);
    }
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
  },
  previewImagemoney: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = [];
    var objkeys = Object.keys(this.data.moneyimg);
    for (var i = 1; i <= objkeys.length; i++) {
      imgArr.push(this.data.moneyimg[i - 1]["img"]);
    }
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
  },
  gotoimage: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset['index']
    })
  },
  gototype: function (e) {
    this.setData({
      currenttype: e.currentTarget.dataset['index']
    })
  },
  scroll: function (e) {
    console.log(e)
    // this.setData({
    //   scrollTop: e.detail.scrollTop
    // })
  },
  upper :function(){
    // this.setData({
    //   currenttype: 1
    // })
    console.log("离顶部" + this.data.upperThreshold)
  },
  lower: function () {
    // this.setData({
    //   currenttype: 1
    // })
    console.log("离底部" + this.data.lowerThreshold)
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight:res.windowHeight
        });
      }
    });  
    var that = this;
    wx.createSelectorQuery().select('#start').boundingClientRect(function (rect) {
      // rect.id      // 节点的ID  
      // rect.dataset // 节点的dataset  
      // rect.left    // 节点的左边界坐标  
      // rect.right   // 节点的右边界坐标  
      // rect.top     // 节点的上边界坐标  
      // rect.bottom  // 节点的下边界坐标  
      // rect.width   // 节点的宽度  
      // rect.height  // 节点的高度  
      console.log(rect)
      that.setData({
        upperThreshold: rect.top
      });
      that.setData({
        lowerThreshold: rect.bottom
      });
    }).exec()
    
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