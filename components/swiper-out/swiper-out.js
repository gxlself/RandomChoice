// components/swiper-out/swiper-out.js
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'isolated'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tapType: {
      type: Number,
      value: 1
    },
    show: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showSwiper: true
  },
  detached: function () {
    this.setData({showSwiper: true})
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swipertap(e) {
      if (this.data.tapType == 1) {
        this.setData({choiceMove: ''})
      } else {
        this.setData({choiceMove: 'gxl-swiper-move'})
      }
    },
    swiperTouchStart(e) {
      this.setData({ leftDistance: e.touches[0].pageX })
    },
    swiperTouchMove(e) {
      this.setData({touchDirection: e.touches[0].pageX - this.data.leftDistance > 0 ? 'right' : 'left'})
    },
    swiperTouchEnd(e) {
      if (this.data.touchDirection == 'left') {
        this.setData({choiceMove: 'gxl-swiper-move'})
      } else {
        this.setData({choiceMove: ''})
      }
      this.setData({touchDirection: null})
    },
    animationEnd() {
      this.setData({showSwiper: false})
      this.triggerEvent('swiperHide')
      let timer = setTimeout(() => {
        this.setData({showSwiper: true, choiceMove: ''})
        clearTimeout(timer)
      }, 10)
    }
  }
})
