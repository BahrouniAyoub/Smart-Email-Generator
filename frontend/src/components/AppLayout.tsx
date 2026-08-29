import { Navbar } from "./Navbar";
import { MobileNavigation } from "./MobileNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
  userName?: string;
  onLogout: () => void;
}

export function AppLayout({
  children,
  userName,
  onLogout,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={userName}
        onLogout={onLogout}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 md:pb-8 lg:px-8">
        {children}
      </main>

      <MobileNavigation />
    </div>
  );
}