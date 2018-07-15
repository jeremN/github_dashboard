<template>
	<nav class="sideBar">
		<app-user v-for="user in datas.user" :user="user"></app-user>
		<ul class="list-group">
			<app-repos v-for="repo in datas.repos" :repo="repo"></app-repos>
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

<style lang="scss" scoped>
	.sideBar {
		grid-area: sidebar;
		background-color: grey;
	}
	.list {
		&-group {
			display: flex;
			flex-direction: column;
		}
	}
</style>