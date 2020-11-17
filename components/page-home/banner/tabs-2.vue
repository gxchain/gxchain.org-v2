<style lang="less">
.tabs-2 {
	color: rgba(255, 255, 255, .3);
	.item {
		margin-right: 20px;
		&:last-of-type {
			margin-right: 0;
		}
		&.active {
			color: rgba(255, 255, 255, .7);
		}
	}
}
</style>

<template>
<div class="tabs-2 d-flex flex-center al-c fz-12">
	<div class="item op-touch" :class="{ 'active': i == curIdx }" @click="curIdx = i"
		v-for="(item, i) in list" :key="i">
		{{ $store.state.lang == 'ch' ? item.label : item.en }}
	</div>
</div>
</template>

<script>
export default {
	props: {
		list: Array,
		value: {
			type: Number,
			default: 0,
		}
	},
	data() {
		return {
			curIdx: this.value,
		}
	},
	watch: {
		curIdx(val) {
			this.$emit('input', val)
		},
	},
}
</script>