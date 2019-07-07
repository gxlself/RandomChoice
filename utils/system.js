function attachInfo() {
  var res = wx.getSystemInfoSync();
  console.log(res)
  wx.SCREEN_WIDTH = res.screenWidth;
  wx.SCREEN_HEIGHT = res.screenHeight;
  wx.WIN_WIDTH = res.windowWidth;
  wx.WIN_HEIGHT = res.windowHeight;
  wx.IS_IOS = /ios/i.test(res.system);
  wx.IS_ANDROID = /android/i.test(res.system);
  wx.STATUS_BAR_HEIGHT = res.statusBarHeight;
  wx.DEFAULT_HEADER_HEIGHT = 46; // res.screenHeight - res.windowHeight - res.statusBarHeight
  wx.DEFAULT_CONTENT_HEIGHT = res.screenHeight - res.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT;
  wx.IS_APP = true;
}
module.exports = {
  attachInfo: attachInfo
}