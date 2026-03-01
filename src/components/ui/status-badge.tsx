import { cn } from '@/lib/utils'
import type { ApplicationStatus } from '@/types'

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
    APPLIED: { label: 'Applied', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    INTERVIEW: { label: 'Interview', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    TECHNICAL: { label: 'Technical', className: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    OFFER: { label: 'Offer', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    REJECTED: { label: 'Rejected', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
}

interface StatusBadgeProps {
    status: ApplicationStatus
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status]
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
                config.className,
                className
            )}
        >
            {config.label}
        </span>
    )
}
