import type { GeneratedEmailData } from "../types/email";

interface RewrittenEmailPreviewProps {
    original: GeneratedEmailData;
    rewritten: GeneratedEmailData;
    onAccept: () => void;
    onReject: () => void;
}


export function RewrittenEmailPreview({ original, rewritten, onAccept, onReject }: RewrittenEmailPreviewProps) {
    return (
        <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">
                Rewritten Email Preview
            </h2>

            <div className="mb-5">
                <p className="text-sm text-gray-500 mb-1">
                    Subject
                </p>

                <p className="font-medium">
                    {original.subject}
                </p>
            </div>

            <div>
                <p className="text-sm text-gray-500 mb-2">
                    Original Email
                </p>

                <p className="whitespace-pre-line">
                    {original.body}
                </p>
            </div>

            <div className="mt-5">
                <p className="text-sm text-gray-500 mb-2">
                    Rewritten Email
                </p>

                <p className="whitespace-pre-line">
                    {rewritten.body}
                </p>
            </div>

            <div className="flex justify-end mt-5">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={onAccept}
                >
                    Accept
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={onReject}
                >
                    Reject
                </button>
            </div>
        </div>
    )
}