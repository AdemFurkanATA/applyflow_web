import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react'
import { useJobs, useCreateJob, useUpdateJob, useDeleteJob } from '@/hooks/use-jobs'
import { StatusBadge } from '@/components/ui/status-badge'
import { JobApplicationForm } from '@/components/forms/job-application-form'
import type { JobApplicationResponse, JobApplicationRequest, ApplicationStatus } from '@/types'

export function ApplicationsPage() {
    const [page, setPage] = useState(0)
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | ''>('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editingJob, setEditingJob] = useState<JobApplicationResponse | null>(null)
    const [deletingJob, setDeletingJob] = useState<JobApplicationResponse | null>(null)

    const { data, isLoading, isError } = useJobs({
        page,
        size: 10,
        sortBy: 'applicationDate',
        sortDir: 'desc',
        status: statusFilter || undefined,
    })

    const createMutation = useCreateJob()
    const updateMutation = useUpdateJob()
    const deleteMutation = useDeleteJob()

    const handleCreate = async (formData: JobApplicationRequest) => {
        await createMutation.mutateAsync(formData)
        setShowCreateModal(false)
    }

    const handleUpdate = async (formData: JobApplicationRequest) => {
        if (!editingJob) return
        await updateMutation.mutateAsync({ id: editingJob.id, data: formData })
        setEditingJob(null)
    }

    const handleDelete = async () => {
        if (!deletingJob) return
        await deleteMutation.mutateAsync(deletingJob.id)
        setDeletingJob(null)
    }

    const statuses: { value: ApplicationStatus | ''; label: string }[] = [
        { value: '', label: 'All Statuses' },
        { value: 'APPLIED', label: 'Applied' },
        { value: 'INTERVIEW', label: 'Interview' },
        { value: 'TECHNICAL', label: 'Technical' },
        { value: 'OFFER', label: 'Offer' },
        { value: 'REJECTED', label: 'Rejected' },
    ]

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
                    <p className="text-muted-foreground">Manage and track your job applications.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    New Application
                </button>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value as ApplicationStatus | ''); setPage(0) }}
                    className="h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {statuses.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
                {data && (
                    <span className="text-sm text-muted-foreground">
                        {data.totalElements} application{data.totalElements !== 1 ? 's' : ''} total
                    </span>
                )}
            </div>

            {/* Loading skeleton */}
            {isLoading && (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
                    ))}
                </div>
            )}

            {/* Error state */}
            {isError && (
                <div className="rounded-2xl border border-destructive/50 bg-destructive/5 p-6 text-center">
                    <p className="text-destructive font-medium">Failed to load applications</p>
                    <p className="text-sm text-muted-foreground mt-1">Please check your connection and try again.</p>
                </div>
            )}

            {/* Empty state */}
            {data && data.content.length === 0 && !isLoading && (
                <div className="rounded-2xl border border-dashed p-12 text-center">
                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-1">No applications found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        {statusFilter ? 'Try changing the filter or ' : ''}Start by adding your first application.
                    </p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        New Application
                    </button>
                </div>
            )}

            {/* Table */}
            {data && data.content.length > 0 && (
                <div className="rounded-2xl border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Company</th>
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Position</th>
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 text-right font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.content.map((job) => (
                                    <tr key={job.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 font-medium">{job.companyName}</td>
                                        <td className="p-4 text-muted-foreground">{job.position}</td>
                                        <td className="p-4"><StatusBadge status={job.status} /></td>
                                        <td className="p-4 text-muted-foreground">{job.applicationDate}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => setEditingJob(job)}
                                                    className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingJob(job)}
                                                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {data.totalPages > 1 && (
                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <span className="text-sm text-muted-foreground">
                                Page {data.page + 1} of {data.totalPages}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={data.page === 0}
                                    className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                                </button>
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={data.last}
                                    className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
                                >
                                    Next <ChevronRight className="h-4 w-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/80" onClick={() => setShowCreateModal(false)} />
                    <div className="relative z-50 w-full max-w-lg rounded-2xl border bg-background p-6 shadow-lg mx-4">
                        <h2 className="text-lg font-semibold mb-4">New Application</h2>
                        <JobApplicationForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/80" onClick={() => setEditingJob(null)} />
                    <div className="relative z-50 w-full max-w-lg rounded-2xl border bg-background p-6 shadow-lg mx-4">
                        <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
                        <JobApplicationForm
                            initialData={editingJob}
                            onSubmit={handleUpdate}
                            isLoading={updateMutation.isPending}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deletingJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/80" onClick={() => setDeletingJob(null)} />
                    <div className="relative z-50 w-full max-w-sm rounded-2xl border bg-background p-6 shadow-lg mx-4 text-center">
                        <h2 className="text-lg font-semibold mb-2">Delete Application</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Are you sure you want to delete the application at <strong>{deletingJob.companyName}</strong>?
                            This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingJob(null)}
                                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 transition-colors"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
