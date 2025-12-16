import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Search, User } from "lucide-react";

export default function Header() {
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-gray-800
        bg-black/60 backdrop-blur
        supports-[backdrop-filter]:bg-black/50
      "
    >
      <div className="mx-auto flex h-12 md:h-16 max-w-7xl items-center gap-6 px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg md:text-xl font-semibold tracking-tight text-white"
        >
          DevTrade
        </Link>

        {/* Search (UI only) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search projects..."
              className="
                w-full rounded-md
                bg-gray-900/70
                border border-gray-800
                pl-9 pr-3 py-2
                text-sm text-gray-200
                placeholder-gray-500
                focus:outline-none focus:ring-1 focus:ring-gray-600
              "
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
          {[
            { name: "Explore", path: "/projects" },
            { name: "My Projects", path: "/my-projects" },
            { name: "Upload", path: "/upload" },
          ].map((link) => {
            const active = isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative transition-colors hover:text-white",
                  active && "text-white"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-white transition-all duration-300",
                    active ? "w-full" : "w-0 hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    bg-gray-800 text-gray-200
                    hover:bg-gray-700 transition
                  "
                >
                  <User className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
    w-48
    border border-gray-800
    bg-gray-900/95
    backdrop-blur
    shadow-xl
  "
              >
                {/* User Info */}
                <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-800">
                  Hi,{" "}
                  <span className="font-medium text-white">{user.name}</span>
                </div>

                {/* Menu Items */}
                <DropdownMenuItem
                  className="
      cursor-pointer
      text-gray-200
      focus:bg-gray-800
      focus:text-white
    "
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="
      cursor-pointer
      text-red-400
      focus:bg-red-500/10
      focus:text-red-400
    "
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
