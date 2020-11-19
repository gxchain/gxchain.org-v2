<style lang="less">
.about-advan {
	.wrap {
		max-width: 900px;
	}
	.item {
		.icon {
			height: 35px;
			width: 35px;
			margin: 0 auto 10px;
			position: relative;
			img {
				width: 100%;
			}
		}
	}
}
@media screen and (min-width: 802px) {
	.about-advan {
		.el-col-md-4 {
			width: 20%;
		}
	}
}
</style>
<template>
<div class="dark panel-1 about-advan">
	<div class="wrap">
		<h2>{{ title }}</h2>
		<el-row :gutter="5" class="mt-50">
			<el-col :xs="12" :sm="8" :md="4" v-for="(item, i) in list" :key="i">
				<div class="item pos-r mb-10">
					<img src="/icon/intro/bg.svg" class="w100p d-b">
					<div class="y-center w100p ta-c">
						<div class="icon">
							<img :src="`/icon/intro/${i+1}.png`" class="pos-center">
						</div>
						<h3 class="fz-18 mt-5">{{ item.title }}</h3>
						<p class="fz-12 gray mt-10" v-html="item.desc"></p>
					</div>
				</div>
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
		lang() {
			return this.$store.state.lang
		},
		title() {
			if(this.lang == 'kr') return '우세'
			if(this.lang == 'ch') return '方案优势'
			return 'Adavantages'
		}
	}
}
</script>