<template>
	<div class="container">
		<app-sidebar></app-sidebar>
		<app-searchbar></app-searchbar>
		<app-dashboard></app-dashboard>
	</div>
</template>

<script>
	import Sidebar from './Sidebar.vue'
	import SearchBar from './SearchBar.vue'
	import Dashboard from './Dashboard.vue'

	export default {
		components: {
			appSidebar: Sidebar,
			appSearchbar: SearchBar,
			appDashboard: Dashboard
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-rows: 80px auto;
		grid-template-areas: "sidebar header"
							 "sidebar board";
	}
</style>