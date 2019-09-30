// components/music/index.js
import {
  classicBeh
} from '../../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager(); //音乐播放对象

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    musicTitle: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false,
  },

  //attached: function (event) {
  attached(event) { // 方法简写
    this._recoverStatus(); //此处调用_recoverStatud 不能this.method  //建议在函数周期中 不写详细的函数
    this._monitorSwitch(); //监控切换
  },

  detached: function (event) {
    //mMgr.pause();
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      mMgr.title = this.data.title;
      //切换图片
      if (!this.data.playing) { //点击是为false onPlay设置成true  
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.musicTitle;
        mMgr.src = this.properties.src; //新版音频管理组件 给src就播放
      } else {
        this.setData({
          playing: false
        })
        mMgr.title = this.properties.musicTitle;
        mMgr.pause();
      }
    },

    _recoverStatus: function () { //恢复播放状态
      if (mMgr.paused) { //getBackgroundAudioManager.paused 当前是否暂停 或停止
        this.setData({
          playing: false
        })
        return;
      }

      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () { //
      mMgr.onPlay(() => { //背景音乐播放事件  //onPlay等监听函数 接收回调
        this._recoverStatus();
      })
      mMgr.onPause(() => { //背景音乐暂停事件 
        this._recoverStatus();
      })
      mMgr.onStop(() => { //背景音乐停止事件 停止后再播放会从头播放
        this._recoverStatus();
      })
      mMgr.onEnded(() => { //背景音乐自然播放停止事件 
        this._recoverStatus();
      })
    }





  }
})