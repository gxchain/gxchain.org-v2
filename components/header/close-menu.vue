<style lang="less">
.close-menu {
	width: 25px;
	height: 30px;
	cursor: pointer;
	span {
		position: relative;
		display: block;
		top: 15px;
	}
	span::after, span::before {
		width: 100%;
		height: 2px;
		background: #5a5a5a;
		transition: all 0.3s;
		// backface-visibility: hidden;
		// border-radius: 5px;
	}
	span::after, span::before {
		content: "";
		position: absolute;
		left: 0;
		top: -7px;
	}
	span::after {
		top: 7px;
	}
	&.on {
		span {
			background: transparent;
		}
		span:before {
			transform: rotate(45deg) translate(5px, 5px);
			top: -9px;
		}
		span:after {
			transform: rotate(-45deg) translate(7px, -8px);
			top: 9px;
		}
	}
}
</style>
<template>
<div class="close-menu" :class="{ 'on': isOn }" @click="onClick">
	<span></span>
</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
	},
	data() {
		return {
			isOn: false,
		}
	},
	watch: {
		value(val) {
			this.isOn = val
		}
	},
	methods: {
		onClick() {
			this.isOn = !this.isOn
			this.$emit('input', this.isOn)
		},
	},
}
</script>