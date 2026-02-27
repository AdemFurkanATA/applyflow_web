import axios from 'axios'
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

// Response interceptor — handle 401 + refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = useAuthStore.getState().refreshToken
            if (refreshToken) {
                try {
                    const { data } = await axios.post(
                        `${api.defaults.baseURL}/auth/refresh`,
                        { refreshToken }
                    )
                    useAuthStore.getState().setTokens(data.token, data.refreshToken)
                    originalRequest.headers.Authorization = `Bearer ${data.token}`
                    return api(originalRequest)
                } catch {
                    useAuthStore.getState().logout()
                    window.location.href = '/login'
                }
            } else {
                useAuthStore.getState().logout()
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default api
