var app = getApp()
Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px",
    HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    BAR_HEIGHT: wx.STATUS_BAR_HEIGHT + "px",
    HEIGHT: (wx.SCREEN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT) + 'px'
  },
  onLoad() {
      var that = this
  },
  about(e) {
  },
  onShow(){
  },
  goSetting(){
    
  }
})