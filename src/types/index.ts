// ===== Auth =====

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    refreshToken: string
    name: string
    email: string
}

export interface RefreshTokenRequest {
    refreshToken: string
}

// ===== Job Applications =====

export type ApplicationStatus =
    | 'APPLIED'
    | 'INTERVIEW'
    | 'TECHNICAL'
    | 'OFFER'
    | 'REJECTED'

export interface JobApplicationRequest {
    companyName: string
    position: string
    status: ApplicationStatus
    applicationDate: string // ISO date
    salaryExpectation?: number
    contactPerson?: string
    notes?: string
}

export interface JobApplicationResponse {
    id: number
    companyName: string
    position: string
    status: ApplicationStatus
    applicationDate: string
    salaryExpectation?: number
    contactPerson?: string
    notes?: string
    createdAt: string
    updatedAt: string
}

export interface StatusHistoryResponse {
    id: number
    previousStatus: ApplicationStatus
    newStatus: ApplicationStatus
    changedAt: string
}

// ===== Pagination =====

export interface PagedResponse<T> {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}

// ===== Errors =====

export interface ApiError {
    timestamp: string
    status: number
    error: string
    message: string
    validationErrors?: Record<string, string>
}

// ===== Audit (Admin) =====

export type AuditEventType =
    | 'USER_REGISTERED'
    | 'USER_LOGGED_IN'
    | 'USER_LOGGED_OUT'
    | 'JOB_CREATED'
    | 'JOB_UPDATED'
    | 'JOB_DELETED'
    | 'JOB_STATUS_CHANGED'
    | 'RATE_LIMIT_EXCEEDED'

export interface AuditLogResponse {
    id: number
    eventType: AuditEventType
    userId: number
    entityId?: number
    metadata?: string
    createdAt: string
}
