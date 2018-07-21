<template>
<div class="modal">
	<form class="form" @submit.prevent="onSubmit">
		<button 
			class="btn-close" 
			type="button"
			@click="closeModal">
			<i class="fas fa-times"></i>
		</button>
		<h1 class="navbar-brand">Create a new issue <i class="fas fa-grin-alt"></i></h1>
		<div class="form-group" @selectedRepo="getObj" v-if="datas.length">
			<p>You will create an issue for the repo: <strong>{{ datas.activeRepo }}</strong> <br> owned by: <strong>{{ datas.user[0].userName }}</strong></p>
		</div>
		<div class="form-group">
			<label for="title">Title<span>(required)</span></label>
			<input 
				id="title" 
				class="form-field" 
				type="text" 
				name="issueTitle" 
				required
				v-model="title">
		</div>
		<div class="form-group">
			<label for="message">Description<span>(required)</span></label>
			<textarea 
				id="message" 
				class="form-field" 
				name="issueMessage"
				v-model="description">
			</textarea>
		</div>
		<div class="form-group">
			<button 
				id="sendIssue" 
				class="form-btn btn-submit">
				Submit issue
			</button>
		</div>
	</form>
</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				title: '',
				description: '',
			}
		},
		created() {
			if(!this.datas) {
				closeModal()
			}
		},
		computed: {
			...mapGetters({
				datas: 'initState',
			})
		},
		methods: {
			...mapActions({
				createIssue: 'createIssue'
			}),
			onSubmit() {
				let issueData = {
					url: "/repos/" + this.datas.user[0].userName + "/" + this.datas.activeRepo + "/issues",
					title: this.title,
					body: this.description
				}

				this.createIssue(issueData)
				this.title = ''
				this.description = ''
				this.closeModal()
			},
			closeModal(event) {
				this.$emit('close-modal-issue', false)
			},
			getObj(obj) {
				console.log(obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
 	form {
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