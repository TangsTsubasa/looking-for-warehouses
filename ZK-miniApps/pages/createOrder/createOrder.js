const app = getApp()
var contact_name=""
var phone=""
var conname=""
var ph=""
var waid=""
var comname=""
var wname=""
var pr=""
var ar=""
var dur=""
var deposit=""
var de=""
var total=""
var tot=""
var rem=""
var avaArea=""
Page({
  data: {
    wid:'',
    areaNum:'',
    duaNum:'',
    company_name:'',
    ware_name:'',
    price:'',
    deposit:'',
    remark:'',
    status:'1',
    create_time:'',
    conname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("传参：",options)
    de = options.duaNum * (options.areaNum/10)
    tot = options.price * options.areaNum * options.duaNum + de
    waid = options.wid
    comname = options.company_name
    wname = options.ware_name
    pr = options.price
    ar = options.areaNum
    dur = options.duaNum
    avaArea = options.available_area
    conname = options.contact_name
    this.setData({
        area:options.areaNum,
        duration:options.duaNum,
        wid:options.wid,
        company_name:options.company_name,
        ware_name:options.ware_name,
        price:options.price,
        deposit:de,
        total:tot,

    })  
   
  },

  remark:function(e){
    this.data.remark = e.detail.value;
    var remark = e.detail.value
    rem = remark
    this.setData({

    })
  },

  subOrder:function(options){
    var user_id = app.globalData.user_id
    var contact_name = app.globalData.userName
    var phone = app.globalData.phone
    var available_area = avaArea-ar
    console.log("avaArea:",avaArea)
    console.log("available_area:",available_area)
    var wid = waid
    var company_name = comname
    var ware_name = wname
    var deposit = de
    var price = pr
    var total = tot
    var area = ar
    var duration = dur
    var remark = rem
    var status = "1"
    var seller = conname
    console.log("seller:",seller)
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份
    var Y =date.getFullYear();
    //获取月份
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("当前时间：" + Y + '年'  + M + '月' + D + '日' );
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var create_time = Y + "-" + M + "-" + D + " " + hour + ":" +  minute + ":" + second
    console.log("当前时间0：",create_time);
    wx.request({
      url: 'https://localhost:8083/addOrderTable',
      data:{
        user_id:user_id,
        wid:wid,
        contact_name:contact_name,
        seller:seller,
        phone:phone,
        company_name:company_name,
        ware_name:ware_name,
        deposit:deposit,
        price:price,
        total:total,
        area:area,
        duration:duration,
        remark:remark,
        status:status,
        create_time:create_time
      },
      success:function(res){
        console.log(res);
        if(res.data=="ok"){
          wx.showToast({
            title: '添加成功！'
          }),
          wx.switchTab({
            url: '/pages/order/order',
          })
        }
      }
    })
    wx.request({
      url: 'https://localhost:8083/updateAvailableArea?available_area=' + available_area + '&wid=' + wid,
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
    var that = this
    var user_id = app.globalData.user_id
    contact_name = app.globalData.userName
    phone = app.globalData.phone
    console.log("当前角色：",contact_name)
    if(user_id!=0){
      that.setData({
        contact_name:contact_name,
        phone:phone
      }) 
    }else if(user_id==0){
      wx.navigateTo({
        url: '../login/login',
      })
    }  
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