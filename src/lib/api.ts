import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor — handle 401 + refresh token with request queue
let isRefreshing = false
let failedQueue: Array<{
    resolve: (config: InternalAxiosRequestConfig) => void
    reject: (error: AxiosError) => void
}> = []

function processQueue(error: AxiosError | null, token: string | null = null) {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else if (token) {
            resolve({ headers: { Authorization: `Bearer ${token}` } } as InternalAxiosRequestConfig)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) {
            useAuthStore.getState().logout()
            window.location.href = '/login'
            return Promise.reject(error)
        }

        // If already refreshing, queue the request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: () => {
                        originalRequest.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`
                        resolve(api(originalRequest))
                    },
                    reject,
                })
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
            const { data } = await axios.post(
                `${api.defaults.baseURL}/auth/refresh`,
                { refreshToken }
            )
            useAuthStore.getState().setTokens(data.token, data.refreshToken)
            processQueue(null, data.token)

            originalRequest.headers.Authorization = `Bearer ${data.token}`
            return api(originalRequest)
        } catch (refreshError) {
            processQueue(refreshError as AxiosError)
            useAuthStore.getState().logout()
            window.location.href = '/login'
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)

export default api
