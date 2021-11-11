// pages/orderDetail/orderDetail.js
var order_id=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options：",options)
    wx.request({
      url: 'https://localhost:8083/getOrderTableByOrderId?order_id=' + options.order_id,
      success:(res)=>{
        console.log("获取到的全部数据00：",res.data);
        var ct = res.data.create_time
        var complete_time = res.data.complete_time
        var cancel_time = res.data.cancel_time
        var n = ct;
        var date = new Date(n);
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //时
        var h = date.getHours();
        //分
        var m = date.getMinutes();
        //秒
        var s = date.getSeconds();
        var create_time = Y + "-" + M + "-" + D + " " + h + ":" +  m + ":" + s
        console.log("当前时间：",create_time);
        this.setData({
            OrderInfo:res.data,
            create_time:create_time,
            complete_time:complete_time,
            cancel_time:cancel_time
        })
    }
    }),
    this.setData({
      order_id:options.order_id
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