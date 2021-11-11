// pages/find/find.js
var app = getApp()
var cityData=require('../../utils/city.js');
function initSubMenuDisplay(){
    return ['hidden' , 'hidden'];
}
Page({
  data: {
    wareHouseList:[],
    first: '全国',
    second: '可租面积',
    third: '类型',
    _num: 0,
    _res: 0,
    cityleft: cityData.getCity(), //获取区域的下拉框筛选项内容
    cityright: {}, //选择区域的中间内容部分后显示的右边内容
  },
  // 下拉切换
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
    
  tabNav: function (e) {
      this.setData({
          displays: "block"
      })
      this.setData({
          selected1: false,
          selected: true
      })
      if (this.data.currentTab === e.target.dataset.current) {
          return false;
      } else {
      
          var showMode = e.target.dataset.current == 0;
      
          this.setData({
              currentTab: e.target.dataset.current,
              isShow: showMode
          })
      }
  },
  //左
  selected:function(e){
      console.log('用户选中左边菜单栏的索引值是：' + e.target.dataset.city);
      this.setData({
          cityright: this.data.cityleft[e.currentTarget.dataset.city],
          selected:true,
          selected1:false
      })
  },
  selected1: function (e) {
      this.setData({
      selected: false,
      selected1: true
      })
  },
      //右
  clickCity: function (e) {
      console.log('选中的市：'+e.currentTarget.dataset.name)
      this.setData({
          _sum: e.target.dataset.num
      })
      this.setData({
          first: e.target.dataset.name
      })
      this.setData({
          displays: "none"
      })
      var that=this;
      wx.request({
          url: 'https://localhost:8083/showCityWareHouse?city_name='+e.target.dataset.name,
          data:{
            
          },
          success:function(res){
              console.log(res.data);
              that.setData({
                wareHouseList:res.data
              })
          }
        })
  },
  onLoad: function (options) {
      
  },
      
  clickArea: function (e) {
      console.log("获取到的值：",e.target.dataset.num)
      this.setData({
          _num: e.target.dataset.num
      })
      this.setData({
          second: e.target.dataset.name
      })
      this.setData({
          displays: "none"
      })
      var that=this;
      wx.request({
        url: 'https://localhost:8083/showAreaWareHouse?available_area='+e.target.dataset.num,
        data:{
          
        },
        success:function(res){
            console.log(res.data);
            that.setData({
              wareHouseList:res.data
            })
        }
      })

  },
  onLoad: function (options) {
      
  },
  clickType: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _res: e.target.dataset.num
    })
    this.setData({
      third: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    var that=this;
      wx.request({
        url: 'https://localhost:8083/showTypesWareHouse?storage_types='+e.target.dataset.num,
        data:{
          
        },
        success:function(res){
          console.log(res.data);
          that.setData({
            wareHouseList:res.data
          })
        }
      })
    },
    onLoad: function (options) {
    
    },
  toDetail:function(e){
    console.log("我要传入的值：",e);
    var wid = e.currentTarget.dataset.id;
    console.log("wid:",wid);
    wx.navigateTo({
      url: '../warehouseDetail/warehouseDetail?wid=' + wid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  onShow:function(){
    var that=this;
    wx.request({
      url: 'https://localhost:8083/showAllWareHouse',
      success:function(res){
          console.log(res.data);
          that.setData({
              wareHouseList:res.data
          })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})