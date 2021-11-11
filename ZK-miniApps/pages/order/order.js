// pages/dingdan/dingdan.js
var app = getApp()
var warea = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    recordMain: [
      {title: "全部"},
      {title: "待付款"},
      {title: "待确认"}, 
      {title: "已完成"},
      {title: "已取消"},
    ],
    currentTab: 0,
    navScrollLeft: 0,
    winWidth: 0,
    winHeight: 0, 
    complete_time:'',
    cancel_time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    var role = app.globalData.role
    that.setData({
      role:role
    })
    /** 获取系统信息*/
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
  },
   // 滑动事件
  // 点击标题切换当前页时改变样式
  switchNav:function(e) {
    console.log("cur",e.currentTarget.dataset.current)
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  // 滚动切换标签样式 
  switchTab: function(e) {
    console.log("e",e) 
    var that = this; 
    console.log("e.detail.current:",e.detail.current) 
    that.setData({
      currentTab: e.detail.current
    }); 

    wx.request({
      url: 'https://localhost:8083/getOrderByIdSta?user_id=' + app.globalData.user_id + '&status=' + e.detail.current,
      success:function(res){
          console.log("99999:",res.data);
          that.setData({
              orderList:res.data
          })
      }
    })

    if (e.detail.current == 0) {
      console.log(0)
      wx.request({
        url: 'https://localhost:8083/getOrderById?user_id=' + app.globalData.user_id,
        success:function(res){
          console.log("77777",res.data);
          that.setData({
            orderList:res.data
          }) 
        }
      })
    } 
    else if (e.detail.current == 1) {
      console.log(11)
    } 
    else if (e.detail.current == 2) {
      console.log(2222)
    } 
    else if (e.detail.current == 3) {
      console.log(33333)
    }  
    else if (e.detail.current == 4) {
      console.log(44444444)
    }
  },

  toDetail:function(e){
    var wid = e.currentTarget.dataset.wid;
    wx.navigateTo({
      url: '/pages/warehouseDetail/warehouseDetail?wid=' + wid,
    })
  },

  toOrderDetail:function(e){
    console.log("我要传入的值：",e);
    var order_id = e.currentTarget.dataset.id;
    console.log("order_id:",order_id)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?order_id=' + order_id,
    })
  },

  confirm:function(e){
    var that = this
    var order_id = e.currentTarget.dataset.oid;
    var timestamp = Date.parse(new Date())
    var date = new Date(timestamp);
    //获取年份
    var Y =date.getFullYear();
    //获取月份
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("完成时间：" + Y + '年'  + M + '月' + D + '日' );
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var complete_time = Y + "-" + M + "-" + D + " " + hour + ":" +  minute + ":" + second
    console.log("完成时间0：",complete_time);
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'交易完成',
      content:'确认交易完成？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://localhost:8083/updateStatus?order_id=' + order_id + '&status=' + 3,
          }),
          wx.request({
            url: 'https://localhost:8083/getOrderTableByOrderId?order_id=' + order_id,
            success:function(res){
              var wid = res.data.wid
              warea = res.data.area
              wx.request({
                url: 'https://localhost:8083/showWareHouseById?wid=' + wid,
                success:function(r){
                  console.log("113355:",r.data)
                  var avaArea = r.data.available_area
                  var area = warea
                  var available_area = avaArea + area
                  wx.request({
                    url: 'https://localhost:8083/updateAvailableArea?available_area=' + available_area + '&wid=' + wid,
                    success:function(e){
                      console.log("!!!!")
                    }
                  })
                }
              })
            }
          })
          wx.request({
            url: 'https://localhost:8083/addCompleteTime?order_id=' + order_id,
            data:{
              complete_time:complete_time
            },
            success:function(res){
              console.log("resssssssss",res);
              if(res.data=="ok"){
                console.log("添加时间成功");
              }
              wx.request({
                url: 'https://localhost:8083/getOrderByIdSta?user_id=' + app.globalData.user_id + '&status=' + 2,
                success:function(res){
                    console.log(res.data);
                    that.setData({
                        orderList:res.data
                    })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  cancel:function(e){
    var that = this
    var order_id = e.currentTarget.dataset.oid
    var status = e.currentTarget.dataset.cb
    var timestamp = Date.parse(new Date())
    var date = new Date(timestamp);
    //获取年份
    var Y =date.getFullYear();
    //获取月份
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("取消时间：" + Y + '年'  + M + '月' + D + '日' );
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var cancel_time = Y + "-" + M + "-" + D + " " + hour + ":" +  minute + ":" + second
    console.log("取消时间0：",cancel_time);
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'取消交易',
      content:'确认取消？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://localhost:8083/updateStatus?order_id=' + order_id + '&status=' + 4,
          }),
          wx.request({
            url: 'https://localhost:8083/getOrderTableByOrderId?order_id=' + order_id,
            success:function(res){
              var wid = res.data.wid
              warea = res.data.area
              wx.request({
                url: 'https://localhost:8083/showWareHouseById?wid=' + wid,
                success:function(r){
                  console.log("113355:",r.data)
                  var avaArea = r.data.available_area
                  var area = warea
                  var available_area = avaArea + area
                  wx.request({
                    url: 'https://localhost:8083/updateAvailableArea?available_area=' + available_area + '&wid=' + wid,
                    success:function(e){
                      console.log("!!!!")
                    }
                  })
                }
              })
            }
          })
          wx.request({
            url: 'https://localhost:8083/addCancelTime?order_id=' + order_id,
            data:{
              cancel_time:cancel_time
            },
            success:function(res){
              console.log(res);
              if(res.data=="ok"){
                console.log("取消时间成功");
              }
              wx.request({
                url: 'https://localhost:8083/getOrderByIdSta?user_id=' + app.globalData.user_id + '&status=' + status,
                success:function(res){
                  console.log(res.data);
                  that.setData({
                    orderList:res.data
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  toCreate:function(e){
    var wid = e.currentTarget.dataset.wid
    wx.navigateTo({
      url: '../warehouseDetail/warehouseDetail?wid=' + wid,
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
    var user_id = app.globalData.user_id
    var that=this;
    if(user_id!=0){
      wx.request({
        url: 'https://localhost:8083/getOrderById?user_id=' + user_id,
        success:function(res){
          console.log("aaaaa",res.data);
          that.setData({
            orderList:res.data,
            user_id:app.globalData.user_id
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