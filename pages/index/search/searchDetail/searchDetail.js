// pages/index/search/searchDetail/searchDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    detailid:'',
    pageIndex:1,
    IsNext:false,
    openPicker: false,
    needAnimation: false,
    contentHeight: 0
  },
  getInfo(){
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/WorkHome',
      data: { pageIndex: Number(that.data.pageIndex), pageSize: 3, Keyword: that.data.detailid, City: -1, Type: 0 },
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          if (that.data.pageIndex == 1) {
            that.data.datalist = []
          }
          that.data.pageIndex = that.data.pageIndex + 1
          that.data.datalist = that.data.datalist.concat(res.data.Result.result.Works)
          that.setData({
            datalist: that.data.datalist,
            IsNext: res.data.Result.IsNext
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
  onPickHeaderClick: function () {
    this.setData({
      openPicker: !this.data.openPicker,
      needAnimation: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == ''){
      this.setData({
        detailid: '-1'
      })
    }else{
      this.setData({
        // detailid: options.id
        detailid: '-1'
      })
    }
    this.getInfo()
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

    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    this.setData({
      pageIndex: 1
    })
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/WorkHome',
      data: { pageIndex: Number(that.data.pageIndex), pageSize: 1, Keyword: that.data.detailid },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.Status == 1) {
          that.setData({
            datalist: res.data.Result.result.Works,
            IsNext: res.data.Result.IsNext,
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.IsNext) {
      var that = this
      if (that.data.pageIndex == 1) {
        that.setData({
          pageIndex: 2
        })
      }
      that.getInfo()
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})