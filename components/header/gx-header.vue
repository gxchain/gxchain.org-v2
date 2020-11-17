<style lang="less" src="./header.less"></style>

<template>
<header ref="header" :style="{'background': bgColor}" :class="{'bg_dark': isBgDark}"
	class="gxb-header pos-f top-0 w100p bg-white- d-flex al-c">
	<a class="d-i-flex al-c" href="/">
		<img :src="isDark || route == '/' || isBgDark && isPC ? '/gxchain-2.svg' : '/gxchain.svg'" style="height: 20px;">
		<!-- <img src="/icon1.svg" alt="">
		<span class="color-1 fz-25 ml-5">𝖦𝖷𝖢𝗁𝖺𝗂𝗇</span> -->
	</a>
	<div class="al-c ml-auto d-n hide-nav">
		<h1 class="mr-10 fz-16" @click="showMenu = !showMenu" v-if="curItem">{{ curItem.label }}</h1>
		<close-menu v-model="showMenu"></close-menu>
	</div>

	<!-- 下拉菜单背景蒙板 -->
	<div class="pos-f left-0 nav-bg-mask" 
		@click="showMenu = false" @touchstart="showMenu = false" 
		v-if="showMenu"></div>

	<ul class="d-i-flex al-c top-nav ml-auto" :class="{ show: showMenu }">
		<li class="ml-10 fz-14 pos-r"
			v-for="(item) in navList" :key="item.href">
			<a :href="item.href" :class="{'color-1 fw-b': route == item.href }">{{ item.label }}</a>
			<ul class="sub-list bg-white" v-if="item.subLinks.length">
				<li v-for="(row, j) in item.subLinks" :key="j">
					<a :href="row.link" :target="/^http/.test(row.link) ? '_blank' : ''"
						:class="{'color-1 fw-b': $route.path == row.link }">
						{{ row.label }}
					</a>
				</li>
			</ul>
		</li>
		<li class="ml-30 fz-12 d-i-flex al-c lang-wrap">
			<template v-for="(row, j) in langList" >
				<a :href="row.href + $route.path" :key="row.href" class="lang-a" :class="{'active': lang == row.lang }">
					{{ row.label }}
				</a>
				<span v-if="j < langList.length - 1" :key="j">|</span>
			</template>
			<!-- <span class="iconfont op-touch ml-10" :class="isDark ? 'icon-moon' : 'icon-sun'" @click="toggleDark"></span> -->
		</li>
	</ul>
</header>
</template>

<script>
// import '@/assets/css/style.less'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			showMenu: false,
			bgColor: null,
			isBgDark: false,
			host: 'gxb.hqs.link',
		}
	},
	computed: {
		...mapState({
			baseHost: s => s.baseHost,
			route: s => s.route,
			lang: s => s.lang,
			isDark: s => s.isDark,
			isBannerBg: s => s.isBannerBg,
			navList: s => s.navList,
			isPC: s => s.clientWidth > 992,
		}),
		langList() {
			return [
				{ label: '中文', lang: 'ch', href: '//'+this.baseHost },
				{ label: 'EN', lang: 'en', href: '//en.'+this.baseHost },
				{ label: '한국어', lang: 'kr', href: '//kr.'+this.baseHost },
			]
		},
		curItem() {
			return this.navList.filter(it => it.href == this.$route.path)[0]
		},
	},
	created() {
		if(this.route == '/institution') {
			this.bgColor = '#fff'
		}
		else if(this.route != '/') {
			this.isBgDark = true
		}
	},
	mounted() {
		if(this.isBgDark) {
			let preOpacity = 0
			window.addEventListener('scroll', () => {
				let opacity = 0
				const atop = this.isPC ? 100 : 30
				const btop = this.isPC ? 200 : 80
				const sy = window.scrollY
				if(sy > btop) opacity = 1
				else if(sy > atop) {
					opacity = (sy - atop)/(btop - atop)
				}
				if(opacity != preOpacity) {
					preOpacity = opacity
					this.isBgDark = opacity < 0.3
					this.bgColor = `rgba(255, 255, 255, ${opacity.toFixed(2)})`
				}
			})
		}
	},
	methods: {
		toggleDark() {
			const isDark = !this.isDark
			localStorage.isDark = isDark ? 1 : ''
			this.$store.commit('setData', {
				isDark,
			})
		},
	},
}
</script>