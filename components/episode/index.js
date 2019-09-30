// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,

      //每次属性值的改变都会调用 obverse ！！！！！小心String改变！内存泄漏！！！
      //  当index属性值被改变 会调用obverse
      //监听 index是否变化
      observer: function (newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : oldVal;
        this.setData({
          _index: val //将新合成(带0)的写入_index
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //year: Number,   这种写法 year month视为函数
    //month: String   //data数据和 properties作为合集
    //data properties 内属性不可重名！ 上覆盖下！
    year: 0,
    month: '',
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    _index: ''
  },

  attached: function () {
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();

    this.setData({
      //year: year, 
      year, //ESlint 简写规则
      month: this.data.months[month]
    })
  },



  /**
   * 组件的方法列表
   */
  methods: {

  }
})