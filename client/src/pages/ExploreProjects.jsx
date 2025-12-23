import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "@/api/project.api";
import ProjectCard from "@/components/cards/ProjectCards";
import { CATEGORIES } from "@/config/categories";

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-projects"],
    queryFn: getAllProject,
  });

  const projects = data?.data?.projects || [];

  /* ===== CATEGORY OBJECT ===== */
  const categoryObj = useMemo(
    () => CATEGORIES.find((c) => c.category === activeCategory),
    [activeCategory]
  );

  const subcategories = categoryObj?.subcategories || [];

  /* ===== FILTER LOGIC ===== */
  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase() ===
          activeCategory.toLowerCase()
      );
    }

    if (activeSubcategory) {
      result = result.filter(
        (p) =>
          p.subcategory?.toLowerCase() ===
          activeSubcategory.toLowerCase()
      );
    }

    return result;
  }, [projects, activeCategory, activeSubcategory]);

  /* ===== LOADING ===== */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 w-64 bg-white/10 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse"
            >
              <div className="h-28 bg-white/10 rounded-lg mb-4" />
              <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2 mb-4" />
              <div className="h-8 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ===== ERROR ===== */
  if (isError) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-red-500">
        Failed to load projects.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white relative overflow-hidden">

      {/* subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      {/* ===== CONTENT WRAPPER ===== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Explore Projects</h1>
          <p className="text-gray-400 max-w-xl">
            Browse production‑ready developer projects by category and domain.
          </p>
        </div>

        {/* ===== CATEGORY FILTER ===== */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => {
              setActiveCategory("All");
              setActiveSubcategory(null);
            }}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              activeCategory === "All"
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            All
          </button>

          {CATEGORIES.map((c) => (
            <button
              key={c.category}
              onClick={() => {
                setActiveCategory(c.category);
                setActiveSubcategory(null);
              }}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                activeCategory === c.category
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>

        {/* ===== SUBCATEGORIES ===== */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  activeSubcategory === sub
                    ? "bg-blue-500/20 border-blue-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* ===== COUNT ===== */}
        <div className="mb-4 text-sm text-gray-400">
          Showing{" "}
          <span className="text-white font-medium">
            {filteredProjects.length}
          </span>{" "}
          projects
        </div>

        {/* ===== GRID ===== */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-lg font-semibold mb-1">
              No projects found
            </h2>
            <p className="text-gray-400">
              Try a different category or subcategory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
