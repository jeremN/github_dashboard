<template>
	<div class="card" @submit.prevent="onSubmit">
		<button 
			class="btn-close" 
			type="button"
			@click="closeModal">
			<i class="fas fa-times"></i>
		</button>
		<h1 class="navbar-brand">Create a new issue <i class="fas fa-grin-alt"></i></h1>
		<div class="form-group" @selectedRepo="getObj">
			<p>You will create an issue for the repo: <strong>{{ datas.activeRepo }}</strong> <br> owned by: <strong>{{ datas.user[0].userName }}</strong></p>
		</div>
		<div v-if="sended">
			<p v-if="created">Finished. <a :href="createdIssue.issue.url">Check it out</a></p>
			<p v-if="!created">Issue creation failed, check console log for details</p>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
	}
</script>

<style lang="scss" scoped>
 	.card {
		max-width: 420px;
		position: relative;

		P {
			font-size: 12px;
			color: #c9d4d7;

			strong {
				font-size: 14px;
				font-weight: bold;
			}
		}
 	}
	.btn-close {
	    position: absolute;
	    width: 30px;
	    height: 30px;
	    top: 10px;
	    right: 10px;
	    border-radius: 50%;
	    border: 2px solid #c9d4d7;
	    background: none;
	    cursor: pointer;
	}

</style>