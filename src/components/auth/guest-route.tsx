import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'

interface GuestRouteProps {
    children: React.ReactNode
}

export function GuestRoute({ children }: GuestRouteProps) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const accessToken = useAuthStore((s) => s.accessToken)

    if (isAuthenticated && accessToken) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}
