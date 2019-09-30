// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true, // 启用 多插槽slot
  },

  externalClasses:['tag-class'],//外部样式 给标签设置class= " tag-class"

  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',
      {
        text:this.properties.text
      })
    }
  }
}) 