import type {
  EmailHistoryItem,
} from "../types/email";

interface EmailHistoryProps {
  emails: EmailHistoryItem[];
  onDelete: (id: number) => void;
}

function EmailHistory({
  emails,
  onDelete,
}: EmailHistoryProps) {

  const handleDelete = (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this email?"
      );

    if (!confirmed) {
      return;
    }

    onDelete(id);
  };
  if (emails.length === 0) {
    return (
      <p className="text-gray-500">
        No emails generated yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Email History
      </h2>

      {emails.map((email) => (
        <div
          key={email.id}
          className="bg-white border rounded-xl p-4"
        >
          <h3 className="font-semibold">
            {email.subject}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {email.tone} · {email.language}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            {new Date(
              email.createdAt
            ).toLocaleString()}
          </p>

          <button
            onClick={() => handleDelete(email.id)}
            className="mt-3 cursor-pointer text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmailHistory;
