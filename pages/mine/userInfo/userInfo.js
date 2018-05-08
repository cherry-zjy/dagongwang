// pages/mine/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    userInfoIcon:"../../../../img/icon.png",
    Username:"zjy",
    Sex:1,
    Phone:'18258773565'
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
  
  },
  /**
   * 弹窗
   */
  showDialogBtn: function (e) {
    var num = e.currentTarget.dataset.num
    var text = e.currentTarget.dataset.text
    this.setData({
      Username: text
    })
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(-500).step()
    this.setData({
      animationData: animation.export(),
      num: num,
      showModal: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        num: num,
        showModal: true
      })
    }.bind(this), 200)
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    var tt = this
    // 如果没有token着获取失败，不能在success中调用getInfo
    wx.getStorage({
      key: 'token',
      success: function (res) {
        tt.setData({
          token: res.data,
        })
        var Content;
        Content = tt.data.Username
        // app.ajax({
        //   method: 'get',
        //   url: app.mainUrl + 'api/User/EditInfoByVixin',
        //   data: {
        //     Content: Content,
        //     Type: tt.data.num
        //   },
        //   header: {
        //     "Authorization": res.data
        //   },
        //   success: function (res) {
        //     wx.hideLoading()
        //     if (res.data.Status == 1) {
        //       tt.getInfo()
        //     } else {
        //       wx.showModal({
        //         showCancel: false,
        //         title: '提示',
        //         content: res.data.Result,
        //       })
        //     }

        //   },
        //   error: function () {
        //     wx.hideLoading()
        //     wx.showModal({
        //       showCancel: false,
        //       title: '提示',
        //       content: "修改失败",
        //     })
        //   }
        // })
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
  // 监听input值改变，获取输入信息
  ChangeName(e) {
    this.setData({
      Username: e.detail.value
    });
  },
  // 退出登录
  delLogin() {
    wx.removeStorage({
      key: 'token',
      success: function (res) {
        wx.navigateBack({
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  actionSheetTap: function () {
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (e) {
        this.setData({
          Sex: e.tapIndex
        });
      }
    })
  }
})