var app=getApp();
var cityData=require('../../utils/city.js');
function initSubMenuDisplay(){
    return ['hidden' , 'hidden'];
}
Page({
    data: {
        wantedMarketList:[],
        first: '全国',
        second: '面积',
        _num: 0,
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
            url: 'https://localhost:8083/showCityWantedMarket?city_name='+e.target.dataset.name,
            data:{
              
            },
            success:function(res){
                console.log(res.data);
                that.setData({
                    wantedMarketList:res.data
                })
            }
          })
        var text = this.data.name
        console.log(text)
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
          url: 'https://localhost:8083/showAreaWantedMarket?area='+e.target.dataset.num,
          data:{
            
          },
          success:function(res){
              console.log(res.data);
              that.setData({
                  wantedMarketList:res.data
              })
          }
        })
    
    },
    onLoad: function (options) {
        
    },
    toOffer:function(e){
        var city_name = e.currentTarget.dataset.cname
        var sn = e.currentTarget.dataset.sn
        console.log("city_name:",city_name)
        wx.navigateTo({
          url: '../offer/offer?city_name=' + city_name + '&sn=' + sn,
        })
    },
    
    onReady:function(){
        var that=this;
        wx.request({
          url: 'https://localhost:8083/showAllWantedMarket',
          success:function(res){
              console.log(res.data);
              that.setData({
                  wantedMarketList:res.data
              })
          }
        })
    }
})