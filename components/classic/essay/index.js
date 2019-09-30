import {classicBeh} from '../../classic-beh.js'

// components/essay/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh], //可以继承多个behaviors:[a,b,c] 多继承
  //在父组件中 以[a,b,c] 中的c为准
  //子组件中的 properties data method 等 都以子组件为准
  properties: {

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

  }
})
