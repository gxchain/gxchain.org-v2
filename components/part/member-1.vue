<style lang="less">
.member-1 {
	.item {
		img {
			height: 50px;
		}
	}
}
@media only screen and (min-width: 767px) {
	.member-1 {
		.item {
			min-height: 230px;
		}
	}
}
</style>

<template>
<div class="member-1 panel-1">
	<div class="wrap">
		<h2>{{ title }}</h2>
		<el-row :gutter="40">
			<el-col :xs="24" :sm="12" :md="8" 
				v-for="(item, i) in list" :key="i">
				<div class="item mt-50">
					<div class="d-flex al-c">
						<img :src="item.icon || '//gxchain.oss-cn-shanghai.aliyuncs.com/org/img/avatar.svg'">
						<div class="ml-15 lh-15">
							<h3 class="fz-16">{{ item.title }}</h3>
							<p class="fz-12 gray">{{ item.lines[0] }}</p>
						</div>
					</div>
					<div class="mt-15 gray-6 fz-13 lh-2">
						{{ item.lines[1] }}
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
		title: String,
	}
}
</script>