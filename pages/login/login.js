// pages/login/login.js
const app = getApp()
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    tip: '',
    code:'',
    Phone:'',
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    if (e.detail.value.Phone.length == 0 || e.detail.value.code.length == 0) {
      this.setData({
        tip: '提示：手机号和验证码不能为空！',
        Phone: '',
        code: '',
      })
      var that = this
      setTimeout(() => {
        that.setData({
          tip: '',
        })
      }, 1000)
    } else {
      this.setData({
        tip: "",
        Phone: e.detail.value.Phone,
        code: e.detail.value.code,
      })
      var tt = this
      wx.login({
        success: function (res) {
          console.log(res)
          if (res.code) {
            // 发起网络请求
            app.ajax({
              method: 'POST',
              url: app.mainUrl + 'api/User/Register',
              data: {
                "Phone": tt.data.Phone,
                "Code": tt.data.code,
                "Pwd": "-1",
                "Lng": "-1",
                "Lat": "-1",
                "ID": "-1"
              },
              success: function (res) {
                wx.hideLoading()
                if (res.data.Status == 1) {
                  wx.setStorage({
                    key: 'token',
                    data: res.data.Result,
                    success: function () {
                      wx.navigateBack()
                    }
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
          } else {
            wx.showModal({
              showCancel: false,
              title: '提示',
              content: '获取用户登录态失败！' + res.errMsg,
            })
          }
        }
      })
    }
  },
  Changephone(e){
    this.setData({
      Phone: e.detail.value
    });
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    if (this.data.Phone == '') {
      this.setData({
        tip: '提示：手机号不能为空！',
        Phone: '',
        code: '',
      })
      var that = this
      setTimeout(() => {
        that.setData({
          tip: '',
        })
      }, 1000)
    } else {
      var tt = this;
      app.ajax({
        method: 'POST',
        url: app.mainUrl + 'api/VerifyCode/Send',
        data: {
          "phone": tt.data.Phone,
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.Status == 1) {
            this.getCode();
            var that = this
            that.setData({
              disabled: true
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
    
  },
  service(){
    wx.navigateTo({
      url: 'service/service'
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