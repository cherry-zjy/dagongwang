const app = getApp()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     none: '',
//     list: [],
//     mainurl:''

//   },
//   addexp(){
//     wx.navigateTo({
//       url: 'addexperience/addexperience'
//     })
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     this.setData({
//       mainurl: app.mainUrl
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//       var tt = this
//       wx.getStorage({
//         key: 'token',
//         success: function (res) {
//           app.ajax({
//             method: 'get',
//             url: app.mainUrl + 'api/User/UserWorkExp',
//             header: {
//               "Authorization": res.data
//             },
//             success: function (res) {
//               wx.hideLoading()
//               if (res.data.Status == 1) {
//                 if (res.data.Result.length == 0) {
//                   tt.setData({
//                     none: true
//                   })
//                 }else{
//                   tt.setData({
//                     list: res.data.Result,
//                     none: false
//                   })
//                 }
//               } else if (res.data.Status == -1) {
//                 wx.showModal({
//                   showCancel: false,
//                   title: '提示',
//                   content: res.data.Result,
//                 })
//                 wx.navigateBack({});
//               }
//               else {
//                 wx.showModal({
//                   showCancel: false,
//                   title: '提示',
//                   content: res.data.Result,
//                 })
//               }

//             },
//             error: function () {
//               wx.hideLoading()
//             }
//           })
//         },
//         fail: function (res) {
//           wx.navigateTo({
//             url: '../../login/login'
//           })
//         },
//         complete: function (res) {
//         },
//       })
//     },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

Page({
  data: {
    // 删除按钮宽度单位（rpx）
    delBtnWidth: 180,
    none: '',
    list: [],
    mainurl:''
  },

  onLoad: function (options) {
    this.setData({
      mainurl: app.mainUrl
    })
    // 页面初始化 options为页面跳转所带来的参数
    this.initEleWidth();
    this.tempData();
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if(disX > 0){
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      // console.log(list[index].txtStyle)
      list[index].txtStyle = txtStyle;
      
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },

  touchE: function (e) {
    console.log(e)
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      
      // console.log(list[index].txtStyle)
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },

  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  //点击删除按钮事件
  delItem: function (e) {
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/User/DelWorkExp',
          header: {
            "Authorization": res.data
          },
          data:{
            ID: e.currentTarget.dataset.id
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              var list = tt.data.list;
              list.splice(e.currentTarget.dataset.index, 1);
              tt.setData({
                list: list
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
          url: '../../login/login'
        })
      },
      complete: function (res) {
      },
    })
  },

  //测试临时数据
  tempData: function () {
    var tt = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/User/UserWorkExp',
          header: {
            "Authorization": res.data
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              if (res.data.Result.length == 0) {
                tt.setData({
                  none: true
                })
              }else{
                tt.setData({
                  // list: res.data.Result,
                  none: false
                })
                var list1 = Array();
                list1 = res.data.Result;
                for (let index = 0; index < res.data.Result.length; index++) {
                  list1[index].txtStyle = ""
                }
                tt.setData({
                  list: list1,
                })
              }
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
})