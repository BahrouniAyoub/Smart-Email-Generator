import { useState } from "react"
import type { registerData } from "../types/auth"

interface RegisterFormProps {
    onRegister: (data: registerData) => void
    isLoading: boolean
}


export function RegisterForm({ onRegister, isLoading }: RegisterFormProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        onRegister({
            name,
            email,
            password
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                required
                className="w-full border rounded-lg p-3"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                required
                className="w-full border rounded-lg p-3"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                required
                className="w-full border rounded-lg p-3"
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-black text-white rounded-lg p-3"
            >
                {isLoading
                    ? "Creating account..."
                    : "Register"}
            </button>
        </form>
    )
}
