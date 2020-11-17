<template>
<div>
	<!-- <tabs-2 :list="trendTabs" v-model="trendIdx" class="pos-a top-0 w100p mt-20 z-100"></tabs-2> -->
	<client-only>
		<ve-line area v-bind="lineOpt" class="m-auto op-8"></ve-line>
	</client-only>
</div>
</template>

<script>
import { mapState } from 'vuex'
const whiteOp = 'rgba(255,255,255,.2)'
const axisLabel = {
	textStyle: {
		color: whiteOp,
		fontSize: 10,
	},
}

export default {
	data() {
		return {
			trendTabs: [
				{
					label: '价格(元)',
					name: 'price',
					en: 'price($)'
				},
				{
					label: '交易数',
					name: 'trans',
					en: 'transactions',
				},
				// {
				// 	label: '成交量(元)',
				// 	name: 'volumn',
				// 	type: 'bar',
				// 	en: 'volumn($)',
				// },
			],
			trendIdx: 0,
		}
	},
	computed: {
		...mapState({
			isCh: s => s.lang == 'ch',
			isMobile: s => s.clientWidth < 650,
			priceTrend: s => s.configMap.trendList,
		}),
		
		trendItem() {
			return this.trendTabs[this.trendIdx]
		},
		lineOpt() {
			const xData = []
			const label = {
				normal: {
					show: true,
					position: 'top',
					formatter: (params) => {
						return (this.isCh ? '￥' : '$') + params.data
					},
					textStyle: {
						color: whiteOp,
						fontSize: 9,
					},
				}
			}
			const item = this.trendItem
			const isPrice = item.name == 'price'
			const series = [
				{
					name: this.isCh ? item.label : item.en,
					type: item.type || "line",
					data: [],
					label: isPrice ? label : null,
					lineStyle: {
						// color: 'green',
						width: 3,
					},
				},
			]
			let yAxis = {
				show: false,
				splitLine: {
					show: false
				},
				axisLabel,
			}
			if(isPrice) {
				series[0].yAxisIndex = 1
				series.unshift({
					name: this.isCh ? '成交量(元)' : 'volumn($)',
					type: 'bar',
					data: [],
				})
				yAxis = [yAxis, {
					...yAxis,
					show: false,
				}]
			}
			for(const row of this.priceTrend) {
				let num = row.volumn
				if(item.name == 'trans') {
					if(!row.trans) continue
					num = row.trans
				}
				xData.push(row.date)
				series[0].data.push(num)
				if(isPrice) series[1].data.push(row.coin)
			}
			return {
				settings: {
					// area: true,
				},
				// tooltipVisible: false, // 划过显示
				legendVisible: false, // 头部图例显示
				grid: {
					left: -60,
					bottom: 40,
					right: this.isMobile ? -20 : 0,
				},
				tooltip: {
					show: true,
					type: 'line',
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: whiteOp,
						},
					},
					// formatter: params => {}
				},
				colors: ['rgb(57, 79, 182, .8)', 'rgb(147, 67, 255, .7)'],
				// axisLabel: { // 展示刻度
				// 	show: false
				// },
				height: '300px',
				yAxis,
				xAxis: {
					data: xData,
					// name: 'date',
					axisLabel,
				},
				series,
			}
		},
	}
}
</script>