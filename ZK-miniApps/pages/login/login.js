// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  login:function(options){
    wx.request({
      url: 'https://localhost:8083/login',
      data:{
          userName:options.detail.value.userName,
          password:options.detail.value.password
      },
      success:function(res){
         if(res.data=='ok'){
           wx.showToast({
             title: '登录成功',
           }),
          app.globalData.userName=options.detail.value.userName,
          wx.request({
            url: 'https://localhost:8083/showUserByName?userName=' + app.globalData.userName,
            success:function(e){
              console.log("根据用户名获取到的数据：",e.data)
              app.globalData.user_id = e.data.user_id
              app.globalData.phone = e.data.phone
              app.globalData.role = e.data.role
            }
          }),
          wx.switchTab({
            url: '../index/index',
          })
         }
         else{
           wx.showToast({
             title: '账号或密码错误',
           })
         }
        }
      })
     },
     toRegister:function(){
      wx.navigateTo({
        url: '../register/register',
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