<template>
	<li class="list-group-item" :id="contrib.name" :key="contrib.id">
		<h2>{{ contrib.name }}</h2>
		<h3>{{ contrib.total }}</h3>
	</li>
</template>

<script>

	export default {
		props: ['contrib'],
	}
</script>

<style lang="scss" scoped>
	.list {
		&-group-item {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
		}
	}
</style>