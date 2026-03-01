import { Briefcase, Clock, CheckCircle, XCircle, TrendingUp, CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCardProps {
    title: string
    value: string | number
    description: string
    icon: React.ReactNode
    trend?: string
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {trend && <span className="text-emerald-500 font-medium">{trend} </span>}
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

function EmptyState() {
    return (
        <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-1">No applications yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                    Start tracking your job applications. Add your first one to see your dashboard come alive.
                </p>
            </CardContent>
        </Card>
    )
}

export function DashboardPage() {
    // TODO: Replace with real React Query data after ISSUE 5 merge
    const stats = {
        total: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
        thisWeek: 0,
    }

    const isEmpty = stats.total === 0

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your job application activity.</p>
            </div>

            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <StatCard
                    title="Total Applications"
                    value={stats.total}
                    description="all time"
                    icon={<Briefcase className="h-5 w-5" />}
                />
                <StatCard
                    title="In Progress"
                    value={stats.applied + stats.interview}
                    description="awaiting response"
                    icon={<Clock className="h-5 w-5" />}
                />
                <StatCard
                    title="Offers"
                    value={stats.offer}
                    description="received"
                    icon={<CheckCircle className="h-5 w-5" />}
                    trend={stats.offer > 0 ? `${stats.offer}` : undefined}
                />
                <StatCard
                    title="Rejected"
                    value={stats.rejected}
                    description="total"
                    icon={<XCircle className="h-5 w-5" />}
                />
                <StatCard
                    title="This Week"
                    value={stats.thisWeek}
                    description="applications sent"
                    icon={<CalendarDays className="h-5 w-5" />}
                />
                <StatCard
                    title="Success Rate"
                    value={stats.total > 0 ? `${Math.round((stats.offer / stats.total) * 100)}%` : '—'}
                    description="offers / total"
                    icon={<TrendingUp className="h-5 w-5" />}
                />
            </div>

            {/* Recent activity or empty state */}
            {isEmpty ? (
                <EmptyState />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Your recent applications will appear here after ISSUE 5 is merged.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
