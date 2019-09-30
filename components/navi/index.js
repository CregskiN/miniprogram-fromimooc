// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: 'images/triangle@left.png',
    disLeftSrc: 'images/triangle.dis@left.png',
    rightSrc: 'images/triangle@right.png',
    disRightSrc: 'images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 禁用事件的技巧 ！ ！！  让page 监听不到left or right 事件
    onLeft: function (event) {
      if (!this.properties.latest) {
        //组件内 this.triggerEvent 提供给page 中 bind:捕捉 的事件   
        //bind:tap -> onLeft ->传给page left事件 -> page bind监听left事件
        this.triggerEvent('left', {}, {}) //'页面内捕捉事件名' {} {}
      }
    },

    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})