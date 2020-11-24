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
			<div class="markdown mt-50" v-html="row.content" v-if="row.content"></div>
			<div class="mt-50 gray fz-15"  v-else>
				<span v-if="isCh">{{downSec}}秒后跳转到</span>
				<span v-else>redirect in {{downSec}}s</span>
				<a :href="row.link" class="color-1">
					<u>{{ row.link.replace(/^https?:\/\//, '').cutStr(20) }}</u>
				</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
String.prototype.cutStr = function(pre = 100, trail = 0) {
	if(this.length <= pre + trail) return this
	let txt = this.substr(0, pre) + '...'
	if(trail) txt += this.substr(-trail)
	return txt
}
export default {
	computed: {
		row() {
			return this.$store.state.newsRow
		},
		isCh() {
			return  this.$store.state.lang == 'ch'
		},
	},
	data() {
		return {
			downSec: 3,
		}
	},
	async fetch({ store, params, ...args }) {
		await store.dispatch('initData', args)
		await store.dispatch('getNewsRow', params)
	},
	mounted() {
		if(!this.row.content) {
			const timing = setInterval(() => {
				this.downSec--
				if(this.downSec <= 0) {
					location.href = this.row.link
					clearInterval(timing)
				}
			}, 1e3)
		}
	},
}
</script>