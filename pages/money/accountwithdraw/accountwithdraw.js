
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: '',
    money: '',
    name: '',
    phone: '',
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    if (e.detail.value.money.length == 0 || e.detail.value.name.length == 0 || e.detail.value.phone.length == 0) {
      that.setData({ 
        tip: '提示：请填写信息！',
        money: '',
        name: '',
        phone: '',
      })
      setTimeout(() => {
        that.setData({
          tip: '',
        })
      }, 1000)
    } else {
      this.setData({
        tip: "",
        money: e.detail.value.money,
        phone: e.detail.value.phone,
        name: e.detail.value.name,
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          app.ajax({
            method: 'get',
            url: app.mainUrl + 'api/Home/CashButton',
            data: {
              "Name": that.data.name,
              "Code": that.data.phone,
              "Money": that.data.money,
            },
            header: {
              "Authorization": res.data
            },
            success: function (res) {
              wx.hideLoading()
              if (res.data.Status == 1) {
                wx.navigateTo({
                  url: 'withdrawfeedback/withdrawfeedback'
                })
              } else if (res.data.Status == 40002) {
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
              }else {
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