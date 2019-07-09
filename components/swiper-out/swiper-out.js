// components/swiper-out/swiper-out.js
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'isolated'
  },
  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    swiperTouchStart(e) {
      this.setData({
        leftDistance: e.touches[0].pageX
      })
    },
    swiperTouchMove(e) {
      this.setData({
        touchDirection: e.touches[0].pageX - this.data.leftDistance > 0 ? 'right' : 'left'
      })
    },
    swiperTouchEnd(e) {
      if (this.data.touchDirection == 'left') {
        this.setData({
          choiceMove: 'gxl-swiper-move'
        })
      } else {
        this.setData({
          choiceMove: ''
        })
      }
      this.setData({
        touchDirection: null
      })
    }
  }
})
