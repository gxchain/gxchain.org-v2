
export default {
	async getNewsRow({ commit }, params) {
		const { data } = await this.$axios.get('https://tablo.fun/api/v1/media/gxchain/news/'+params.id)
		commit('setData', {
			newsRow: data,
		})
	},
	async getNodeList({ commit }) {
		const { data } = await this.$axios.get('https://block.gxb.io/api/trustnode/candidates')
		data.sort((a, b) => {
			return b.votes - a.votes
		})
		// console.log(data[0])
		let nodeList = data.slice(0, 21).map(it => {
			const { url } = it.witness_info || {}
			return {
				logo: 'https://gxchain.oss-cn-shanghai.aliyuncs.com/org/img/02f61a452550efe364af0dd5c65b865b.svg',
				name: it.account,
				...it.extra,
				votes: it.votes,
				url,
			}
		})
		commit('setData', {
			nodeList,
		})
	},
	async getTransData({ commit }, opts = {}) {
		const params = {}
		const { data } = await this.$axios.get('https://wallet.gxb.io/statistics/gxchain/transaction/num')
		params.transNum = data.num
		if((opts.times || 0)%5 == 0) {
			const { data } = await this.$axios.post('https://node1.gxb.io/rpc', {
				"jsonrpc": "2.0",
				"method": "call",
				"params": [0, "get_account_count", []],
				"id": 1
			})
			params.accountNum = data.result
		}
		commit('setData', params)
	},
	async getNews({ commit, state }, opts = {}) {
		let { lang, newsPage, newsList } = state
		if(opts.more) newsPage += 1
		else if(opts.page) newsPage = opts.page
		else newsPage = 1
		const body = {
			lang,
			type: 'report',
			_page: newsPage,
			_limit: 10,
		}
		if(opts.s) {
			body.scon = `%${opts.s}%`
		}
		const { data } = await this.$axios.post('/data/list/news', body)
		if(opts.s) {
			// const reg = new RegExp(opts.s, 'g')
			const rep = `<b class="color-1">${opts.s}</b>`
			data.rows.forEach(it => {
				it.desc = it.desc.replace(opts.s, rep)
				it.title = it.title.replace(opts.s, rep)
			})
		}
		if(newsPage == 1) newsList = data.rows
		else newsList = newsList.concat(data.rows)
		commit('setData', {
			newsPage,
			newsList,
		})
		return data.rows.length
	},
	async getWeekly({ commit, state }) {
		let { lang } = state
		if(lang != 'ch') lang = 'en'
		const { data: { rows: sideNews } } = await this.$axios.post('/data/list/news', {
			lang,
			type: 'latest',
		})
		const { data: { rows: weekRows } } = await this.$axios.post('/data/list/weekly')
		commit('setData', {
			sideNews,
			weekRows,
		})
	},
	async initData({ commit }, opts = {}) {
		if(!opts.req) return
		let { headers, originalUrl: route } = opts.req
		if(/institution/.test(route)) route = '/institution'
		const { host } = headers
		// console.log(host)
		let lang = (/(^\w{2})\./.exec(host) || [])[1] || 'ch'
		// lang = 'kr'
		const { data: { rows } } = await this.$axios.get('/data/list/nav-link')
		rows.forEach(row => {
			row.label = row[lang] || row.en
			row.links = !row.links ? [] : row.links.split('\n').map(txt => {
				const arr = txt.split('::')
				let link = arr[0]
				if(/^#/.test(link) && row.href != '/') {
					link = row.href + link
				}
				const labels = (arr[1] || '').split('$$')
				return {
					link,
					label: lang == 'ch' ? labels[0] : (labels[1] || labels[0]),
					isSub: arr[2] == 'sub',
				}
			})
			row.subLinks = row.links.filter(it => it.isSub)
		})
		const navList = rows.filter(it => it.pos == 'header' && it.href != '/')
		// const introList = allData.filter(it => it.lang == lang && it.route == route) // 本地数据
		let body = {
			lang,
			route,
		}
		if(route == '/') {
			body.route = ['/', '/eco']
		}
		const { data: { rows: configList } } = await this.$axios.post('/data/list/config', body)
		const configMap = {}
		configList.forEach(row => {
			configMap[row.name] = row.json
		})
		if(route == '/') {
			delete body.route
			body.pos = ['dev-client', 'home-src', 'home-org', 'partner']
		}
		const { data: { rows: introList } } = await this.$axios.post('/data/list/gxc_intro', body)
		introList.forEach(row => {
			row.lines = (row.lines || '').split('\n')
		})
		commit('setData', {
			baseHost: host.replace(/^(en|kr|www)\./, ''),
			route,
			lang,
			navList,
			introList,
			configMap,
		})
	},
}