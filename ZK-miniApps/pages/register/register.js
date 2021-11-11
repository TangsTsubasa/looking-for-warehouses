// pages/register/register.js
var app=getApp()
var rol=""
var roid=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleArr:[{ro:'请选择角色'},{id:'1',ro:'出租方'},{id:'0',ro:'租赁方'}],
    roleIndex:0
  },

  bindRole:function(e){
    var role=this.data.roleArr[e.detail.value].ro;
    var rid=this.data.roleArr[e.detail.value].id;
    rol=role;
    roid=rid;
    console.log('rol:',rol)
    //下面重新赋值必须有，页面显示的信息才会改为刚刚选中的值
    this.setData({
      roleIndex: e.detail.value,
    }) 
  },
  register:function(options){
    var role = roid
    wx.request({
      url: 'https://localhost:8083/register',
      data:{
        userName:options.detail.value.userName,
        password:options.detail.value.password,
        phone:options.detail.value.phone,
        role:role
      },
      success(res){
        if(res.data=="ok"){
          wx.showToast({
            title: '注册成功！'
          }),
          wx.navigateTo({
            url: '../login/login',
          })
        }
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