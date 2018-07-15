<template>
	<svg :style='{ width: settings.width +"px", height: settings.height +"px" }'>
		<g class='chart-container'>
		</g>
	</svg>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		data() {
			return {
				settings: {
					width: 600,
					height: 300,
					cellSize: 17
				},
				colors: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
				margin: {
					top: 10,
					right: 20,
					bottom: 30,
					left: 40
				},
				heatmapArray: [],
				datas: [
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1501372800},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1501977600},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1502582400},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1503187200},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1503792000},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1504396800},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1505001600},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1505606400},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1506211200},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1506816000},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1507420800},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1508025600},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1508630400},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1509235200},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1509840000},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1510444800},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1511049600},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1511654400},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1512259200},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1512864000},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1513468800},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1514073600},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1514678400},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1515283200},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1515888000},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1516492800},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1517097600},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1517702400},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1518307200},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1518912000},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1519516800},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1520121600},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1520726400},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1521331200},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1521936000},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1522540800},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1523145600},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1523750400},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1524355200},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1524960000},
						{days: [0, 3, 0, 9, 42, 1, 0], total: 55, week: 1525564800},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1526169600},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1526774400},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1527379200},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1527984000},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1528588800},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1529193600},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1529798400},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1530403200},
						{days: [0, 0, 0, 0, 0, 0, 0], total: 0, week: 1531008000},
						{days: [0, 3, 0, 9, 32, 1, 0], total: 45, week: 1531612800}
				],
				week: '',
			}
		},
		mounted() {
			this.calculatePath(this.datas)
		},
		methods: {
			convertTimestamp(UNIXtimestamp) {
				let date = new Date(UNIXtimestamp * 1000)
				date = this.formatDays(date)
				return date
			},
			formatDays(date) {
				const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`
			},
			formatDatas(data, index, baseDate) {
				baseDate = this.convertTimestamp(baseDate)
				let day = new Date(baseDate)
				day.setDate( day.getDate() + index )
				this.heatmapArray.push({ 'day': this.formatDays(day), 'count': data }) 
			},
			calculatePath(data) {
				data.forEach( d => {
					for(let i = 0; i < d.days.length; i++) {
						this.formatDatas(d.days[i], i, d.week)
					}
				})
				console.log(this.heatmapArray)

				const x = d3.scaleBand().range([0, this.settings.width]).padding(0.1)
				const y = d3.scaleLinear().range( [this.settings.height, 0] )
				const colors = d3.scaleQuantize()
									.domain([0, 10])
									.range(this.colors)

				let g = d3.select('.chart-container')
							.attr( 'transform', 'translate('+ (( this.settings.width - this.settings.cellSize * 53 ) / 2) +','+ ( this.settings.height - this.settings.cellSize * 7 - 1) + ')' )

		

			}
		}
	}
</script>

<style lang='scss' scoped>
	svg {
		margin: 25px;
	}
	path {
		fill: none;
		stroke: #19b5ff;
		stroke-width: 2px;
	}
</style>