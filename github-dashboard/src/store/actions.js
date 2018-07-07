import Vue from 'vue';


const sendRequest = ({commit}, {params}) => {
		Vue.http.get(params.url)
		.then( response => response.json())
		.then( data => {
			if( data ) {
				console.log(data);
				switch(params.type) {
					case 'user': 
						//commit('SET_USER', data);
						break;
					case 'repo':
						break;
					case 'commits':
						break;
				}
			}
		})
		.catch( error => console.log(error) );
}

export default sendRequest;
