<style lang="less" src="./footer.less"></style>

<template>
<div class="footer-1 bg-gray-3">
	<!-- <div style="min-height: 300px;"></div> -->
	<div class="wrap">
		<div class="d-flex space-btw col-wrap">
			<div class="d-flex al-start flex-wrap">
				<ul class="nav-list" v-for="(item, i) in navList" :key="i">
					<li>
						<h3>
							<a :href="item.href">{{ item.label }}</a>
						</h3>
					</li>
					<li class="sub" v-for="(row, j) in item.links" :key="j" v-show="row.label != 'hide'">
						<a :href="row.link" :target="/^http/.test(row.link) ? '_blank' : ''">
							{{ row.label }}
						</a>
					</li>
				</ul>
			</div>
			<div class="ml-auto mb-30">
				<!-- <img src="/gxchain-2.svg" class="logo"> -->
				<h3 class="fz-16">关注我们</h3>
				<ul class="d-flex al-c mt-20 follow-list">
					<li class="mr-20 pos-r"
						v-for="(item, i) in followList" :key="i">
						<a :href="item.link" :target="item.link ? '_blank' : ''">
							<i class="iconfont fz-25" :class="item.icon"></i>
						</a>
						<div class="pos-a pop" :class="i > 3 ? 'right' : ''"
							v-if="item.popImg || item.popLinks">
							<img :src="item.popImg" v-if="item.popImg" class="pop-img">
							<ul class="pd-10" v-else-if="item.popLinks"
								:class="item.popLinks.length > 5 ? 'col-2 d-flex space-btw flex-wrap' : ''">
								<li v-for="(row, j) in item.popLinks" :key="j">
									<a :href="row.link" target="_blank" class="fz-12">
										{{ lang == 'ch' ? row.label : (row.en || row.label) }}
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="fz-12 gray">
			<p class="lh-15" v-if="lang == 'ch'">
				<a class="mr-10" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008310" target="_blank">
					浙公网安备33010602008310号
				</a>
				<a href="http://www.beian.miit.gov.cn/" target="_blank" class="d-ib">浙ICP备16042060号-1</a>
			</p>
			<div class="mt-10">
				© 2018-{{ Math.max(2020, (new Date()).getFullYear() )}} GXChain Foundation Ltd.
			</div>
		</div>
	</div>
</div>
</template>

<script>
import followList from './follow-list'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			followList,
		}
	},
	computed: {
		...mapState({
			lang: s => s.lang,
			navList: s => s.navList,
		}),
	}
}
</script>