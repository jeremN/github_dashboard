import Vue from 'vue'
import Vuex from 'vuex'

import search from './modules/searchRepo';
import create from './modules/createRepo';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	modules: {
		search,
		create
	}
});
