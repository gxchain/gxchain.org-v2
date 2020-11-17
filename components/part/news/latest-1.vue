<style lang="less">
.lastest-news {
	.w100p {
		max-height: 180px;
		object-fit: cover;
	}
}
</style>

<template>
<div class="side-news">
	<ul class="nav d-flex bdb-1">
		<li class="active">{{ title }}</li>
	</ul>
	<ul class="lastest-news mt-20">
		<li v-for="(item, i) in list" :key="i">
			<a :href="item.link" target="_blank">
				<img :src="item.img" :alt="item.title" class="w100p mt-10 op-touch">
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