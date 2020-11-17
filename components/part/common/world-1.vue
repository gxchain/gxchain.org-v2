<style lang="less">
.world-1 {
	.item {
		width: 33%;
		margin-bottom: 15px;
		padding-right: 12px;
		.icon {
			width: 16px;
		}
	}
	.node-map {
		height: 300px;
		width: 140%;
		.pos-a {
			bottom: 0;
			width: 100%;
		}
	}
	.map-img {
		width: 80%;
		min-width: 300px;
		max-width: 450px;
	}
}
@media screen and (max-width: 767px) {
	.world-1 {
		.map-img {
			margin: 30px auto 0;
		}
	}
}
</style>
<template>
<div class="panel-1 world-1 bg-w1 ov-h">
	<div class="wrap">
		<h2>{{ title }}</h2>
		<div class="mt-50">
			<el-row>
				<el-col :xs="24" :sm="12" :md="12">
					<!-- <div class="list d-flex flex-wrap">
						<div class="item d-flex al-c" v-for="(item, i) in list" :key="i">
							<img :src="item.logo" class="icon">
							<span class="ml-10 fz-13 line-1">
								<a :href="item.url" target="_blank" class="color-1" v-if="item.url">{{ item.nodeName }}</a>
								<span v-else>{{ item.nodeName }}</span>
							</span>
						</div>
					</div> -->
					<div class="pos-r node-map">
						<client-only>
							<div class="pos-a">
								<ve-line graph v-bind="opts"></ve-line>
							</div>
						</client-only>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12">
					<img src="https://aoyi02.oss-cn-shanghai.aliyuncs.com/app/17/map2-3.png" class="map-img d-b">
				</el-col>
			</el-row>
			<!-- <client-only>
				<ve-map v-bind="opts"></ve-map>
			</client-only> -->
		</div>
	</div>
</div>
</template>

<script>
// https://github.com/gxchain/TrustNodes/blob/master/trustNodes.json
/* it.accountName
var json = temp1.filter(it => !!it.location).map(it => {
	return {
		name: it.nodeName + `(${it.location.city})`, 
		value: [it.location.longitude, it.location.latitude]
	}
})
*/
// import echarts from 'echarts'
export default {
	props: {
		list: Array,
		title: String,
	},
	computed: {
		opts() {
			var colorsArr = [
				['#ff4141','#ff8989'],
				['#e54948','#f08456'],
				['#11c46e','#f08456'],
				['#e5d273','#e4a37f'],
				['#35d17e','#49ddb2'],
				['#29c0fb','#2dc5b9'],
				['#277aec','#57c5ec'],
				['#277aec','#57c5ec'],
				['#277aec','#57c5ec'],
			]
			var datalist = [
				[1,96], [14,89], [30, 95],[50, 94],
				[0,78], [13,68], [30, 75],[50, 78],
				[0,50], [15,50], [30, 55],[50, 62],
				[20, 35], [40, 40], [55, 45],
				[5, 24], [30, 21], [50, 23],
				[15,5], [30, 2],[50, 0],
			]
			datalist.sort(() => {
				return .5 - Math.random()
			})
			var datas = [];
			for (let i in this.list.slice(0, datalist.length)) {
				var item = this.list[i]
				var offset = datalist[i]
				var d = i%2 == 0 ? i : (i - 1)
				var colors = colorsArr[(i - d/2)%colorsArr.length]
				datas.push({
					name: item.name + '\n' + Math.ceil(item.votes/1e5),
					linkUrl: item.url,
					value: offset,
					symbolSize: 10,
					label: {
						normal: {
							textStyle: {
								fontSize: 10,
								// fontWeight: 500,
								lineHeight: 16,
								color: item.url ? '#6699FF' : '#ffffff',
							}
						}
					},
					itemStyle: {
						normal: {
							color: item.url ? '#6699FF' : '#aaaaaa',
							opacity: .6
						}
					},
				})
			}
			
			return {
				backgroundColor: '#12468500',
				tooltipVisible: false,
				height: '320px',
				grid: {
					show: false,
					top: 10,
					bottom: 10
				},
				xAxis: [{
					gridIndex: 0,
					type: 'value',
					show: false,
					min: 0,
					max: 100,
					nameLocation: 'middle',
					nameGap: 5
				}],
				yAxis: [{
					gridIndex: 0,
					min: 0,
					show: false,
					max: 100,
					nameLocation: 'middle',
					nameGap: 30
				}],
				events: {
					click(e) {
						// console.log(e)
						const { linkUrl } = e.data
						if(linkUrl) window.open(linkUrl)
					},
				},
				series: [{
					type: 'effectScatter',
					// symbol: 'circle',
					// symbolSize: 120,

					hoverAnimation: true,
					label: {
						normal: {
							show: true,
							formatter: '{b}',
							color: '#fff',
							textStyle: {
								fontSize: '20'
							}
						},
					},
					itemStyle: {
						normal: {
							color: '#00acea'
						}
					},
					data: datas
				}]
			};
		},
	
	}
}
</script>