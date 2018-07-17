import Vue from 'vue'
import axios from 'axios'

const state = {
	tokenID: null,
	userID: null,
	user: null,
	auth: null
}
const mutations = {
	authUser( state, userData) {
		//state.tokenID = userData.token
		//state.userID = userData.userId
		//state.user = userData.user
	},
	clearAuthData( state ) {
		state.tokenId = null
	}
}
const actions = {
	login( {commit, dispatch}, authData ) {
		state.auth = btoa(authData.login+':'+authData.password)
		const data = {"scopes":["repo", "user"],"note":"Start"}
		console.log(authData)
		axios.post('/authorizations', data, {
			headers: { "Authorization": "Basic " + state.auth },
		})
		.then(res => {
			console.log(res)
			//commit('authUser', {
			//	token: res.data.token,
			//	userId: res.data.
			//	user: res.data.
			//})
		})
		.catch(err => console.log(err))
	},
	logout( {commit} ) {
		axios.delete('/authorizations/' + state.tokenID, {
			headers: { "Authorization": "Basic " + state.auth },
		})
	}
}

export default {
	state, 
	mutations,
	actions
}