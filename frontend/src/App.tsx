import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ErrorMessage from "./components/ErrorMessage";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AppLayout } from "./components/AppLayout";

import type {
  EmailHistoryItem,
} from "./types/email";

import type {
  AuthUser,
  loginData,
  registerData,
} from "./types/auth";

import {
  deleteEmail,
  getEmails,
} from "./services/emailApi";

import {
  loginUser,
  registerUser,
} from "./services/authApi";

import { DashboardPage } from "./pages/DashboardPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { HistoryPage } from "./pages/HistoryPage";

function App() {
  const [error, setError] =
    useState<string | null>(null);

  const [emailHistory, setEmailHistory] =
    useState<EmailHistoryItem[]>([]);

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );

  const [user, setUser] =
    useState<AuthUser | null>(() => {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  const [authLoading, setAuthLoading] =
    useState(false);

  const [authMode, setAuthMode] =
    useState<"login" | "register">(
      "login"
    );

  const loadEmails = async () => {
    if (!token) {
      return;
    }

    try {
      const emails =
        await getEmails(token);

      setEmailHistory(emails);
    } catch (error) {
      console.error(
        "Failed to load emails:",
        error
      );
    }
  };

  useEffect(() => {
    if (token) {
      loadEmails();
    }
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
      setEmailHistory([]);
    };

    window.addEventListener(
      "auth:unauthorized",
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        "auth:unauthorized",
        handleUnauthorized
      );
    };
  }, []);

  const handleLogin = async (
    data: loginData
  ) => {
    setError(null);
    setAuthLoading(true);

    try {
      const result =
        await loginUser(data);

      setToken(result.token);
      setUser(result.user);

      localStorage.setItem(
        "token",
        result.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Unable to log in."
        );
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (
    data: registerData
  ) => {
    setError(null);
    setAuthLoading(true);

    try {
      const result =
        await registerUser(data);

      setToken(result.token);
      setUser(result.user);

      localStorage.setItem(
        "token",
        result.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Unable to register."
        );
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setEmailHistory([]);
    setError(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleDeleteEmail = async (
    id: number
  ) => {
    if (!token) {
      return;
    }

    try {
      await deleteEmail(id, token);

      setEmailHistory((current) =>
        current.filter(
          (email) =>
            email.id !== id
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Unable to delete email."
        );
      }
    }
  };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">
              Smart Email Generator
            </h1>

            <p className="mt-3 text-gray-600">
              Write professional emails faster.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setAuthMode("login")
                }
                className={`flex-1 cursor-pointer rounded-lg py-2 ${authMode === "login"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                  }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() =>
                  setAuthMode("register")
                }
                className={`flex-1 cursor-pointer rounded-lg py-2 ${authMode === "register"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                  }`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="mb-4">
                <ErrorMessage
                  message={error}
                />
              </div>
            )}

            {authMode === "login" ? (
              <LoginForm
                onLogin={handleLogin}
                isLoading={
                  authLoading
                }
              />
            ) : (
              <RegisterForm
                onRegister={
                  handleRegister
                }
                isLoading={
                  authLoading
                }
              />
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <AppLayout
      userName={
        user?.name ||
        user?.email
      }
      onLogout={handleLogout}
    >
      {error && (
        <div className="mb-6">
          <ErrorMessage
            message={error}
          />
        </div>
      )}

      <Routes>
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              user={user}
              emails={
                emailHistory
              }
            />
          }
        />

        <Route
          path="/generate"
          element={
            <GeneratorPage
              token={token}
              onEmailGenerated={
                loadEmails
              }
            />
          }
        />

        <Route
          path="/history"
          element={
            <HistoryPage
              emails={
                emailHistory
              }
              onDelete={
                handleDeleteEmail
              }
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default App;
