import axios from 'axios'
import router from '@/router'

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    localStorage.setItem('accessToken', newAccessToken)
    localStorage.setItem('refreshToken', newRefreshToken)
}

export const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}api/auth/revoke`,
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }
    )
    // console.log('Token revocation response:', response.data)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    await router.push('/login')
}
