<template>
	<div class="sidebar-profil">
		<img :src="user.userPicture" alt="Profil picture" width="60" height="60">
		<h2>{{ user.userName }}</h2>
		<a :href="user.userLink" title="See user's on github">See on github</a>
	</div>
</template>

<script>

	export default {
		props: ['user'],
	}
</script>

<style lang="scss" scoped>
</style>