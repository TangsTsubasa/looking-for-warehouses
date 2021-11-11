
// const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos1: "../../images/add_img.png",
    photos2: "../../images/add_img.png",
    photos3: "../../images/add_img.png",
    
  },
 //上传身份证
 chooseImage:function(){
  var that=this;
  wx.chooseImage({
   
   success:function(res){
    
     that.setData({
      photos1:res.tempFilePaths[0]
     })
   }
  })

},
uploadImage:function(){
  console.log("上传！")
  var that=this;
  wx.uploadFile({

    filePath: that.data.photos1,
    name: 'file',
    url: 'https://localhost:8083/idcardUpload',
    success:function(res){
      console.log("--------->"+res.data);
     that.setData({
       photoNew:res.data
     })
    },
    fail:function(res){
      console.log("错误："+res)
    }
  })

},

  addPersonauth:function(options){
   wx.request({
     url: 'https://localhost:8083/addPersonauth',
     data:{
       name:options.detail.value.name,
       phone:options.detail.value.phone,
       email:options.detail.value.email,
       address:options.detail.value.address
     },
     success:function(res){
      console.log(res);
      if(res.data=='ok'){
        wx.showToast({
          title: '注册成功',
        })
      }
    }
   })
  
  },
  


  

   //把图片存到users集合表
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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