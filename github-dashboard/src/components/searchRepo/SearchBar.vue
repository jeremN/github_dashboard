<template>
	<header class="searchBar">
		<div class="form-group form-groupe-inline">
			<input
				type="text"
				class="form-field" 
				v-model="name" 
				placeholder="Veuillez saisir un nom d'utilisateur">
			<button
				type="submit"
				class="form-btn"
				@click="searchUser">Search</button>
		</div>
	</header>
</template>

<script>

	import {mapActions} from 'vuex'
	import axios from 'axios'

	export default {
		data() {
			return {
				name: '',
			}
		},
		methods: {
			...mapActions({
				fetchData: 'sendRequest',
				resetState: 'getDefaultState'
			}),
			searchUser() {
				const params = { reset: [ 'user', 'repos', 'issues', 'contribs', 'forks', 'activity', 'languages', 'tags', 'total'] }

				this.resetState(params)

				const params_USER = {
					url: "/users/" + this.name,
					type: 'user'
				}
				const params_REPOS = {
					url: "/users/" + this.name + "/repos",
					type: 'repo'
				}

				this.fetchData( params_USER )
				this.fetchData( params_REPOS )
				this.name = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchBar {
		grid-area: header;
		background-color: turquoise;
	}
	.form {
		&-group {
			display: flex;
		}
		&-field {
			margin: 1em 0 0;
		}
	}
</style>