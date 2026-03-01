import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { jobService, type JobQueryParams } from '@/lib/job-service'
import type { JobApplicationRequest } from '@/types'

const JOBS_KEY = 'jobs'

export function useJobs(params: JobQueryParams = {}) {
    return useQuery({
        queryKey: [JOBS_KEY, params],
        queryFn: () => jobService.getAll(params),
    })
}

export function useJob(id: number) {
    return useQuery({
        queryKey: [JOBS_KEY, id],
        queryFn: () => jobService.getById(id),
        enabled: id > 0,
    })
}

export function useJobHistory(id: number) {
    return useQuery({
        queryKey: [JOBS_KEY, id, 'history'],
        queryFn: () => jobService.getHistory(id),
        enabled: id > 0,
    })
}

export function useCreateJob() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: JobApplicationRequest) => jobService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JOBS_KEY] })
            toast.success('Application created successfully')
        },
        onError: () => {
            toast.error('Failed to create application')
        },
    })
}

export function useUpdateJob() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: JobApplicationRequest }) =>
            jobService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JOBS_KEY] })
            toast.success('Application updated successfully')
        },
        onError: () => {
            toast.error('Failed to update application')
        },
    })
}

export function useDeleteJob() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => jobService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JOBS_KEY] })
            toast.success('Application deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete application')
        },
    })
}
