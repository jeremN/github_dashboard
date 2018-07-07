<template>
	<ul class="list-group">
		<li class="list-group-item">
			<img :src="user.userPicture" alt="" width="60" height="60">
		</li>
		<li class="list-group-item">
			<h2>{{ user.userName }}</h2>
		</li>
		<li>
			<a :href="user.userLink" title="Voir le profil">Voir le profil de {{ user.userName }}</a>
		</li>
	</ul>
</template>

<script>

	import {mapActions} from 'vuex';

	export default {
		props: ['user'],
		methods: {
			...mapActions({

			}),
		}
	}
</script>

<style lang="scss">
	.list {
		&-group {
			display: flex;
			flex-direction: column;
		}
	}
</style>