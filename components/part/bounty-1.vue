<style lang="less">
.bounty-1 {
	.item {
		border-radius: 12px;
		&:hover {
			box-shadow: 0 0 13px #999;
		}
	}
}
</style>
<template>
<div class="panel-1 bounty-1">
	<div class="wrap">
		<h2>
			<div class="pos lh-1">
				{{ isCh ? '开发悬赏' : 'Bounties Project' }}
				<a href="http://bitwaves.mikecrm.com/9ySzQZi" target="_blank" 
					class="pos-a btm-0 fz-16 fw-b color-1 ml-20 op-touch">
					<i class="iconfont icon-yaoqingjiangli mr-5"></i>{{ isCh ? '领取奖励' : 'Receive Award'}}
				</a>
			</div>
		</h2>
		<el-row :gutter="30" class="mt-50">
			<el-col :xs="24" :sm="12" :md="8" class="mb-30"
				v-for="(item, i) in list" :key="i">
				<a :href="item.link" target="_blank" class="item d-b trans-200">
					<img :src="item.img" class="w100p d-b">
				</a>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	computed: {
		isCh() {
			return this.$store.state.lang == 'ch'
		},
		list() {
			return this.$store.state.configMap.bounty
		},
	}
}
</script>