import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { getMyProjects } from "@/api/project.api";
import MyProjectCard from "@/components/cards/MyProjectCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MyProjects() {
  const { auth } = useAuth();
  const user = auth?.user;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-projects", user?._id],
    queryFn: () => getMyProjects(user._id),
    enabled: !!user?._id,
  });

  const projects = data?.data?.projects || [];

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] text-white px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">My Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse"
            >
              <div className="h-32 bg-white/10 rounded-lg mb-3" />
              <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2 mb-3" />
              <div className="h-8 bg-white/10 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= EMPTY / ERROR ================= */
  if (projects.length === 0 || isError) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center px-4">
        <div className="relative max-w-md w-full bg-[#0F1629] border border-white/10 rounded-2xl p-10 text-center">

          {/* subtle pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_60%)] rounded-2xl pointer-events-none" />

          <h2 className="text-3xl font-semibold mb-3">
            No Projects Yet
          </h2>

          <p className="text-gray-400 mb-6">
            Upload your first project and start selling today.
          </p>

          <Link to="/upload">
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg">
              Upload Project
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ================= SUCCESS ================= */
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white relative overflow-hidden">

      {/* light gradient pattern (safe) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-teal-900/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-1">My Projects</h1>
          <p className="text-gray-400">
            Manage, edit and track your uploaded projects.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <MyProjectCard
              key={project._id}
              project={project}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
