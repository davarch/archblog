<template>
    <v-dialog v-model="dialog">
        <v-card title="Login" width="500px" height="450px">
            <v-card-text class="mt-5">
                <v-form v-model="valid" width="600px">
                    <v-text-field
                        v-model="form.name"
                        :rules="rules.name"
                        label="Name"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="form.email"
                        :rules="rules.email"
                        label="E-mail"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="form.password"
                        :rules="rules.password"
                        :counter="6"
                        label="Password"
                        required
                        type="password"
                    ></v-text-field>

                    <v-text-field
                        v-model="form.password_confirmation"
                        :rules="rules.password_confirmation"
                        :counter="6"
                        label="Confirm password"
                        required
                        type="password"
                    ></v-text-field>
                </v-form>

                <v-btn
                    :disabled="!valid"
                    :loading="user.loading"
                    color="success"
                    class="mt-3 float-end"
                    @click="goRegister"
                >
                    Sign Up
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import type { RegisterForm } from '@/types'
    import { defineComponent, onMounted, ref, watch } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'
    import { storeToRefs } from 'pinia'

    export default defineComponent({
        name: 'RegisterModal',

        setup() {
            const router = useRouter()
            const authStore = useAuthStore()
            const { user } = storeToRefs(authStore)
            const { register, info } = authStore

            const valid = ref(false)
            const dialog = ref(false)

            const form = ref<RegisterForm>({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })

            const rules = {
                name: [(v: string) => !!v || 'Name is required'],
                email: [
                    (v: string) => !!v || 'E-mail is required',
                    (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                password: [
                    (v: string) => !!v || 'Password is required',
                    (v: string) =>
                        v.length <= 12 ||
                        'Password must be less than 12 characters'
                ],
                password_confirmation: [
                    (v: string) => !!v || 'Password Confirmation is required',
                    (v: string) =>
                        v.length <= 12 ||
                        'Password must be less than 12 characters',
                    (v: string) =>
                        v === form.value.password ||
                        'Password and confirm password not match'
                ]
            }

            const goRegister = () =>
                register(form.value, async () => {
                    await info()
                    await router.push({ name: 'home' })
                })

            onMounted(() => {
                dialog.value = true
            })

            watch(
                () => dialog.value,
                (value) => !value && router.push({ name: 'home' })
            )

            return { goRegister, form, rules, valid, dialog, user }
        }
    })
</script>
