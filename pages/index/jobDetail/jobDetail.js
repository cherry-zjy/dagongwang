// pages/index/jobDetail/jobDetail.js
const app = getApp()
var rate = 0; //分辨转换
var floatTop = 0; //悬浮高度
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
    currenttype:0,
    scrollHeight:"",
    detailInfo:[],
    rule:[],
    Images:[],
    isfloow: false,
    isattend:false,
    Upphone:'',
    detailid:'',
    toView:'',
    scrollTop:'',
    mainurl:'',
    isShowFloatTab:false, //是否置顶
    workFloatTab:false,
    qiyeFloatTab:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailid: options.id
      // detailid: '4b8eff17-3e4f-e811-9a80-bf23cdc8323e'
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
            "ID": that.data.detailid,
          },
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              that.setData({
                detailInfo: res.data.Result,
                rule: res.data.Result.Rule,
                Images: res.data.Result.Images,
                isfloow: res.data.Result.Isattention,
                Upphone: res.data.Result.Upphone,
                isattend: res.data.Result.Isapply,
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
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/Home/WorkDetails',
          data: {
            "ID": that.data.detailid,
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              that.setData({
                detailInfo: res.data.Result,
                rule: res.data.Result.Rule,
                Images: res.data.Result.Images,
                isfloow: res.data.Result.Isattention,
                
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

    wx.getSystemInfo({
      success: function (res) {
        // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight,
        });
      }
    });

    if (wx.canIUse('getSystemInfo.success.screenWidth')) {
      wx: wx.getSystemInfo({
        success: function (res) {
          rate = res.screenWidth / 750;
          floatTop = 260 * rate;
          that.setData({
            scrollTop: 310* res.screenWidth / 750 + 150,
            // scrollHeight: res.screenHeight / (res.screenWidth / 750) - 128,
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      mainurl: app.mainUrl
    })
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
  // 点击查看图片
  previewImage: function (e) {
    // var that = this;
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
      var imglist = this.data.mainurl + img[i - 1]["Image"];
      imgArr.push(imglist);
    }
    wx.previewImage({
      current: this.data.mainurl + e.currentTarget.dataset.src,//当前图片地址
      urls: imgArr
    })
  },

  gotoimage: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset['index']
    })
  },

  floow(){
    if (this.data.isfloow){
      var tt = this
      wx.getStorage({
        key: 'token',
        success: function (res) {
          app.ajax({
            method: 'get',
            url: app.mainUrl + 'api/Home/DelLikeJob',
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
                  isfloow: false
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
          wx.navigateTo({
            url: '../login/login',
          })
        },
        complete: function (res) {
        },
      })
    }else{
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
          wx.navigateTo({
            url: '../../login/login'
          })
        },
        complete: function (res) {
        },
      })
    }
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
  //报名
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
            } else if (res.data.Status == -2){
              wx.showModal({
                title: '提示',
                content: res.data.Result,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../../mine/authentication/authentication',
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
        wx.navigateTo({
          url: '../../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },
  // tap: function (e) {
  //   for (var i = 0; i < order.length; ++i) {
  //     if (order[i] === this.data.toView) {
  //       this.setData({
  //         toView: order[i + 1],
  //         scrollTop: (i + 1) * 200
  //       })
  //       break
  //     }
  //   }
  // },
  // tapMove: function (e) {
  //   this.setData({
  //     scrollTop: this.data.scrollTop + 10
  //   })
  // },
  gototype: function (e) {
    var that = this
    that.setData({
      currenttype: e.currentTarget.dataset['index']
    })
    if (that.data.currenttype == 0){
      that.setData({
        toView: 'start'
      })
    }else if (that.data.currenttype == 1) {
      that.setData({
        toView: 'work',
        workFloatTab: true
      })
    } else if (that.data.currenttype == 2) {
      that.setData({
        toView: 'company',
        qiyeFloatTab: true
      })
    }
  },
  scroll: function (e) {
    var that = this;
    console.log(that.data.currenttype)
    // if (that.data.currenttype !== 1){
    //   that.setData({
    //     workFloatTab: false
    //   })
    // }else{
    //   that.setData({
    //     workFloatTab: true
    //   })
    // }
    // if (that.data.currenttype !== 2) {
    //   that.setData({
    //     qiyeFloatTab: false
    //   })
    // } else {
    //   that.setData({
    //     qiyeFloatTab: true
    //   })
    // }
    if (e.detail.scrollTop >= that.data.scrollTop && !this.data.isShowFloatTab){
      console.log('悬浮' + e.detail.scrollTop)
      that.setData({
        isShowFloatTab: true
      })
    } else if(e.detail.scrollTop < that.data.scrollTop && this.data.isShowFloatTab){
      console.log('不悬浮' + e.detail.scrollTop)
      that.setData({
        isShowFloatTab: false
      })
    }
  },
  scrolltoupper:function(e){
    // console.log(e)
  },
})