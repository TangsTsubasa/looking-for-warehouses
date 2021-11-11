// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toWanted:function(){
    wx.navigateTo({
      url: '../wanted/wanted',
    })
  },
  toWareManage:function(){
    wx.navigateTo({
      url: '../wareManage/wareManage',
    })
  },
  changeRole:function(){
   wx.navigateTo({
    url: '../mine01/mine01',
    })
  },
  gotoAuth:function(){
   wx.navigateTo({
     url: '../companyAuth/companyAuth',
   })
  },
  gotoAuth01:function(){
    wx.navigateTo({
      url: '../companyAuth01/companyAuth01',
    })
  },
  toCollection:function(){
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  toOrderManage:function(){
    wx.navigateTo({
      url: '../orderManage/orderManage',
    })
  },
  record:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  jumpFeedBack:function(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  exit:function(){
    wx.reLaunch({
      url: '../login/login'
    })
    app.globalData.user_id = ""
    app.globalData.userName = "登录/注册",
    app.globalData.phone = "",
    app.globalData.role = "2",
    app.globalData.auth_id = ""
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
    var that = this
    console.log("app.globalData.userName:",app.globalData.userName)
    var uName=app.globalData.userName
    if (uName != null || uName != '' || uName != undefined) {
      that.setData({
        userName: uName,
      });
    }
    var role=app.globalData.role
    if(role==0){
      wx.request({
        url: 'https://localhost:8083/getStatusById?user_id=' + app.globalData.user_id,
        success:function(res){
          console.log("认证状态0：",res);
          var status = res.data.status
          that.setData({
            status:status
          })
        }
      })
    }else if(role==1){
      wx.request({
        url: 'https://localhost:8083/getStatusById01?user_id=' + app.globalData.user_id,
        success:function(res){
          console.log("认证状态1：",res.data);
          var status = res.data.status
          that.setData({
              status:status
          })
          console.log(status)
        }
      })
    }else{
      console.log('未登录')
      var status = 3
      that.setData({
        status:status
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