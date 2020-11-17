<template>
<div class="foundation-1 panel-1">
	<div class="wrap pos-r">
		<h2>{{ title }}</h2>
		<el-row class="mt-50">
			<el-col :xs="24" :sm="24" :md="8" class="left-index bg-white bdb-1" ref="leftIndex">
				<div class="h3-wrap">
					<h3 class="fz-14 mb-20" :class="i == curIdx ? 'color-1 fw-b' : 'op-touch'"
						@click="clickH3(i)"
						v-for="(item, i) in list" :key="i">
						{{ 1+i }}. {{ item.title }}
					</h3>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :md="16">
				<div class="con fz-14 gray-6 lh-2">
					<h3 class="fw-b mb-10 gray-3">{{ 1+curIdx }}. {{ curItem.title }}</h3>
					<div v-html="curItem.lines.join('')"></div>
<!-- <div class="">
	<span class="color-1 fw-b">决策委员会</span>
	<span>顾问委员会</span>
	<span>执行委员会</span>
</div> -->

				</div>
				<div class="mt-30 fz-14" v-if="nextItem">
					<a @click="clickH3(curIdx + 1)" class="op-touch gray-6">
						<i class="iconfont icon-link"></i>
						{{ $store.state.lang == 'ch' ? '下一节' : 'Next' }}：{{ nextItem.title }}
					</a>
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
import './foundation.less'

export default {
	props: {
		list: Array,
		title: String,
	},
	data() {
		return {
			curIdx: 0,
		}
	},
	computed: {
		curItem() {
			return this.list[this.curIdx]
		},
		nextItem() {
			return this.list[this.curIdx + 1]
		},
	},
	methods: {
		clickH3(i) {
			this.curIdx = i
			// console.log()
			window.scrollTo(0, this.$refs.leftIndex.$el.offsetParent.offsetTop + 90)
		},
	}
}
</script>