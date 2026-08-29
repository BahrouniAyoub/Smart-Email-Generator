import { useState } from "react";

import EmailForm from "../components/EmailForm";
import GeneratedEmail from "../components/GeneratedEmail";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { RewriteActionsButton } from "../components/RewriteActionButton";
import { RewrittenEmailPreview } from "../components/RewrittenEmailPreview";
import { TemplateSelector } from "../components/TemplateSelector";

import {
    emailTemplates,
    type EmailTemplate,
} from "../data/emailTemplates";

import type {
    allowedActions,
    EmailFormData,
    GeneratedEmailData,
} from "../types/email";

import {
    generateEmail,
    rewriteEmail,
} from "../services/emailApi";

interface GeneratorPageProps {
    token: string;
    onEmailGenerated: () => void;
}

export function GeneratorPage({
    token,
    onEmailGenerated,
}: GeneratorPageProps) {
    const [generatedEmail, setGeneratedEmail] =
        useState<GeneratedEmailData | null>(null);

    const [rewrittenEmail, setRewrittenEmail] =
        useState<GeneratedEmailData | null>(null);

    const [isLoading, setIsLoading] =
        useState(false);

    const [isRewriting, setIsRewriting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [formData, setFormData] =
        useState<EmailFormData>({
            purpose: "",
            recipient: "",
            context: "",
            tone: "Professional",
            language: "English",
            length: "Short",
        });

    const handleTemplateSelect = (
        template: EmailTemplate
    ) => {
        setFormData((current) => ({
            ...current,
            ...template.values,
        }));
    };

    const handleGenerate = async (
        data: EmailFormData
    ) => {
        setError(null);
        setGeneratedEmail(null);
        setRewrittenEmail(null);
        setIsLoading(true);

        try {
            const result =
                await generateEmail(
                    data,
                    token
                );

            setGeneratedEmail(result);

            onEmailGenerated();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Failed to generate email."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRewrite = async (
        action: allowedActions
    ) => {
        if (!generatedEmail) {
            return;
        }

        setError(null);
        setIsRewriting(true);

        try {
            const result =
                await rewriteEmail(
                    {
                        subject:
                            generatedEmail.subject,
                        body:
                            generatedEmail.body,
                        action,
                    },
                    token
                );

            setRewrittenEmail(result);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Unable to rewrite email."
                );
            }
        } finally {
            setIsRewriting(false);
        }
    };

    const handleAcceptRewrittenEmail = () => {
        if (!rewrittenEmail) {
            return;
        }

        setGeneratedEmail(rewrittenEmail);
        setRewrittenEmail(null);
    };

    const handleRejectRewrittenEmail = () => {
        setRewrittenEmail(null);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Generate Email
                </h1>

                <p className="mt-2 text-gray-500">
                    Tell the AI what you want to write.
                </p>
            </div>

            {error && (
                <ErrorMessage message={error} />
            )}

            <div className="grid gap-8 lg:grid-cols-2">
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Email Details
                    </h2>

                    <div className="mt-6">
                        <TemplateSelector
                            templates={emailTemplates}
                            onSelect={handleTemplateSelect}
                        />
                    </div>

                    <div className="mt-6">
                        <EmailForm
                            formData={formData}
                            onChange={setFormData}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                        />
                    </div>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Generated Email
                    </h2>

                    <div className="mt-6">
                        {isLoading && (
                            <LoadingIndicator />
                        )}

                        {!isLoading && !generatedEmail && (
                            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
                                <p className="font-medium text-gray-900">
                                    Your email will appear here
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    Complete the form and click Generate Email.
                                </p>
                            </div>
                        )}

                        {generatedEmail && (
                            <>
                                <GeneratedEmail
                                    email={generatedEmail}
                                />

                                <div className="mt-6">
                                    <RewriteActionsButton
                                        onRewrite={handleRewrite}
                                        isLoading={isRewriting}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>

            {generatedEmail && rewrittenEmail && (
                <RewrittenEmailPreview
                    original={generatedEmail}
                    rewritten={rewrittenEmail}
                    onAccept={handleAcceptRewrittenEmail}
                    onReject={handleRejectRewrittenEmail}
                />
            )}
        </div>
    );
}