import EmailHistory from "../components/EmailHistory";
import type { EmailHistoryItem } from "../types/email";

interface HistoryPageProps {
  emails: EmailHistoryItem[];
  onDelete: (id: number) => void;
}

export function HistoryPage({
  emails,
  onDelete,
}: HistoryPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Email History
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage your generated emails.
        </p>
      </div>

      <EmailHistory
        emails={emails}
        onDelete={onDelete}
      />
    </div>
  );
}