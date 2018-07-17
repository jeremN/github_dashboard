<template>
	<div class="heatmap-container">
	</div>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		props: ['datas'],
		data() {
			return {
				settings: {
					width: 600,
					height: 300,
					cellSize: 17
				},
				colors: ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'],
				margin: {
					top: 10,
					right: 20,
					bottom: 30,
					left: 40
				},
				days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				gridSize: 20,
				gridMargin: 2,
				lookup: null,
			}
		},
		mounted() {
			this.calculatePath(this.datas)
		},
		methods: {
			weeksInMonth(month) {
				let m = d3.timeMonth.floor(month)
				return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length
			},
			calculatePath(data) {

				let minDate = d3.min( data, d => new Date(d.day) )
				let maxDate = d3.max( data, d => new Date(d.day) )

				let D = d3.timeFormat('%w'),
					W = d3.timeFormat('%U'),
					format = d3.timeFormat('%Y-%d-%b'),
					monthName = d3.timeFormat('%B'),
					titleFormat = d3.utcFormat('%a, %d-%b'),
					M = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate)

				let monthGroup = d3.select('.heatmap-container')
					.selectAll('.monthGroup')
					.data(M)
					.enter()
					.append('svg')
					.attr( 'class', 'monthGroup' )
					.attr( 'height', ( (this.gridSize * 7) + (this.gridMargin * 8) + 20 ) )
					.attr( 'width', d => ( (this.gridSize * this.weeksInMonth(d)) + (this.gridMargin * (this.weeksInMonth(d) + 1)) ) )
					.append('g')

				monthGroup.append('text')
					.attr('class', 'monthName')
					.attr( 'y', (this.gridSize * 7) + (this.gridMargin * 8) + 15 )
					.attr( 'x', d =>  ( ((this.gridSize * this.weeksInMonth(d)) + (this.gridMargin * (this.weeksInMonth(d) + 1))) / 2) )
					.attr( 'text-anchor', 'middle' )
					.text( d => monthName(d))

				let rect = monthGroup.selectAll('rect.day')
				    .data( (d, i) => d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1)) )
				    .enter().append('rect')
				    .attr( 'class', 'day' )
				    .attr( 'width', this.gridSize )
				    .attr( 'height', this.gridSize )
				    .attr( 'fill', '#eaeaea' )
				    .attr( 'y', d => (D(d) * this.gridSize) + (D(d) * this.gridMargin) + this.gridMargin )
				    .attr( 'x', d => ((W(d) - W(new Date(d.getFullYear(),d.getMonth(), 1))) * this.gridSize) + ((W(d) - W(new Date(d.getFullYear(),d.getMonth(), 1))) * this.gridMargin) + this.gridMargin  )
				    .datum(format)

				 rect.append('title')
				 	.text(d => d)

				let lookup = d3.nest()
					.key( d => d.day )
					.rollup( leaves => d3.sum(leaves, d => parseInt(d.count) ) )
					.object(data) 

				let scale = d3.scaleLinear()
					.domain( d3.extent(data, d => parseInt(d.count)) )
					.range([0.5, 1])

				rect.filter( d => d in lookup )
					.style( 'fill', d => d3.interpolateCool(scale(lookup[d])) )
					.select('title')
					.text( d => d + ': ' + lookup[d] )
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