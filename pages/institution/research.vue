<template>
<div>
	<block-1 id="research" class="bg-l1" :info="researchInfo" v-if="researchInfo"></block-1>
	<member-1 id="expert" :list="memberList" :title="lang == 'ch' ? '研究院成员':'Research Member'"></member-1>
</div>
</template>

<script>
import '@/components'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			lang: s => s.lang,
			researchInfo: s => s.introList.filter(it => it.pos == 'research')[0],
			memberList: s => s.introList.filter(it => it.pos == 'member'),
		}),
	},
	async fetch({ store, ...args }) {
		await store.dispatch('initData', args)
	},
}
</script>