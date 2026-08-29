interface DashboardStatsProps {
  totalEmails: number;
  mostUsedTone: string | null;
  mostUsedLanguage: string | null;
}

export function DashboardStats({
  totalEmails,
  mostUsedTone,
  mostUsedLanguage,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Emails Generated
        </p>

        <p className="mt-3 text-3xl font-bold text-gray-900">
          {totalEmails}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Most Used Tone
        </p>

        <p className="mt-3 text-xl font-semibold text-gray-900">
          {mostUsedTone ?? "No data yet"}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Most Used Language
        </p>

        <p className="mt-3 text-xl font-semibold text-gray-900">
          {mostUsedLanguage ?? "No data yet"}
        </p>
      </div>
    </div>
  );
}