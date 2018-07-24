<template>
	<div class="container">
		<div class="grid">
			<transition 
				appear
				enter-class=""
				enter-active-class="animated delay-02s fadeInDownBig"
				leave-class=""
				leave-active-class="animated fadeOut">
					<app-searchbar></app-searchbar>
			</transition>
			<transition	
				appear
				enter-class=""
				enter-active-class="animated fadeInLeftBig"
				leave-class=""
				leave-active-class="animated fadeOut">
				<app-sidebar v-if="datas.repos"></app-sidebar>
			</transition>
			<transition
				appear
				enter-class=""
				enter-active-class="animated delay-1s fadeIn"
				leave-class=""
				leave-active-class="animated fadeOut">
				<app-dashboard></app-dashboard>
			</transition>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Sidebar from './Sidebar.vue'
	import SearchBar from './SearchBar.vue'
	import Dashboard from './Dashboard.vue'

	export default {
		computed: {
			...mapGetters({
				datas: 'initState',
			}),
		},
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