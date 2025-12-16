import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "@/api/project.api";
import ProjectCard from "@/components/cards/ProjectCards";

export default function Explore() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-projects"],
    queryFn: getAllProject,
  });

  if (isLoading) return <p className="text-white">Loading projects...</p>;
  if (isError) return <p className="text-red-500">Failed to load projects.</p>;

  const projects = data?.data?.projects || []; // depends on your backend response

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-gray-400 mt-4">No projects found.</p>
      )}
    </div>
  );
}
