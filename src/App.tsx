import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { GuestRoute } from '@/components/auth/guest-route'

function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-primary">{title}</h1>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'hsl(var(--card))',
                        color: 'hsl(var(--card-foreground))',
                        border: '1px solid hsl(var(--border))',
                    },
                }}
            />
            <Routes>
                {/* Guest-only routes (redirect to dashboard if already logged in) */}
                <Route path="/login" element={
                    <GuestRoute>
                        <PlaceholderPage title="Login" />
                    </GuestRoute>
                } />
                <Route path="/register" element={
                    <GuestRoute>
                        <PlaceholderPage title="Register" />
                    </GuestRoute>
                } />

                {/* Protected routes (redirect to login if not authenticated) */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <PlaceholderPage title="Dashboard" />
                    </ProtectedRoute>
                } />
                <Route path="/applications" element={
                    <ProtectedRoute>
                        <PlaceholderPage title="Applications" />
                    </ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <PlaceholderPage title="Settings" />
                    </ProtectedRoute>
                } />

                {/* Redirects */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
