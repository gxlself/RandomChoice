Component({
  options: {
    multipleSlots: true
  },
  properties: {

  },
  attached() {

  },
  data: {
    
  },
  methods: {
    tapToast() {
      this.triggerEvent('taptoast')
    }
  }
})
