import React, { useState } from 'react';
import type { EmailFormData } from '../types/email';
import ToneSelector from './ToneSelector';
import LanguageSelector from './LanguageSelector';
import LengthSelector from './LengthSelector';

interface EmailFormProps {
    onGenerate: (data: EmailFormData) => void;
}


function EmailForm({ onGenerate }: EmailFormProps) {
    const [formData, setFormData] = useState<EmailFormData>({
        purpose: '',
        recipient: '',
        context: '',
        tone: 'Professional',
        language: 'English',
        length: 'Short'
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <label className="block mb-2 font-medium">
                    Recipient:
                </label>
                <input
                    type="text"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <label className="block mb-2 font-medium">
                    Context:
                </label>
                <textarea
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <ToneSelector value={formData.tone} onChange={(value) => setFormData({ ...formData, tone: value })} />
                <LanguageSelector value={formData.language} onChange={(value) => setFormData({ ...formData, language: value })} />
                <LengthSelector value={formData.length} onChange={(value) => setFormData({ ...formData, length: value })} />

                <button
                    type='submit'
                    className="w-full bg-black text-white py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-800 transition-colors duration-300"
                >
                    Generate Email
                </button>
            </form>
    )
}

export default EmailForm