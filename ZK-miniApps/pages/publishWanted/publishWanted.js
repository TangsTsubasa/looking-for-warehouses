// pages/publishWanted/publishWanted.js
var app=getApp()
var st="";
var stid="";
var gt="";
var gtid="";
var lp="";
var lpid="";
var sert="";
var sertid="";
var sd="";
var pro="";
var ci="";
var dis="";
Page({
  data: {
    region: ['','',''],
    customItem: '全部',
    storeTypeArr: [{st:'请选择'},{id:'1',st:'冷库'},{id:'2',st:'恒温'}],
    storeTypeIndex:0,
    goodsTypeArr:[{gt:'请选择'},{id:'1',gt:'速冻食品'},{id:'2',gt:'常温食品'},{id:'3',gt:'冰块'},{id:'4',gt:'药品'},{id:'5',gt:'其它'}],
    goodsTypeIndex:0,
    periodArr:[{lp:'请选择'},{id:'1',lp:'1年'},{id:'2',lp:'2年'},{id:'3',lp:'3年'},{id:'4',lp:'4年'},{id:'5',lp:'5年'}],
    periodIndex:0,
    serviceTypeArr: [{sert:'请选择'},{id:'1',sert:'冷库租赁'},{id:'2',sert:'仓库租赁'}],
    serviceTypeIndex:0,
    start_date:'2021-01-03',
    index: 0
  },
  addWantedMarket:function(options){
    var storage_type=st
    var goods_type=gt
    var lease_period=lp
    var service_type=sert
    var start_date=sd
    var province_name=pro
    var city_name=ci
    var district_name=dis
    var user_id=app.globalData.user_id
    console.log("存储类型："+storage_type)
    console.log("货物类型："+goods_type)
    console.log("租赁年限："+lease_period)
    console.log("服务方式："+service_type)
    console.log("启用日期："+start_date)
    console.log("省："+province_name)
    console.log("市："+city_name)
    console.log("区："+district_name)
    console.log(options)
    if(user_id!=0){
      wx.request({
        url: 'https://localhost:8083/addWantedMarket',
        data:{
          user_id:user_id,
          status:1,
          area:options.detail.value.area,
          province_name:province_name,
          city_name:city_name,
          district_name:district_name,
          price:options.detail.value.price,
          storage_type:storage_type,
          goods_type:goods_type,
          contact:options.detail.value.contact,
          mobile:options.detail.value.mobile,
          email:options.detail.value.email,
          company:options.detail.value.company,
          lease_period:lease_period,
          start_date:start_date,
          service_type:service_type,
          remark:options.detail.value.remark
        },
        success:function(res){
          console.log(res);
          if(res.data=="ok"){
            wx.showToast({
              title: '添加成功！'
            }),
            wx.navigateTo({
              url: '../wantedSuccess/wantedSuccess',
            })
          }
        }
      })
    }else if(user_id==0){
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /*先对cate与cateid进行初始化picker组件的默认值，如果用户没有点击按钮选择类别时，才能将cate的值设置为组件中的默认值*/
  onLoad: function (options) {
    var storeTypeIndex=this.data.storeTypeIndex
    var goodsTypeIndex=this.data.goodsTypeIndex
    var periodIndex=this.data.periodIndex
    var serviceTypeIndex=this.data.serviceTypeIndex
    st=this.data.storeTypeArr[storeTypeIndex].st
    stid=this.data.storeTypeArr[storeTypeIndex].id
    gt=this.data.goodsTypeArr[goodsTypeIndex].gt
    gtid=this.data.goodsTypeArr[goodsTypeIndex].id
    lp=this.data.periodArr[periodIndex].lp
    lpid=this.data.periodArr[periodIndex].id
    sert=this.data.serviceTypeArr[serviceTypeIndex].sert
    sertid=this.data.serviceTypeArr[serviceTypeIndex].id
    sd=this.data.start_date
  },
  //当用户点击确定时，执行的事件
  bindRegionChange: function (e) {
    var province=e.detail.value[0]
    var city=e.detail.value[1]
    var district=e.detail.value[2]
    pro=province;
    ci=city;
    dis=district;
    console.log('省：',pro)
    console.log('市：',ci)
    console.log('区：',dis)
    console.log('用户选择的省市区：', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerStoreType: function (e) {
    var sname=this.data.storeTypeArr[e.detail.value].st;
    var sid=this.data.storeTypeArr[e.detail.value].id;
    st=sname;
    stid=sid;
    console.log('st:',st)
    console.log('用户选的是', sname)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      storeTypeIndex: e.detail.value,     
    }) 
  },
  bindPickerGoodsType: function (e) {
    var gname=this.data.goodsTypeArr[e.detail.value].gt;
    var gid=this.data.goodsTypeArr[e.detail.value].id;
    gt=gname;
    gtid=gid;
    console.log('gt:',gt)
    console.log('用户选的是', gname)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      goodsTypeIndex: e.detail.value,
    }) 
  },
  bindPickerPeriod: function (e) {
    var lpname=this.data.periodArr[e.detail.value].lp;
    var lpid=this.data.periodArr[e.detail.value].id;
    lp=lpname;
    lpid=lpid;
    console.log('lp:',lp)
    console.log('用户选的是', lpname)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      periodIndex: e.detail.value,     
    }) 
  },
  bindPickerServiceType: function (e) {
    var sertname=this.data.serviceTypeArr[e.detail.value].sert;
    var sertid=this.data.serviceTypeArr[e.detail.value].id;
    sert=sertname;
    sertid=sertid;
    console.log('sert:',sert)
    console.log('用户选的是',sertname)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      serviceTypeIndex: e.detail.value,     
    }) 
  },
  bindDateChange: function(e) {
    var startDate=this.data.start_date;
    sd=startDate;
    console.log('用户选择的日期为', sd)
    this.setData({
      start_date: e.detail.value
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