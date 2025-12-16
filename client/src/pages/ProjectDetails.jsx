import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/project.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-detail", id],
    queryFn: () => getProjectById(id),
  });

  if (isLoading)
    return <p className="text-gray-300 p-6">Loading project...</p>;

  if (isError)
    return <p className="text-red-500 p-6">Failed to load project</p>;

  const project = data?.data?.project;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-gray-950 border border-gray-800 rounded-xl shadow-xl p-6">

        {/* Thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">{project.title}</h1>

        {/* Description */}
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <Badge key={index} className="bg-gray-700 text-white">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Additional Images */}
        {project.images?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Project Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="project screenshot"
                  className="rounded-lg object-cover h-40"
                />
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <p className="text-green-400 text-2xl font-bold mb-4">
          Price: ₹{project.price}
        </p>

        {/* Download Button */}
        <a href={project.fileUrl} download>
          <Button className="w-full text-lg py-6">
            Download Project Files
          </Button>
        </a>
      </div>
    </div>
  );
}
