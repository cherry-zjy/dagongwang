// pages/mine/experience/addexperience/addexperience.js
var util = require('../../../../utils/util.js');  
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    Name:'',
    Server:'',
    MonthSalary:'',
    WorkCard:'',
    date: '请选择',
    data1: '请选择',
    imageList: [],
    addimg:false,
    Path:''
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    console.log(e.detail.value)
    this.setData({
      data1: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        that.setData({
          addimg: true,
          Path: res.tempFilePaths[0]
        })
        // that.uploadImg(res.tempFilePaths[0])
      }
    })
  },
  uploadImg(imgurl,id) {
    console.log(id)
    var _t = this
    wx.uploadFile({
      url: app.mainUrl + 'api/User/UpdateForWorkImage?ID='+id,
      filePath: imgurl,
      name: 'file',
      header: {
        // "chartset": "utf-8",
        "content-type": "multipart/form-data"
      },
      // formData: {
      // },
      success: function (res) {
        wx.showToast({
          title: "添加成功"
        })
        //do something
      },
    })
    console.log(imgurl)
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    if (e.detail.value.Name.length == 0 || that.data.date == '请选择' || e.detail.value.MonthSalary.length == 0 || that.data.data1 == '请选择') {
      that.setData({
        tip: '提示：请填写信息！',
      })
      setTimeout(() => {
        that.setData({
          tip: '',
        })
      }, 1000)
    } else {
      if (e.detail.value.Server == "") {
        this.setData({
          Server: "-1",
        })
      }else{
        this.setData({
          Server: e.detail.value.Server,
        })
      }
      this.setData({
        tip: "",
        Name: e.detail.value.Name,
        MonthSalary: e.detail.value.MonthSalary,
      })
      wx.getStorage({
        key: 'token',
        success: function (res) {
          app.ajax({
            method: 'get',
            url: app.mainUrl + 'api/User/AddWorkExp',
            data: {
              Name: that.data.Name,
              Server: that.data.Server,
              MonthSalary: that.data.MonthSalary,
              StartTime: that.data.date,
              EndTime: that.data.data1,
            },
            header: {
              "Authorization": res.data
            },
            success: function (res) {
              wx.hideLoading()
              if (res.data.Status == 1) {
                if (that.data.addimg){
                  that.uploadImg(that.data.Path, res.data.Result)
                }else{
                  wx.showToast({
                    title: "添加成功"
                  })
                }
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
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      today: time
    });
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