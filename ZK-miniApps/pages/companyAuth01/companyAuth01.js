var app=getApp()
var ipath1=""
var ipath2=""
Page({
  data: {
    photo1:"../../images/51@3x.png",
    photo2:"../../images/51@3x.png"
  },

  uplicense:function(e){
    var that = this
    wx.chooseImage({
      success (res) {
       that.setData({
         photo1:res.tempFilePaths[0]
       })
       wx.uploadFile({
        url: 'https://localhost:8083/uploadFile',
        filePath: that.data.photo1,
        name: 'file',
        success:function(res){
          console.log("res：",res.data);
          ipath1 = res.data,
          console.log("上传成功！")
        },
        fail:function(res){
          console.log("错误：" + res);
        }
      })
      }
    })
  },
  uphouse:function(e){
    var that = this
    wx.chooseImage({
      success (res) {
       that.setData({
         photo2:res.tempFilePaths[0]
       })
       wx.uploadFile({
        url: 'https://localhost:8083/uploadFile',
        filePath: that.data.photo2,
        name: 'file',
        success:function(res){
          console.log("res：",res.data);
          ipath2 = res.data,
          console.log("上传成功！")
        },
        fail:function(res){
          console.log("错误：" + res);
        }
      })
      }
    })
  },
  btnSub:function(options){
    var user_id = app.globalData.user_id
    var company_license = ipath1
    var ownership_certificate = ipath2
    wx.request({
      url: 'https://localhost:8083/addCompanyAuth01',
      data:{
        user_id:user_id,
        company_name:options.detail.value.company_name,
        contact_name:options.detail.value.contact_name,
        id_card:options.detail.value.id_card,
        phone:options.detail.value.phone,
        email:options.detail.value.email,
        address:options.detail.value.address,
        company_license:'/images/'+company_license,
        ownership_certificate:'/images/'+ownership_certificate,
        status:0
      },
      success:function(res){
        console.log(res);
        if(res.data=="ok"){ 
          wx.showToast({
            title: '提交成功',
          })
        }
        wx.switchTab({
          url: '../mine/mine',
        })
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