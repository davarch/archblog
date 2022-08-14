import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from '@/utils/async'

interface FetchOptions extends Omit<RequestInit, 'body'> {
    abort?: string
    body?: BodyInit | object | null
    method?: 'get' | 'post' | 'put' | 'delete' | undefined
}

interface Config {
    baseUrl: string
    defaultHeaders: Headers | string[][] | Record<string, string> | undefined
}

interface API {
    (url: string, options?: FetchOptions): Promise<Response>
    get(url: string, options?: FetchOptions): Promise<Response>
    post(url: string, options?: FetchOptions): Promise<Response>
    put(url: string, options?: FetchOptions): Promise<Response>
    delete(url: string, options?: FetchOptions): Promise<Response>
}

type PayloadStatus = 'loading' | 'success' | 'failed' | null

interface TryCatchAsync {
    asyncAction: any
    callback?: (result?: any) => void
    errorCallback?: (error?: any) => void
}

interface AsyncRequest {
    statusSetter?: (status: PayloadStatus) => void
    errorMessage?: boolean | string | object
    successMessage?: boolean | string | object
}

export declare const API: API
export declare const config: Config
export declare class ApiError extends Error {
    response: Response
}

export declare interface IPayload {
    status: PayloadStatus
    get success(): boolean
    get loading(): boolean
    get failed(): boolean
    commit(data?: any): void
}

interface User extends IPayload {
    id: number
    name: string
    email: string
}

interface LoginForm {
    email: string
    password: string
}

interface RegisterForm {
    name: string
    email: string
    password: string
    password_confirmation: string
}
