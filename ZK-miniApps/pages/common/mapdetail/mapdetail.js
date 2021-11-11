// pages/common/mapdetail/mapdetail.js
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'HFGBZ-GSJRP-TOIDZ-VTLLP-6O2MQ-5HFAQ' // 必填
});  
var latitude="";
var longitude="";
var address=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:"",
    longitude:"",
    address:""
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var latitude=options.latitude
    var longitude=options.longitude
    var address=options.address
    var _this = this
    this.setData({
      latitude:latitude,
      longitude:longitude,
      address:address
    }),
   
    qqmapsdk.reverseGeocoder({

      location:{
        latitude:this.data.latitude,
        longitude:this.data.longitude,
      },
      address:this.data.address,
      //location: e.detail.value.reverseGeo || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
      success: function(res) {//成功后的回调
        console.log("res:",res);
        var res = res.result;
        var mks = [];
    
        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.address,
          id: 0,
          latitude: res.location.lat,
          longitude: res.location.lng,
          iconPath: '../../../images/location.png',//图标路径
          width: 20,
          height: 20,
          callout: { //在markers上展示地址名称，根据需求是否需要
            content: res.address,
            color: '#000',
            display: 'ALWAYS'
          }
        });
        _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
          poi: {
            latitude: res.location.lat,
            longitude: res.location.lng
          }
        });
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