<template>
    <v-app>
        <v-app-bar app>
            <v-app-bar-title @click="router.push('/')">
                Archblog
            </v-app-bar-title>

            <template v-if="!auth && !user.loading">
                <v-btn to="/login" rounded>Login</v-btn>
                <v-btn to="/registration" rounded>Register</v-btn>
            </template>

            <template v-else-if="user.success">
                <v-avatar class="app__avatar" color="secondary">
                    {{ username }}
                </v-avatar>

                <v-btn @click="goLogout" rounded>Logout</v-btn>
            </template>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref, computed } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        name: 'App',
        setup() {
            const router = useRouter()
            const authStore = useAuthStore()
            const { user, auth } = storeToRefs(authStore)
            const { logout, info } = authStore
            const showMenu = ref(false)
            const username = computed(() => {
                const initials =
                    (user.value && user.value?.name.match(/\b\w/g)) || []

                return (
                    (initials.shift() || '') + (initials.pop() || '')
                ).toUpperCase()
            })

            const goLogout = () => logout()

            onMounted(() => {
                !auth.value && info()
            })

            return { goLogout, user, auth, showMenu, router, username }
        }
    })
</script>

<style>
    .app__avatar {
        margin-right: 10px;
    }
</style>
