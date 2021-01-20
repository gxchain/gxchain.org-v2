const axios = require('axios')
const xray = require('x-ray')({
	filters: {
		trim: function(value) {
		  return typeof value === 'string' ? value.trim() : value
		},
	},
})
// import iconv from 'iconv-lite'
String.prototype.toUnicode = function() {
	return unescape(this.replace(/&#x(\w+);/g, '%u$1'))
}

export async function axiosGet(opts) {
	// 另一种方案 https://www.luzhongkuan.cn/detail?id=206
	const config = {
		headers: {
			referer: opts.url,
		},
	}
	const notUtf8 = (opts.contentType || 'utf8') != 'utf8'
	if(notUtf8) {
		config.responseType = 'arraybuffer'
	}
	let { data } = await axios.get(opts.url, config)
	if(notUtf8) {
		// data = iconv.decode(Buffer.from(data), opts.contentType)
	}
	return data
}

function filterRayOpt(obj, rawMap) {
	// console.log(obj)
	if(typeof obj != 'object') return
	for(const key in obj) {
		const val = obj[key]
		if(/^=/.test(val)) {
			// 直接取值为字符串 而不是来自返回内容遍历
			rawMap[key] = val.replace(/^=/, '')
			delete obj[key]
		}
	}
}
export async function fetchHtml(opts = {}) {
	if(!opts.url) throw 'url不能为空'
	const { args=[] } = opts
	delete opts.args
	const rayOpt = args.length == 1 ? args[0] : args[1]
	const rawMap = {}
	if(Array.isArray(rayOpt)) {
		filterRayOpt(rayOpt[0], rawMap)
	}
	else if(typeof rayOpt == 'object') {
		for(const key in rayOpt) {
			const val = rayOpt[key]
			if(Array.isArray(val) && typeof val[0] == 'string' && typeof val[1] == 'object') {
				filterRayOpt(val[1], rawMap)
				rayOpt[key] = xray(...val)
			}
		}
	}
	if(args[2] == 'gb2312') {
		opts.contentType = args[2]
	}
	const data = await axiosGet(opts)
	const result = await xray(data, ...args)
	if(Object.keys(rawMap).length) {
		const delRawKeys = []
		result.forEach(row => {
			for(const key in row) {
				let val = row[key]
				const preKey = key + 'Pre'
				const subKey = key + 'Sub'
				if(rawMap[preKey]) {
					val = rawMap[preKey] + val
					delRawKeys.push(preKey)
				}
				if(rawMap[subKey]) {
					val += rawMap[subKey]
					delRawKeys.push(subKey)
				}
				row[key] = val
			}
		})
		for(const row of result) {
			for(const key of delRawKeys) delete rawMap[key]
			Object.assign(row, rawMap)
		}
	}
	return result
}

export async function fetchData(opts) {
	if(!opts.url) throw '请求url不能为空'
	opts.method = opts.method || 'get'
	let { data } = await axios.request(opts)
	if(data.success === false && data.message) {
		throw data.message
	}
	if(typeof data.data == 'object') data = data.data
	if(opts._type == 'adm_list') {
		data = filterAdmList(data, opts)
		if(opts._target == 'fields' && data.rows.length) {
			data = filterAdmFields(data)
		}
	}
	return data
}
