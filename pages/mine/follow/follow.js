// pages/mine/follow/follow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    none:false,
    jobList: [{
      ID: 1,
      Display_Image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      Type: '补贴',
      Address: '宁波市鄞州区',
      Money: '200元',
      Price: '3500元'
    }, {
      ID: 1,
      Display_Image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      Type: '补贴',
      Address: '宁波市鄞州区',
      Money: '200元',
      Price: '3500元'
    },
    {
      ID: 1,
      Display_Image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      Type: '补贴',
      Address: '宁波市鄞州区',
      Money: '200元',
      Price: '3500元'
    }],
  
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
    if (that.data.jobList.length == 0){
      that.setData({
        none: true
      })
    }
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