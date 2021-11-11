var app=getApp()
var ipath1=""
var ipath2=""
var ipath3=""
var ipath4=""
var ipath5=""
var cl=""
var clid=""
Page({
  data: {
    photo1:"../../images/51@3x.png",
    photo2:"../../images/51@3x.png",
    photos: "../../images/51@3x.png",
    photos2: "../../images/51@3x.png",
    photos3: "../../images/51@3x.png",
    classArr:[{cl:'请选择'},{id:'1',cl:'个人'},{id:'2',cl:'企业'}],
    classIndex:0
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
  upproduction:function(e){
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
 //上传身份证
  touchphoto: function (e) {
    var that = this
    var no = e.currentTarget.id;
    if (no == "1") {
      wx.chooseImage({
        success (res) {
          that.setData({
            photos:res.tempFilePaths[0]
          })
          wx.uploadFile({
           url: 'https://localhost:8083/uploadFile',
           filePath: that.data.photos,
           name: 'file',
           success:function(res){
             console.log("res：",res.data);
             ipath3 = res.data,
             console.log("上传成功！")
           },
           fail:function(res){
             console.log("错误：" + res);
           }
          })
         }
      })
    } else if (no == "2") {
      wx.chooseImage({
        success (res) {
          that.setData({
            photos2:res.tempFilePaths[0]
          })
          wx.uploadFile({
           url: 'https://localhost:8083/uploadFile',
           filePath: that.data.photos2,
           name: 'file',
           success:function(res){
             console.log("res：",res.data);
             ipath4 = res.data,
             console.log("上传成功！")
           },
           fail:function(res){
             console.log("错误：" + res);
           }
          })
         }
      })
    } else if (no == "3") {
      wx.chooseImage({
        success (res) {
          that.setData({
            photos3:res.tempFilePaths[0]
          })
          wx.uploadFile({
           url: 'https://localhost:8083/uploadFile',
           filePath: that.data.photos3,
           name: 'file',
           success:function(res){
             console.log("res：",res.data);
             ipath5 = res.data,
             console.log("上传成功！")
           },
           fail:function(res){
             console.log("错误：" + res);
           }
          })
         }
      })
  }
  },
  addCompanyauth:function(options){
    var user_id = app.globalData.user_id
    var business_license = ipath1
    var foods_license = ipath2
    var id_card_positive = ipath3
    var id_card_back = ipath4
    var id_card_holding = ipath5
    var customer_class = cl
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
    var create_date = Y + "-" + M + "-" + D + " " + hour + ":" +  minute + ":" + second
    console.log("完成时间0：",create_date);
    wx.request({
      url: 'https://localhost:8083/addCompanyAuth',
      data:{
        user_id:user_id,
        company_name:options.detail.value.company_name,
        contact_name:options.detail.value.contact_name,
        customer_class:customer_class,
        id_card:options.detail.value.id_card,
        phone:options.detail.value.phone,
        email:options.detail.value.email,
        address:options.detail.value.address,
        business_license:'/images/'+business_license,
        foods_license:'/images/'+foods_license,
        id_card_positive:'/images/'+id_card_positive,
        id_card_back:'/images/'+id_card_back,
        id_card_holding:'/images/'+id_card_holding,
        create_date:create_date,
        status:0,
        is_valid:1
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
  bindPickerClass:function(e){
    var cus_class=this.data.classArr[e.detail.value].cl;
    var cusid=this.data.classArr[e.detail.value].id;
    cl=cus_class;
    clid=cusid;
    console.log('cl:',cl)
    console.log('用户选的是', cus_class)
    this.setData({
      classIndex: e.detail.value,     
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var classIndex = this.data.classIndex
    cl = this.data.classArr[classIndex].cl
    clid = this.data.classArr[classIndex].id
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