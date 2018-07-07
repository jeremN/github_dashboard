import Home from './components/Home.vue';
import CreateRepo from './components/createRepo/CreateRepo.vue';
import SearchRepo from './components/searchRepo/SearchRepo.vue';

export const routes = [
	{path: '/', component: Home},
	{path: '/createRepository', component: CreateRepo},
	{path: '/searchRepository', component: SearchRepo}
];
