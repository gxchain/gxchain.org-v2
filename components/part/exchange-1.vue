<style lang="less">
.exchange-1 {
	.logo {
		height: 30px;
	}
}
@media screen and (max-width: 700px) {
	.exchange-1 {
		h3 {
			font-size: 12px;
			height: 18px;
		}
	}
}
</style>
<template>
<div class="panel-1 exchange-1">
	<div class="wrap ta-c">
		<slot>
			<h2>{{ title }}</h2>
		</slot>
		<el-row class="mt-50" :gutter="isMobile ? 10 : 30">
			<el-col :xs="8" :sm="6" :md="4" class="mb-30" 
				v-for="(item, i) in list" :key="i">
				<a :href="item.link" target="_blank">
					<img :src="item.img" class="logo">
					<h3 class="fz-13 mt-5 line-1">{{ item.title }}</h3>
				</a>
			</el-col>
		</el-row>
		<div>
			<a href="https://www.feixiaohao.com/coinmarket/gxshares?feature=0" class="gray-b fz-12" target="_blank">
				*数据来源
			</a>
		</div>
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
		isMobile() {
			return this.$store.state.clientWidth < 700
		},
	}
}
</script>