<template>
		<li class="list-group-item">
			<a 
				:key="repo.id"
				:id="repo.repoName"
				:data-user="repo.repoUser"
				@click="getStats" 
				title="Voir le profil">
				<h2>{{ repo.repoName }}</h2>
			</a>
		</li>
</template>

<script>

	import {mapActions} from 'vuex';

	export default {
		props: ['repo'],
		methods: {
			...mapActions({
				fetchData: 'sendRequest',
				resetState: 'getDefaultState'
			}),

			getStats(e) {
				const params = { reset: [ 'issues', 'contribs', 'forks', 'activity', 'languages', 'tags', 'total'] }

				const userName = e.currentTarget.dataset.user
				const selectedRepo = e.currentTarget.id
				
				this.resetState(params)
				console.log(selectedRepo)
				console.log(userName)

				const baseURL = "/repos/" + userName + "" + selectedRepo

				const params_ISSUES = {
					url: baseURL +"/issues",
					type: 'issues'
				}
				const params_FORKS = {
					url: baseURL +"/forks",
					type: 'forks'
				}
				const params_TAGS = {
					url: baseURL +"/tags",
					type: 'tags'
				}
				const params_LANG = {
					url: baseURL +"/languages",
					type: 'languages'
				}
				const params_ACTIVITY = {
					url: baseURL +"/stats/commit_activity",
					type: 'activity'
				}
				const params_CONTRIBUTORS = {
					url: baseURL +"/contributors",
					type: 'contributors'
				}

				this.fetchData( params_ISSUES )
				this.fetchData( params_FORKS )
				this.fetchData( params_TAGS )
				this.fetchData( params_LANG )
				this.fetchData( params_ACTIVITY )
				this.fetchData( params_CONTRIBUTORS )
			}
		}
	}
</script>

<style lang="scss">

</style>