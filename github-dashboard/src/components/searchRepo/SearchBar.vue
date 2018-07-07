<tem<template>
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

	import {mapActions} from 'vuex';

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
				this.resetState();
				const params_USER = {
					url: "https://api.github.com/users/" + this.name,
					type: 'user'
				}
				const params_REPOS = {
					url: "https://api.github.com/users/" + this.name + "/repos",
					type: 'repo'
				}

				this.fetchData( params_USER );
				this.fetchData( params_REPOS );
				this.name = '';
			}
		}
	}
</script>

<style lang="scss">
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