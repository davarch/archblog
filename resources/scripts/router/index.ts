import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginModal from '@/views/Auth/LoginModal.vue'
import RegisterModal from '@/views/Auth/RegisterModal.vue'

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,

            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: LoginModal
                },
                {
                    path: '/registration',
                    name: 'registration',
                    component: RegisterModal
                }
            ]
        }
    ]
})

export default router
