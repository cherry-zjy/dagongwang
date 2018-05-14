
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
          app.ajax({
            method: 'get',
            url: app.mainUrl + 'api/Home/WorkDetails',
            data: {
              "ID": options.id,
            },
            success: function (res) {
              wx.hideLoading()
              if (res.data.Status == 1) {
                console.log(res.data.Result)
                that.setData({
                  detailInfo: res.data.Result,
                  rule: res.data.Result.Rule,
                  Images: res.data.Result.Images,
                  isfloow: res.data.Result.Isattention
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