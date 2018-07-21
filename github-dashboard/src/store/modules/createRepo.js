import Vue from 'vue'
import axios from 'axios'

const initialState = () => {
	return {
		repo: null,
		cURL: null
	}
}

const state = initialState()

const mutations = {
	repoCreated( state, data ) {
		state.repo = {}
		state.repo.url = data.url
		state.repo.created = data.created
	},
	repoFailed( state, bool ) {
		state.repo = {}
		state.repo.created = bool
	},
	setCurl( state, url ) {
		state.cURL = url
	},
	resetState( state ) {
		state = initialState()
	}
}
const actions = {
	createRepo( {commit, dispatch}, repoData ) {
		commit('resetState')
		const data = '{"name":"'+repoData.name+'","description":"'+repoData.description+'","auto_init":true}'
		axios.post('/user/repos', data)
			.then(res => {
				const data = {
					url: res.html_url,
					created: true
				}
				if( repoData.files.length > 0 ) {
					commit('setCurl', res.data.contents_url)
					dispatch('addFiles', repoData.files)
				}
				commit('repoCreated', data)
			})
			.catch(err => {
				dispatch('addFiles', repoData.files)
				commit('repoFailed', false)
				console.log(err)
			})
	},
	addFiles( {commit, dispatch, state}, fileData ) {
		if(fileData.length > 0) {
			const f = fileData.pop()
			const fileName = f.name
			const fileMsg = 'Initial commit from dashboard app'
			const reader = new FileReader()
			reader.onload = (e) => {
				const fileContent = btoa(unescape(encodeURIComponent(reader.result)))
				const apiURL = state.cURL.replace('{+path}', fileName)
				const datas = '{"message":"'+fileMsg+'","content":"'+fileContent+'"}'
				axios.put(apiURL, datas)
					.then(res => {
						dispatch('addFiles', fileData)
						console.log(res)
					})
					.catch(err => {
						dispatch('addFiles', fileData)
						console.log('file upload failed'+ err)
					})
			}
			reader.readAsText(f,"UTF-8")
		}
	}
}

const getters = {
	freshRepo( state ) {
		return state.repo
	}
}

export default {
	state, 
	mutations,
	actions,
	getters
}