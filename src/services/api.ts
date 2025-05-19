import axios from 'axios'
import { setTokens, logout } from './auth'

const createApiInstance = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_ENDPOINT,
        timeout: 2000,
        headers: { 'X-Custom-Header': 'foobar' }
    })

    instance.interceptors.request.use(
        config => {
            const accessToken = localStorage.getItem('accessToken')
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        response => {
            if (response.data.tokens) {
                setTokens(
                    response.data.tokens.accessToken,
                    response.data.tokens.refreshToken
                )
            }
            return response
        },
        async error => {
            const originalRequest = error.config
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const refreshToken = localStorage.getItem('refreshToken')
                try {
                    const refreshResponse = await axios.post(
                        `${import.meta.env.VITE_API_ENDPOINT}api/auth/refresh-token`,
                        {
                            refreshToken
                        }
                    )
                    setTokens(
                        refreshResponse.data.accessToken,
                        refreshResponse.data.refreshToken
                    )
                    axios.defaults.headers.common['Authorization'] =
                        'Bearer ' + refreshResponse.data.accessToken
                    originalRequest.headers['Authorization'] =
                        'Bearer ' + refreshResponse.data.accessToken
                    return instance(originalRequest)
                } catch (refreshError) {
                    if (
                        axios.isAxiosError(refreshError) &&
                        refreshError.response?.status === 400
                    ) {
                        window.location.href = '/logout'
                    }
                    return Promise.reject(error)
                }
            }
            return Promise.reject(error)
        }
    )

    return instance
}

const apiInstance = createApiInstance()

export default apiInstance
