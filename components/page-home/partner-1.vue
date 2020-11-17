<style lang="less">
.partner-1 {
	.item {
		background: #fff;
		border: 1px solid #dedede;
		margin-bottom: 25px;
		height: 80px;
		border-radius: 6px;
		&:hover {
			box-shadow: 0 0 8px #ddd;
		}
		h3 {
			width: 150px;
		}
		.icon {
			max-height: 30px;
			max-width: 80%;
			&.ic-dark {
				height: 40px;
				padding: 5px 15px;
				background: #333;
				border-radius: 5px;
			}
		}
	}
}
@media screen and (max-width: 900px) {
	.partner-1 {
		.item {
			height: 60px;
			margin-bottom: 15px;
		}
	}
}
</style>
<template>
<div class="panel-1 partner-1">
	<div class="wrap">
		<slot>
			<h2>{{ info.title }}</h2>
		</slot>
		<div class="mt-50">
			<el-row :gutter="isPC ? 50 : 15">
				<!-- <template v-for="(item, i) in list"></template> -->
				<el-col :xs="6" :sm="6" :md="6" v-for="(row, j) in list" :key="j">
					<a class="item trans-200 d-b pos-r" :href="row.link" rel="nofollow" target="_blank">
						<img :src="row.icon" class="icon pos-center" :class="row.iconCls">
					</a>
				</el-col>
			</el-row>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		info: Object,
		isHome: Boolean,
	},
	computed: {
		isPC() {
			return this.$store.state.clientWidth > 700
		},
		list() {
			const list = []
			for(let txt of this.info.lines) {
				txt = txt.trim()
				// const item = list[list.length - 1]
				if(/^=/.test(txt)) {
					const title = txt.replace(/=/g, '')
					// list.push({
					// 	title,
					// 	subs: [],
					// })
				} else {
					const arr = txt.split(/[,，]/).map(it => it.trim())
					if(arr.length >= 3) {
						const obj = {
							label: arr[0],
							icon: arr[1],
							link: arr[2],
						}
						if(/\s/.test(obj.icon)) {
							const arr2 = obj.icon.split(/\s+/)
							obj.icon = arr2[0]
							obj.iconCls = 'ic-' + arr2[1]
						}
						// item.subs.push(obj)
						list.push(obj)
					}
				}
			}
			if(this.isHome) return list.slice(0, 8)
			return list
		},
	}
}
</script>