import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black/70 backdrop-blur border-t border-gray-800">
      
      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          
          {/* Brand */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              DevTrade
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              A modern platform for developers to showcase, trade, and discover
              real-world projects.
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <Link to="/projects" className="hover:text-white transition">
              Explore Projects
            </Link>
            <Link to="/upload" className="hover:text-white transition">
              Upload
            </Link>
            <Link to="/my-projects" className="hover:text-white transition">
              My Projects
            </Link>
            
          </div>

          

          {/* Social */}
          <div className="flex justify-end gap-5 text-gray-400">
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-white hover:scale-110 transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-white hover:scale-110 transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white hover:scale-110 transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        
      </div>
    </footer>
  );
}
