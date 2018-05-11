// pages/index/jobDetail/jobDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorColor:'rgb(173,173,173)',
    indicatorActiveColor:'#fff',
    currentTab: 0,
    // currenttype:0,
    scrollHeight:"",
    upperThreshold:"",
    lowerThreshold:"",
    detailInfo:[],
    rule:[],
    Images:[],
    isfloow: false,
    isattend:false,
    Upphone:'',
    detailid:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailid: options.id
    })
    // 获取参数id
    // console.dir(options.id)
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/WorkDetails',
          data: {
            "ID": options.id,
          },
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              console.log(res.data.Result)
              that.setData({
                detailInfo: res.data.Result,
                rule: res.data.Result.Rule,
                Images: res.data.Result.Images,
                isfloow: res.data.Result.Isattention,
                Upphone: res.data.Result.Upphone,
                isattend: res.data.Result.Isapply,
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
    // var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.info(res.windowHeight);
    //     that.setData({
    //       scrollHeight:res.windowHeight
    //     });
    //   }
    // });  
    // var that = this;
    // wx.createSelectorQuery().select('#start').boundingClientRect(function (rect) {
    //   // rect.id      // 节点的ID  
    //   // rect.dataset // 节点的dataset  
    //   // rect.left    // 节点的左边界坐标  
    //   // rect.right   // 节点的右边界坐标  
    //   // rect.top     // 节点的上边界坐标  
    //   // rect.bottom  // 节点的下边界坐标  
    //   // rect.width   // 节点的宽度  
    //   // rect.height  // 节点的高度  
    //   console.log(rect)
    //   that.setData({
    //     upperThreshold: rect.top
    //   });
    //   that.setData({
    //     lowerThreshold: rect.bottom
    //   });
    // }).exec()
    
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
  // 点击查看图片
  previewImage: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var Type = e.currentTarget.dataset.type;
    var imgArr = [];
    var img = [];
    for (var i = 0; i < this.data.Images.length; i++) {
      if (this.data.Images[i].Type == Type)
        img.push(this.data.Images[i]);
    }
    var objkeys = Object.keys(img);
    for (var i = 1; i <= objkeys.length; i++) {
      imgArr.push(img[i - 1]["Image"]);
    }
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
  },

  gotoimage: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset['index']
    })
  },

  floow(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/AddAttention',
          data: {
            "ID": tt.data.detailid
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
              tt.setData({
                isfloow: true
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
        tt.setData({
          isLogin: false
        })
      },
      complete: function (res) {
      },
    })
  },
  // 打电话
  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.Upphone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  attend(){
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/ApplyWork',
          data: {
            "WorkID": tt.data.detailid
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
              tt.setData({
                isattend: true
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
        tt.setData({
          isLogin: false
        })
      },
      complete: function (res) {
      },
    })
  }
  // gototype: function (e) {
  //   this.setData({
  //     currenttype: e.currentTarget.dataset['index']
  //   })
  // },
  // scroll: function (e) {
  //   console.log(e)
  // },
  // upper :function(){
  //   console.log("离顶部" + this.data.upperThreshold)
  // },
  // lower: function () {
  //   console.log("离底部" + this.data.lowerThreshold)
  // },
})