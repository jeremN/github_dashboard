<tem<template>
	<nav class="sideBar">
		<app-user v-for="user in datas.user" :user="user"></app-user>
		<app-repos v-for="repo in datas.repos" :repo="repo"></app-repos>
	</nav>
</template>

<script>
	import {mapGetters} from 'vuex';
	import User from './User.vue';
	import Repos from './Repos.vue';

	export default {
		computed: {
			...mapGetters({
				datas: 'initUser'
			}),
		},
		components: {
			appUser: User,
			appRepos: Repos
		}
	}
</script>

<style lang="scss">
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