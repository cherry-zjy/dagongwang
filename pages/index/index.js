//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    jobList:[{
      ID:1,
      Display_Image:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      Type:'补贴',
      Address:'宁波市鄞州区',
      Money:'200元',
      Price:'3500元'
    },{
      ID: 1,
      Display_Image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      Type: '补贴',
      Address: '宁波市鄞州区',
      Money: '200元',
      Price: '3500元'
    },
    {
      ID: 1,
      Display_Image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      Type: '补贴',
      Address: '宁波市鄞州区',
      Money: '200元',
      Price: '3500元'
    }]
  },
  // 点击跳转详情页
  jobDetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'newsDetail/newsDetail?id=' + id,
    })
  },
})