//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    jobList1: [],
    jobList2: [],
    jobList3: [],
    jobList4:[],
    searchVal:'',
    isscroll: false,  //是否滚动了。
    mainurl : '',
    IsNext: false,//是否有下一页,
    pageIndex:1,
    recommendList:[],
    group:20,
    listlenth:0
  },
  getInfo() {
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/WorkHome',
      data: { pageIndex: Number(that.data.pageIndex), pageSize: that.data.group, Keyword:-1},
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          if (that.data.pageIndex == 1) {
            that.data.jobList = [];
            that.setData({
              jobList1: res.data.Result.result.Works,
            })
          } else if (that.data.pageIndex == 2){
            that.setData({
              jobList2: res.data.Result.result.Works,
            })
          } else if (that.data.pageIndex == 3) {
            that.setData({
              jobList3: res.data.Result.result.Works,
            })
          } else if (that.data.pageIndex == 4) {
            that.setData({
              jobList4: res.data.Result.result.Works
            })
          } else if (that.data.pageIndex > 4) {
            that.data.jobList4 = that.data.jobList4.concat(res.data.Result.result.Works)
            that.setData({
              jobList4: that.data.jobList4,
            })
          }
          that.data.pageIndex = that.data.pageIndex + 1
          that.data.listlenth = res.data.Result.result.Works.length
          that.setData({
            imgUrls: [
              app.mainUrl + res.data.Result.BannerImage
            ],
            recommendList: res.data.Result.result,
            IsNext: res.data.Result.IsNext
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
  // 点击跳转详情页
  jobDetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'jobDetail/jobDetail?id=' + id,
    })
  },

  gotosearch(){
    wx.navigateTo({
      url: 'search/search'
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
    this.setData({
      pageIndex: 1
    })
    this.getInfo();
    this.mainurl = app.mainUrl
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
    
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    this.setData({
      pageIndex: 1
    })
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/WorkHome',
      data: { pageIndex: Number(that.data.pageIndex), pageSize: that.data.group, Keyword: -1, City: -1, Type: 0},
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.Status == 1) {
          if (that.data.pageIndex == 1) {
            that.data.jobList = [];
            that.setData({
              jobList1: res.data.Result.result.Works,
            })
          } else if (that.data.pageIndex == 2) {
            that.setData({
              jobList2: res.data.Result.result.Works,
            })
          } else if (that.data.pageIndex == 3) {
            that.setData({
              jobList3: res.data.Result.result.Works,
            })
          } else if (that.data.pageIndex == 4) {
            that.setData({
              jobList4: res.data.Result.result.Works
            })
          } else if (that.data.pageIndex > 4) {
            that.data.jobList4 = that.data.jobList4.concat(res.data.Result.result.Works)
            that.setData({
              jobList4: that.data.jobList4,
            })
          }
          that.data.pageIndex = that.data.pageIndex + 1
          that.data.listlenth = res.data.Result.result.Works.length
          that.setData({
            imgUrls: [
              app.mainUrl + res.data.Result.BannerImage
            ],
            recommendList: res.data.Result.result,
            IsNext: res.data.Result.IsNext
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.IsNext) {
      var that = this
      if (that.data.pageIndex == 1) {
        that.setData({
          pageIndex: 2
        })
      }
      that.getInfo()
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

