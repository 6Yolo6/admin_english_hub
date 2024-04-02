import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import { Rate } from 'vant';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Toast } from 'vant';


Vue.use(ElementUI);
Vue.use(Toast);
Vue.use(Rate);


Vue.config.productionTip = false

Vue.prototype.$ajax = axios;


//添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
});
//响应拦截器
axios.interceptors.response.use((success) => {
  console.log("请求响应",success);
   if (success.status && success.status == 200) {
       return success.data;
   } else {
      Toast("请求失败")
    }
}, (error) => {
  // console.log(error.response);
   if (error.response.status == 504 || error.response.status == 404) {
      Toast("服务器被吃了")
   } else if (error.response.status == 414) {
    if (localStorage.getItem('token')) {
      Toast("token过期，请登录")
      router.replace('/backLogin')
    }
   } else {
      if (error.response.message) {
         Toast(error.response.message)
      }
   }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
