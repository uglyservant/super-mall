import axios from "axios"

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    // baseURL: "http://106.54.54.237:8000/api/w1",
    // baseURL: "http://123.207.32.32:8000/api/w2",
    baseURL: "http://123.207.32.32:8000/api/v1",
    timeout: 5000
  });

  // 2. 拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.log(error);
    });

  // 2.2 响应 拦截
  instance.interceptors.response.use(
    result => {
      return result;
    },
    error => {
      console.log(error);
    }
  );

  // 3. 发送真正的网络请求
  return instance(config)
}
