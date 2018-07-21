import Vue from 'vue'
import axios from 'axios'

const initialState = () => {
	return {
		issue: null,
	}
}

const state = initialState()

const mutations = {
	issueCreated( state, data ) {
		state.issue = {}
		state.issue.url = data.url
		state.issue.created = data.created
	},
	issueFailed( state, data ) {
		state.issue = {}
		state.issue.created = data.created
	},
	resetIssueState( state ) {
		state = initialState()
	}
}
const actions = {
	createIssue( {commit}, issueData ) {
		commit('resetIssueState')
		const data = '{"title":"'+issueData.title+'", "body": "'+issueData.body+'"}'
		axios.post(issueData.url, data)
			.then(res => {
				let data = {
					url: res.html_url,
					created: true
				}
				commit('issueCreated', data)
			})
			.catch(err => {
				let data = {
					created: false
				}
				commit('issueFailed', data)
				console.log(err)
			})
			
	}
}

const getters = {
	createdIssue( state, getters ) {
		return state.issue
	}
}

export default {
	state, 
	mutations,
	actions,
	getters
}