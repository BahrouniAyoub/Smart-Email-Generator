import type { allowedActions } from "../types/email";

interface RewriteActionsButtonProps {
  onRewrite: (action: allowedActions) => void;
  isLoading: boolean;
}

const rewriteActions: {
  label: string;
  action: allowedActions;
}[] = [
  {
    label: "Shorten",
    action: "shorten",
  },
  {
    label: "Expand",
    action: "expand",
  },
  {
    label: "More Formal",
    action: "formal",
  },
  {
    label: "Friendlier",
    action: "friendly",
  },
  {
    label: "Improve Grammar",
    action: "grammar",
  },
];

export function RewriteActionsButton({
  onRewrite,
  isLoading,
}: RewriteActionsButtonProps) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Refine this email
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Choose how you want the AI to rewrite it.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {rewriteActions.map((item) => (
          <button
            key={item.action}
            type="button"
            onClick={() =>
              onRewrite(item.action)
            }
            disabled={isLoading}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="mt-3 text-sm text-gray-500">
          Rewriting email...
        </p>
      )}
    </div>
  );
}
