// pages/money/store/store.js
var util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: [],
    Longitude:'',
    Latitude:''
  },
  
  storedetail(event) {
    console.log(event)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'storedetail/storedetail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      
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
    var tt = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        tt.setData({
          Longitude: res.longitude,
          Latitude: res.latitude
        })
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/WorkStore',
          data: {
            Longitude: tt.data.Longitude,
            Latitude: tt.data.Latitude,
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              tt.setData({
                store: res.data.Result
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
      }
    })
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