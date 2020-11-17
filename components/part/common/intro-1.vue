<style lang="less">
.intro-1 {
	.item {
		// max-width: 360px;
		img {
			height: 40px;
		}
	}
}
@media screen and (max-width: 767px) {
	.intro-1 {
		h2 {
			margin-bottom: 20px;
		}
		.item {
			.mt-20 {
				margin-top: 15px;
			}
		}
	}
}
</style>
<template>
<div class="intro-1 panel-1">
	<div class="wrap">
		<h2>{{ title }}</h2>
		<el-row :gutter="60">
			<el-col v-bind="colAttr"
				v-for="(item, i) in list" :key="i">
				<div class="item m-auto ta-c mt-50">
					<img :src="item.icon || ''">
					<h3 class="mt-20 fz-20">{{ item.title }}</h3>
					<div class="mt-20 gray-6 fz-14 lh-2 ta-j">
						{{ item.lines[0] }}
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
		title: String,
		list: Array,
	},
	computed: {
		colAttr() {
			// :xs="12" :sm="12" :md="6" 
			const len = this.list.length
			if(len == 4) return {
				xs: 12,
				sm: 12,
				md: 6
			}
			// if(len == 3) 
			return {
				xs: 24,
				sm: 8,
			}
		}
	}
}
</script>