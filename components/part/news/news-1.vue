<style lang="less">
.news-1 {
	.el-col, .side-news {
		margin-bottom: 22px;
	}
	.search {
		border: none;
		outline: none;
		padding: 8px 5px;
		font-size: 16px;
	}
	ul.nav {
		font-size: 17px;
		li {
			margin-right: 30px;
			padding: 10px 0;
			position: relative;
			bottom: -1px;
			border-bottom: 3px solid transparent;
			font-weight: 500;
			&.active {
				border-bottom-color: #6699FF;
			}
		}
	}
}
.news-list {
	.item {
		padding: 30px 0;
		h3 {
			font-size: 18px;
			margin-bottom: 8px;
			font-weight: 500;
		}
		.img {
			width: 130px;
			height: 70px;
			object-fit: cover;
			margin-left: 30px;
		}
	}
}
@media screen and (max-width: 560px) {
	.news-list {
		.item {
			h3 {
				font-size: 16px;
			}
			.img {
				width: 80px;
				margin-left: 10px;
			}
		}
	}
}
::-webkit-input-placeholder { /* WebKit browsers */
	color: #aaa;
}
</style>

<template>
<div class="news-1 panel-1">
	<div class="wrap">
		<h2>{{ title }}</h2>
		<el-row :gutter="40" class="mt-50">
			<el-col :xs="24" :sm="16" :md="17">
				<ul class="d-flex al-c nav bdb-1">
					<li class="flex-1 d-flex al-c" style="padding: 5px 0;">
						<!-- {{ $store.state.lang == 'ch' ? '推荐' : 'Recommend' }} -->
						<span class="iconfont icon-search fz-20 fw-b pd-5"></span>
						<input type="text" class="search flex-1" placeholder="搜索关键词"
							v-model="skey" @keyup.enter="onSearch">
					</li>
					<!-- <li>周报</li> -->
				</ul>
				<div class="news-list">
					<a :href="'/explore/news/'+item.id" 
						v-for="(item, i) in list" :key="i">
						<div class="item bdb-1-light d-flex al-start space-btw">
							<div>
								<h3 v-html="item.title"></h3>
								<p class="gray-6 fz-13 line-2 lh-15 mt-15" v-html="item.desc"></p>
								<div class="fz-12 gray mt-10">
									{{ (item.postAt||'').replace(/:00$/, '') }}
								</div>
							</div>
							<img :src="item.img" class="img shrink-0" v-if="item.img">
						</div>
					</a>
				</div>

				<div class="mt-20" v-if="list.length" v-show="list.length >= 10 && !noMore">
					<p class="color-1 ta-c pd-10 op-touch" @click="loadMore">
						{{ loading ? '加载中...' : '浏览更多' }}
					</p>
				</div>
				<div class="mt-30" v-else>
					未找到关于{{ $route.query.s }}的新闻
				</div>
				<!-- <ul class="pagi d-flex al-c">
					<li>
						<a href="">上一页</a>
					</li>
					<li v-for="i in 5" :key="i">
						<a :href="'?page=' + i">{{ i }}</a>
					</li>
				</ul> -->
			</el-col>
			<el-col :xs="24" :sm="8" :md="7">
				<slot></slot>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	props: {
		title: String,
		list: Array,
	},
	data() {
		return {
			loading: false,
			noMore: false,
			skey: '',
		}
	},
	created() {
		const { s } = this.$route.query
		if(s) this.skey = s
	},
	methods: {
		onSearch() {
			location.href = '/explore?s=' + this.skey
		},
		async onUpdateNews() {
			try {
				const { data } = await this.$axios.get('https://tablo.fun/api/v1/media/info/gxbNews')
				if(data.length) location.reload()
			} catch (error) {
				// 
			}
		},
		async loadMore() {
			if(this.loading) return
			this.loading = true
			try {
				const len = await this.$store.dispatch('getNews', {
					more: true,
					s: this.skey,
				})
				if(!len) this.noMore = true
			} catch (error) {
				// 
			}
			this.loading = false
		},
	}
}
</script>