<style lang="less">
.explore-news {
	.wrap {
		max-width: 900px;
	}
	.img {
		overflow: hidden;
		display: flex;
		align-items: center;
		&:hover img {
			transform: scale(1.1);
		}
	}
	.main-img {
		max-height: 260px;
		object-fit: cover;
	}
	.last-news {
		.img {
			max-height: 260px;
		}
	}
	.btn-1 {
		display: inline-block;
		border: 1px solid;
		padding: 6px 24px;
	}
	.search-wrap {
		max-width: 320px;
		position: relative;
		top: -5px;
		padding-left: 10px;
	}
	.search {
		border: none;
		outline: none;
		padding: 8px 5px;
		font-size: 16px;
		background: transparent;
	}
	ul.nav {
		font-size: 20px;
		li {
			padding-left: 10px;
			margin-bottom: 15px;
			line-height: 1;
			position: relative;
			bottom: -1px;
			border-left: 3px solid transparent;
			font-weight: 500;
			&.active {
				border-left-color: #6699FF;
			}
		}
	}
}
.news-list {
	.item {
		margin-top: 30px;
		h3 {
			font-size: 16px;
			margin-bottom: 8px;
			font-weight: 500;
			
		}
		.img {
			height: 150px;
			margin-bottom: 15px;
		}
	}
}
@media screen and (max-width: 560px) {
	.news-list {
		.item {
			h3 {
				font-size: 14px;
			}
			.img {
				height: 90px;
			}
		}
	}
	.search-wrap .btn-1 {
		// padding: 4px 8px;
		display: none;
	}
}
::-webkit-input-placeholder { /* WebKit browsers */
	color: #aaa;
}
</style>

<template>
<div class="explore-news panel-1">
	<div class="wrap">
		<a :href="'/explore/news/'+lastNews.id" target="_blank" class="last-news" v-if="lastNews && !query.s">
			<el-row :gutter="40" type="flex" align="middle">
				<el-col :xs="24" :sm="16">
					<div class="w100p img">
						<img :src="lastNews.img || defImg" class="w100p d-b trans-300">
					</div>
				</el-col>
				<el-col :xs="24" :sm="8">
					<h3 class="line-3">{{ lastNews.title }}</h3>
					<div class="fz-12 gray mt-10">
						{{ (lastNews.postAt||'').replace(/:00$/, '') }}
					</div>
				</el-col>
			</el-row>
		</a>
		<div class="pd-20 mt-30 mb-10"></div>
		<el-row :gutter="40">
			<el-col :xs="24" :sm="16">
				<ul class="d-flex al-c nav bdb-1">
					<li class="active shrink-0">
						{{ recTxt }}
					</li>
					<div class="ml-auto d-flex al-c flex-1 search-wrap">
						<span class="iconfont icon-search fz-20 fw-b pd-5"></span>
						<input ref="kw" type="text" class="search flex-1" :placeholder="lang=='ch'?'搜索关键词':'keyword'"
							v-model="skey" @keyup.enter="onSearch">
						<span class="btn-1 bg-1 white shrink-0 fz-12 op-touch" @click="onSearch">
							{{ lang  == 'ch' ? '搜索' : 'Search' }}
						</span>
					</div>
				</ul>
				<div class="news-list">
					<el-row :gutter="30">
						<el-col :span="12" v-for="(item, i) in list" :key="i">
							<a :href="'/explore/news/'+item.id" target="_blank">
								<div class="item">
									<div class="w100p img">
										<img :src="item.img || defImg" class="w100p d-b trans-300">
									</div>
									<h3 class="fz-16 line-1" v-html="item.title"></h3>
									<div class="fz-12 gray mt-10">
										{{ (item.postAt||'').replace(/:00$/, '') }}
									</div>
								</div>
							</a>
						</el-col>
					</el-row>
					
				</div>

				<div class="mt-20" v-if="list.length" v-show="list.length >= 10 && !noMore">
					<p class="load-more color-1 ta-c pd-10 op-touch" @click="loadMore">
						<span class="btn-1" v-if="lang=='ch'">{{ loading ? '加载中...' : '浏览更多' }}</span>
						<span class="btn-1" v-else>{{ loading ? 'Loading...' : 'More' }}</span>
					</p>
				</div>
				<div class="mt-30" v-else>
					<span v-if="lang=='ch'">未找到关于{{ $route.query.s }}的新闻</span>
					<span v-else>not found</span>
				</div>
				<div class="pd-15"></div>
			</el-col>
			<el-col :xs="24" :sm="8">
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
	computed: {
		lastNews() {
			return this.list[0]
		},
		lang() {
			return this.$store.state.lang
		},
		recTxt() {
			if(this.lang == 'kr') return '최신'
			return this.lang  == 'ch' ? '推荐' : 'Lastest'
		},
	},
	data() {
		return {
			loading: false,
			noMore: false,
			query: {},
			skey: '',
			defImg: '//gxchain.oss-cn-shanghai.aliyuncs.com/news/img/1.png',
		}
	},
	created() {
		this.query = this.$route.query
		const { s } = this.query
		if(s) this.skey = s
	},
	methods: {
		onSearch() {
			if(!this.skey && !this.query.s) {
				this.$refs.kw.focus()
				return
			}
			location.href = '/explore?s=' + this.skey
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