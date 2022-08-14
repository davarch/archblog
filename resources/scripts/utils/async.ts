import type { AsyncRequest, TryCatchAsync } from '@/types'

const defaultCallback = () => {}

export const STATUS_LOADING = 'loading'
export const STATUS_SUCCESS = 'success'
export const STATUS_FAILED = 'failed'

export async function tryCatchAsync({
    asyncAction,
    callback = defaultCallback,
    errorCallback = defaultCallback
}: TryCatchAsync) {
    try {
        const result = await asyncAction()
        callback(result)
        return result
    } catch (error: any) {
        error.name !== 'AbortError' && errorCallback(error)
    }
}

export function asyncRequest(
    asyncAction: any,
    {
        statusSetter = defaultCallback,
        errorMessage = false,
        successMessage = false
    }: AsyncRequest = {}
) {
    const callback = (data: any) => {
        statusSetter(STATUS_SUCCESS)
        successMessage &&
            alert(
                typeof successMessage === 'string'
                    ? successMessage
                    : data.message
            )
    }

    const errorCallback = (error: any) => {
        console.error(error)
        statusSetter(STATUS_FAILED)
        errorMessage &&
            alert(
                typeof errorMessage === 'string' ? errorMessage : error.message
            )
    }

    statusSetter(STATUS_LOADING)

    return tryCatchAsync({ asyncAction, callback, errorCallback })
}
