import React, { useState } from 'react';
import type { EmailFormData } from '../types/email';
import ToneSelector from './ToneSelector';
import LanguageSelector from './LanguageSelector';
import LengthSelector from './LengthSelector';

interface EmailFormProps {
    onGenerate: (data: EmailFormData) => void;
    onChange: (data: EmailFormData) => void;
    formData: EmailFormData;
    isLoading: boolean;
    
}


function EmailForm({ onGenerate, isLoading, formData, onChange }: EmailFormProps) {
    const [formError, setFormError] = useState<string | null>(null);
    


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!formData.purpose.trim()) {
            setFormError(
                "Purpose is required."
            );
            return;
        }

        if (!formData.context.trim()) {
            setFormError(
                "Context is required."
            );
            return;
        }

        if (formData.context.length > 1500) {
            setFormError(
                "Context must be less than 1500 characters."
            );
            return;
        }
        onGenerate(formData);
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <label className="block mb-2 font-medium">
                Purpose:
            </label>
            <input
                type="text"
                value={formData.purpose}
                onChange={(e) => onChange({ ...formData, purpose: e.target.value })}
                className="w-full border rounded-lg p-3 mb-4"
            />

            <label className="block mb-2 font-medium">
                Recipient:
            </label>
            <input
                type="text"
                value={formData.recipient}
                onChange={(e) => onChange({ ...formData, recipient: e.target.value })}
                className="w-full border rounded-lg p-3 mb-4"
            />

            <label className="block mb-2 font-medium">
                Context:
            </label>
            <textarea
                value={formData.context}
                maxLength={1500}
                onChange={(e) => onChange({ ...formData, context: e.target.value })}
                className="w-full border rounded-lg p-3 mb-1"
            />
            {formData.context.length} / 1500

            <ToneSelector value={formData.tone} onChange={(value) => onChange({ ...formData, tone: value })} />
            <LanguageSelector value={formData.language} onChange={(value) => onChange({ ...formData, language: value })} />
            <LengthSelector value={formData.length} onChange={(value) => onChange({ ...formData, length: value })} />

            {formError && (
                <div className="text-red-500 mb-4">
                    {formError}
                </div>
            )}

            <button
                type='submit'
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-800 transition-colors duration-300"
            >
                {isLoading ? 'Generating...' : 'Generate Email'}
            </button>
        </form>
    )
}

export default EmailForm