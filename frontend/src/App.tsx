import { useEffect, useState } from "react";

import EmailForm from "./components/EmailForm";
import GeneratedEmail from "./components/GeneratedEmail";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";

import type {
  allowedActions,
  EmailFormData,
  EmailHistoryItem,
  GeneratedEmailData,
} from "./types/email";
import { deleteEmail, generateEmail, getEmails, rewriteEmail } from "./services/emailApi";
import { RewriteActionsButton } from "./components/RewriteActionButton";
import { RewrittenEmailPreview } from "./components/RewrittenEmailPreview";
import { emailTemplates, type EmailTemplate } from "./data/emailTemplates";
import { TemplateSelector } from "./components/TemplateSelector";
import EmailHistory from "./components/EmailHistory";
import { type AuthUser, type loginData, type registerData } from "./types/auth";
import { loginUser, registerUser } from "./services/authApi";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

function App() {
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmailData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [rewrittenEmail, setRewrittenEmail] = useState<GeneratedEmailData | null>(null);
  const [isRewriting, setIsRewriting] = useState(false);
  const [formData, setFormData] = useState<EmailFormData>({
    purpose: '',
    recipient: '',
    context: '',
    tone: 'Professional',
    language: 'English',
    length: 'Short'
  });
  const [emailHistory, setEmailHistory] = useState<EmailHistoryItem[]>([])

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")



  const loadEmails = async () => {
    if (!token) {
      return
    }
    try {
      const emails = await getEmails(token)
      setEmailHistory(emails)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (token) {
      loadEmails()
    }
  }, [token])


  const handleLogin = async (data: loginData) => {
    setError(null);
    setAuthLoading(true);

    try {
      const result = await loginUser(data)
      setToken(result.token)
      setUser(result.user)
      localStorage.setItem("token", result.token)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)

      }
    } finally {
      setAuthLoading(false)
    }

  }

  const handleRegister = async (data: registerData) => {
    setError(null);
    setAuthLoading(true);

    try {
      const result = await registerUser(data)
      setToken(result.token)
      setUser(result.user)
      localStorage.setItem("token", result.token)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)

      }
    } finally {
      setAuthLoading(false)
    }

  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    setEmailHistory([])
    setGeneratedEmail(null)
    localStorage.removeItem("token")
  }
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
          (email) => email.id !== id
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleTemplateSelect = (
    template: EmailTemplate
  ) => {
    setFormData((current) => ({
      ...current,
      ...template.values,
    }));
  };

  const handleAcceptRewrittenEmail = () => {
    if (!rewrittenEmail) {
      return;
    }
    setGeneratedEmail(rewrittenEmail);
    setRewrittenEmail(null);
  }

  const handleRejectRewrittenEmail = () => {
    setRewrittenEmail(null);
  }

  const handleRewrite = async (action: allowedActions) => {
    if (!generatedEmail) {
      return
    }

    setError(null);
    setIsRewriting(true);
    try {
      if (!token) {
        return;
      }

      const result = await rewriteEmail(
        {
          subject: generatedEmail.subject,
          body: generatedEmail.body,
          action,
        },
        token
      );
      setRewrittenEmail(result)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to rewrite email.");
      }
    } finally {
      setIsRewriting(false);
    }
  }

  const handleGenerate = async (
    formData: EmailFormData
  ) => {
    console.log("Form data:", formData);

    setError(null);
    setRewrittenEmail(null);
    setGeneratedEmail(null);
    setIsLoading(true);


    try {
      if (!token) {
        return;
      }

      const result =
        await generateEmail(formData, token);
      setGeneratedEmail(result)
      await loadEmails()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  if (!token) {
    return (
      <main className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              Smart Email Generator
            </h1>

            <p className="text-gray-600 mt-3">
              Write professional emails faster.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2 rounded-lg ${authMode === "login"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                  }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`flex-1 py-2 rounded-lg ${authMode === "register"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                  }`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="mb-4">
                <ErrorMessage message={error} />
              </div>
            )}

            {authMode === "login" ? (
              <LoginForm
                onLogin={handleLogin}
                isLoading={authLoading}
              />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                isLoading={authLoading}
              />
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4" >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">
              Signed in as
            </p>

            <p className="font-medium">
              {user?.name || user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Smart Email Generator
          </h1>

          <p className="text-gray-600 mt-3">
            Write professional emails faster.
          </p>
        </div>




        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <TemplateSelector
            templates={emailTemplates}
            onSelect={handleTemplateSelect}
          />

          <EmailForm
            formData={formData}
            onChange={setFormData}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          <EmailHistory emails={emailHistory} onDelete={handleDeleteEmail} />
        </div>

        {isLoading && <LoadingIndicator />}

        {error && (
          <ErrorMessage message={error} />
        )}

        {generatedEmail && (
          <>
            <GeneratedEmail
              email={generatedEmail}
            />
            <RewriteActionsButton
              onRewrite={handleRewrite}
              isLoading={isRewriting}
            />
          </>
        )}

        {generatedEmail && rewrittenEmail && (
          <RewrittenEmailPreview
            original={generatedEmail}
            rewritten={rewrittenEmail}
            onAccept={handleAcceptRewrittenEmail}
            onReject={handleRejectRewrittenEmail}
          />
        )}
      </div>
    </main >
  );
}

export default App;