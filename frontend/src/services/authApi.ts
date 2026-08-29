import type { AuthResponse, loginData, registerData } from "../types/auth";

const API_URL = "http://localhost:3000";

export async function registerUser(data: registerData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        const errorData = await response.json()

        throw new Error(errorData.error || "Failed to register user.")
    }

    const result: AuthResponse = await response.json()
    return result
}


export async function loginUser(data: loginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        const errorData = await response.json()

        throw new Error(errorData.error || "Login failed.")
    }

    const result: AuthResponse = await response.json()
    return result
}