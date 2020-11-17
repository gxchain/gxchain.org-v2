<style lang="less">
.timeline-1 {
	li label {
		width: 60px;
	}
}
</style>
<template>
<div>
	<!-- <banner-1 :list="bannerList"></banner-1> -->
	<banner-2 :dure-txt="dureTxt"></banner-2>

	<home-gov :info="govInfo"></home-gov>

	<docs-1 class="bg-l2" id="docs" :info="docInfo">
		<div class="title">
			<span class="fz-30">{{ docInfo.title }}</span>
			<a href="/developer">{{ isCh ? '更多项目' : 'More' }}</a>
		</div>
	</docs-1>

	<exchange-1 :list="exchangeList" is-col3>
		<div class="title">
			<span class="fz-30">{{ isCh ? '合作伙伴' : 'Partners' }}</span>
			<a href="/eco">{{ isCh ? '查看更多' : 'More' }}</a>
		</div>
	</exchange-1>

	<home-news class="bg-l2" :list="newsList"></home-news>
</div>
</template>

<script>
import '@/components'
import { mapState } from 'vuex'

const startDate = new Date('2017-06-10T13:52:26Z')

export default {
	computed: {
		...mapState({
			isCh: s => s.lang == 'ch',
			nowDate: s => s.nowDate,
			// clientList: s => s.introList.filter(it => it.pos == 'dev-client'),
			newsList: s => s.newsList.filter(it => !!it.img).slice(0, 4),
			docInfo: s => s.introList.filter(it => it.pos == 'home-src')[0],
			govInfo: s => s.introList.filter(it => it.pos == 'home-org')[0],
			exchangeList: s => s.configMap.exchange.map(it => {
				return {
					...it,
					img: '//qs-1252071497.cos.ap-beijing.myqcloud.com/app/17/exchange/' + it.img,
					link: 'https://www.feixiaohao.com/exchange/' + it.link,
				}
			}).slice(0, 12),
			
		}),
		dureTxt() {
			const time = parseInt((this.nowDate - startDate)/1e3)
			const day = parseInt(time / 86400)
			const hour = parseInt((time%86400) / 3600)
			const min = parseInt((time%3600) / 60)
			const sec = time%60
			if(this.isCh) return `${day}天 ${hour}时 ${min}分 ${sec}秒`
			return `${day}d ${hour}h ${min}m ${sec}s`
		}
	},
	async fetch({ store, ...args }) {
		await store.dispatch('initData', args)
		await store.dispatch('getTransData')
		await store.dispatch('getNews')
	},
}
</script>