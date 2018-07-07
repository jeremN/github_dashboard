import Vue from 'vue';

const initialState = () => {
	return {
		user: [],
		repos: [],
		stats: []
	}
}

const state = initialState();


const mutations = {
	'RESET_STATE'(state) {
		Object.assign( state, initialState() );
	},
	'SET_USER'( state, data ) {
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
		console.log(data);
		for( let i of data ) {
			let repo = {
				repoUser: i.owner.login,
				repoName: i.name,
				repoForks: i.forks,
				repoIssues: i.open_issues,
				repoWatchers: i.watchers
			}
			state.repos.push(repo);
		}
	},
	'SET_COMMITS'( state, data ) {
		state.stats.push({
			commitsTotal: data.length
		});
	},
	'SET_LANG'(state, data) {

	},

}

const actions = {
	sendRequest( {commit}, params ) {
		Vue.http.get( params.url )
		.then( response => response.json())
		.then( data => {
			if( data ) {
				switch( params.type ) {
					case 'user': 
						commit( 'SET_USER', data );
						break;
					case 'repo':
						commit( 'SET_REPOS', data );
						break;
					case 'commits':
						commit( 'SET_COMMITS', data );
					default:
						return;
				}
			}
		})
		.catch( error => console.log( error ) );
	},
	getDefaultState( {commit} ) {
		commit('RESET_STATE');
	},		
}

const getters = {
	initUser( state, getters ) {
		return state;
	},
	initRepoStat( state, getters ) {
		return state.stat
	}
}

export default {
	state,
	mutations,
	actions, 
	getters
}
