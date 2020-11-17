<style lang="less" src="./foundation.less"></style>

<template>
<div class="panel-1 foundation-1">
	<div class="wrap pos-r">
		<h2>{{ $store.state.lang == 'ch' ? '基金会' : 'Foundation' }}</h2>
		<el-row class="mt-50">
			<el-col :xs="24" :sm="24" :md="8" class="left-index bg-white bdb-1" ref="leftIndex">
				<div class="h3-wrap">
					<h3 class="fz-14 mb-20" :ref="'h3' + i"
						:class="i == curIdx ? 'color-1 fw-b' : 'op-touch'"
						@click="clickH3(i)"
						v-for="(item, i) in list" :key="i">
						{{ 1+i }}. {{ item.title }}
					</h3>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :md="16">
				<div class="con fz-14 gray-6 lh-2">
					<div class="mb-50" :ref="'con' + i"
						v-for="(item, i) in list" :key="i">
						<h3 class="fw-b mb-10 gray-3">{{ 1+i }}. {{ item.title }}</h3>
						<div v-html="item.lines.join('')"></div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
// import '@/components'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			clientWidth: s => s.clientWidth,
			list: s => s.introList.filter(it => it.pos == 'found')
		}),
		isPc() {
			return this.clientWidth > 926
		},
		hGap() {
			return this.isPc ? 70 : 160
		},
	},
	data() {
		return {
			curIdx: 0,
			scrollMap: {},
			h3XMap: {},
			
		}
	},
	mounted() {
		this.getBound()
		// window.addEventListener('resize', () => {
		// 	this.getBound()
		// })
		window.onscroll = () => {
			let curIdx = 0
			for(const idx in this.scrollMap) {
				if(window.scrollY > this.scrollMap[idx] - this.hGap - 10) curIdx = idx
			}
			if(this.curIdx != curIdx) {
				this.curIdx = curIdx
				if(!this.isPc) this.$refs.leftIndex.$el.scrollTo(this.h3XMap[curIdx] - 50, 0)
			}
		}
	},
	methods: {
		getBound() {
			this.$nextTick(() => {
				for(const i in this.list) {
					this.scrollMap[i] = this.getTop(i)
					this.h3XMap[i] = this.$refs['h3' + i][0].getBoundingClientRect().left
				}
			})
		},
		getTop(i) {
			return this.$refs['con' + i][0].getBoundingClientRect().top
		},
		clickH3(i) {
			this.curIdx = i
			const top = this.getTop(i) - this.getTop(0) + this.scrollMap[0]
			window.scrollTo(0, top - this.hGap)
			this.scrollMap[i] = top
			setTimeout(() => {
				this.curIdx = i
			}, 10)
		},
	},
	// async fetch({ store, ...args }) {
	// 	await store.dispatch('initData', args)
	// },
}
</script>