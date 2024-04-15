import {
	get,
	post,
	postJson,
	upload
} from '../axios.js'

export function addEBook(params) {
	return postJson('/eBooks/add', params)
}

export function updateEBook(params) {
	return postJson('/eBooks/update', params)
}

export function uploadEBook(params) {
	return upload('/eBooks/uploadEBook', params)
}

export function getAllEBook(params) {
	return get('/eBooks/getAll', params)
}


