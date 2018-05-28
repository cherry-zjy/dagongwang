// pages/mine/userInfo/userInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    UserInfoIcon:"",
    userInfo:[],
    NickName:'',
    Sex:''
  },
  getInfo(){
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
                userInfo: res.data.Result,
                NickName: res.data.Result.NickName,
                Sex: res.data.Result.Sex,
                UserInfoIcon: app.mainUrl + res.data.Result.Image,
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
        wx.showToast({
          title: "获取信息失败，请重新登录"
        })
      },
      complete: function (res) {
      },
    })
  },
  gotoauthentication(){
    wx.navigateTo({
      url: '../authentication/authentication'
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
  
  },
  /**
   * 弹窗
   */
  showDialogBtn: function (e) {
    console.log(e)
    var text = e.currentTarget.dataset.text
    this.setData({
        NickName: text,
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
      showModal: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
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
    wx.getStorage({
      key: 'token',
      success: function (res) {
        tt.setData({
          token: res.data,
        })
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/User/UpdateForName',
          data: {
            name: tt.data.NickName
          },
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              tt.getInfo()
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
            wx.showModal({
              showCancel: false,
              title: '提示',
              content: "修改失败",
            })
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
  // 监听input值改变，获取输入信息
  ChangeName(e) {
    this.setData({
      NickName: e.detail.value
    });
  },
  // 退出登录
  delLogin() {
    wx.showModal({
      // title: '提示',
      content: '确定要退出登录吗',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              wx.navigateBack({
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  actionSheetTap: function () {
    var tt = this
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (e) {
        tt.setData({
          Sex: e.tapIndex
        });
        tt.hideModal();
        wx.getStorage({
          key: 'token',
          success: function (res) {
            tt.setData({
              token: res.data,
            })
            app.ajax({
              method: 'get',
              url: app.mainUrl + 'api/User/UpdateForSex',
              data: {
                t: tt.data.Sex
              },
              header: {
                "Authorization": res.data
              },
              success: function (res) {
                wx.hideLoading()
                if (res.data.Status == 1) {
                  tt.getInfo()
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
                wx.showModal({
                  showCancel: false,
                  title: '提示',
                  content: "修改失败",
                })
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
    })
  },
  changeImg() {
    var tt = this
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        // tt.setData({
        //   userInfoIcon: tempFilePaths[0]
        // })
        tt.uploadImg(tempFilePaths[0])
      }
    })
  },
  uploadImg(imgurl) {
    var _t = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.uploadFile({
          url: app.mainUrl + 'api/User/UpdateForImage',
          filePath: imgurl,
          name: 'file',
          header: {
            // "chartset": "utf-8",
            "Authorization": res.data,
            "content-type": "multipart/form-data"
          },
          // formData: {
          // },
          success: function (res) {
            console.log(res)
            var data = res.data
            //do something
            _t.getInfo()
          },
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
    console.log(imgurl)
    
  },
  
})