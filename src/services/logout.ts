import { logout } from './auth'

export const cleanupLocalStorage = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

export const handleLogout = async () => {
    try {
        await logout()
    } finally {
        cleanupLocalStorage()
    }
}
