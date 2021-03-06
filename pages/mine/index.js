// pages/mine/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    userInfo:{
      Username:''
    },
    UserInfoIcon:''
  },
  experience(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'experience/experience'
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
  // 经纪人
  economic(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: '../money/sister/sister'
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
  work(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'follow/follow'
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
  // 工作经历
  experience(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: 'experience/experience'
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
  // 关于我们
  aboutus(){
    wx.navigateTo({
      url: 'aboutus/aboutus'
    })
  },
  // 账户明细
  accountdetail(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: '../money/accountdetail/accountdetail'
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
  // 意见反馈
  feedback(){
    wx.navigateTo({
      url: 'feedback/feedback'
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
                userInfo: res.data.Result,
                UserInfoIcon: app.mainUrl + res.data.Result.Image,
              })
              tt.setData({
                isLogin: true
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