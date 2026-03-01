import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'

function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">This page will be implemented in upcoming issues.</p>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                theme="system"
                richColors
                closeButton
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
