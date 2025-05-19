import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { handleLogout } from '@/services/logout'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            alias: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/results',
            name: 'results',
            component: () => import('@/views/ResultsView.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/views/LoginView.vue'),
            beforeEnter: async (to, from, next) => {
                try {
                    await handleLogout()
                    next({ name: 'login' })
                } catch (error) {
                    console.error('Error during logout:', error)
                    next({ name: 'login' })
                }
            }
        }
    ]
})

export default router
