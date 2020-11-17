<style lang="less">
.home-news {
	.item {
		.img {
			height: 130px;
			overflow: hidden;
			display: flex;
			align-items: center;
			&:hover img {
				transform: scale(1.1);
			}
		}
	}
}
@media screen and (max-width: 650px) {
	.home-news {
		.item {
			.img {
				height: 90px;
			}
		}
		h3 {
			min-height: 40px;
			margin-top: 5px;
			font-size: 14px;
		}
	}
}
</style>

<template>
<div class="panel-1 home-news">
	<div class="wrap">
		<title-1 :title="isCh ? '新闻动态' : 'News'" more="发现更多" link="/explore"></title-1>
		<el-row class="mt-50" :gutter="isMobile ? 20 : 30">
			<el-col :xs="12" :sm="12" :md="6" v-for="(item, i) in list" :key="i">
				<a :href="'/explore/news/'+item.id" class="item">
					<div class="w100p img">
						<img :src="item.img" class="d-b w100p trans-300">
					</div>
					<h3 class="fz-16 mt-10 mb-20" :class="isMobile ? 'line-2' : 'line-1'">{{ item.title }}</h3>
				</a>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	props: {
		list: Array,
	},
	computed: {
		isCh() {
			return this.$store.state.lang == 'ch'
		},
		isMobile() {
			return this.$store.state.clientWidth < 650
		},
	},
}
</script>