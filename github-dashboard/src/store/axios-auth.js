import axios from 'axios'
const authInstance = axios.create({
	baseURL: 'https://api.github.com/authorizations'
})

export default authInstance
