// pages/money/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountshow:true,
    Money:0,
    isLogin:false
  },
  open(){
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          accountshow: false
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      },
      complete: function (res) {
      },
    })
    
  },
  close() {
    this.setData({
      accountshow: true
    })
  },
  gotoindex(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  accountdetail(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'accountdetail/accountdetail'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },
  accountwithdraw(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'accountwithdraw/accountwithdraw'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },
  store(){
    wx.navigateTo({
      url: 'store/store'
    })
  },
  wages() {
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'wages/wages'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },
  sister() {
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'sister/sister'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },
  recommend(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'recommend/recommend'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
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
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        tt.setData({
          isLogin: true
        })
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/User/Info',
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              tt.setData({
                Money: res.data.Result.Money,
              })
            } else if (res.data.Status == 40002) {
              tt.setData({
                isLogin: false
              })
              wx.showModal({
                title: '提示',
                content: res.data.Result,
                success: function (res) {
                  if (res.confirm) {
                    wx.removeStorage({
                      key: 'token',
                      success: function (res) {
                        console.log("删除token，保证只提醒一次")
                      },
                    })
                    wx.navigateTo({
                      url: '../login/login',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
            else {
              tt.setData({
                isLogin: false
              })
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
        tt.setData({
          isLogin: false
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