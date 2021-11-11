// pages/offer/offer.js
var app = getApp()
var oprice = ""
var wsn = ""
var ware_id=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = app.globalData.user_id
    var city_name = options.city_name
    var sn = options.sn
    wsn = sn
    console.log("sn:",sn)
    wx.request({
      url: 'https://localhost:8083/getSbsWareHouse?user_id=' + user_id + '&city_name=' + city_name,
      success:(res)=>{
        console.log("res.data:00",res.data)
        this.setData({
          warehouseList:res.data
        })
      }
    })
  },
  modalinput: function (e) {
    var wid = e.currentTarget.dataset.wid
    ware_id = wid
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  setValue: function (e) {
    oprice = e.detail.value
    this.setData({
      offer_price: e.detail.value
    })
  },
  confirm:function(e){
    var user_id = app.globalData.user_id
    var offer_price = oprice
    var wid = ware_id
    var sn = wsn
    console.log("00wid:",wid)
    wx.request({
      url: 'https://localhost:8083/updateOffer?sn=' + sn + '&user_id=' + user_id + '&wid=' + wid + '&offer_price=' + offer_price,
    })
    wx.showToast({
      title: '报价成功！',
      duration: 2000,
      complete: () => {
        setTimeout(
          ()=> {
            wx.navigateBack({
              delta: 1,
            })
          },
          2000
        )
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