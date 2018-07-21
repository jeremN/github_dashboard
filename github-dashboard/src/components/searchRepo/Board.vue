<template>
	<div class="container">
		<div class="grid">
			<app-searchbar></app-searchbar>
			<app-sidebar></app-sidebar>
			<app-dashboard></app-dashboard>
		</div>
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
.grid {
	height: 100%;
	display: grid;
	grid-template-columns: 10% 2.5% 37.5% 37.5% 12.5%;
	grid-template-rows: 72px 50px auto;
}
.container {
	width: 100%;
	height: 100%;
}
</style>