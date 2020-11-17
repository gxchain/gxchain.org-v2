<style lang="less">
body {
	background-image: url(/bg/bg-intro.png);
}
.privacy-1 {
	.con {
		p {
			margin-bottom: 15px;
		}
		strong {
			display: inline-block;
			margin-top: 30px;
			font-size: 16px;
		}
	}
}
</style>

<template>
<div class="panel-1 privacy-1" v-if="privacy">
	<div class="wrap">
		<h2>{{ privacy.title }}</h2>
		<div class="con mt-20" v-html="privacy.lines.join('')"></div>
	</div>
</div>
</template>

<script>
export default {
	computed: {
		privacy() {
			return this.$store.state.introList.filter(it => it.pos == 'privacy')[0]
		},
	},
	async fetch({ store, ...args }) {
		await store.dispatch('initData', args)
	},
}
</script>