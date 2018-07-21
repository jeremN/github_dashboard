<template>
	<header class="navbar">
		<ul class="navbar-list">
			<li>
				<h1 class="navbar-brand">WELCOME <i class="fas fa-grin-alt"></i></h1>
			</li>
			<li>
				<input 
					id="searchInput" 
					class="form-field navbar-link" 
					type="search" 
					name="searchUser" 
					placeholder="Search user"
					v-model="name">
				<button 
					class="form-group-btn"
					@click="searchUser">
					<i class="fas fa-search"></i>
				</button>
			</li>
			<li v-if="isAuth">
				<i class="fas fa-lg fa-user-ninja"></i><span>{{ loggedUser }}</span>
			</li>
			<li v-if="!isAuth">
				<i class="fas fa-lg fa-user-secret"></i><span>Anonymous</span>
			</li>
			<li v-if="isAuth">
				<a @click="logout" class="navbar-link" title="Logout"><i class="fas fa-sign-out-alt"></i></a>
			</li>
			<li v-if="!isAuth">
				<a @click="backHome" class="navbar-link" title="Logout"><i class="fas fa-home"></i></a>
			</li>
		</ul>
	</header>
</template>

<script>

	import {mapActions, mapGetters} from 'vuex'
	import axios from 'axios'

	export default {
		data() {
			return {
				name: '',
			}
		},
		computed:{
			...mapGetters ({
				userLogged: 'user',
				isAuth: 'isAuthenticated',
			}),
			loggedUser() {
				return this.userLogged
			}
		},
		methods: {
			...mapActions({
				fetchData: 'sendRequest',
				resetState: 'getDefaultState',
				logOut: 'logout'
			}),
			searchUser() {
				const params = { reset: [ 'user', 'repos', 'issues', 'contribs', 'forks', 'activity', 'languages', 'tags', 'total'] }

				this.resetState(params)

				const params_USER = {
					url: "/users/" + this.name,
					type: 'user'
				}
				const params_REPOS = {
					url: "/users/" + this.name + "/repos",
					type: 'repo'
				}

				this.fetchData( params_USER )
				this.fetchData( params_REPOS )
				this.name = ''
			},
			logout() {
				this.logOut()
			},
			backHome() {
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss" scoped>
.navbar {
	background-color: #fff;
	grid-column-start: 1;
	grid-column-end: 6;
	grid-row-start: 1;
	box-shadow: 0 4px 24px -1px rgba(0,0,0,0.1);
	padding: 0 15px;
	
	&-list {
		margin: 0;
		display: flex;
		align-items: center;
		height: 100%;

		li {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			padding: 5px;

			&:nth-child(2) {margin-left: auto;}
			&:nth-child(3) {
				margin: 0 1em 0 auto;

				i {margin-right: 0.3em;}
			}
			&:nth-child(4) {
				color: #c9d4d7;
				margin: 0 1em;
				border-left: 2px solid #f4f7f9;

				a:hover i{
					color: #18bcc9;
				}
				.navbar-link {
					padding: 10px;
				}
			}

			input{
				border: none;
				border-bottom: 1px solid #c9d4d7;
				width: 240px;
				height: 36px;

				&:hover,
				&:active,
				&:focus,
				&:hover + button,
				&:active + button,
				&:focus + button {
					border-width: 2px;
				} 
				&:focus,
				&:focus + button {
					border-color: #18bcc9;
					outline: #082746 auto 5px;
				}
			}
			button {
				border: none;
				background: none;
				font-size: 1.5rem;
				cursor: pointer;
				padding: 0 15px 12px;
				border-bottom: 1px solid #c9d4d7;
				transition: color 0.2s ease-out;

				&:hover i{
					color: #18bcc9;
				}
			}
		}
	}

	&-brand {
		font-weight: bold;
		font-size: 1.5rem;
	}

	&-link {
		display: flex;
		align-content: center;
		justify-content: center;
		color: #082746;
		text-decoration: none;
	}
}	
</style>