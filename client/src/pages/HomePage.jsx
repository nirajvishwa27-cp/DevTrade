import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/cards/ProjectCards";
import api from "@/utils/axios";

// ✅ ADD THIS IMAGE IMPORT
import heroImage from "@/assets/hero-illustration.png";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 🔹 Debounced search (UNCHANGED)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setProjects([]);
        setIsSearching(false);
        return;
      }
      searchProjects();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const searchProjects = async () => {
    try {
      setIsSearching(true);
      const res = await api.get(`project/search?query=${query}`);
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Search failed", err);
      setProjects([]);
    }
  };

  return (
    <main className="px-6 md:px-12 lg:px-20 py-10">

      {/* ================= HERO SECTION (UPDATED LAYOUT ONLY) ================= */}
      {/* ================= HERO SECTION (PRODUCTION GRADE) ================= */}
<section className="relative py-24 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
    <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
  </div>

  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    {/* LEFT — IMAGE WITH DEPTH */}
    <div className="flex justify-center">
      <div className="relative">

        {/* Glow behind image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl rounded-3xl scale-105" />

        {/* Image Card */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
          <img
            src={heroImage}
            alt="DevTrade Marketplace"
            className="w-full max-w-xl rounded-2xl"
          />
        </div>

      </div>
    </div>

    {/* RIGHT — CONTENT */}
    <div className="text-center lg:text-left">
      <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
        Discover, Showcase & Trade <br />
        <span className="text-blue-500">Developer Projects</span>
      </h1>

      <p className="text-gray-400 max-w-xl text-lg mb-8">
        DevTrade is a modern marketplace where developers buy, sell, and
        showcase real‑world projects — not templates.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link to="/projects">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-base shadow-lg shadow-blue-600/30">
            Explore Projects
          </Button>
        </Link>

        <Link to="/upload">
          <Button className="bg-white/10 hover:bg-white/20 px-8 py-2 text-base border border-white/20">
            Upload Project
          </Button>
        </Link>
      </div>
    </div>

  </div>
</section>


      {/* ================= SEARCH (UNCHANGED) ================= */}
      {/* <div className="max-w-3xl mx-auto mt-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for projects (React, AI, Web, Tools...)"
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div> */}

      {/* ================= SEARCH RESULTS (UNCHANGED) ================= */}
      {/* {isSearching && (
        <section className="mt-12 px-4">
          <h2 className="text-xl font-semibold text-white mb-6">
            Search Results
          </h2>

          {projects.length === 0 ? (
            <p className="text-gray-400">No projects found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </section>
      )} */}

      {/* ================= FEATURED PROJECTS (UNCHANGED) ================= */}

      {/* ================= CATEGORIES (UNCHANGED) ================= */}
      <section className="mt-20 px-4">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            "Web Apps",
            "Mobile Apps",
            "AI/ML",
            "Tools",
            "Games",
            "Portfolio",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-gray-800 border border-gray-700 p-4 text-center rounded-xl cursor-pointer hover:bg-gray-700 transition"
            >
              <p className="text-white font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA (UNCHANGED) ================= */}
      <section className="mt-20 text-center py-16 bg-gray-900/50 border border-gray-800 rounded-xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3">
          Ready to upload your project?
        </h2>
        <p className="text-gray-400 mb-6">
          Join hundreds of developers showcasing their best work.
        </p>

        <Link to="/verification">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-2">
            Get Started
          </Button>
        </Link>
      </section>

    </main>
  );
}
