// pages/common/radio/radio.js
Page({
  data: {
      items: [],
      index: "",
      type: "",
      isId: !1
  },
  onLoad: function(t) {
      var a = [];
      t.idx && (a = JSON.parse(t.idx)), t.type && this.setData({
          items: wx.getStorageSync("radioList"),
          type: t.type
      }), t.isId && (this.data.isId = !0), this.setData({
          items: wx.getStorageSync("radioList"),
          idx: a,
          isId: this.data.isId
      });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  radioChange: function(t) {
      this.data.items.forEach(function(t) {
          t.checked = !1;
      });
      var a = t.currentTarget.dataset.index;
      this.data.items[a].checked = !0, this.setData({
          items: this.data.items,
          index: a
      });
  },
  sureChoose: function() {
      var t = this, a = getCurrentPages(), i = a[a.length - 2];
      if (this.data.isId) this.data.items.forEach(function(a) {
          a.checked && (i.data.body.contact_identity = a.id, i.setData({
              body: i.data.body,
              identityList: t.data.items
          }), wx.navigateBack({
              delta: 1
          }));
      }); else {
          if (0 != this.data.idx.length) return i.selectData(this.data.items, this.data.idx), 
          void wx.navigateBack();
          i.changeRadioData(this.data.items, this.data.index, this.data.type), wx.navigateBack();
      }
  }
});