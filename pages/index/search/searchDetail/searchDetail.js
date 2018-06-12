// pages/index/search/searchDetail/searchDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    detailid:'',
    pageIndex:1,
    IsNext:false,
    inputTxt:'',
    array: ['无', '上海市', '昆山市', '吴江市', '常州市', '无锡市', '苏州市'],
    index: 0,
    ascending: false,
    issort:false,
    Type:0,
    City:-1,
    next:false
  },
  getInfo(){
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/WorkHome',
      data: { 
        pageIndex: Number(that.data.pageIndex), 
        pageSize: 20, 
        Keyword: that.data.detailid, 
        City: that.data.City, 
        Type: that.data.Type 
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          if (that.data.pageIndex == 1) {
            that.data.datalist = []
          }
          that.data.pageIndex = that.data.pageIndex + 1
          that.data.datalist = that.data.datalist.concat(res.data.Result.result.Works)
          that.setData({
            datalist: that.data.datalist,
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
  // 文本框监听
  searchInput(e) {
    this.setData({
      detailid: e.detail.value
    })
  },
  // 搜索
  search(e) {
    if (this.data.detailid == ''){
      this.setData({
        detailid: '-1',
        pageIndex:1
      })
    }else{
      this.setData({
        detailid: this.data.detailid,
        pageIndex: 1
      })
    }
    this.getInfo()
  },
  // picker
  bindPickerChange: function (e) {
    if (this.data.array[e.detail.value] == '无'){
      this.setData({
        City: '-1', 
        issort: false,
        pageIndex: 1
      })
    }else{
      this.setData({
        City: this.data.array[e.detail.value],
        issort:true,
        pageIndex: 1
      })
    }
    this.getInfo()
  },
  // 降序
  sort(){
    if (this.data.Type == 0){
      this.setData({
        Type: 1,
        pageIndex: 1
      })
    }else{
      this.setData({
        Type: 0,
        pageIndex: 1
      })
    }
    this.setData({
      ascending: !this.data.ascending,
    })
    this.getInfo()
  },
  // 点击跳转详情页
  jobDetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../jobDetail/jobDetail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == "undefined" || options.id == ""){
      this.setData({
        detailid: '-1',
        inputTxt: ''
      })
    }else{
      this.setData({
        detailid: options.id,
        inputTxt: options.id
      })
    }
    this.getInfo()
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

    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    this.setData({
      pageIndex: 1
    })
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/Home/WorkHome',
      data: {
        pageIndex: Number(that.data.pageIndex),
        pageSize: 20,
        Keyword: that.data.detailid,
        City: that.data.City,
        Type: that.data.Type
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.Status == 1) {
          that.setData({
            datalist: res.data.Result.result.Works,
            IsNext: res.data.Result.IsNext,
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
    var that = this
    if (that.data.IsNext) {
      if (that.data.pageIndex == 1) {
        that.setData({
          pageIndex: 2
        })
      }
      that.getInfo()
    } else {
      if (that.data.next == false) {
        that.setData({
          next: true
        })
        wx.showToast({
          title: '没有更多数据了',
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})