<style lang="less">
.eco-app {
	.wrap {
		max-width: 900px;
	}
}
.app-list {
	margin-top: 60px;
	color: #fff;
	.item {
		border-radius: 5px;
		overflow: hidden;
		.bg-img {
			min-height: 140px;
			object-fit: cover;
		}
		.bdb-1 {
			padding-bottom: 15px;
			border-color: rgba(255, 255, 255, .5);
		}
		.left {
			left: 30px;
			bottom: 30px;
			width: 50%;
		}
	}
	.icon {
		@size: 60px;
		width: @size;
		height: @size;
		border-radius: 6px;
		margin-right: 15px;
		img {
			width: 65%;
		}
	}
	.down-btn {
		.op-touch {
			padding: 6px 10px;
		}
		img {
			width: 12px;
			margin-right: 6px;
		}
		position: relative;
		&:hover ul {
			display: block;
		}
		ul {
			display: none;
			top: 100%;
			background: #333;
			li {
				padding: 4px 0;
				&:hover {
					background: #2e27a5;
				}
			}
			a {
				color: #fff;
			}
		}
	}
}
@media screen and (max-width: 800px) {
	.app-list {
		.item {
			.bg-img {
				height: 150px;
			}
			.left {
				width: 65%;
				left: 20px;
				bottom: 15px;
			}
			.icon {
				@size: 22px;
				width: @size;
				height: @size;
				margin-right: 10px;
			}
			.down-btn {
				.op-touch {
					padding: 4px 8px;
				}
			}
			.bdb-1 {
				padding-bottom: 8px;
			}
			.desc {
				margin-top: 8px;
				line-height: 1.2;
			}
		}
	}
}
</style>

<template>
<div class="panel-1 eco-app">
	<div class="wrap">
		<div class="ml-30-">
			<p class="fz-30 fw-b">GXChain</p>
			<h3 class="fz-50">{{ title }}</h3>
			<div class="lh-15 mt-20" v-if="isCh">
				在众多合作伙伴与项目的不断努力下，<br>
				GXChain 生态正在快速发展壮大，<br>
				共建下一代互联网基础设施。
			</div>
		</div>

		<div class="app-list">
			<div class="item pos-r mb-30"
				v-for="(item, i) in appList" :key="i">
				<img :src="item.img" class="bg-img w100p d-b ev-n">
				<div class="left pos-a">
					<div class="d-flex al-end bdb-1">
						<div class="d-flex al-c">
							<div class="icon bg-white pos-r">
								<img :src="item.icon" class="pos-center">
							</div>
							<h3>{{ item.title }}</h3>
						</div>
						<div class="ml-auto" v-if="item.link">
							<div class="down-btn fz-12">
								<div class="d-flex al-c bg-1 bdrs-100 op-touch" @click="onClick(item)">
									<img src="/icon/ic-xz.png" alt="">
									<span>{{ getBtnTxt(i) }}</span>
								</div>
								<ul class="pos-a left-0 w100p ta-c" v-if="item.links">
									<li v-for="(row, j) in item.links" :key="j">
										<a :href="row.link" target="_blank">{{ row.label }}</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="mt-15 desc lh-2">
						<p class="fz-12 white-8">{{ item.lines[0] }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		list: Array,
	},
	computed: {
		lang() {
			return this.$store.state.lang
		},
		isCh() {
			return this.lang == 'ch'
		},
		title() {
			if(this.lang == 'kr') return '생태계'
			if(this.lang == 'ch') return '生态系统'
			return 'Ecosystem'
		},
		appList() {
			return this.list.map(_it => {
				const it = { ..._it }
				if(!it.link) return it
				const arr = it.link.split('---')
				if(arr.length > 1) {
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
	},
	methods: {
		getBtnTxt(i) {
			return this.isCh ? (i > 2 ? '链接' : '下载') : 'Link'
		},
		onClick(item) {
			if(!item.links) window.open(item.link)
		},
	}
}
</script>