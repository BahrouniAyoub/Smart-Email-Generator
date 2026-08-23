import type { allowedActions } from "../types/email";

interface RewriteActionsButtonProps {
    onRewrite: (action: allowedActions) => void;
    isLoading: boolean;
}


export function RewriteActionsButton({ onRewrite, isLoading }: RewriteActionsButtonProps) {
    return(
        <>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 disabled:opacity-50"
                onClick={() => onRewrite("shorten")}
                disabled={isLoading}
            >
                Shorten
            </button>
             <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 disabled:opacity-50"
                onClick={() => onRewrite("expand")}
                disabled={isLoading}
            >
                expand
            </button>
             <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 disabled:opacity-50"
                onClick={() => onRewrite("formal")}
                disabled={isLoading}
            >
                formal
            </button>
             <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 disabled:opacity-50"
                onClick={() => onRewrite("friendly")}
                disabled={isLoading}
            >
                friendly
            </button>
             <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 disabled:opacity-50"
                onClick={() => onRewrite("grammar")}
                disabled={isLoading}
            >
                Improve Grammar
            </button>
        </>
    )
}