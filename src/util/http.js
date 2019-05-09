// 引入 axios
import axios from 'axios';
import { Toast } from 'vant';
import router from '@/router';

//let token=localStorage.getItem("token")

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api';
} else {
  axios.defaults.baseURL = '/api';
}

// 超时时间
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
			if(response.data.code==401){
				router.replace({
				  path: '/login',
				  query: {
				    redirect: router.currentRoute.fullPath
				  }
				});
			}
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
		console.log("-----",error)
    if (error.response.status) {
      switch (error.response.status) {
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          });
          break;
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    }
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}


export function authPost(url,params){
	var token=localStorage.getItem("token")
	return new Promise((resolve, reject) => {
	  axios
	    .post(url, params,{
				headers:{
					'token': token,
					'Content-Type':"application/json"
				}
			})
	    .then(res => {
	      resolve(res.data);
	    })
	    .catch(err => {
	      reject(err.data);
	    });
	});
}


export function upload(url,file){
	var token=localStorage.getItem("token")
	let param = new FormData(); //创建form对象
  param.append('images',file.file,file.file.name);//通过append向form对象添加数据
  param.append('chunk','0');//添加form表单中其他数据
	return new Promise((resolve, reject) => {
	  axios
	    .post(url, param,{
				headers:{
					'token': token,
					'Content-Type':'multipart/form-data'
				}
			})
	    .then(res => {
	      resolve(res.data);
	    })
	    .catch(err => {
	      reject(err.data);
	    });
	});
}