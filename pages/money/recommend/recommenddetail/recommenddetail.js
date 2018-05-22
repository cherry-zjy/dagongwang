// pages/money/recommend/recommenddetail/recommenddetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: '',
    userName: '',
    password: '',
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    if (e.detail.value.username.length == 0 || e.detail.value.password.length == 0) {
      that.setData({
        tip: '提示：姓名和手机号不能为空！',
        userName: '',
        password: '',
      })
      setTimeout(() => {
        that.setData({
          tip: '',
        })
      }, 1000)
    } else if (e.detail.value.password.length !== 11 || !(/^1[34578]\d{9}$/.test(e.detail.value.password))) {
      that.setData({
        tip: '提示：请输入正确的手机号！',
      })
      setTimeout(() => {
        that.setData({
          tip: '',
        })
      }, 1000)
    }
      else {
      this.setData({
        tip: "",
        userName: e.detail.value.username,
        password: e.detail.value.password,
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          app.ajax({
            method: 'get',
            url: app.mainUrl + 'api/Home/InviteFriends',
            data: {
              "Name": that.data.userName,
              "Phone": that.data.password,
            },
            header: {
              "Authorization": res.data
            },
            success: function (res) {
              wx.hideLoading()
              if (res.data.Status == 1) {
                wx.showToast({
                  title: res.data.Result
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
        fail: function (res) {
          wx.navigateTo({
            url: '../../../login/login'
          })
        },
        complete: function (res) {
        },
      })

    }
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