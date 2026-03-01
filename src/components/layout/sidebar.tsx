import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Briefcase, Settings, LogOut,
    ChevronLeft, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Applications', icon: Briefcase, path: '/applications' },
    { label: 'Settings', icon: Settings, path: '/settings' },
]

export function Sidebar() {
    const location = useLocation()
    const { sidebarCollapsed, toggleSidebar } = useUIStore()
    const logout = useAuthStore((s) => s.logout)

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300 flex flex-col',
                    sidebarCollapsed ? 'w-[68px]' : 'w-[240px]'
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center border-b px-4">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                            A
                        </div>
                        {!sidebarCollapsed && (
                            <span className="text-lg font-bold tracking-tight">ApplyFlow</span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                        const linkContent = (
                            <Link
                                to={item.path}
                                className={cn(
                                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {!sidebarCollapsed && <span>{item.label}</span>}
                            </Link>
                        )

                        if (sidebarCollapsed) {
                            return (
                                <Tooltip key={item.path}>
                                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                    <TooltipContent side="right">{item.label}</TooltipContent>
                                </Tooltip>
                            )
                        }

                        return <div key={item.path}>{linkContent}</div>
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="border-t p-3 space-y-1">
                    {sidebarCollapsed ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={logout}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                >
                                    <LogOut className="h-5 w-5 shrink-0" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Logout</TooltipContent>
                        </Tooltip>
                    ) : (
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            <span>Logout</span>
                        </button>
                    )}
                </div>

                {/* Collapse toggle */}
                <div className="border-t p-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="w-full"
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </aside>
        </TooltipProvider>
    )
}
