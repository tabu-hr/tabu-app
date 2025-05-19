import { setTokens } from './index'
// the axios instance and types
import http from '../api'
import router from '@/router'
async function checkEmail(name: string, email: string, credential: string) {
    const response = await http({
        url: 'api/user/check',
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        data: {
            isGoogleLogin: true,
            email: email,
            name: name,
            credential: credential
        }
    })

    const data = response.data
    if (data.success && data.response.tokens) {
        const { accessToken, refreshToken } = data.response.tokens
        setTokens(accessToken, refreshToken)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                name: data.response.name,
                unique_id: data.response.id,
                needs_to_update: data.response.needs_to_update
            })
        )
        // Remove tokens from response data before returning
        delete data.response.tokens

        if (data.success) {
            if (!data.response.exists) {
                router.push('/logout')
                return
            } else {
                router.push('/results')
            }
        }
    }

    return data
}

export { checkEmail }
