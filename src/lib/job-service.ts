import api from './api'
import type {
    JobApplicationRequest,
    JobApplicationResponse,
    PagedResponse,
    StatusHistoryResponse,
    ApplicationStatus,
} from '@/types'

export interface JobQueryParams {
    page?: number
    size?: number
    sortBy?: string
    sortDir?: 'asc' | 'desc'
    status?: ApplicationStatus
    companyName?: string
    startDate?: string
    endDate?: string
}

export const jobService = {
    getAll: async (params: JobQueryParams = {}): Promise<PagedResponse<JobApplicationResponse>> => {
        const response = await api.get<PagedResponse<JobApplicationResponse>>('/applications', { params })
        return response.data
    },

    getById: async (id: number): Promise<JobApplicationResponse> => {
        const response = await api.get<JobApplicationResponse>(`/applications/${id}`)
        return response.data
    },

    create: async (data: JobApplicationRequest): Promise<JobApplicationResponse> => {
        const response = await api.post<JobApplicationResponse>('/applications', data)
        return response.data
    },

    update: async (id: number, data: JobApplicationRequest): Promise<JobApplicationResponse> => {
        const response = await api.put<JobApplicationResponse>(`/applications/${id}`, data)
        return response.data
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/applications/${id}`)
    },

    getHistory: async (id: number): Promise<StatusHistoryResponse[]> => {
        const response = await api.get<StatusHistoryResponse[]>(`/applications/${id}/history`)
        return response.data
    },
}
