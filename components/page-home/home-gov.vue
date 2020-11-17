<style lang="less">
#trust-nodes {
	position: relative;
    overflow: hidden;
    height: 220px;
	.world-1{
		position: absolute;
		right: -60px;
		width: 500px;
		height: 500px;
		z-index: 100;
		top: -110px;
		padding: 0;
		background: none;
		transform: scale(.9);
	}
}
.gov-icon-1 {
	width: 90%;
	opacity: .7;
}
@media screen and (max-width: 940px) {
	#trust-nodes {
		position: relative;
		height: 200px;
		overflow: visible;
		.world-1 {
			top: -90px;
			right:initial;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			max-width: 400px;
		}
	}
	.gov-icon-1 {
		position: absolute;
		top: -170px;
		right: -20px;
		width: 77%;
		opacity: .1;
	}
}
</style>
<template>
<block-1 :info="info" class="ov-h" is-right>
	<div class="title">
		<span class="fz-30">{{ info.title }}</span>
		<a href="/institution">{{ isCh ? '了解更多' : 'More' }}</a>
	</div>
	<template #right>
		<!-- <img :src="info.icon" class=" ml-20 gov-icon-1 ev-n"> -->
		<div id="trust-nodes">
			<world-1 :list="trustNodes"></world-1>
		</div>
	</template>
</block-1>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	computed: {
		isCh() {
			return this.$store.state.lang == 'ch'
		},
		trustNodes() {
			return this.$store.state.configMap.trustNodes
		},
	}
}
</script>