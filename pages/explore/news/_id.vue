<style lang="less" src="./markdown.less"></style>
<style lang="less">
body {
	background-image: url(/bg/bg-intro.png);
}
.markdown {
	p {
		&:first-of-type {
			display: none;
		}
	}
}
.news-row {
	.wrap {
		max-width: 800px;
	}
	h2{
		text-align: left;
	}
}
@media screen and (max-width: 700px) {
	.news-row h2 {
		font-size: 22px;
	}
}
</style>

<template>
<div>
	<div class="panel-1 news-row">
		<div class="wrap" v-if="row">
			<a href="/explore" class="color-1 pos-r" style="top: -20px;">
				<i class="iconfont icon-fanhui"></i> 新闻列表
			</a>
			<div class="pd-10"></div>
			<h2>{{ row.title }}</h2>
			<p class="gray fz-13 mt-10">{{ row.postAt.replace(/:00$/, '') }}</p>
			<div class="markdown mt-50" v-html="row.content"></div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	computed: {
		row() {
			return this.$store.state.newsRow
		},
	},
	async fetch({ store, params, ...args }) {
		await store.dispatch('initData', args)
		await store.dispatch('getNewsRow', params)
	},
	mounted() {
		if(!this.row.content) {
			location.href = this.row.link
		}
	},
}
</script>