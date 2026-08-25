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

function App() {
  const [generatedEmail, setGeneratedEmail] =
    useState<GeneratedEmailData | null>(null);

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


  const loadEmails = async () => {
    try{
      const emails = await getEmails()
      setEmailHistory(emails)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    loadEmails()
  }, [])


  const handleDelete = async (id: number) => {
    try{
      await deleteEmail(id)
      setEmailHistory((current) => current.filter((email) => email.id !== id))
    } catch(error) {
      console.error(error);
    }
  }

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
      const result = await rewriteEmail({
        subject: generatedEmail.subject,
        body: generatedEmail.body,
        action,
      })
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
      const result = await generateEmail(formData);
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

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4" >
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

          <EmailHistory emails={emailHistory} onDelete={handleDelete} />
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