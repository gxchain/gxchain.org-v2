<style lang="less">
.title {
	line-height: 1;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	a {
		color: #9343FF;
		font-size: 13px;
		font-weight: bold;
		.icon {
			width: 12px;
			height: 12px;
			margin-left: 2px;
		}
	}
}
</style>

<template>
<div class="title">
	<h2>{{ title }}</h2>
	<a :href="link" class="d-flex al-c">
		<span>{{ moreTxt }}</span>
		<img src="/icon/right-arrow.svg" class="icon d-b">
	</a>
</div>
</template>

<script>
export default {
	props: {
		title: String,
		more: String,
		link: String,
	},
	computed: {
		lang() {
			return this.$store.state.lang
		},
		moreTxt() {
			if(this.lang == 'kr') return '더 보기'
			return this.lang == 'ch' ? this.more: 'More'
		},
	},
}
</script>