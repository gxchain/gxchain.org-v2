<style lang="less">
.timeline-1 {
	padding: 80px 0;
	.wrap {
		max-width: none;
		padding-left: 80px;
		padding-right: 70px;
	}
	.item {
		padding: 10px 20px;
		padding-right: 30px;
		user-select: none;
		h3 {
			padding-bottom: 10px;
			margin-bottom: 20px;
			font-size: 20px;
		}
	}
}
@media screen and (max-width: 700px) {
	.timeline-1 {
		padding: 50px 0 40px;
		.wrap {
			padding-left: 10px;
			padding-right: 20px;
		}
		.item {
			padding-right: 20px;
		}
		h3 {
			font-size: 16px;
		}
	}
}
</style>

<template>
<div class="timeline-1 panel-1">
	<div class="ov-h wrap">
		<h2>{{ title }}</h2>
		<div class="bscroll mt-50">
			<div class="d-flex" :style="{ width: itemWidth*list.length + 'px'}">
				<div class="item shrink-0" :style="{ width: itemWidth+'px' }"
					v-for="(item, i) in list" :key="i">
					<h3 class="bdb-1">{{ item.title }}</h3>
					<slot :subs="item.subs"></slot>
					
				</div>
			</div>
		</div>
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
			if(w > 1300) return 380
			if(w > 500) return 360
			return 310
		},
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
		setBscroll() {
			this.$nextTick(() => {
				new BScroll('.bscroll', {
					scrollX: true,
					eventPassthrough: 'vertical',
					mouseWheel: true,
				})
			})
		}
	},
}
</script>