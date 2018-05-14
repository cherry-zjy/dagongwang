// pages/money/store/storedetail/storedetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:[],
    Icon: '../../../../img/icon.png',
    detailid:'',
    mainurl:''
  },
  openLocation: function () {
    wx.openLocation({
      longitude: Number(this.data.store.Longitude),
      latitude: Number(this.data.store.Latitude),
      address: this.data.store.Adress
    })
  },
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.store.StorePhone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailid: options.id,
      mainurl: app.mainUrl
    })
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          Longitude: res.longitude,
          Latitude: res.latitude
        })
        console.log(options.id)
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/WorkStoreDetail',
          data: {
            "ID": options.id,
            "Longitude": that.data.Longitude,
            "Latitude": that.data.Latitude,
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              that.setData({
                store: res.data.Result,
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