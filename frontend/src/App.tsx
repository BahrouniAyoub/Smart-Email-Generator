import { useState } from "react";

import EmailForm from "./components/EmailForm";
import GeneratedEmail from "./components/GeneratedEmail";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";

import type {
  EmailFormData,
  GeneratedEmailData,
} from "./types/email";

function App() {
  const [generatedEmail, setGeneratedEmail] =
    useState<GeneratedEmailData | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleGenerate = (
    formData: EmailFormData
  ) => {
    console.log("Form data:", formData);

    setError(null);
    setGeneratedEmail(null);
    setIsLoading(true);

    setTimeout(() => {
      const fakeEmail: GeneratedEmailData = {
        subject:
          "Application for Junior AI Engineer",
        body: `Dear Hiring Manager,

I am writing to express my interest in the Junior AI Engineer position.

My background in artificial intelligence and software development has allowed me to develop strong technical and problem-solving skills.

I would be pleased to discuss my application further.

Best regards,
Ayoub`,
      };

      setGeneratedEmail(fakeEmail);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Smart Email Generator
          </h1>

          <p className="text-gray-600 mt-3">
            Write professional emails faster.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <EmailForm
            onGenerate={handleGenerate}
          />
        </div>

        {isLoading && <LoadingIndicator />}

        {error && (
          <ErrorMessage message={error} />
        )}

        {generatedEmail && (
          <GeneratedEmail
            email={generatedEmail}
          />
        )}
      </div>
    </main>
  );
}

export default App;