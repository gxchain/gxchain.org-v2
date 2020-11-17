<style lang="less">
// 
// @font-face {
// 	font-family: 'swift';
// 	src: url('/icon/epson1.ttf');
// }
// .f-swift {
// 	font-family: 'swift';
// }
.eco-nodes {
	.item {
		margin-bottom: 15px;
		padding-right: 12px;
		.icon {
			width: 20px;
		}
	}
	.map-img {
		width: 100%;
		max-width: 390px;
		margin: 40px auto 60px;
	}
	.pop-node {
		background: rgba(0, 0, 0, .7);
		padding: 30px;
		width: 80%;
		max-width: 600px;
		max-height: 90%;
    	overflow: auto;
		border-radius: 20px;
		.logo {
			height: 80px;
			margin: 20px 0;
		}
	}
}
@media screen and (max-width: 767px) {
	
}
</style>
<template>
<div class="panel-1 eco-nodes dark pos-r ">
	<div class="wrap">
		<h2>{{ title }}</h2>
		<div class="mt-50">
			<img src="//aoyi02.oss-cn-shanghai.aliyuncs.com/app/17/2aadafb018fc407a5a46433162a57f61.png" class="map-img d-b">
			<div class="list d-flex flex-center flex-wrap">
				<div class="item d-flex al-c" v-for="(item, i) in list" :key="i">
					<img :src="item.logo" class="icon op-touch" @click="onClick(item)">
				</div>
			</div>
		</div>
	</div>

	<div class="pos-center pop-node f-num" v-show="showPop">
		<span class="iconfont icon-guanbi pos-a top-0 right-0 pd-10 fz-25 mt-10 mr-10 op-touch z-100" 
			@click="showPop = false"></span>
		<el-row :gutter="30" v-if="curItem">
			<el-col :xs="24" :sm="12">
				<img :src="curItem.logo" class="logo">
				<div class="lh-15">
					accountName: {{ curItem.name }}
					<template v-if="curItem.location">
						location: <br>
						country: {{ curItem.location.country }} <br>
						city: {{ curItem.location.city }} <br>
						longitude: {{ curItem.location.longitude }}<br>
						latitude: {{ curItem.location.latitude }}<br>
					</template>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12">
				<div class="mt-50 fz-12 white-8">
					{{ curItem.nodeDesc }}
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
	},
	data() {
		return {
			curItem: null,
			showPop: false,
		}
	},
	methods: {
		onClick(item) {
			this.curItem = item
			this.showPop = true
		},
	}
}
</script>