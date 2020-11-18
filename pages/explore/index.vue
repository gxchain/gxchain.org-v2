<style lang="less">
body {
	background-image: url(/bg/bg-news.png);
}
</style>

<template>
<div>
	<explore-news id="news" :list="newsList" >
		<latest-1 :title="title" :list="latestNews"></latest-1>
	</explore-news>
	
</div>
</template>

<script>
import '@/components'
import { mapState } from 'vuex'

export default {
	computed: {
		title() {
			if(this.lang=='kr') return '발전'
			if(this.lang=='ch') return '发展'
			return 'Develop'
		},
		...mapState({
			lang: s => s.lang,
			actList: s => s.weekRows.slice(0, 5),
			latestNews: s => s.sideNews.filter(it => it.type == 'latest').slice(0, 5),
			newsList: s => s.newsList,
			weekList: s => {
				const result = []
				s.weekRows.forEach(_row => {
					const row = { ..._row }
					const postAt = new Date(row.postAt*1e3)
					const year = postAt.getFullYear()
					row.title = row.title.replace('GXChain周报', '').replace(new RegExp(year+'\.', 'g'), '')
					const mon = postAt.getMonth()+1
					const quarter = Math.ceil(mon / 3)
					const title = s.lang == 'ch' ? `${year}年第${quarter}季度` : `${year} Q${quarter}`
					let group = result.filter(it => it.title == title)[0]
					if(!group) {
						group = {
							title,
							subs: [],
						}
						result.push(group)
					}
					group.subs.push(row)
				})
				return result
			},
		})
	},
	async fetch({ store, query, ...args }) {
		await store.dispatch('initData', args)
		await store.dispatch('getNews', query)
		await store.dispatch('getWeekly')
	},
}
</script>