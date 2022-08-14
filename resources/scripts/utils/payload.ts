import type { PayloadStatus, IPayload } from '@/types'
import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from './async'

export class Payload implements IPayload {
    status: PayloadStatus

    constructor(data?: any) {
        this.status = null
        Object.assign(this, data)
    }

    commit(data?: any) {
        Object.assign(this, data)
    }

    get failed() {
        return this.status === STATUS_FAILED
    }

    get success() {
        return this.status === STATUS_SUCCESS
    }

    get loading() {
        return this.status === STATUS_LOADING
    }
}
