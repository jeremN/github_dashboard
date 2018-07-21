<template>
	<li :id="contrib.name" class="card-list-item">
		<i class="medal"></i>
		<!--img src="" alt=""-->
		<p>{{ contrib.name }}</p>
		<span class="card-pill">{{ contrib.total }} Contributions</span>
	</li>
</template>

<script>

	export default {
		props: ['contrib'],
	}
</script>

<style lang="scss" scoped>
</style>