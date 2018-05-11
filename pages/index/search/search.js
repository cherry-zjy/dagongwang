// pages/index/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taglist:[],
    searchvalue:''
  },
  getInfo() {
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/FindTags',
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.setData({
            taglist:res.data.Result.list
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: res.data.Result,
          })
        }
      },
      error: function () {
        wx.hideLoading()
      }
    })
  },
  searchDetail(e){
    var text = e.currentTarget.dataset.text
    wx.navigateTo({
      url: 'searchDetail/searchDetail?id=' + text,
    })
  },
  searchInput(e){
    this.setData({
      searchvalue: e.detail.value
    })
  },
  search(e){
    wx.navigateTo({
      url: 'searchDetail/searchDetail?id=' + this.data.searchvalue
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
    this.getInfo();
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