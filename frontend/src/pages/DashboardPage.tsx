import type { AuthUser } from "../types/auth";
import type { EmailHistoryItem } from "../types/email";
import { DashboardStats } from "../components/DashboardStats";
import { getMostUsedValue } from "../utils/getMostUsedValue";

interface DashboardPageProps {
  user: AuthUser | null;
  emails: EmailHistoryItem[];
}

export function DashboardPage({
  user,
  emails,
}: DashboardPageProps) {
  const totalEmails = emails.length;

  const mostUsedTone = getMostUsedValue(
    emails.map((email) => email.tone)
  );

  const mostUsedLanguage = getMostUsedValue(
    emails.map((email) => email.language)
  );

  const recentEmails = emails.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>

        <p className="mt-2 text-gray-500">
          Here's an overview of your email activity.
        </p>
      </div>

      <DashboardStats
        totalEmails={totalEmails}
        mostUsedTone={mostUsedTone}
        mostUsedLanguage={mostUsedLanguage}
      />

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Emails
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your five most recently generated emails.
          </p>
        </div>

        {recentEmails.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-medium text-gray-900">
              No emails yet
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Generate your first email to see activity here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEmails.map((email) => (
              <div
                key={email.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="font-semibold text-gray-900">
                  {email.subject}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {email.tone || "Unknown tone"}
                  {" · "}
                  {email.language || "Unknown language"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}