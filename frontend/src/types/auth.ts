export interface AuthUser {
    id: number
    name: string
    email: string
}

export interface loginData {
    email: string
    password: string
}

export interface registerData {
    name: string
    email: string
    password: string
}

export interface AuthResponse {
    user: AuthUser
    token: string
}