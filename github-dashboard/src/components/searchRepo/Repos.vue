<template>
	<ul class="list-group">
		<li class="list-group-item">
			<a 
				:key="repo.id"
				:id="repo.repoName"
				:data-user="repo.repoUser"
				@click="searchRepos" 
				title="Voir le profil">
				<h2>{{ repo.repoName }}</h2>
			</a>
		</li>
	</ul>
</template>

<script>

	import {mapActions} from 'vuex';

	export default {
		props: ['repo'],
		methods: {
			...mapActions({
				fetchData: 'sendRequest',
			}),
			searchRepos(e) {
				const params_COMMITS = {
					url: "https://api.github.com/repos/" + e.currentTarget.dataset.user + "/" + e.currentTarget.id +"/commits",
					type: 'commits'
				}

				this.fetchData( params_COMMITS );
			}
		}
	}
</script>

<style lang="scss">
	.list {
		&-group {
			display: flex;
			flex-direction: column;
		}
	}
</style>