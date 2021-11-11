// pages/wantedSuccess/wantedSuccess.js
var e = getApp();
Page({
  data: {
    id: "",
    isShare: !1,
    shareImg: ""
  },
  toWantedManagement: function() {
    wx.navigateTo({
        url: "../wanted/wanted"
    });
  },
  toHome:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  getWantedShare: function() {
    var t = this, n = {
        scene: this.data.id,
        page: "pages/wantedMarket/wantedMarket",
        appid: e.globalData.appId
    };
    wx.showLoading({
        title: "生成中"
    }), e.$api.getWantedShare(this.data.id, n).then(function(e) {
        t.setData({
            shareImg: e,
            isShare: !0
        }), wx.hideLoading();
    }, function(e) {
        wx.hideLoading();
    });
  },
  closeShare: function() {
    this.setData({
        isShare: !1
    });
},
  lookImg: function() {
      wx.previewImage({
          current: this.data.shareImg,
          urls: [ this.data.shareImg ]
      });
  },
  share: function() {
      wx.showLoading({
          title: "正在下载...",
          mask: !0
      }), wx.downloadFile({
          url: this.data.shareImg,
          header: {},
          success: function(e) {
              wx.saveImageToPhotosAlbum({
                  filePath: e.tempFilePath,
                  success: function(e) {
                      wx.hideLoading(), wx.showToast({
                          title: "保存成功"
                      });
                  },
                  fail: function(e) {
                      wx.hideLoading(), "saveImageToPhotosAlbum:fail auth deny" == e.errMsg && wx.showModal({
                          title: "提示",
                          content: "获取权限失败,无法使用保存图片或视频到您的相册",
                          showCancel: !0,
                          confirmText: "授权",
                          confirmColor: "#52a2d8",
                          success: function(e) {
                              e.confirm ? wx.openSetting({
                                  success: function(e) {
                                      e.authSetting["scope.writePhotosAlbum"] || wx.showModal({
                                          title: "提示",
                                          content: "获取权限失败,无法使用保存图片或视频到您的相册",
                                          showCancel: !1,
                                          success: function(e) {}
                                      });
                                  },
                                  fail: function() {}
                              }) : e.cancel;
                          },
                          fail: function() {}
                      });
                  },
                  complete: function(e) {}
              });
          },
          fail: function(e) {
              wx.showToast({
                  icon: "none",
                  title: e.errMsg
              }), wx.hideLoading();
          }
      });
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