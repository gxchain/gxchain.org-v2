<style lang="less">
.dev-src {
	.wrap {
		max-width: 830px;
	}
	.side-img {
		max-height: 160px;
		object-fit: cover;
	}
	.item {
		margin-top: 60px;
		color: #71859c;
		h3 {
			margin-bottom: 3px;
			color: #333;
		}
		a {
			display: inline-block;
			color: #6699FF;
			font-weight: bold;
			&:hover {
				opacity: .85;
			}
			i {
				position: relative;
				top: 2px;
			}
		}
	}
}
</style>
<template>
<div class="panel-1 dev-src">
	<div class="wrap">
		<el-row :gutter="gutter">
			<el-col :span="12">
				<div class="pd-10"></div>
			</el-col>
			<el-col :span="gutter > 30 ? 12 : 24">
				<p class="fz-30 fw-b">GXChain</p>
				<h3 class="fz-50">{{ title }}</h3>
			</el-col>
		</el-row>
		<div class="pd-10" v-if="isPC"></div>
		<el-row class="item" :gutter="gutter" v-for="(item, i) in list" :key="i">
			<el-col :xs="24" :sm="12" :md="12" v-if="i%2 == 0 || !isPC">
				<img v-bind="getImgOpts(i)" class="mb-10">
			</el-col>
			<el-col :xs="24" :sm="12" :md="12">
				<div :class="'eq-' + i">
					<h3>{{ item.title }}</h3>
					<p class="sub-title fz-13 mb-10 lh-15">{{ item.subTitle }}</p>
					<p class="mb-10 fz-14" v-for="(row, j) in item.subs" :key="j">
						<a :href="row.link" target="_blank">
							<i class="iconfont" :class="/github/.test(row.link) ? 'icon-github' : 'icon-link2'"></i>
							<span>{{ row.tag }}</span>
						</a>
						<span class="label">{{ row.label }}</span>
					</p>
				</div>
			</el-col>
			<el-col :span="12" v-if="i%2 == 1 && isPC">
				<img v-bind="getImgOpts(i)">
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	props: {
		info: Object,
		title: String,
	},
	computed: {
		isPC() {
			return this.$store.state.clientWidth > 800
		},
		gutter() {
			return this.isPC ? 60 : 30
		},
		list() {
			if(!this.info) return []
			const arr = this.info.lines.join('\n').split('\n\n')
			const list = []
			for(const txt of arr) {
				const arr2 = txt.split('\n')
				const row = {
					title: arr2[0],
					subTitle: arr2[1],
					subs: [],
				}
				arr2.splice(0, 2)
				for(const txt2 of arr2) {
					const arr3 = txt2.replace('https://', '').split(/[:\s]\s*/)
					const label = arr3.length == 1 ? '' : arr3[0]
					const link = arr3.length == 1 ? arr3[0] : arr3[1]
					const tag = /github.com\//.test(link) ? /[^\/]+$/.exec(link)[0] : link
					row.subs.push({
						label,
						link: 'https://' + link,
						tag,
					})
				}
				list.push(row)
			}
			return list
		},
	},
	methods: {
		getImgOpts(i) {
			return {
				src: `/dev/icon/${1+i}.png`,
				class: 'd-b w100p side-img'
			}
		}
	}
}
</script>