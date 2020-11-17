<style lang="less">
body {
	background-image: url(/bg/bg-eco.png);
}
</style>

<template>
<div>
	<eco-top :list="dappsList"></eco-top>
	<!-- <apps-1 id="dapps" class="" :list="dappsList" is-col3 :title="isCh ? '生态应用' : 'Dapps'"></apps-1> -->
	<eco-nodes id="t-nodes" :title="isCh ? '公信节点' : 'Trust Nodes'" :list="nodeList"></eco-nodes>
	<partner-1 class="bg-f7-2" :info="partnerInfo"></partner-1>
</div>
</template>

<script>
import '@/components'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			isCh: s => s.lang == 'ch',
			nodeList: s => s.nodeList,
			clientList: s => s.introList.filter(it => it.pos == 'dev-client'),
			dappsList: s => s.introList.filter(it => it.pos == 'dapps'),
			partnerInfo: s => s.introList.filter(it => it.pos == 'partner')[0],
		}),
	},
	async fetch({ store, ...args }) {
		await store.dispatch('initData', args)
		await store.dispatch('getNodeList')
	},
	mounted() {
		console.log(this.exchangeList)
	}
}
</script>