import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import api from "@/utils/axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Search } from "lucide-react";

export default function Header() {
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // SEARCH STATE
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch search results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/project/search?query=${query}`);
        setResults(Array.isArray(res.data) ? res.data : []);
        setOpen(true);
      } catch (err) {
        setResults([]);
        setOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

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

        {/* LOGO */}
        <Link
          to="/"
          className="text-lg md:text-xl font-semibold tracking-tight text-white"
        >
          DevTrade
        </Link>

        {/* 🔍 SEARCH BAR */}
        <div className="relative hidden md:flex flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="
              w-full rounded-md
              bg-gray-900/70
              border border-gray-800
              pl-9 pr-3 py-2
              text-sm text-gray-200
              placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-blue-600
            "
          />

          {open && results.length > 0 && (
            <div
              className="
                absolute top-full mt-2
                w-full max-h-[360px] overflow-y-auto
                rounded-xl
                bg-gray-950/95 backdrop-blur
                border border-gray-800
                shadow-2xl
                z-50
              "
            >
              {results.map((project) => (
                <button
                  key={project._id}
                  onClick={() => {
                    navigate(`/project/${project._id}`);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="
                    flex w-full items-center gap-3
                    px-3 py-2
                    hover:bg-gray-800/70
                    transition
                    text-left
                  "
                >
                  <img
                    src={project.thumbnail || "/placeholder.png"}
                    alt={project.title}
                    className="
                      h-10 w-10
                      rounded-md
                      object-cover
                      border border-gray-700
                    "
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {project.title}
                    </p>
                    <div className="mt-0.5 flex gap-1 flex-wrap">
                      {project.techStack?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="
                            text-[10px]
                            px-1.5 py-0.5
                            rounded
                            bg-gray-800
                            text-gray-300
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NAV LINKS */}
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

        {/* PROFILE + AUTH */}
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    flex h-9 w-9 overflow-hidden
                    items-center justify-center
                    rounded-full
                    bg-gray-800 text-gray-200
                    hover:ring-2 hover:ring-blue-500
                    transition
                  "
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-medium text-white">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  )}
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
                <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-800">
                  Hi, <span className="font-medium text-white">{user.name}</span>
                </div>

                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-gray-200 focus:bg-gray-800 focus:text-white"
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
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
