var WxSearch = require('../../../wxSearch/wxSearch.js')
var app = getApp()
  Page({
    data: {
      searchvalue:'',
      wxSearchData:{
        value:''
      }
    },
    getInfo() {
      var that = this
      app.ajax({
        method: 'get',
        url: app.mainUrl + 'api/Home/FindTags',
        success: function (res) {
          wx.hideLoading()
          if (res.data.Status == 1) {
            var list = Array();
            for (let index = 0; index < res.data.Result.list.length; index++) {
              list.push(res.data.Result.list[index].Name)
            }
            WxSearch.init(that, 43, list);
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
    searchDetail(e) {
      
      var text = e.currentTarget.dataset.text;
      wx.navigateTo({
        url: 'searchDetail/searchDetail?id=' + text,
      })
    },
    onLoad: function () {
      this.getInfo()
      var that = this
        //初始化的时候渲染wxSearchdata
        WxSearch.initMindKeys([]);   
    },
    wxSearchFn: function (e) {
      var that = this
      WxSearch.wxSearchAddHisKey(that);
      var text = that.data.wxSearchData.value;
      wx.navigateTo({
        url: 'searchDetail/searchDetail?id=' + text,
      })
    },
    wxSearchInput: function (e) {
      this.setData({
        searchvalue: e.detail.value
      })
      var that = this
      WxSearch.wxSearchInput(e, that);
    },
    wxSerchFocus: function (e) {
      var that = this
      WxSearch.wxSearchFocus(e, that);
    },
    wxSearchBlur: function (e) {
      var that = this
      WxSearch.wxSearchBlur(e, that);
    },
    wxSearchKeyTap: function (e) {
      var that = this
      WxSearch.wxSearchKeyTap(e, that);
      WxSearch.wxSearchAddHisKey(that);
      var text = that.data.wxSearchData.value;
      that.setData({
        'wxSearchData.value': ''
      })
      wx.navigateTo({
        url: 'searchDetail/searchDetail?id=' + text,
      })
    },
    // wxSearchDeleteKey: function (e) {
    //   var that = this
    //   WxSearch.wxSearchDeleteKey(e, that);
    // },
    wxSearchDeleteAll: function (e) {
      var that = this;
      WxSearch.wxSearchDeleteAll(that);
    },
    wxSearchTap: function (e) {
      var that = this
      WxSearch.wxSearchHiddenPancel(that);
    }
  })