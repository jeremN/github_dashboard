<template>
	<li :key="tag.id">
		<a :href="tag.url" :title="tag.name">
			{{ tag.name }}
		</a>
	</li>
</template>

<script>

	import {mapActions} from 'vuex';

	export default {
		props: ['tag'],
		methods: {
			...mapActions({

			}),
		}
	}
</script>

<style lang="scss" scoped>

</style>