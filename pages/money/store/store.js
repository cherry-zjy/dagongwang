// pages/money/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: [
		   {
        City: "虎丘区",
				Company: [{
					Name: "苏州马涧集散",
					Address: "江苏省苏州市虎丘区朝红路168号",
          Distance:"12868公里",
          Type:'0'
				}]
			}, {
        City: "吴江区",
        Company: [{
          Name: "吴江集散",
          Address: "江苏省苏州市吴江开发区三里江南桥",
          Distance: "12868公里",
          Type: '0'
				}, {
            Name: "吴江三里桥门店",
            Address: "江苏省苏州市吴江开发区三兴路787",
            Distance: "12868公里",
            Type: '1'
				}]
			},
      {
        City: "昆山市",
        Company: [{
          Name: "南星渎门店",
          Address: "江苏省昆山市商业中心300号",
          Distance: "12868公里",
          Type: '1'
        }, {
            Name: "博悦集散",
            Address: "江苏省昆山市开发区博悦广场B区1002号",
            Distance: "12868公里",
            Type: '0'
        }]
      },

		]
  },
  storedetail(){
    wx.navigateTo({
      url: 'storedetail/storedetail'
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