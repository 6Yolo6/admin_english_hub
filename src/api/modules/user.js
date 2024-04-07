import {
	get,
	post,
	postJson,
	upload
} from '../axios.js'

// 用户注册
export function register(params) {
	return postJson('/user/register', params)
}

// 用户登录
export function login(params) {
	return postJson('/user/login', params)
}

export function update(params) {
	return postJson('/user/update', params)
}

// 上传头像
export function uploadAvatar(params) {
	return upload('/user/uploadAvatar', params)
}

export function getAll(params) {
	return get('/user/getAll', params)
}

export function getByName(params) {
	return get('/user/getByName', params)
}

