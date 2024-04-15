import {
	get,
	post,
	postJson,
} from '../axios.js'

export function addSeries(params) {
	return postJson('/eBookSeries/add', params)
}

export function updateSeries(params) {
	return postJson('/eBookSeries/update', params)
}

export function getAllSeries(params) {
	return get('/eBookSeries/getAll', params)
}

export function getPageSeries(params) {
	return get('/eBookSeries/getPage', params)
}


