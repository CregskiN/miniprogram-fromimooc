import {
  config
} from '../config.js' //  用import导入的路径 必须为相对路径

const tips = {
  0: 'OK, 成功',
  1: '抱歉，出现了一个错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  //1007 : '请求的url错误'

  //HTTP响应状态码
  200: 'OK请求成功',
  201: 'CREATED	创建成功',
  202: 'ACCEPTED	更新成功',
  204: 'NO CONTENT	删除成功',
  301: 'MOVED PERMANENTLY	永久重定向',
  400: 'BAD REQUEST	请求包含不支持的参数',
  401: 'UNAUTHORIZED	未授权',
  403: 'FORBIDDEN	被禁止访问',
  404: 'NOT FOUND	请求的资源不存在',
  413: 'REQUIRED LENGTH TOO LARGE	上传的File体积太大',
  500: 'INTERNAL SERVER ERROR	内部错误',

  //点赞类型
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',

  //期刊类型
  3000: '该期内容不存在'
};


//对request 进行封装 封装成一个通用方法
class HTTP { //定义HTTP类
  request(params) { //定义request的方法体
    // url data method
    if (!params.method) { //***如果 params.method不存在！！！ */
      params.method = "GET"
    }

    //发送请求
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },

      //若请求成功 (成功 包括 1.成功得到url的资源 2.未得到url资源但 得到响应码)
      success: (res) => {

        //res.statusCode 返回的是三位数值响应码 .startsWith是对字符串操作
        //所以 需要对code转化为字符串 .toString
        let code = res.statusCode.toString();

        //ES6 新特性
        //  .startsWith('字符') 判断对象以 ‘字符’ 开始
        //  . endWith('结尾字符')

        if (code.startsWith('2')) { //若响应码开头 为2
          //判断回调是否为空 && 执行回调 ==> 对未使用回调的情况适配
          params.success && params.success(res.data); //*最终回调接口     
        } else {
          let error_code = res.data.err_code;
          this._show_error(error_code);
        }
        
      },
      //若请求失败 (失败 包括  1.未与服务器建立连接)
      fail: (err) => {
        wx.showToast({
          title: '请求失败'
        })
      }

    })
  }


  _show_error(error_code) { //标记为一个私有方法 不能被其他调用
    if (!error_code) { //如果不存在error_code
      error_code = 1; //给error_code  默认值
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 1500
    })

  }
}


export {
  HTTP
};
//暴露 HTTP接口类