<template>
	<nav class="sidebar">
		<app-user v-for="user in datas.user" :user="user"></app-user>
		<ul class="sidebar-list">
			<app-repos v-for="repo, index in datas.repos" :repo="repo" :key="index"></app-repos>
		</ul>
	</nav>
</template>

<script>
	import {mapGetters} from 'vuex'
	import User from './sidebar/User.vue'
	import Repos from './sidebar/Repos.vue'

	export default {
		computed: {
			...mapGetters({
				datas: 'initState'
			}),
		},
		components: {
			appUser: User,
			appRepos: Repos
		}
	}
</script>

<style lang="scss">

</style>