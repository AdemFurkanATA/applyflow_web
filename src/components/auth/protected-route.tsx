import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const accessToken = useAuthStore((s) => s.accessToken)
    const location = useLocation()

    if (!isAuthenticated || !accessToken) {
        // Save the intended destination so we can redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}
