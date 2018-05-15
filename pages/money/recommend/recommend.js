// pages/money/recommend/recommend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    none:'',
    list:[]
  },
  getInfo(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/FriendList',
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              if(res.data.Result.length == 0){
                that.setData({
                  none:true
                })
              }else{
                that.setData({
                  none: false,
                  list: res.data.Result
                })
              }
              // wx.showToast({
              //   title: res.data.Result
              // })
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
      fail: function (res) {
        wx.navigateTo({
          url: '../../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },
  formSubmit(){
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'recommenddetail/recommenddetail'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../../login/login'
        })
      },
      complete: function (res) {
      },
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
    this.getInfo()
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