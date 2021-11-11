// pages/warehouseDetail/warehouseDetail.js
var app = getApp();
var wid=""
var areaNum=""
var duaNum=""
var areaNumber=""
var duaNumber=""
var sta=""
var offer_price=""
var avaArea=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wid:"",
    wareHouseInfo:"",
    latitude:"",
    longitude:"",
    status:"",
    choose:"请选择",
    areaNumber: 0,
    goodsNumber: 0,
    minusStatus: 'disabled',
    minusStatus0: 'disabled',
    //遮罩层显示状态
    mask: true,
    //购物车弹窗显示隐藏
    cartBox: true
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = app.globalData.user_id
    offer_price = options.offer_price
    console.log("offer_price:",offer_price)
    wx.request({
      url: 'https://localhost:8083/showWareHouseById?wid=' + options.wid,
      success:(res)=>{
          console.log("获取到的全部数据：",res.data);
          this.setData({
              wareHouseInfo:res.data,
              latitude:res.data.latitude,
              longitude:res.data.longitude,
              address:res.data.address
          })
          avaArea = res.data.available_area
      }
    }),
    this.setData({
       wid:options.wid,
       offer_price:options.offer_price
     })
     console.log("uid:",+user_id)
     if(user_id==0){
      this.setData({
        status:0
       })
     }else if(user_id!=0){
      wx.request({
        url: 'https://localhost:8083/getCollectStatus?wid=' + options.wid +'&user_id=' +user_id,
        success:(res)=>{
          this.setData({
            status:res.data.status
          })
          sta = res.data.status
        }
      })
     }
     
     //分享
     wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShareAppMessage: function (ops) {
    var wid = this.data.wareHouseInfo.wid
    var company_name = this.data.wareHouseInfo.company_name
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '找库网'+' | '+ company_name,  // 分享名称
      path: '../warehouseDetail/warehouseDetail?wid=' + wid,  // 点击分享后的链接要来到的页面的路径已经对应需要的参数
      success: function (res) {  // 分享成功之后的操作
        console.log("分享成功:" + JSON.stringify(res));
        wx.showToast({
          title: '分享成功！',
        })
      },
      fail: function (res) {  // 分享失败之后的操作
        console.log("分享失败:" + JSON.stringify(res));
      }
    }
  },

  showCart() {
    this.setData({
      cartBox: !this.data.cartBox, //显示隐藏购物车弹窗
      mask: !this.data.mask, //显示隐藏遮罩层
    });
  },
  //点击遮罩层隐藏弹窗
  hideAllBox() {
    this.setData({
      //遮罩层隐藏
      mask: true,
      //产品参数弹窗隐藏
      paramsBox: true,
      //购物车弹窗隐藏
      cartBox: true,
      //选择规格弹窗隐藏
      choice: true,
 
    })
  },
   /* 点击减号 */
   areduceNumber: function () {
    var anum = this.data.areaNumber;
    // 如果大于1时，才可以减  
    if(anum > 1){
      anum--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus0 =anum <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      areaNumber: anum,
      minusStatus0: minusStatus0
    });
    areaNum = anum;
  },

   reduceNumber: function () {
    var num = this.data.goodsNumber;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      goodsNumber: num,
      minusStatus: minusStatus
    });
    duaNum = num;
  },

  /* 点击加号 */
  aaddNumber: function () {
    var anum = this.data.areaNumber
    var available_area = avaArea
    var max = available_area/1000
    // 不作过多考虑自增1  
    if(anum<max){
      anum++;
       // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus0 = anum < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        areaNumber: anum,
        minusStatus0: minusStatus0
      });
      areaNum = anum;
    }else{
      wx.showToast({
        title: '超过可租面积啦！',
      })
    }
  },

  addNumber: function () {
    var num = this.data.goodsNumber;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态 
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      goodsNumber: num,
      minusStatus: minusStatus
    });
    duaNum = num;
  },
  /* 输入框事件 */
  inputAreaChange:function(e){
    var anum = e.detail.value;
    areaNum = anum;
    // 将数值与状态写回  
    this.setData({
      areaNumber: anum
    });
  },

  inputValueChange: function (e) {
    var num = e.detail.value;
    duaNum = num;
    // 将数值与状态写回  
    this.setData({
      goodsNumber: num
    });
  },

  cartBoxClick:function(){
    areaNumber = areaNum * 1000
    duaNumber = duaNum
    this.setData({
      choose: '租赁面积：' + areaNumber + ' ㎡,租赁时长：' + duaNumber + ' 个月',
      mask: true,
      paramsBox: true,
      cartBox: true,
      choice: true,
    })
  },

  lookMap:function(e){
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var address = this.data.address;
    console.log("经纬度：",latitude+longitude);
    wx.navigateTo({
      url: '../common/mapdetail/mapdetail?latitude=' + latitude + '&longitude=' + longitude + '&address=' + address,
    })
  },
  appointmentWareHourse:function(e){
    var wid = this.data.wareHouseInfo.wid
    var company_name = this.data.wareHouseInfo.company_name
    var ware_name = this.data.wareHouseInfo.ware_name
    var oprice = offer_price
    var available_area = this.data.wareHouseInfo.available_area
    var contact_name = this.data.wareHouseInfo.contact_name
    if(oprice!=null){
      var price = oprice
    }else{
      var price = this.data.wareHouseInfo.price
    }
    wx.navigateTo({
      url: '../createOrder/createOrder?areaNum=' + areaNumber + '&duaNum=' + duaNumber +'&company_name=' + company_name + '&ware_name=' + ware_name + '&price=' + price + '&wid=' + wid + '&available_area=' + available_area + '&contact_name=' + contact_name,
    })
  },
  toHome:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  clickCollection:function(){
    var that = this
    var status = sta
    var user_id = app.globalData.user_id
    var wid = this.data.wareHouseInfo.wid
    if(user_id != 0 ){
      if(status == 1){
        wx.request({
          url: 'https://localhost:8083/updateCollectStatus?user_id=' + user_id + '&wid=' + wid + '&status=' + 0,
          success:function(res){
            console.log(res)
            wx.request({
              url: 'https://localhost:8083/getCollectStatus?wid=' + wid +'&user_id=' +user_id,
              success:(r)=>{
                console.log("r:",r)
               that.setData({
                   status:r.data.status
               })
              sta = r.data.status
             }
            })
            wx.showToast({
              title: '取消收藏！',
            })
          }
        })
      }else if(status == 0||status == 2){
        if(status==2){
          wx.request({
            url: 'https://localhost:8083/addCollect',
            data:{
              user_id:user_id,
              wid:wid,
              status:0
            }
          })
        }
        wx.request({
          url: 'https://localhost:8083/updateCollectStatus?user_id=' + user_id + '&wid=' + wid + '&status=' + 1,
          success:function(res){
            console.log(res)
            wx.request({
              url: 'https://localhost:8083/getCollectStatus?wid=' + wid +'&user_id=' +user_id,
              success:(r)=>{
                console.log("r:",r)
               that.setData({
                   status:r.data.status
               })
              sta = r.data.status
             }
            })
            wx.showToast({
              title: '收藏成功！',
            })
          }
        })
      }
    }else if(user_id == 0){
      wx.showToast({
        title: '请先登录！',
        image:'/images/warning.png'
      })
    }
    
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