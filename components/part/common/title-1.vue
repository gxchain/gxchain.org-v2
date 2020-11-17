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
		<span>{{ isCh ? more: 'More' }}</span>
		<img src="/right-arrow.svg" class="icon d-b">
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
		isCh() {
			return this.$store.state.lang == 'ch'
		},
	},
}
</script>