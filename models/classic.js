import {
	HTTP
} from '../util/http.js'

//直接用继承  => 不用实例化
//class 写法 为ESlint推荐写法
class ClassicModel extends HTTP {

	getLast(sCallBack) {
		this.request({
			url: 'classic/latest',
			success: (res) => {
				//console.log(sCallBack);
				sCallBack(res); //执行回调函数 传入res
				this._setLatestIndex(res.index);
				let key = this._getKey(res.index);
				wx.setStorageSync(key, res);
			}
		});
	}

	getClassic(index, nextOrPrevious, sCallback) {
		//在缓存中寻找数据 or API请求并写入 key 对应的缓存中
		//key 确定key
		/* if (nextOrPrevious == 'next' && index == 1)
			return; */
		let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
		let classicData = wx.getStorageSync(key);

		if (!classicData) {
			this.request({
				//ES6模板字符串
				//url:`classic/${index}/${nextOrPrevious}`,
				url: 'classic/' + index + '/' + nextOrPrevious,
				success: (res) => {
					wx.setStorageSync(
						this._getKey(res.index), res
					)
					sCallback(res);
				}
			})
		} else {
			sCallback(classicData); //？？？？？？？？？？？？
		}
	}


	getMyFavor(success) {
		const params = {
			url: 'classic/favor',
			success: success
		}
		this.request(params)
	}


	isFirst(index) {
		return index == 1 ? true : false;
	}


	isLatest(index) {
		let latestIndex = this._getLatestIndex();
		return latestIndex == index ? true : false;
	}


	_setLatestIndex(index) { //wx.setStorageSync(key,value) 将最新一期的index 放入本地缓存 latest 内容为 index 
		wx.setStorageSync('latest', index);
	}

	_getLatestIndex() {
		let index = wx.getStorageSync('latest');
		return index;
	}

	_getKey(index) { //key = classic- + index
		let key = 'classic-' + index;
		return key;
	}







}


export {
	ClassicModel
};