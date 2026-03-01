import { AxiosError } from 'axios'
import type { ApiError } from '@/types'

export function normalizeError(error: unknown): string {
    if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiError | undefined

        // Backend validation errors
        if (apiError?.validationErrors) {
            const messages = Object.values(apiError.validationErrors)
            return messages.join(', ')
        }

        // Backend error message
        if (apiError?.message) {
            return apiError.message
        }

        // HTTP status based messages
        switch (error.response?.status) {
            case 400:
                return 'Invalid request. Please check your input.'
            case 401:
                return 'Session expired. Please log in again.'
            case 403:
                return 'You do not have permission to perform this action.'
            case 404:
                return 'The requested resource was not found.'
            case 409:
                return 'A conflict occurred. The resource may already exist.'
            case 429:
                return 'Too many requests. Please try again later.'
            case 500:
                return 'Server error. Please try again later.'
            default:
                break
        }

        // Network error
        if (error.code === 'ERR_NETWORK') {
            return 'Network error. Please check your connection.'
        }

        // Timeout
        if (error.code === 'ECONNABORTED') {
            return 'Request timed out. Please try again.'
        }
    }

    if (error instanceof Error) {
        return error.message
    }

    return 'An unexpected error occurred.'
}
