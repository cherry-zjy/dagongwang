// pages/money/sister/sister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    mainurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      mainurl: app.mainUrl
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
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/User/UserManager',
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              tt.setData({
                list: res.data.Result,
              })
            } else if (res.data.Status == -1) {
              wx.showModal({
                showCancel: false,
                title: '提示',
                content: res.data.Result,
              })
              wx.navigateBack({}); 
            }
            else {
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
      fail: function (res) {
        wx.showToast({
          title: "获取信息失败，请重新登录"
        })
      },
      complete: function (res) {
      },
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