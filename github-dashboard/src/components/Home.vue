<template>
	<div class="screen-login">
		<transition
			appear
			enter-class=""
			enter-active-class="animated fadeIn"
			leave-class=""
			leave-active-class="animated fadeOut">
		<form 
			id="loginForm" 
			class="form" 
			@submit.prevent="sendAuth">
			<h1 class="navbar-brand">WELCOME <i class="fas fa-grin-alt"></i></h1>
			<div class="form-group">
				<label for="login">Login<span>(required)</span></label>
				<input 
					id="login" 
					class="form-field" 
					type="text" 
					name="userLogin" 
					required
					v-model="login">
			</div>
			<div class="form-group">
				<label for="password">Password<span>(required)</span></label>
				<input 
					id="password" 
					class="form-field" 
					type="password" 
					name="userPassword" 
					required
					v-model="password">
			</div>
			<div class="form-group">
				<button id="sendLogin" class="form-btn btn-submit" type="submit">Login</button>
			</div>
			<div class="sep"></div>
			<div class="form-group">
				<button 
					@click.prevent="noLogin" 
					id="continue" 
					class="form-btn btn-submit btn-grey" 
					type="button">
					Continue without login
				</button>
				<p class="warn"><i class="fas fa-exclamation-triangle"></i>Limited request rate</p>
			</div>
		</form>
		</transition>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				login: '',
				password: ''
			}
		},
		created() {
			if( this.isLogged ) {
				this.$router.push('board')
			}
		},
		computed: {
			...mapGetters({
				isLogged: 'isAuthenticated',
				isRestritect: 'isRestrited'
			}),
		},
		methods: {
			...mapActions({
				log: 'login',
				noLog: 'restricted',
				resetState: 'getDefaultState'
			}),
			sendAuth() {
				const formData = {
					login: this.login,
					password: this.password
				}
				this.log(formData)
			},
			noLogin() {
				this.noLog(true)
			},
		},
	}

</script>

<style lang="scss" scoped>
	.warn {
		text-align: center;
		margin-top: 0.5em;
		font-size: 12px;
		i {
			margin-right: 0.5em;
			color: #e74c3c;
		}
	}
	.sep {
		display: flex;
		width: 100%;
		height: 1px;
		background-color: #f4f7f9;
	}
	.btn-grey {
		color: #c9d4d7;
		border-color: #c9d4d7;
		&:hover {
			background-color: #c9d4d7;
			color: #fff;
		}
	}
	.form-group:last-child {
		margin-top: 1.5em;
	}
</style>