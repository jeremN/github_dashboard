<template>
	<div class="card card-chart">
		<div class="card-heading">
			<h2 v-if="this.datas"><span class="color-blue">{{ sum }}</span> bytes of code</h2>
			<h2 v-else>No data to show</h2>
		</div>
		<div class="card-body">
			<svg :style='{ width: settings.width +"px", height: settings.height +"px" }'>
				<g class='chart-container' style='transform: translate(40, 20)'>
				</g>
			</svg>
		</div>
	</div>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		props: ['datas'],
		data() {
			return {
				settings: {
					width: '',
					height: 300,
				},
				colors: ['#c0bffc', '#00d8b5', '#003197', '#6261a3', '#025344'],
				margin: {
					top: 10,
					right: 20,
					bottom: 30,
					left: 40
				},
				sum: ''
			}
		},
		mounted() {
			this.settings.width = document.querySelector('.card-chart').offsetWidth;
			this.calculatePath(this.datas)
		},
		methods: {
			convertInPercent(data) {
				this.sum = data.reduce( (a, b) => a + b.value, 0)
				return data.map( x => {
					return { language: x.language, value: x.value / this.sum * 100 } 
				})
			},
			calculatePath(data) {
				data = this.convertInPercent(data)
				const x = d3.scaleBand().range([0, this.settings.width]).padding(0.1)
				const y = d3.scaleLinear().range( [this.settings.height, 0] )
				const colors  = d3.scaleOrdinal()
									.domain([0, 100])
									.range(this.colors)

				x.domain( data.map( d => d.language ) )
				y.domain( [ 0, d3.max(data, d => (d.value)) ] )

				const g = d3.select('.chart-container')
				g.append('g')
					.attr( 'class', 'chart-axis chart-axis-x' )
					.attr( 'transform', 'translate(0, 300)' )
					.call(d3.axisBottom(x))
					.selectAll('text')
						.style( 'text-anchor', 'end' )
						.attr( 'dx', '.8em' )
						.attr( 'dy', '1em' )

				g.append('g')
					.attr( 'class', 'chart-axis chart-axis-y' )
					.call( d3.axisLeft(y).ticks(10, ',%') )

				g.selectAll('.bar')
					.data(data)
					.enter()
					.append('rect')
					.attr( 'class', 'bar')
					.attr( 'x', d => x(d.language) )
					.attr( 'y', d => y(d.value) )
					.attr( 'width', x.bandwidth() )
					.attr( 'height', d => { return this.settings.height - y(d.value) } )
					.attr( 'fill', (d, i) => colors(i) )

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