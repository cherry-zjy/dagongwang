// pages/mine/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Text:''
  },
  Changeinput(e){
    this.setData({
      Text: e.detail.value
    });
  },
  save(){
    if (this.data.Text == ""){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入反馈内容',
      })
      return;
    }
    var tt = this;
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/UserFeedBack',
      data: {
        'Content': tt.data.Text
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
        wx.navigateTo({
          url: '../../login/login'
        })
      }
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