import { NavLink } from "react-router-dom";

interface NavbarProps {
  userName?: string;
  onLogout: () => void;
}

export function Navbar({
  userName,
  onLogout,
}: NavbarProps) {
  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-gray-100 text-gray-900"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <NavLink
            to="/dashboard"
            className="text-lg font-bold text-gray-900"
          >
            SmartMail AI
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/dashboard"
              className={linkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/generate"
              className={linkClass}
            >
              Generate
            </NavLink>

            <NavLink
              to="/history"
              className={linkClass}
            >
              History
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {userName && (
            <span className="hidden text-sm text-gray-500 sm:block">
              {userName}
            </span>
          )}

          <button
            onClick={onLogout}
            className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
