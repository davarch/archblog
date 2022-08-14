import API from '@/utils/api'
import type { LoginForm, PayloadStatus, RegisterForm, User } from '@/types'
import { Payload } from '@/utils/payload'
import { STATUS_SUCCESS, asyncRequest } from '@/utils/async'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',

    state: () => ({
        user: <User>new Payload()
    }),

    getters: {
        auth: (state) => state.user.success
    },

    actions: {
        login(form: LoginForm, goRoute: () => Promise<any> = async () => {}) {
            const statusSetter = async (status: PayloadStatus) => {
                this.user.status = status
                status === STATUS_SUCCESS && (await goRoute())
            }

            const asyncAction = async () =>
                API.post('/login', { body: { ...form } })

            return asyncRequest(asyncAction, {
                statusSetter,
                errorMessage: true
            })
        },

        register(
            form: RegisterForm,
            goRoute: () => Promise<any> = async () => {}
        ) {
            const statusSetter = async (status: PayloadStatus) => {
                this.user.status = status
                status === STATUS_SUCCESS && (await goRoute())
            }

            const asyncAction = async () =>
                API.post('/register', { body: { ...form } })

            return asyncRequest(asyncAction, {
                statusSetter,
                errorMessage: true
            })
        },

        logout(goRoute: () => Promise<any> = async () => {}) {
            const statusSetter = async (status: PayloadStatus) => {
                if (status === STATUS_SUCCESS) {
                    this.user = <User>new Payload()
                    await goRoute()
                }
            }

            const asyncAction = async () => await API.post('/logout')

            return asyncRequest(asyncAction, { statusSetter })
        },

        info() {
            const statusSetter = (status: PayloadStatus) =>
                (this.user.status = status)

            const asyncAction = async () =>
                this.user.commit(await API.get('user'))

            return asyncRequest(asyncAction, { statusSetter })
        }
    }
})
