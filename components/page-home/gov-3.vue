<style lang="less">
.gov-3 {
	background-size: 105%;
	h3, .gray-6 {
		color: #6699FF;
	}
}
.gov-icon-1 {
	width: 80%;
	min-width: 300px;
	max-width: 450px;
}
@media screen and (max-width: 940px) {
	.gov-icon-1 {
		margin-top: 30px;
	}
}
</style>
<template>
<block-1 class="gov-3" :info="info" :main-col="12" is-right>
	<div class="title">
		<span class="fz-30 white">{{ info.title }}</span>
	</div>
	<template #main>
		<div class="d-flex mt-20">
			<a href="/institution" class="d-flex al-c fz-13 color-3 ml-auto">
				<span>{{ moreTxt }}</span>
				<img src="/icon/right-arrow.svg" class="icon" style="height: 12px; margin-left: 3px;">
			</a>
		</div>
	</template>
	<template #right>
		<div class="ta-c">
			<img :src="info.icon" class="gov-icon-1 ev-n">
		</div>
	</template>
</block-1>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	computed: {
		lang() {
			return this.$store.state.lang
		},
		moreTxt() {
			if(this.lang == 'kr') return '더 보기'
			return this.lang == 'ch' ? '了解更多' : 'More'
		},
		trustNodes() {
			return this.$store.state.configMap.trustNodes
		},
	}
}
</script>