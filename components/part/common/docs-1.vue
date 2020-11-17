<style lang="less">
.home {
	&.docs-1 .item {
		// background: linear-gradient(180deg, #3045B8, #5687F5);
		background-size: 100%;
		background-repeat: no-repeat;
		max-width: 340px;
		padding: 20px;
		border-radius: 10px;
		min-height: 300px;
		h3 {
			color: #fff;
		}
		a {
			color: rgba(255, 255, 255, .8);
		}
		.sub-title, .label {
			color: rgba(255, 255, 255, .6);
		}
		&.eq-0 {
			background-image: url(/bg/home/docs-0.png);
		}
		&.eq-1 {
			background-image: url(/bg/home/docs-1.png);
		}
		&.eq-2 {
			background-image: url(/bg/home/docs-2.png);
		}
	}
}
@media screen and (max-width: 700px) {
	.home.docs-1 .item {
		min-height: initial;
	}
}
.docs-1 {
	.item {
		h3 {
			margin-bottom: 3px;
		}
		a {
			display: inline-block;
			color: #6699FF;
			font-weight: bold;
			&:hover {
				opacity: .85;
			}
			i {
				position: relative;
				top: 2px;
			}
		}
	}
}

</style>

<template>
<div class="docs-1 panel-1">
	<div class="wrap">
		<slot>
			<h2>{{ title }}</h2>
		</slot>
		<el-row :gutter="30">
			<el-col :xs="24" :sm="12" :md="8" 
				v-for="(item, i) in list" :key="i">
				<div class="item mt-50" :class="'eq-' + i">
					<h3>{{ item.title }}</h3>
					<p class="sub-title gray-a fz-13 mb-10 lh-15">{{ item.subTitle }}</p>
					<p class="mb-10 fz-14" v-for="(row, j) in item.subs" :key="j">
						<a :href="row.link" target="_blank">
							<i class="iconfont" :class="/github/.test(row.link) ? 'icon-github' : iconLink"></i>
							<span>{{ row.tag }}</span>
						</a>
						<span class="label">{{ row.label }}</span>
					</p>
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	props: {
		info: Object,
		title: String,
		iconLink: {
			type: String,
			default: 'icon-link2',
		},
	},
	computed: {
		list() {
			if(!this.info) return []
			const arr = this.info.lines.join('\n').split('\n\n')
			const list = []
			for(const txt of arr) {
				const arr2 = txt.split('\n')
				const row = {
					title: arr2[0],
					subTitle: arr2[1],
					subs: [],
				}
				arr2.splice(0, 2)
				for(const txt2 of arr2) {
					const arr3 = txt2.replace('https://', '').split(/[:\s]\s*/)
					const label = arr3.length == 1 ? '' : arr3[0]
					const link = arr3.length == 1 ? arr3[0] : arr3[1]
					const tag = /github.com\//.test(link) ? /[^\/]+$/.exec(link)[0] : link
					row.subs.push({
						label,
						link: 'https://' + link,
						tag,
					})
				}
				list.push(row)
			}
			return list
		},
	}
}
</script>