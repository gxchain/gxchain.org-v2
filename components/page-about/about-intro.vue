<style lang="less">
.about-intro {
	.wrap {
		max-width: 900px;
	}
}
.bg-blue-1 {
	background: linear-gradient(-33deg, #96ccdc 0%, #327dee 59%, #886ca4 100%);
	color: #fff;
	padding: 30px;
	border-radius: 15px;
	.img {
		max-width: 120px;
	}
}
</style>
<template>
<div class="panel-1 about-intro">
	<div class="wrap">
		<div>
			<p class="fw-b fz-30">GXChain</p>
			<h3 class="fz-50">{{ intro }}</h3>
		</div>
		<div class="bg-blue-1 mt-30 d-flex al-c">
			<el-row :gutter="60" align="middle">
				<el-col :xs="24" :sm="16" :md="16">
					<h3>{{ info.lines[0] }}</h3>
					<div class="fz-12 lh-17 white-8 mt-20">
						<p class="mt-10" v-for="(txt, j) in info.lines.slice(1)" :key="j">{{ txt }}</p>
					</div>
				</el-col>
				<el-col :xs="24" :sm="8" :md="8">
					<div class="ta-c mt-30">
						<a class="op-touch" :href="info.link" target="_blank">
							<img :src="info.icon" class="img w100p ">
							<p class="mt-20">
								<u class="white">{{ title }}</u>
							</p>
						</a>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		title: String,
		info: Object,
	},
	computed: {
		lang() {
			return this.$store.state.lang
		},
		intro() {
			if(this.lang == 'kr') return '소개'
			if(this.lang == 'ch') return '简介'
			return 'Intro'
		},
	}
}
</script>