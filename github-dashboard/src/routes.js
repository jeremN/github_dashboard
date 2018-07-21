import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/store'

import Home from './components/Home.vue'
import Board from './components/searchRepo/Board.vue'

Vue.use(VueRouter)

const routes = [
	{path: '/', name: '/', component: Home},
	{path: '/board', name: 'board', component: Board, 
		beforeEnter: (to, from, next)  => {
			if( store.state.auth.tokenID && from.path !== '/board' ) {
				next()
			}
			else if( store.state.auth.restricted && !store.state.auth.tokenID && from.path !== '/board' ) {
				next()
			}
			else {
				next('/')
			}
		}
	}
]

export default new VueRouter({
	mode: 'history',
	routes
})
