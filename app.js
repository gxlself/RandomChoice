const system = require('.//utils/system.js')
App({
  onLaunch: function() {
    system.attachInfo();
  },
  globalData: {
    test: 123
  }
})
