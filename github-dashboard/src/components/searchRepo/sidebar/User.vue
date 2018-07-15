<template>
	<ul class="list-group user-profil">
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

	export default {
		props: ['user'],
	}
</script>

<style lang="scss" scoped>
	.list {
		&-group {
			&.user-profil {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
</style>