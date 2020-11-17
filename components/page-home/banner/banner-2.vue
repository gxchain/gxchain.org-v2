<style lang="less">
.banner-2 {
	padding: 100px 30px 0;
	overflow: hidden;
	.chart-wrap {
		min-height: 310px;
	}
	.wrap {
		max-width: 1150px;
		margin: 0 auto;
	}
	color: #fff;
	background: #3c4463 ;
	.dot-1 {
		padding: 3px;
		background: #08ff08;
		&.err {
			background: #f22;
		}
	}
	.num-wrap {
		.item {
			min-width: 120px;
		}
	}
	.more-link {
		display: inline-block;
		background: #fff;
		color: #3c4463;
		padding: 8px 20px;
		font-size: 14px;
		&:hover {
			background: rgba(255, 255, 255, .8);
		}
	}
}
@media screen and (max-width: 650px) {
	.banner-2 {
		.num-wrap {
			display: block;
			.item {
				margin-bottom: 20px;
			}
		}
		.slogan {
			text-align: center;
			.desc {
				margin-top: 10px;
				margin-bottom: 20px;
				font-size: 16px;
			}
		}
		.more-link {
			margin-bottom: 30px;
		}
	}
}
</style>

<template>
<div class="banner-2" ref="banner">
	<div class="wrap">
		<el-row :gutter="30">
			<el-col :xs="24" :sm="8" :md="8">
				<div class="mb-20 slogan">
					<h2 class="fz-30">GXChain</h2>
					<div class="mt-20 white-8 fz-18 desc">
						{{ isCh ? '可信数据的价值网络' : 'A Trusted Data Internet of Value' }}
					</div>
					<div class="mt-30">
						<a href="/about" class="more-link">{{ isCh ? '了解更多' : 'Learn More' }}</a>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="16" :md="16">
				<div class="pos-r chart-wrap">
					<div class="pos-a top-0 w100p z-100" style="left: 5px;">
						<div class="d-flex num-wrap">
							<div class="item mr-30" v-for="(item, i) in numList" :key="i">
								<p class="fz-14 mb-10 white-5">{{ item.title }}</p>
								<div :id="'b-num' + i" class="fz-20 white-8">
									{{ item.num }}
								</div>
							</div>
						</div>
						<div class="fz-12 mt-10 d-flex al-c op-5">
							<span class="dot-1 d-b bdrs-100 mr-10" :class="transErr ? 'err' : ''"></span>
							<span class="white-5">{{ isCh ? `${dureSec}秒前更新` : `updated at ${dureSec}s ago` }}</span>
						</div>
					</div>
					<gxb-line></gxb-line>
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { CountUp } from './countup.js'

export default {
	props: {
		dureTxt: String,
	},
	data() {
		return {
			dureSec: 0,
			transErr: false,
			updateTimes: 0,
		}
	},
	watch: {
		transNum(val, oldVal) {
			this.animNum(0, val, oldVal)
		},
		accountNum(val, oldVal) {
			this.animNum(1, val, oldVal)
		},
	},
	computed: {
		...mapState({
			isCh: s => s.lang == 'ch',
		}),
	},
	mounted() {
		window.addEventListener('scroll', () => {
			this.height = this.$refs.banner.offsetHeight
			this.$store.commit('setData', {
				isBannerBg: window.scrollY < this.height - 60,
			})
		})
		this.animNum(0, this.transNum)
		this.animNum(1, this.accountNum)
		this.setTiming()
	},
	methods: {
		setTiming() {
			setTimeout(async () => {
				this.dureSec += 1
				if(this.dureSec >= 6) {
					try {
						await this.$store.dispatch('getTransData', {
							times: ++this.updateTimes,
						})
						this.dureSec = 0
						this.transErr = false
					} catch (error) {
						this.transErr = true
					}
				}
				this.setTiming()
			}, 1e3)
		},
		animNum(ref, endVal, startVal = 0) {
			const target = document.querySelector('#b-num' + ref)
			const countUp = new CountUp(target, endVal, {
				startVal,
				duration: 0.8,
			})
			countUp.start()
		},
	},
}
</script>