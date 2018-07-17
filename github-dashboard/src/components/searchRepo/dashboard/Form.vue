<template>
	<form class="form" @submit.prevent="onSubmit">
		<div class="form-group form-group-inline">
			<div class="form-group">			
				<label for="username">Username</label>
				<input 
					id="username" 
					class="form-control" 
					type="text" 
					name="userName"
					v-model="username">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input 
					id="password" 
					class="form-control" 
					type="password" 
					name="userPassword"
					v-model="password">
			</div>
		</div>
		<div class="form-group">
			<label for="title">Title</label>
			<input 
				id="title" 
				class="form-control" 
				type="text" 
				name="issueTitle"
				v-model="title">
		</div>
		<div class="form-group">
			<label for="description">Description</label>
			<textarea 
				id="description" 
				class="form-control" 
				name="issueDescription"
				v-model="description">
			</textarea>
		</div>
		<div class="form-group">
			<button 
				id="submitIssue" 
				class="btn btn-submit" 
				type="submit" 
				name="issueSubmit">
				Send Issue
			</button>
		</div>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				title: '',
				description: ''
			}
		},
		methods: {
			onSubmit() {

			}
		}
	}
</script>

<style lang="scss">

</style>