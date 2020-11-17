<style lang="less">
.banner-1 {
	color: #fff;
	.swiper-slide {
		padding: 100px 30px 40px;
		background: linear-gradient(90deg,#139dff,#1ecfff);
		&.eq1 {
			background: linear-gradient(90deg, #ff6e25, #ffb11e);
		}
		&.eq2 {
			background: linear-gradient(90deg, #bc25ce, #ae62e6);
		}
		&.eq3 {
			background: linear-gradient(90deg, #24c071, #20e39c);
		}
	}
	.swiper-pagination-bullet-active {
		background: #fff;
	}
	.wrap {
		max-width: 1100px;
		margin: 0 auto;
	}
	.img-1 {
		height: 280px;
		pointer-events: none;
	}
	.btn-1 {
		color: #fff;
		display: inline-block;
		padding: 10px 30px;
		border: 2px solid;
	}
}
@media screen and (max-width: 700px) {
	.banner-1 {
		// padding: 80px 30px 30px;
		.img-1 {
			margin-top: 40px;
			height: 200px;
		}
	}
}
</style>

<template>
<div class="banner-1" ref="banner">
	<client-only>
	<swiper ref="mySwiper" :options="list.length > 1 ? swiperOptions : {}">
		<swiper-slide :class="'eq'+i%3" v-for="(item, i) in list" :key="i">
			<div class="wrap">
				<div class="d-flex flex-wrap">
					<div class="mt-20">
						<h2 class="fz-30">{{ item.title }}</h2>
						<div class="fz-18 mt-10">
							<p v-for="(txt, j) in item.lines" :key="j" v-html="txt"></p>
						</div>
						<a class="btn-1 mt-50 op-touch" 
							:target="/^http/.test(item.link) ? '_blank' : ''" 
							:href="item.link">
							{{ item.linkTxt || defLinkTxt }}
						</a>
					</div>
					<!--  -->
					<img :src="item.icon"
						class="ml-auto img-1">
				</div>
			</div>
		</swiper-slide>
		<div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
	</swiper>
	</client-only>
</div>
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
	// components: { Swiper, SwiperSlide },
	props: {
		list: Array,
	},
	data() {
		return {
			height: 500,
			swiperOptions: {
				loop: true,
				// slidesPerView: 'auto',
				autoplay: {
					delay: 5000,
				},
				// https://swiperjs.com/api/#pagination
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					// dynamicBullets: true,
				},
			},
		}
	},
	computed: {
		defLinkTxt() {
			return this.$store.state.lang == 'ch' ? '查看详情' : 'Detail'
		},
	},
	mounted() {
		// var mySwiper = new Swiper('.swiper-container', this.swiperOptions)
		window.addEventListener('scroll', () => {
			this.height = this.$refs.banner.offsetHeight
			this.$store.commit('setData', {
				isBannerBg: window.scrollY < this.height,
			})
		})
	}
}
</script>