import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import type { ApplicationStatus, JobApplicationResponse } from '@/types'

const jobFormSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    status: z.enum(['APPLIED', 'INTERVIEW', 'TECHNICAL', 'OFFER', 'REJECTED'] as const),
    applicationDate: z.string().min(1, 'Application date is required'),
    salaryExpectation: z.number().optional(),
    contactPerson: z.string().optional(),
    notes: z.string().optional(),
})

type JobFormData = z.infer<typeof jobFormSchema>

interface JobApplicationFormProps {
    initialData?: JobApplicationResponse
    onSubmit: (data: JobFormData) => Promise<void>
    isLoading: boolean
}

const statuses: { value: ApplicationStatus; label: string }[] = [
    { value: 'APPLIED', label: 'Applied' },
    { value: 'INTERVIEW', label: 'Interview' },
    { value: 'TECHNICAL', label: 'Technical' },
    { value: 'OFFER', label: 'Offer' },
    { value: 'REJECTED', label: 'Rejected' },
]

export function JobApplicationForm({ initialData, onSubmit, isLoading }: JobApplicationFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JobFormData>({
        resolver: zodResolver(jobFormSchema),
        defaultValues: initialData
            ? {
                companyName: initialData.companyName,
                position: initialData.position,
                status: initialData.status,
                applicationDate: initialData.applicationDate,
                salaryExpectation: initialData.salaryExpectation,
                contactPerson: initialData.contactPerson || '',
                notes: initialData.notes || '',
            }
            : {
                status: 'APPLIED',
                applicationDate: new Date().toISOString().split('T')[0],
            },
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium">Company *</label>
                    <input
                        id="companyName"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        placeholder="Google, Microsoft..."
                        disabled={isLoading}
                        {...register('companyName')}
                    />
                    {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="position" className="text-sm font-medium">Position *</label>
                    <input
                        id="position"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        placeholder="Frontend Developer"
                        disabled={isLoading}
                        {...register('position')}
                    />
                    {errors.position && <p className="text-sm text-destructive">{errors.position.message}</p>}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Status *</label>
                    <select
                        id="status"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        disabled={isLoading}
                        {...register('status')}
                    >
                        {statuses.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="applicationDate" className="text-sm font-medium">Date *</label>
                    <input
                        id="applicationDate"
                        type="date"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        disabled={isLoading}
                        {...register('applicationDate')}
                    />
                    {errors.applicationDate && <p className="text-sm text-destructive">{errors.applicationDate.message}</p>}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="salaryExpectation" className="text-sm font-medium">Salary Expectation</label>
                    <input
                        id="salaryExpectation"
                        type="number"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        placeholder="50000"
                        disabled={isLoading}
                        {...register('salaryExpectation', { valueAsNumber: true })}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="contactPerson" className="text-sm font-medium">Contact Person</label>
                    <input
                        id="contactPerson"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        placeholder="HR Manager"
                        disabled={isLoading}
                        {...register('contactPerson')}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <textarea
                    id="notes"
                    rows={3}
                    className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-none"
                    placeholder="Any additional notes..."
                    disabled={isLoading}
                    {...register('notes')}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {initialData ? 'Update Application' : 'Create Application'}
                </button>
            </div>
        </form>
    )
}
