<template>
	<li>
		<a 
			:key="repo.id"
			:id="repo.repoName"
			:data-user="repo.repoUser"
			@click.prevent="getStats">
			{{ repo.repoName }}
		</a>
	</li>
</template>

<script>

	import {mapActions} from 'vuex';

	export default {
		props: ['repo'],
		data() {
			return {
				isActive: null,
			}
		},
		methods: {
			...mapActions({
				fetchData: 'sendRequest',
				resetState: 'getDefaultState',
				setActivRepo: 'setActivRepo'
			}),
			getStats(e) {
				const params = { reset: [ 'issues', 'contribs', 'forks', 'languages', 'tags', 'total'] }
				this.resetState(params)
				const userName = e.currentTarget.dataset.user
				const selectedRepo = e.currentTarget.id
				const baseURL = "/repos/" + userName + "/" + selectedRepo

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
				const params_CONTRIBUTORS = {
					url: baseURL +"/contributors",
					type: 'contributors'
				}

				this.setActivRepo( selectedRepo )
				this.fetchData( params_ISSUES )
				this.fetchData( params_FORKS )
				this.fetchData( params_TAGS )
				this.fetchData( params_LANG )
				this.fetchData( params_CONTRIBUTORS )
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active a:before {
      opacity: 1;
      transform: translateX(0);
	}

	a {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

</style>