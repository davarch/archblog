import Cookies from 'js-cookie'
import type { Config, FetchOptions } from '@/types'

class ApiError extends Error {
    public response: Response

    constructor(response: Response) {
        super(`${response.status} ${response.statusText}`)

        this.response = response

        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

const abortMap: Map<string, AbortController> = new Map()

const config: Config = {
    baseUrl: location.origin,
    defaultHeaders: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
}

function signal(abort: string | void): AbortSignal | null {
    if (abort) {
        if (abortMap.has(abort)) {
            abortMap.get(abort)!.abort()
        }

        return abortMap.set(abort, new AbortController()).get(abort)!.signal
    }

    return null
}

function mergeHeaders(...headers: Headers[]): Headers {
    return headers.reduce((acc, item) => {
        // @ts-ignore
        for (const entry of item.entries()) {
            if (entry[1] === 'undefined' || entry[1] === 'null') {
                acc.delete(entry[0])
            } else {
                // @ts-ignore
                acc.set(...entry)
            }
        }
        return acc
    }, new Headers())
}

function createRequest(input: string, options: FetchOptions): Request {
    const url = new URL(input, config.baseUrl || undefined)
    const init = { ...options }
    const csrf = { 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || '' }

    init.headers = mergeHeaders(
        new Headers({ ...config.defaultHeaders }),
        new Headers(init.headers),
        new Headers(csrf)
    )

    if (
        ['get', 'head'].includes((init.method || 'get').toLowerCase()) &&
        init.body
    ) {
        for (const entry of Object.entries(init.body)) {
            // @ts-ignore
            url.searchParams.append(...entry)
        }

        delete init.body
    }

    if (
        init.body &&
        typeof init.body === 'object' &&
        init.body.constructor.name === 'Object'
    ) {
        init.body = JSON.stringify(init.body)
    }

    return new Request(url.href, init as RequestInit)
}

async function API(url: string, options: FetchOptions = {}): Promise<Response> {
    const request = createRequest(url, {
        ...options,
        signal: signal(options.abort)
    })

    const response = await fetch(request)

    abortMap.delete(options.abort as string)

    if (!response.ok) {
        throw new ApiError(response)
    }

    return response
}

export { API, config, ApiError }

const proxyApi = async (url: string, options: FetchOptions = {}) => {
    try {
        const res = await API(url, options)

        return res.status !== 204 ? await res.json() : res
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw error
        }

        throw Error((await error.response.json()).message)
    }
}

proxyApi.get = (url: string, options: FetchOptions = {}) =>
    proxyApi(url, { ...options, method: 'get' })

proxyApi.post = (url: string, options: FetchOptions = {}) =>
    proxyApi(url, { ...options, method: 'post' })

proxyApi.put = (url: string, options: FetchOptions = {}) =>
    proxyApi(url, { ...options, method: 'put' })

proxyApi.delete = (url: string, options: FetchOptions = {}) =>
    proxyApi(url, { ...options, method: 'delete' })

export default proxyApi
