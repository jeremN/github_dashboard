<template>
	<svg :style="{ width: settings.svgWidth, height: settings.svgHeight }">
		<g style="transform: translate(0, 10px)">
			<path :d="line"/>
		</g>
	</svg>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		data() {
			return {
				line: '',
				settings: {
					svgWidth: '600px',
					svgHeight: '300px',
				},
				data: [99, 100, 78, 25, 36, 92],
			}
		},
		mounted() {
			this.calculatePath();
		},
		methods: {
			getScales() {
				const x = d3.scaleTime().range( [ 0, 400 ] );
				const y = d3.scaleLinear().range( [ 210, 0 ] );
				d3.axisLeft().scale(x);
				d3.axisBottom().scale(y);
				x.domain( d3.extent( this.data, (d, i) => i ) );
				y.domain( [ 0, d3.max(this.data, d => d) ] );
				return { x,y };
			},
			calculatePath() {
				const scale = this.getScales();
				const path = d3.line()
								.x( (d, i) => scale.x(i) )
								.y( d => scale.y(d));

				this.line = path(this.data);

			}
		}
	}
</script>

<style lang="scss" scoped>
	svg {
		margin: 25px;
	}
	path {
		fill: none;
		stroke: #19b5ff;
		stroke-width: 2px;
	}
</style>