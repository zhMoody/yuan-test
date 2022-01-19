import axios from 'axios'
import store from '../store/index.js'

const request = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000,
})

/// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    store.commit('setShowLoading', true)
    return config
  },
  function (error) {
    store.commit('setShowLoading', true)
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    setTimeout(() => {
      store.commit('setShowLoading', false)
    }, 1000)
    return response
  },
  function (error) {
    setTimeout(() => {
      store.commit('setShowLoading', false)
    }, 2000)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
