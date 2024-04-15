import axios from "axios"
import qs from 'qs'

// axios.defaults.baseURL = 'http://localhost:8899/petshop'
const baseURL = 'http://localhost:8899/englishhub'
// const baseURL = 'http://47.115.231.72:8899/petshop'
// const baseURL = 'http://192.168.2.111:8899/petshop'
// const baseURL = 'http://10.22.206.116:8899/petshop'
// axios.defaults.baseURL = 'http://47.115.231.72:8899/petshop'


export function get(url, params) {
	return axios({
		method: 'GET',
		url: `${baseURL}/${url}`,
		params: params,
	})
}

export function post(url, params) {
	return axios({
		method: 'POST',
		url: `${baseURL}/${url}`,
		data: qs.stringify(params, {
			allowDots: true
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}
// 封装文件上传请求
export function upload(url, params) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', params.file)
		if (params.fileType) {
			formData.append('fileType', params.fileType)
		}
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            // onUploadProgress: onProgress // 上传进度回调
        };
        axios
            .post(`${baseURL}/${url}`, formData, config)
            .then(response => {
                console.log(response);
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function postJson(url, params) {
	return axios({
		method: 'POST',
		url: `${baseURL}/${url}`,
		data: params,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

