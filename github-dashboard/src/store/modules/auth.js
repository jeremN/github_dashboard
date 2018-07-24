import Vue from 'vue'
import axios from 'axios'
import router from '../../routes'

const initialState = () => {
	return {
		tokenID: null,
		userID: null,
		auth: null,
		user: null,
		restricted: null
	}
}

const state = initialState()

const mutations = {
	authUser( state, userData) {
		state.tokenID = userData.token
		state.userID = userData.userId
		state.user = userData.user
		state.auth = userData.auth
		if( state.tokenID !== null ) {
			axios.defaults.headers.common["Authorization"] = `token ${state.tokenID}`
		}
	},
	clearAuthData( state ) {
		state = initialState()
	},
	authRestricted( state, data ) {
		state.restricted = data
	}

}
const actions = {
	login( {commit, dispatch}, authData ) {
		state.auth = btoa(authData.login+':'+authData.password)
		const data = {"scopes":["repo", "user"],"note":"Start"}
		axios.post('/authorizations', data, {
			headers: { "Authorization": `Basic ${state.auth}` },
		})
		.then(res => {
			let authObj = {
				token: res.data.token,
				userId: res.data.id,
				user: authData.login,
				auth: state.auth
			}
			localStorage.setItem('gitBoard', JSON.stringify(authObj))
			commit('authUser', authObj)
			router.push('board')
		})
		.catch(err => console.log(err))
	},
	autoLogin( {commit}, dispatch ) {
		let LSitem = localStorage.getItem('gitBoard')
		if( !LSitem ) {
			return 
		}
		LSitem = JSON.parse(LSitem)
		commit('authUser', LSitem)
		router.push('board')
	},
	logout( {commit} ) {
		axios.delete('/authorizations/'+state.userID, {
			headers: { "Authorization": `Basic ${state.auth}` },
		})
		.catch(err => console.log(err))
		localStorage.removeItem('gitBoard')
		commit('clearAuthData')
		router.push('/')
	},
	restricted( {commit}, authData ) {
		commit('authRestricted', authData)
		router.push('board')
	}
}

const getters = {
	user( state ) {
		return state.user
	},
	isAuthenticated( state ) {
		return state.tokenID !== null
	},
	isRectricted( state ) {
		return state.restricted
	}
}

export default {
	state, 
	mutations,
	actions,
	getters
}