<style lang="less" src="./default.less"></style>

<template>
<div v-if="clientWidth" :class="[{
		'dark': isDark,
		'banner_bg': isBannerBg,
	}, 'page'+route.replace('/', '_')]">
	<gx-header></gx-header>
	<div class="main">
		<Nuxt />
	</div>
	<gx-footer></gx-footer>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			route: s => s.route,
			isDark: s => s.isDark,
			isBannerBg: s => s.isBannerBg,
			clientWidth: s => s.clientWidth,
		}),
	},
	mounted() {
		if(localStorage.isDark == 1) {
			this.$store.commit('setData', {
				isDark: true,
			})
		}
		this.setWH()
		window.onresize = () => {
			this.setWH()
		}
		setInterval(() => {
			this.$store.commit('setData', {
				nowDate: new Date(),
			})
		}, 1000)
	},
	methods: {
		setWH() {
			const { clientWidth, clientHeight } = window.document.documentElement
			this.$store.commit('setData', {
				clientWidth,
				clientHeight,
			})
		},
	},
}
</script>