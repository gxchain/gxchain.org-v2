<style lang="less">
body {
	background-image: url(/bg/bg-intro.png);
}
.timeline-1 {
	li label {
		width: 60px;
	}
}
</style>
<template>
<div>
	<about-intro :info="blockInfo" :paper-title="isCh ? '获取GXChain白皮书' : 'GXChain Whitepaper'"></about-intro>
	<about-advan :list="advanList"></about-advan>
	<about-roadmap :list="roadMapList"></about-roadmap>
</div>
</template>

<script>
import '@/components'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			isCh: s => s.lang == 'ch',
			blockInfo: s => s.introList.filter(it => it.pos == 'gx-book')[0],
			advanList: s => {
				const info = s.introList.filter(it => it.pos == 'intro-2')[0]
				if(!info) return []
				const arr = info.lines.join('\n').split('\n\n')
				return arr.map(it => {
					const a = it.split('\n')
					return {
						title: a[0],
						desc: a.slice(1).join('<br>'),
					}
				})
			},
			roadMapList(s) {
				const arr = s.introList.filter(it => it.pos == 'history')
				arr.sort((a, b) => {
					return b.title - a.title
				})
				const list = []
				arr.forEach(it => {
					it.lines.forEach(txt => {
						const arr = txt.split('::')
						list.push({
							mon: it.title +'.' + arr[0],
							msg: arr[1],
						})
					})
				})
				return list
			},
		}),
	},
	async fetch({ store, ...args }) {
		await store.dispatch('initData', args)
	},
}
</script>