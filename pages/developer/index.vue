<style lang="less">
body {
	background-image: url(/bg/bg-dev.png);
}
</style>
<template>
<div>
	<dev-src :info="docInfo" :title="docTitle"></dev-src>
	<!-- <docs-1 id="docs" :info="docInfo" :title="docTitle"></docs-1> -->
	<!-- <bounty-1 class="bg-l1"></bounty-1> -->
</div>
</template>

<script>
import '@/components'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			isCh: s => s.lang == 'ch',
			// configMap: s => s.configMap,
			docInfo: s => s.introList.filter(it => it.pos == 'docs')[0]
		}),
		docTitle() {
			return (this.docInfo || {}).title
		},
	},
	async fetch({ store, ...args }) {
		await store.dispatch('initData', args)
	},
	mounted() {
		// console.log(this.docList)
	},
}
</script>