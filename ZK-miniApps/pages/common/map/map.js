// pages/common/map/map.js
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'HFGBZ-GSJRP-TOIDZ-VTLLP-6O2MQ-5HFAQ'
});

var latitude=""
var longitude=""
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: e.detail.value.address,
      success: function(res) {//成功后的回调
        console.log("回调值：",res);
        var res = res.result;
        latitude = res.location.lat;
        longitude = res.location.lng;
        var address = e.detail.value.address;
        //根据地址解析在地图上标记解析地址位置
        _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          markers: [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            iconPath: '../../../images/location.png',//图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
          poi: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }
        });
        console.log("latitude:",latitude)
        console.log("longitude:",longitude)
        console.log("address:",address)
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          latitude: latitude,
          longitude: longitude,
          address: address
        })
        wx.navigateBack()
        // wx.navigateTo({
        //   url: '/pages/publishWareHouse/publishWareHouse?latitude=' + latitude + '&longitude=' + longitude +'&address=' + address
        // })
      },
      
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
      
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

})