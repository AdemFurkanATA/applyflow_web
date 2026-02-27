import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { useUIStore } from '@/stores/ui-store'
import { cn } from '@/lib/utils'

export function DashboardLayout() {
    const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed)

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <Header />
            <main
                className={cn(
                    'pt-16 transition-all duration-300 min-h-screen',
                    sidebarCollapsed ? 'pl-[68px]' : 'pl-[240px]'
                )}
            >
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
