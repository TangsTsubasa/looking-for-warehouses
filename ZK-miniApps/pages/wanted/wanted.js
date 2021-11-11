// pages/wanted/wanted.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var role = app.globalData.role
    this.setData({
      role:role
    })
  },

  toPublish:function(){
    wx.navigateTo({
      url: '../publishWanted/publishWanted',
    })
  },
  toCheckOffer:function(e){
    var sn = e.currentTarget.dataset.sn
    wx.navigateTo({
      url: '../checkOffer/checkOffer?sn=' + sn
    })
  },
  del:function(e){
    var that=this
    var sn = e.currentTarget.dataset.sn
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'删除需求',
      content:'确认删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://localhost:8083/delWantedMarket?sn=' + sn,
          })
          that.onShow();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    var that=this
    var user_id = app.globalData.user_id
    wx.request({
      url: 'https://localhost:8083/getSbsWantedMarket?user_id=' + user_id,
      success:function(res){
        console.log(res.data);
        that.setData({
          wantedList:res.data
        })
      }
    })
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