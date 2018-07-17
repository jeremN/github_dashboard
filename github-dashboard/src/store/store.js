import Vue from 'vue'
import Vuex from 'vuex'

import search from './modules/searchRepo'
import create from './modules/createRepo'
import auth from './modules/auth'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,	
		search,
		create
	}
});
