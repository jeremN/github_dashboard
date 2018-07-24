<template>
	<div class="card card-chart">
		<div class="card-heading">
			<h2 v-if="this.datas"><span class="color-blue">{{ datas.length }}</span> Languages</h2>
			<h2 v-else>No data to show</h2>
		</div>
		<div class="card-body">
			<svg id="barChart" :style="{ width: settings.width + margin.left + margin.right, height: settings.height +margin.top + margin.bottom}">
				<g 
					class="chart-y-axis"
					:style="{transform: `translate(${margin.left}px, ${margin.top}px)`}"
					>
					<template v-for="(d, i) in arrayY">
						<g
							class="chart-y-ticks"
							:style="{transform: `translate(0, ${settings.height / 10 * i}px)`}"
							>
							<line x1="0" :x2="settings.width"></line>
							<text x="-36" dy="0.32em">{{ d * 10 }}%</text>
						</g>
					</template>
				</g>
				<transition-group 
					v-if="datas != null"
					appear
					name="list"
					mode="out-in"
					tag="g" 
					:style="{transform: `translate(${margin.left}px ,${margin.top}px)`}">
					<rect 
						class="bar"
						v-for="(d, i) in chartData"
						:x="scales.x(d.language)"
						:y="scales.y(d.value)"
						:width="scales.x.bandwidth()"
						:height="settings.height - scales.y(d.value)"
						:fill="fillColor(d.language)"
						:key="d.language"
						@mouseover="showTooltip(d.language, d.value)"
						@mouseleave="tooltip.isVisible = false"
					>
					</rect>
				</transition-group>
				<g class="chart-x-axis" :style="{transform: `translate(0 ,${settings.height}px)`}">
					<g 
						class="chart-x-label" 
						v-for="(d, i) in chartData" 
						:style="{transform: `translate(${(settings.width - margin.left - margin.right)}px, ${-settings.height + (i * 20)}px)`}"
						>
						<rect x="-5" y="6" width="10" height="10" :fill="fillColor(d.language)"></rect>
						<text x="10" y="6" dy="0.71em">{{ d.language }}</text>
					</g>
				</g>
			</svg>
		</div>
		<div class="tooltip" v-if="tooltip.isVisible" :style="{ transform: `translate(${tooltip.x - 10}px, ${tooltip.y - 10}px)` }">
			<p>{{ tooltip.title }}: {{ tooltip.value }}%</p>
		</div>
	</div>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		//props: ['datas'],
		props: {
			datas: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				settings: {
					width: 590,
					height: 320,
				},
				margin: {
					top: 10,
					right: 20,
					bottom: 30,
					left: 40
				},
				tooltip: {
					isVisible: false,
					title: '',
					value: '',
					x: '',
					y: ''
				},
				sum: null,
				chartData: null,
				scales: null,
				arrayY: [10,9,8,7,6,5,4,3,2,1,0],
				colors: {
				    "Mercury": "#ff2b2b", 
				    "TypeScript": "#2b7489", 
				    "PureBasic": "#5a6986", 
				    "Objective-C++": "#6866fb", 
				    "Self": "#0579aa", 
				    "edn": "#db5855", 
				    "NewLisp": "#87AED7", 
				    "Jupyter Notebook": "#DA5B0B", 
				    "Rebol": "#358a5b", 
				    "Frege": "#00cafe", 
				    "Dart": "#00B4AB", 
				    "AspectJ": "#a957b0", 
				    "Shell": "#89e051", 
				    "Web Ontology Language": "#9cc9dd", 
				    "xBase": "#403a40", 
				    "Eiffel": "#946d57", 
				    "Nix": "#7e7eff", 
				    "RAML": "#77d9fb", 
				    "MTML": "#b7e1f4", 
				    "Racket": "#22228f", 
				    "Elixir": "#6e4a7e", 
				    "SAS": "#B34936", 
				    "Agda": "#315665", 
				    "wisp": "#7582D1", 
				    "D": "#ba595e", 
				    "Kotlin": "#F18E33", 
				    "Opal": "#f7ede0", 
				    "Crystal": "#776791", 
				    "Objective-C": "#438eff", 
				    "ColdFusion CFC": "#ed2cd6", 
				    "Oz": "#fab738", 
				    "Mirah": "#c7a938", 
				    "Objective-J": "#ff0c5a", 
				    "Gosu": "#82937f", 
				    "FreeMarker": "#0050b2", 
				    "Ruby": "#701516", 
				    "Component Pascal": "#b0ce4e", 
				    "Arc": "#aa2afe", 
				    "Brainfuck": "#2F2530", 
				    "Nit": "#009917", 
				    "APL": "#5A8164", 
				    "Go": "#375eab", 
				    "Visual Basic": "#945db7", 
				    "PHP": "#4F5D95", 
				    "Cirru": "#ccccff", 
				    "SQF": "#3F3F3F", 
				    "Glyph": "#e4cc98", 
				    "Java": "#b07219", 
				    "MAXScript": "#00a6a6", 
				    "Scala": "#DC322F", 
				    "Makefile": "#427819", 
				    "ColdFusion": "#ed2cd6", 
				    "Perl": "#0298c3", 
				    "Lua": "#000080", 
				    "Vue": "#2c3e50", 
				    "Verilog": "#b2b7f8", 
				    "Factor": "#636746", 
				    "Haxe": "#df7900", 
				    "Pure Data": "#91de79", 
				    "Forth": "#341708", 
				    "Red": "#ee0000", 
				    "Hy": "#7790B2", 
				    "Volt": "#1F1F1F", 
				    "LSL": "#3d9970", 
				    "eC": "#913960", 
				    "CoffeeScript": "#244776", 
				    "HTML": "#e44b23", 
				    "Lex": "#DBCA00", 
				    "API Blueprint": "#2ACCA8", 
				    "Swift": "#ffac45", 
				    "C": "#555555", 
				    "AutoHotkey": "#6594b9", 
				    "Isabelle": "#FEFE00", 
				    "Metal": "#8f14e9", 
				    "Clarion": "#db901e", 
				    "JSONiq": "#40d47e", 
				    "Boo": "#d4bec1", 
				    "AutoIt": "#1C3552", 
				    "Clojure": "#db5855", 
				    "Rust": "#dea584", 
				    "Prolog": "#74283c", 
				    "SourcePawn": "#5c7611", 
				    "AMPL": "#E6EFBB", 
				    "FORTRAN": "#4d41b1", 
				    "ANTLR": "#9DC3FF", 
				    "Harbour": "#0e60e3", 
				    "Tcl": "#e4cc98", 
				    "BlitzMax": "#cd6400", 
				    "PigLatin": "#fcd7de", 
				    "Lasso": "#999999", 
				    "ECL": "#8a1267", 
				    "VHDL": "#adb2cb", 
				    "Elm": "#60B5CC", 
				    "Propeller Spin": "#7fa2a7", 
				    "X10": "#4B6BEF", 
				    "IDL": "#a3522f", 
				    "ATS": "#1ac620", 
				    "Ada": "#02f88c", 
				    "Unity3D Asset": "#ab69a1", 
				    "Nu": "#c9df40", 
				    "LFE": "#004200", 
				    "SuperCollider": "#46390b", 
				    "Oxygene": "#cdd0e3", 
				    "ASP": "#6a40fd", 
				    "Assembly": "#6E4C13", 
				    "Gnuplot": "#f0a9f0", 
				    "JFlex": "#DBCA00", 
				    "NetLinx": "#0aa0ff", 
				    "Turing": "#45f715", 
				    "Vala": "#fbe5cd", 
				    "Processing": "#0096D8", 
				    "Arduino": "#bd79d1", 
				    "FLUX": "#88ccff", 
				    "NetLogo": "#ff6375", 
				    "C Sharp": "#178600", 
				    "CSS": "#563d7c", 
				    "Emacs Lisp": "#c065db", 
				    "Stan": "#b2011d", 
				    "SaltStack": "#646464", 
				    "QML": "#44a51c", 
				    "Pike": "#005390", 
				    "LOLCODE": "#cc9900", 
				    "ooc": "#b0b77e", 
				    "Handlebars": "#01a9d6", 
				    "J": "#9EEDFF", 
				    "Mask": "#f97732", 
				    "EmberScript": "#FFF4F3", 
				    "TeX": "#3D6117", 
				    "Nemerle": "#3d3c6e", 
				    "KRL": "#28431f", 
				    "Ren'Py": "#ff7f7f", 
				    "Unified Parallel C": "#4e3617", 
				    "Golo": "#88562A", 
				    "Fancy": "#7b9db4", 
				    "OCaml": "#3be133", 
				    "Shen": "#120F14", 
				    "Pascal": "#b0ce4e", 
				    "F#": "#b845fc", 
				    "Puppet": "#302B6D", 
				    "ActionScript": "#882B0F", 
				    "Diff": "#88dddd", 
				    "Ragel in Ruby Host": "#9d5200", 
				    "Fantom": "#dbded5", 
				    "Zephir": "#118f9e", 
				    "Click": "#E4E6F3", 
				    "Smalltalk": "#596706", 
				    "DM": "#447265", 
				    "Ioke": "#078193", 
				    "PogoScript": "#d80074", 
				    "LiveScript": "#499886", 
				    "JavaScript": "#f1e05a", 
				    "VimL": "#199f4b", 
				    "PureScript": "#1D222D", 
				    "ABAP": "#E8274B", 
				    "Matlab": "#bb92ac", 
				    "Slash": "#007eff", 
				    "R": "#198ce7", 
				    "Erlang": "#B83998", 
				    "Pan": "#cc0000", 
				    "LookML": "#652B81", 
				    "Eagle": "#814C05", 
				    "Scheme": "#1e4aec", 
				    "PLSQL": "#dad8d8", 
				    "Python": "#3572A5", 
				    "Max": "#c4a79c", 
				    "Common Lisp": "#3fb68b", 
				    "Latte": "#A8FF97", 
				    "XQuery": "#5232e7", 
				    "Omgrofl": "#cabbff", 
				    "XC": "#99DA07", 
				    "Nimrod": "#37775b", 
				    "SystemVerilog": "#DAE1C2", 
				    "Chapel": "#8dc63f", 
				    "Groovy": "#e69f56", 
				    "Dylan": "#6c616e", 
				    "E": "#ccce35", 
				    "Parrot": "#f3ca0a", 
				    "Grammatical Framework": "#79aa7a", 
				    "Game Maker Language": "#8fb200", 
				    "Papyrus": "#6600cc", 
				    "NetLinx+ERB": "#747faa", 
				    "Clean": "#3F85AF", 
				    "Alloy": "#64C800", 
				    "Squirrel": "#800000", 
				    "PAWN": "#dbb284", 
				    "UnrealScript": "#a54c4d", 
				    "Standard ML": "#dc566d", 
				    "Slim": "#ff8f77", 
				    "Perl6": "#0000fb", 
				    "Julia": "#a270ba", 
				    "Haskell": "#29b544", 
				    "NCL": "#28431f", 
				    "Io": "#a9188d", 
				    "Rouge": "#cc0088", 
				    "cpp": "#f34b7d", 
				    "AGS Script": "#B9D9FF", 
				    "Dogescript": "#cca760", 
				    "nesC": "#94B0C7"
				}
			}
		},
		watch: {
			datas() {
				this.calculatePath(this.datas)
			}
		},
		methods: {
			fillColor(language) {
				return this.colors[language];
			},
			convertInPercent(data) {
				this.sum = data.reduce( (a, b) => a + b.value, 0)
				return data.map( x => {
					return { language: x.language, value: parseFloat(x.value / this.sum * 100).toFixed(2) } 
				})
			},
			getScales(data) {
				const x = d3.scaleBand().range([0, this.settings.width]).padding(0.1)
				const y = d3.scaleLinear().range([this.settings.height, 0])

				x.domain(data.map( d => d.language ))
				y.domain([0, 100])

				return {x, y}
			},
			calculatePath(data) {
				if( !data ) {
					return
				}
				this.chartData = this.convertInPercent(data)
				this.scales = this.getScales(this.chartData)
			},
			showTooltip(name, value) {
				this.tooltip.isVisible = true
				this.tooltip.title = name
				this.tooltip.value = value
				this.tooltip.x = event.layerX
				this.tooltip.y = event.layerY
			}
		}
	}
</script>

<style lang='scss' scoped>
	line {
		stroke: #f4f7f9;
		stroke-width: 2px;
	}
	text {
		font-size: 12px;
		font-weight: bold;
	}
	rect {
		transform-origin: 0 320px; 
	}
	.chart-y-ticks {
		display: flex;
		flex-direction: column-reversed;

		& > text {
			fill: #c9d4d7;
		}
	}
	.card-chart .card-body {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tooltip {
		background-color: #fff;
		position: absolute;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 4px 24px -1px rgba(0,0,0,0.1);
		padding: 1em;
		font-size: 14px;
	}
   .list-enter-active, .list-leave-active {
      transition: all 1s;
      transform: scale(1,1)
    }
    .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
      opacity: 0;
      transform: scale(1,0);
    }
</style>