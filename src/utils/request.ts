import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// 定义返回的数据结构
interface ApiResponse<T = any> {
  data: T
  code: number
  message: string
}

// 创建 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 默认请求头
  },
})

// 用于存储取消请求的 AbortController
const abortControllers: Map<string, AbortController> = new Map()

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前做一些处理，例如添加 token
    const token = localStorage.getItem('token')
    if (token) {
      // 确保 headers 存在
      config.headers = config.headers || {}
      // 添加 Authorization 头
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加 AbortController 以支持取消请求
    const abortController = new AbortController()
    config.signal = abortController.signal

    // 将 AbortController 存储在 Map 中
    if (config.url) {
      abortControllers.set(config.url, abortController)
    }

    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 对响应数据进行处理
    if (response.data.code !== 200) {
      console.error('Error:', response.data.message)
    }

    // 请求完成后移除 AbortController
    if (response.config.url) {
      abortControllers.delete(response.config.url)
    }

    return response // 返回 response，确保类型匹配
  },
  (error) => {
    // 响应错误处理
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message)
    } else {
      console.error('Unknown Error:', error)
    }

    // 请求失败后移除 AbortController
    if (error.config?.url) {
      abortControllers.delete(error.config.url)
    }

    return Promise.reject(error)
  },
)

// 导出封装的请求方法
export default {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return http.get<ApiResponse<T>>(url, config).then((response) => response.data)
  },
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return http.post<ApiResponse<T>>(url, data, config).then((response) => response.data)
  },
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return http.put<ApiResponse<T>>(url, data, config).then((response) => response.data)
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return http.delete<ApiResponse<T>>(url, config).then((response) => response.data)
  },
  // 取消请求
  cancelRequest(url: string) {
    if (!url) {
      console.warn('URL is required to cancel the request.')
      return
    }

    const abortController = abortControllers.get(url)
    if (abortController) {
      abortController.abort() // 取消请求
      abortControllers.delete(url) // 从 Map 中移除
    } else {
      console.warn(`No request found for URL: ${url}`)
    }
  },
}
