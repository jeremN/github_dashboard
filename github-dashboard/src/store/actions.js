import Vue from 'vue'
import axios from 'axios'

export const getAuthentication = ( {commit} ) => {
	let authData = {
		 "client_secret": "45dc52b272519923ef08d95363e1897022817390",
		  "scopes": [
		    "public_repo"
		  ],
		  "note": "admin script"		
		}

	axios.post('/login/oauth/authorize?client_id=da97c1bee8123e417907', authData)
		.then(res => console.log(res))
		.catch(err => console.log(err));
}

