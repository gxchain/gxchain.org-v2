<style lang="less">
.app-1 {
	.item {
		// min-height: 200px;
		.logo {
			@size: 54px;
			height: @size;
			width: @size;
			object-fit: contain;
		}
	}
}
</style>

<template>
<div class="app-1 panel-1">
	<div class="wrap">
		<slot>
			<h2>{{ title }}</h2>
		</slot>
		<el-row :gutter="60">
			<el-col v-bind="colAttr"
				v-for="(item, i) in appList" :key="i">
				<div class="item d-flex mt-50">
					<img :src="item.icon" class="logo shrink-0">
					<div class="ml-20">
						<div class="d-flex al-c">
							<h3 class="mt-15">{{ item.title }}</h3>
							<ul class="d-flex mt-10 ml-auto" v-if="item.links">
								<li class="ml-10" v-for="(row, j) in item.links" :key="j">
									<a class="color-1 op-touch fw-b" :href="row.link" target="_blank">{{ row.label }}</a>
								</li>
							</ul>
						</div>
						<div class="mt-15 fz-13 gray-6 lh-2">
							{{ item.lines.join('') }}
						</div>
						
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
import '@/components'

export default {
	props: {
		title: String,
		list: Array,
		isCol3: Boolean,
	},
	computed: {
		appList() {
			return this.list.map(_it => {
				const it = { ..._it }
				if(!it.link) return it
				const arr = it.link.split('---')
				if(arr.length == 1) {
					it.links = [{
						label: this.$store.state.lang == 'ch' ? '下载' : 'Download',
						link: it.link,
					}]
				} else {
					it.links = arr.map(txt => {
						const [label, link] = txt.split(':')
						return {
							label,
							link: 'https://gxb-package.oss-cn-hangzhou.aliyuncs.com/' + link,
						}
					})
				}
				return it
			})
		},
		colAttr() {
			if(this.isCol3) return {
				xs: 24,
				sm: 12,
				md: 8,
			}
			return {
				xs: 24,
				sm: 12,
				md: 12,
			}
		},
	},
}
</script>