import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Compass,
  Folder,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const { pathname } = useLocation();

  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore Projects", path: "/projects", icon: Compass },
    { name: "My Projects", path: "/my-projects", icon: Folder },
    { name: "Upload Project", path: "/upload", icon: UploadCloud },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden md:flex flex-col border-r border-gray-800 bg-gray-950/80 backdrop-blur transition-all duration-300",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {open && (
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-1 hover:bg-gray-800"
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon size={16} />
              {open && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {open && (
        <div className="border-t border-gray-800 p-4 text-xs text-gray-500">
          © {new Date().getFullYear()} DevTrade
        </div>
      )}
    </aside>
  );
}
