import Vue from 'vue'
import Vuex from 'vuex'

import search from './modules/searchRepo'
import create from './modules/createRepo'
import auth from './modules/auth'
import createIssue from './modules/createIssue'
import createRepo from './modules/createRepo'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		createIssue,
		createRepo,
		auth,	
		search,
		create
	}
});
