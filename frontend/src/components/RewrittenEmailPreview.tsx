import type { GeneratedEmailData } from "../types/email";

interface RewrittenEmailPreviewProps {
  original: GeneratedEmailData;
  rewritten: GeneratedEmailData;
  onAccept: () => void;
  onReject: () => void;
}

export function RewrittenEmailPreview({
  original,
  rewritten,
  onAccept,
  onReject,
}: RewrittenEmailPreviewProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Review Rewrite
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Compare the original email with the rewritten version.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Original */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Original
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500">
              Subject
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {original.subject}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Body
            </p>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
              {original.body}
            </p>
          </div>
        </div>

        {/* Rewritten */}
        <div className="rounded-xl border border-gray-300 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              Rewritten
            </p>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              AI version
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500">
              Subject
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {rewritten.subject}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Body
            </p>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
              {rewritten.body}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onReject}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Keep Original
        </button>

        <button
          type="button"
          onClick={onAccept}
          className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Use Rewritten Version
        </button>
      </div>
    </section>
  );
}
