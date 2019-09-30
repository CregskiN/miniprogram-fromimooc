//请求地址的基地址 和 appkey成为配置项
//const 表示固定不变的常量 类似JAVA的const
const config = {
  api_base_url: 'http://bl.7yue.pro/v1/',
  appkey: 'AbhC31IG7ruCDp57'
};

/* let fun1 = function(){

} */


export {
  config
};

//export有三种导出写法  引入写法见http.js
//1. 写在最下方 
//2. 写在要导出的模块前
//3. 写一个导出方法 let fun1 = function(){}

/* exprot {config,fun1} */ //导出config 和 fun1 
//可用 config as config1 给输出的config改名  其他地方import{config1}