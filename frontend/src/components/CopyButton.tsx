import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({
  text,
}: CopyButtonProps) {
  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      text
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
