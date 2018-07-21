import Vue from 'vue'
import axios from 'axios'

const initialState = () => {
	return {
		user: null,
		repos: null,
		issues: null,
		contribs: null,
		forks: null,
		languages: null,
		tags: null,
		activeRepo: null
	}
}

const convertTimestamp = ( UNIXtimestamp ) => {
	let date = new Date(UNIXtimestamp * 1000)
	date = convertDate(date)
	return date
}
const convertDate = ( date ) => {
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	return `${date.getFullYear()}-${date.getDate()}-${months[date.getMonth()]}`
}
const formatDatas = ( data, index, baseDate ) => {
	baseDate = convertTimestamp(baseDate)
	let day = new Date(baseDate)
	day.setDate( day.getDate() + index )
	state.activity.push({ 'day': convertDate(day), 'count': data }) 
}

const state = initialState();


const mutations = {
	'RESET_STATE'( state, options ) {
		if(options) {
			options.reset.forEach( key => state[key] = null )
		}
		else {
			Object.assign( state, initialState() );
		}
	},
	'SET_USER'( state, data ) {
		state.user = []
		state.user.push({
			userPicture: data.avatar_url,
			userLink: data.html_url,
			userName: data.login,
			userRepos: data.public_repos,
			userFollowers: data.followers,
			userFollowing: data.following
		});
	},
	'SET_REPOS'( state, data ) {
		state.repos = []
		for( let i of data ) {
			state.repos.push({
				repoUser: i.owner.login,
				repoName: i.name,
				repoForks: i.forks,
				repoIssues: i.open_issues,
				repoWatchers: i.watchers
			})
		}
	},
	'SET_REPOISSUES'( state, data ) {
		state.issues = data.length
	},
	'SET_REPOLANGUAGES'( state, data ) {
		state.languages = []
		for( let i in data ) {
			state.languages.push({
				language: i,
				value: data[i]
			})
		}
	},
	'SET_REPOFORKS'( state, data ) {
		state.forks = data.length
	},
	'SET_REPOTAGS'( state, data ) {
		state.tags = []
		for( let i of data ) {
			state.tags.push({
				name: i.name,
				url: i.url
			})
		}
	},
	'SET_REPOCONTRIBUTORS'( state, data ) {
		state.contribs = []
		data = data.slice(0, 3)
		for( let i of data) {
			state.contribs.push({
				name: i.login,
				total: i.contributions
			})
		}
	},
	'SET_ACTIVREPO'( state, repo ) {
		state.activeRepo = repo
	}
}

const actions = {
	sendRequest( {commit}, params ) {
		axios.get( params.url )
		.then( res => {
			if( res.data ) {
				switch( params.type ) {
					case 'user': 
						commit( 'SET_USER', res.data )
						break;
					case 'repo':
						commit( 'SET_REPOS', res.data )
						break;
					case 'commits':
						commit( 'SET_REPOCOMMITS', res.data )
						break;
					case 'issues':
						commit( 'SET_REPOISSUES', res.data )
						break;
					case 'forks':
						commit( 'SET_REPOFORKS', res.data )
						break;
					case 'tags':
						commit( 'SET_REPOTAGS', res.data )
						break;
					case 'languages':
						commit( 'SET_REPOLANGUAGES', res.data )
						break;
					case 'contributors':
						commit( 'SET_REPOCONTRIBUTORS', res.data )
						break;
					default:
						return;
				}
			}
		})
		.catch( error => console.log( error ) );
	},
	getDefaultState( {commit}, params ) {
		commit('RESET_STATE', params)
	},
	setActivRepo( {commit}, repo ) {
		commit('SET_ACTIVREPO', repo)
	}		
}

const getters = {
	initState( state, getters ) {
		return state
	},
}

export default {
	state,
	mutations,
	actions, 
	getters
}
