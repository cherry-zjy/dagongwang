//app.js
App({
  // data: {
  // mainUrl: "http://192.168.1.125/Working/",
  mainUrl: "https://working.quanqiuyingcai.com/",
  ajax: require('utils/ajax.js'),
  token: "",
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        tt.token = res.data
      },
    })
  },
  scrollBackTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  globalData: {
    userInfo: null
  }
})