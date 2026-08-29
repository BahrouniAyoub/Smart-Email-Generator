import { NavLink } from "react-router-dom";

export function MobileNavigation() {
  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex flex-1 justify-center py-3 text-sm font-medium ${
      isActive
        ? "text-gray-900"
        : "text-gray-400"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="flex">
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
      </div>
    </nav>
  );
}