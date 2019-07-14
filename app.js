const system = require('./utils/system.js')
App({
  onLaunch: function() {
    system.attachInfo()
  },
  globalData: {
    openId: '',
    choiceCount: -1,         // 全局可访问的choiceList个数 监听变化进行请求
  }
})
