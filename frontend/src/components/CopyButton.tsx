import { useState } from "react";

interface CopyButonProps {
    text: string;
}

function CopyButton({ text }: CopyButonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return (
        <button
            onClick={handleCopy}
            className="border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300"
        >
            {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
    )
}


export default CopyButton;