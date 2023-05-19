class Request {
	method;
	header;
	timeout;
	dataType;
	url;
	data;
	constructor(options = {}) {
		this.baseUrl = options.baseUrl || ''
		// 请求的 url 地址
		this.url = options.url || ''
		// 请求方式
		this.method = 'GET'
		// 请求的参数对象
		this.data = null
		// header 请求头
		this.header = {
			'content-type': "application / x - www - form - urlencoded"
		}
		this.timeout = timeout || 5000;
		this.dataType = "json"
	}
	get(url, data) {
		this.method = 'GET'
		this.url = this.baseUrl + url
		this.data = data
		return this._();
	}
	post(url, data = {}) {
		this.method = 'POST'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	put(url, data = {}) {
		this.method = 'PUT'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	delete(url, data = {}) {
		this.method = 'DELETE'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	_() {
		// 发起请求
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url,
				method: this.method,
				data: this.data,
				header: this.header,
				timeout: this.timeout,
				dataType: this.dataType,
				success(res){
					resolve(res)
				},
				fail(err){
					reject(err)
				}
			})
		})
	}
}
export const http=new Request();