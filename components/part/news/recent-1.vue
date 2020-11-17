<style lang="less">
.recent-list {
	margin-top: 25px;
	li {
		padding: 6px 0 12px 15px;
		border-left: 1px solid #ddd;
		h3 .y-center {
			left: -20px;
			@size: 8px;
			width: @size;
			height: @size;
			border: 1px solid #ddd;
			border-radius: @size;
			background: #fff;
			transition: all ease 200ms;
		}
		&:hover {
			h3 .y-center {
				background: #6699FF;
				border-color: #6699FF;
			}
			
		}
	}
}
</style>

<template>
<div class="side-news">
	<ul class="nav d-flex bdb-1">
		<li class="active">{{ title }}</li>
	</ul>
	<ul class="recent-list">
		<li v-for="(item, i) in list" :key="i">
			<a :href="item.link" target="_blank">
				<h3 class="fz-14 pos-r">
					<i class="y-center"></i>
					<!-- 2020.09.15 杭州·周二 -->
					<span>{{ item.title }}</span>
				</h3>
				<div class="desc mt-5 gray-a fz-12 ta-j line-3">
					{{ item.desc }}
				</div>
			</a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props: {
		list: Array,
		title: String,
	},
}
</script>