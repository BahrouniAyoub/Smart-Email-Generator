import { useState } from "react";
import type { loginData } from "../types/auth";

interface LoginFormProps {
  onLogin: (data: loginData) => void;
  isLoading: boolean;
}

export function LoginForm({
  onLogin,
  isLoading,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onLogin({
      email,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
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
        className="w-full cursor-pointer bg-black text-white rounded-lg p-3 disabled:opacity-50"
      >
        {isLoading
          ? "Logging in..."
          : "Login"}
      </button>
    </form>
  );
}
