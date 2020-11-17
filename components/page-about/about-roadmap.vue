<style lang="less">
.about-roadmap {
	.item {
		user-select: none;
		h3 {
			padding-bottom: 15px;
			font-size: 16px;
		}
		.icon {
			top: 30px;
			width: 14px;
		}
	}
	.bs-btn-wrap {
		user-select: none;
	}
}
@media screen and (max-width: 700px) {
	.about-roadmap {
		.item {
			
		}
	}
}
</style>

<template>
<div class="about-roadmap panel-1 ov-h">
	<div class="wrap">
		<h2>{{ title }}</h2>
	</div>
	<div class="bscroll mt-50">
		<div class="d-flex" :style="{ width: itemWidth*list.length + 'px'}">
			<div class="item ta-c shrink-0 pos-r" :style="{ width: itemWidth+'px' }"
				v-for="(item, i) in list" :key="i">
				<h3 class="bdb-1">{{ item.mon }}</h3>
				<img src="/icon/ic-road.png" class="icon x-center">
				<p class="fw-b fz-13 pd-10 mt-10">{{ item.msg }}</p>
			</div>
		</div>
	</div>
	<div class="ta-c gray mt-10 bs-btn-wrap">
		<i class="iconfont icon-lujing39 fz-25" @click="onScrollTo(-1)"
			:class="posX < 0 ? 'color-1 op-touch' : 'ev-n'"></i>
		<i class="iconfont icon-lujing38 fz-25 ml-30"  @click="onScrollTo(1)"
			:class="posX > maxScrollX ? 'color-1 op-touch' : 'ev-n'"></i>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
// import MouseWheel from '@better-scroll/mouse-wheel'

export default {
	props: {
		title: String,
		list: Array,
	},
	computed: {
		...mapState({
			clientWidth: s => s.clientWidth,
		}),
		itemWidth() {
			const w = this.$store.state.clientWidth
			if(w > 1000) return 200
			return 180
		},
	},
	data() {
		return {
			posX: 0,
			maxScrollX: 0,
			bs: null,
		}
	},
	watch: {
		itemWidth() {
			this.setBscroll()
		}
	},
	mounted() {
		// BScroll.use(MouseWheel)
		this.setBscroll()
	},
	methods: {
		onScrollTo(i) {
			this.posX = this.bs.x
			this.maxScrollX = this.bs.maxScrollX
			let idx = Math.floor(-this.posX/this.itemWidth)
			idx += i
			if(idx < 0) idx = 0
			this.bs.scrollTo(Math.max(-idx*this.itemWidth, this.maxScrollX), 0, 200)
		},
		setBscroll() {
			this.$nextTick(() => {
				const bs = new BScroll('.bscroll', {
					scrollX: true,
					eventPassthrough: 'vertical',
					// mouseWheel: true,
					// probeType: 3,
				})
				this.maxScrollX = bs.maxScrollX
				bs.on('scrollEnd', pos => {
					this.posX = pos.x
					// console.log(this.posX)
				})
				this.bs = bs
			})
		}
	},
}
</script>