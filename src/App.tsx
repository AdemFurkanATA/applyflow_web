import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

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
                {/* Public routes */}
                <Route path="/login" element={<PlaceholderPage title="Login" />} />
                <Route path="/register" element={<PlaceholderPage title="Register" />} />

                {/* Protected routes with dashboard layout */}
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
                    <Route path="/applications" element={<PlaceholderPage title="Job Applications" />} />
                    <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
                </Route>

                {/* Redirects */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
