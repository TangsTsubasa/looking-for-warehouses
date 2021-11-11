// pages/publishWareHouse/publishWareHouse.js
var app = getApp();
var iden="";
var idenid="";
var sts="";
var stsid="";
var serts="";
var sertsid="";
var pro="";
var ci="";
var dis="";
var latitude="";
var longitude="";

Page({
  data: {
    identityArr: [ {iden:'请选择'},{id:'1',iden:'个人'},{id:'2',iden:'企业'} ],
    identityIndex:0,
    region: ['请选择','',''],
    customItem: '全部',
    storageTypesArr: [{sts:'请选择'},{id:'1',sts:'冷库'},{id:'2',sts:'恒温'}],
    storageTypesIndex:0,
    serviceTypesArr: [{serts:'请选择'},{id:'1',serts:'冷库租赁'},{id:'2',serts:'仓库租赁'}],
    serviceTypesIndex:0,
    latitude:"",
    longitude:"",
    address:"请输入",
    index:0
  },
  onLoad: function (options) {
    var identityIndex=this.data.identityIndex
    var storageTypesIndex=this.data.storageTypesIndex
    var serviceTypesIndex=this.data.serviceTypesIndex
    var latitude=this.data.latitude
    var longitude=this.data.longitude
    var address=this.data.address
    iden=this.data.identityArr[identityIndex].iden
    idenid=this.data.identityArr[identityIndex].id
    // sts=this.data.storageTypesArr[storageTypesIndex].sts
    // stsid=this.storageTypesArr[storageTypesIndex].id
    serts=this.data.serviceTypesArr[serviceTypesIndex].serts
    sertsid=this.data.serviceTypesArr[serviceTypesIndex].id
    console.log("onloadOptions:",options)
    // this.setData({
    //   latitude:latitude,
    //   longitude:longitude,
    //   address:address
    // })
  },

  addWareHouse:function(options){
    var contact_identity=iden
    var storage_types=sts
    var service_types=serts
    var province_name=pro
    var city_name=ci
    var district_name=dis
    var latitude=this.data.latitude
    var longitude=this.data.longitude
    var address=this.data.address
    var user_id=app.globalData.user_id
    console.log("联系人身份："+contact_identity)
    console.log("存储类型："+storage_types)
    console.log("服务方式："+service_types)
    console.log("省："+province_name)
    console.log("市："+city_name)
    console.log("区："+district_name)
    console.log("经纬度："+latitude+longitude)
    console.log("地址："+address)
    console.log("添加的options：",options)
    if(user_id!=0){
      wx.request({
        url: 'https://localhost:8083/addWareHouse',
        data:{
          contact_identity:contact_identity,
          company_name:options.detail.value.company_name,
          contact_name:options.detail.value.contact_name,
          contact_phone:options.detail.value.contact_phone,
          contact_email:options.detail.value.contact_email,
          ware_name:options.detail.value.ware_name,
          province_name:province_name,
          city_name:city_name,
          district_name:district_name,
          address:this.data.address,
          latitude:this.data.latitude,
          longitude:this.data.longitude,
          price:options.detail.value.price,
          start_area:options.detail.value.start_area,
          available_area:options.detail.value.available_area,
          total_area:options.detail.value.total_area,
          storage_types:storage_types,
          service_types:service_types
        }, 
        success:function(res){
          console.log("所有的值：",res);
          if(res.data=="ok"){
            wx.showToast({
              title: '添加成功！'
            }),
            wx.navigateTo({
              url: '../wareSuccess/wareSuccess',
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
  bindPickerIdentity: function(e) {
    var iname=this.data.identityArr[e.detail.value].iden;
    var iid=this.data.identityArr[e.detail.value].id
    iden=iname;
    idenid=iid;
    console.log('用户选的是:',iname)
    this.setData({
      identityIndex: e.detail.value,     
    }) 
  },
  bindPickerStorageTypes: function (e) {
    var sname=this.data.storageTypesArr[e.detail.value].sts;
    var sid=this.data.storageTypesArr[e.detail.value].id;
    sts=sname;
    stsid=sid;
    console.log('sts:',sts)
    console.log('用户选的是', sname)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      storageTypesIndex: e.detail.value,     
    }) 
  },
  bindPickerServiceTypes: function (e) {
    var sertsname=this.data.serviceTypesArr[e.detail.value].serts;
    var sertsid=this.data.serviceTypesArr[e.detail.value].id;
    serts=sertsname;
    sertsid=sertsid;
    console.log('serts:',serts)
    console.log('用户选的是',sertsname)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      serviceTypesIndex: e.detail.value,     
    }) 
  },
  toMap:function(e){
    wx.navigateTo({
      url: '/pages/common/map/map',
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