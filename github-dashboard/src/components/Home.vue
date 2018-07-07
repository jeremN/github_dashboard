<template>
	<div class="wrap">
		<h2>Que voulez-vous faire ?</h2>
		<div class="row">
			<div class="card">
				<router-link to="/createRepository" class="card-btn">Créer un dépôt</router-link>
			</div>
			<div class="card">
				<router-link to="/searchRepository" class="card-btn">Chercher un dépôt</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
	.row {
		display: flex;
	}
	.card {
		width: 240px;
		height: 120px;
		display: flex;
		padding: 1em;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #ccc;
		box-shadow: 2px 2px 16px 2px rgba(0,0,0,0.1);
		margin: 1em 1.5em;
		&-btn {
			font-size: 18px;
			color: #000;
			text-decoration: none;
		}
	}

</style>