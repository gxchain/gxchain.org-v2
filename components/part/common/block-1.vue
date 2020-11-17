<style lang="less">
.block-1 {
	.logo {
		width: 150px;
	}
}
@media screen and (max-width: 700px) {
	.block-1 {
		.logo {
			width: 120px;
		}
	}
}
</style>

<template>
<div class="block-1 panel-1">
	<div class="wrap">
		<slot>
			<h2>{{ info.title }}</h2>
		</slot>
		<el-row :gutter="30" class="mt-50">
			<el-col :xs="24" :sm="sideCol" :md="sideCol" v-if="!isRight">
				<div class="ta-c">
					<a :href="info.link" target="_blank">
						<img :src="info.icon" class="logo">
						<div class="mb-20">
							<span class="color-1 op-touch fw-b pd-10 d-ib">
								{{ linkText }}
							</span>
						</div>
					</a>
				</div>
			</el-col>
			<el-col :xs="24" :sm="mainCol" :md="mainCol">
				<div class="lh-2">
					<h3 class="fz-15 mb-10 fw-500">{{ info.lines[0] }}</h3>
					<div class="gray-6 fz-14">
						<p class="mt-10" v-for="(txt, j) in info.lines.slice(1)" :key="j">{{ txt }}</p>
					</div>
				</div>
				<slot name="main"></slot>
			</el-col>

			<el-col :xs="24" :sm="sideCol" :md="sideCol" v-if="isRight">
				<slot name="right"></slot>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	props: {
		info: Object,
		linkText: String,
		isRight: Boolean,
		mainCol: {
			type: Number,
			default: 16,
		},
	},
	computed: {
		sideCol() {
			return 24 - this.mainCol
		},
	},
}
</script>