// pages/collection/collection.js
var app = getApp()
var sta=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:[]
  },

  toDetail:function(e){
    var wid = e.currentTarget.dataset.wid;
    wx.navigateTo({
      url: '../warehouseDetail/warehouseDetail?wid=' + wid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var role = app.globalData.role
    this.setData({
      role:role
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
    if(user_id!=0){
      wx.request({
        url: 'https://localhost:8083/getAllCollect?user_id=' + user_id,
        success:function(res){
            console.log("res.data",res.data);
            that.setData({
                collectList:res.data,
                user_id:user_id
            })
        }
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