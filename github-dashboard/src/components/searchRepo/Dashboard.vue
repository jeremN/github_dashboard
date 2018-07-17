<template>
	<div class="dashboard" v-if="!addIssue">
		<h2>Dashboard</h2>
		<div class="row">
			<ul class="list-group tags-list">
				<app-tags v-for="tag in datas.tags" :tag="tag"></app-tags>
			</ul>
		</div>
		<div class="row">
			<div class="panel width33">	
				<h1>Top 3 contributor</h1>
				<ul class="list-group contributors-list">			
					<app-contributors v-for="contrib, index in datas.contribs" :contrib="contrib"></app-contributors>
				</ul>
			</div>
			<div class="panel width66">
				<h1>Langages</h1>
				<div class="line-chart">
					<app-barchart v-if="datas.languages" :datas="datas.languages"></app-barchart>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="panel width33">
				<div class="col-left">
					<h2>Forks</h2>
					<p>{{ datas.forks }}</p>
				</div>
				<div class="col-right">
					<h2>Issues</h2>
					<p>{{ datas.issues }}</p>
					<button @click="addIssue = true">Add an Issue</button>
				</div>
			</div>
			<div class="panel width66">
				<h1>Commits Heatmap</h1>
				<div class="line-chart">
					<app-heatmap v-if="datas.activity" :datas="datas.activity"></app-heatmap>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<h2>Create new issue</h2>
		<app-issueform></app-issueform>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Barchart from './charts/Bars.vue'
	import Heatmap from './charts/Heatmap.vue'
	import Contributors from './dashboard/Ranklist.vue'
	import Tags from './dashboard/Taglist.vue'
	import Issueform from './dashboard/Form.vue'

	export default {
		data() {
			return {
				addIssue: false
			}
		},
		computed: {
			...mapGetters({
				datas: 'initState'
			})
		},
		components: {
			appBarchart: Barchart,
			appHeatmap: Heatmap,
			appContributors: Contributors,
			appTags: Tags,
			appIssueform: Issueform,
		}
	}
</script>

<style lang="scss">
	.dashboard {
		grid-area: board;
	}
	ul {
		list-style: none;
	}
	.row {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
	}
	.panel {
		padding: 15px;
		margin-top: 1em;
		margin-bottom: 1em;
		background-color: white;
		border: 1px solid grey;
		box-shadow: 0 4px 8px 2px rgba(0,0,0,0.15);
		&.width33 {
			width: 30%;
			margin-left: 1%;
		}
		&.width66 {
			width: 60%;
			margin-left: 1%;
		}
		.col {
			&-left {
				float: left;
			}
			&-right {
				float: right;
			}
		}
	}
	.tags-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.contributors-list {
		width: 33%;
		display: flex;
		flex-flow: column;
	}
</style>