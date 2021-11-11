//index.js
const app = getApp()
const qqmap = require('../../utils/qqmap-wx-jssdk.js')
var currentCity = ""
Page({
  data: {
    swiperImg:[
      '../../images/banner.png',
      '../../images/banner1.jpg',
      '../../images/banner2.jpg'
    ],
    wareHouseList:[],
    cityName:""
  },
  toIdentity:function(){
    
  },
  toPublishWanted:function(){
    wx.navigateTo({
      url: "../publishWanted/publishWanted"
    });
  },
  toPublishWareHouse:function(){
    wx.navigateTo({
      url: "../publishWareHouse/publishWareHouse"
    });
  },
  toMore:function(){
    wx.switchTab({
      url: '../find/find',
    })
  },
  toSwitch:function(){
    wx.navigateTo({
      url: '../common/switchcity/switchcity',
    })
  },
  toDetail:function(e){
    console.log("我要传入的值：",e);
    var wid = e.currentTarget.dataset.id;
    console.log("wid:",wid);
    wx.navigateTo({
      url: '../warehouseDetail/warehouseDetail?wid=' + wid
    })
  },
  getOnlineCity(latitude, longitude) {
    var that = this;
    var map = new qqmap({
      key: 'HFGBZ-GSJRP-TOIDZ-VTLLP-6O2MQ-5HFAQ'
    })
    //通过这个方法来实现经纬度反推省市区
    map.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("反推省市区",res)
        currentCity = res.result.address_component.city
        console.log("城市：",currentCity)
        that.setData({
          cityName:currentCity
        })
        wx.request({
          url: 'https://localhost:8083/showCityWareHouse?city_name=' + currentCity,
          success:function(res){
            console.log(res.data);
            that.setData({
              wareHouseList:res.data
            })
          }
        })
     }
    })
  },
  onLoad:function(options){
    var that=this;
    wx.getLocation({
      type: "wgs84",
      success (res) {
        that.getOnlineCity(res.latitude,res.longitude)
      }
    })
  },
  onShow:function(){
    var cityName = this.data.cityName
    var that = this
    console.log("返回的城市",cityName)
    wx.request({
      url: 'https://localhost:8083/showCityWareHouse?city_name=' + cityName,
      success:function(res){
        console.log(res.data);
        that.setData({
          wareHouseList:res.data
        })
      }
    })
  }
})
