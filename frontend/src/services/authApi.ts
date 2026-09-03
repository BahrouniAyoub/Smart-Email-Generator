import type { AuthResponse, loginData, registerData } from "../types/auth";
import { getApiErrorMessage } from "./getApiErrorMessage";


const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data: registerData): Promise<AuthResponse> {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
    } catch {
        throw new Error("Unable to reach the server. Please try again.")
    }

    if(!response.ok) {
        throw new Error(await getApiErrorMessage(
            response,
            "Unable to register. Please try again."
        ))
    }

    const result: AuthResponse = await response.json()
    return result
}


export async function loginUser(data: loginData): Promise<AuthResponse> {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
    } catch {
        throw new Error("Unable to reach the server. Please try again.")
    }

    if(!response.ok) {
        throw new Error(await getApiErrorMessage(
            response,
            "Unable to log in. Please try again."
        ))
    }

    const result: AuthResponse = await response.json()
    return result
}
