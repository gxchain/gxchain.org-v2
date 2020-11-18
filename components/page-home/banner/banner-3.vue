<style lang="less">
.banner-3 {
	background: linear-gradient(180deg, #08035b, #1d169a);
	.panel-1 {
		background: none;
		background: url(/bg/bg-net.svg) no-repeat;
		background-size: 100%;
		background-position: center 0%;
		padding-top: 80px!important;
		padding-bottom: 20px;
	}
	.pos-mask {
		// z-index: -1;
		animation: anim_shine1 3s infinite;
	}
	@keyframes anim_shine1 {
		40% { opacity: .4; }
		70% { opacity: .3; }
	}
	color: #DBDBDB;
	.logo {
		margin-top: 24px;
		height: 36px;
	}
	.slogan {
		font-size: 18px;
		font-weight: 200;
		&.is-ch {
			letter-spacing: 20px;
		}
		margin-top: 20px;
	}
	.more-link a {
		background: #9343FF;
		color: inherit;
		border-radius: 5px;
		padding: 6px 20px;
		font-size: 13px;
		&:hover {
			background: #9343FF*1.1;
		}
	}
	.num-wrap {
		max-width: 700px;
		margin-top: 50px;
		border-radius: 10px 10px 0 0;
		overflow: hidden;
		.num-list {
			background: #2E27A5;
		}
		.item {
			padding: 15px 10px;
		}
		.item0 {
			width: 30%;
			background: #3730AE;
			padding-left: 30px;
			margin-right: 20px;
		}
		.item1 {
			width: 22%;
		}
		.item2 {
			margin-right: 0;
			padding-right: 0;
		}
	}
	.dot-1 {
		padding: 3px;
		background: #08ff08;
		&.err {
			background: #f22;
		}
	}
	.chart-wrap {
		max-width: 800px;
		height: 240px;
	}
}
@media screen and (max-width: 700px) {
	.banner-3 {
		.panel-1 {
			background-position: center 0;
			background-size: 140%;
		}
		.slogan.is-ch {
			letter-spacing: 15px;
		}
		.num-wrap .num-list {
			.item {
				.fz-20 {
					font-size: 14px;
				}
			}
			.item0 {
				// background: none;
				padding-left: 10px;
				margin-right: 0;
			}
			.item2 .fz-20 {
				padding-top: 1px;
				font-size: 12px;
			}
		}
	}
}
</style>
<template>
<div class="banner-3 pos-r ov-h" ref="banner">
	<!-- <bg-net class="pos-mask"></bg-net> -->
	<!-- <img src="/bg-net.svg" class="pos-mask"> -->
	<div class="panel-1">
		<div class="wrap">
			
			<div class="ta-c">
				<img src="/gxchain-2.svg" class="logo">
				<p class="slogan" :class="isCh ? 'is-ch' : ''">{{ slogan }}</p>
				<div class="more-link mt-30">
					<a href="/about" class="d-ib">{{ moreTxt }}</a>
				</div>
			</div>
			<div class="num-wrap m-auto">
				<div>
					<div class="d-flex num-list">
						<div class="item mr-10" :class="'item'+i" v-for="(item, i) in numList" :key="i">
							<p class="fz-14 mb-10 white-5">{{ item.title }}</p>
							<div :id="'b-num' + i" class="fz-20 white-8 f-num">
								{{ item.num }}
							</div>
						</div>
					</div>
					<div class="fz-12 mt-10 d-flex al-c op-5">
						<span class="dot-1 d-b bdrs-100 mr-10" :class="transErr ? 'err' : ''"></span>
						<span class="white-5">{{ isCh ? `${dureSec}秒前更新` : `updated at ${dureSec}s ago` }}</span>
					</div>
				</div>
			</div>
			<div class="chart-wrap pos-r m-auto mt-30">
				<gxb-line class="pos-a w100p btm-0 left-0"></gxb-line>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { CountUp } from './countup.js'
// import bgNet from './bg-net.vue'

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
	computed: {
		...mapState({
			lang: s => s.lang,
			isCh: s => s.lang == 'ch',
			transNum: s => s.transNum,
			accountNum: s => s.accountNum,
		}),
		slogan() {
			if(this.lang == 'kr') return '신뢰할 수 있는 데이터 가치 네트워크'
			return this.isCh ? '可信数据的价值网络' : 'A Trusted Data Internet of Value'
		},
		moreTxt() {
			if(this.lang == 'kr') return '더 보기'
			return this.isCh ? '了解更多' : 'Learn More'
		},
		numList() {
			let arr = ['Total Transactions', 'Total Accounts', 'Running Duration']
			if(this.lang == 'kr') arr = ['총 거래 수', '계정 수', '운영 시간']
			else if(this.isCh) arr = ['总交易数', '账户数', '运行时间']
			return [
				{
					title: arr[0],
					num: this.transNum,
				},
				{
					title: arr[1],
					num: this.accountNum,
				},
				{
					title: arr[2],
					num: this.dureTxt,
				},
			]
		},
	},
	watch: {
		transNum(val, oldVal) {
			this.animNum(0, val, oldVal)
		},
		accountNum(val, oldVal) {
			this.animNum(1, val, oldVal)
		},
	},
	mounted() {
		window.addEventListener('scroll', () => {
			this.height = (this.$refs.banner || {}).offsetHeight
			if(this.height) this.$store.commit('setData', {
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
	}
}
</script>