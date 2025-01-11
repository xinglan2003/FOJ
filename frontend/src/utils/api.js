// frontend/src/utils/api.js

import axios from 'axios';

// 创建一个 Axios 实例
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api', // 根据实际情况调整
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器（可选）
apiClient.interceptors.request.use(
  (config) => {
    // 在请求头中添加 Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器（可选）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 处理响应错误
    if (error.response && error.response.status === 401) {
      // 例如，重定向到登录页
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
