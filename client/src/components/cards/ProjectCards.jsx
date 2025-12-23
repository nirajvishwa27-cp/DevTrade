import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, BadgeCheck } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="group relative">

      {/* subtle hover glow (ONE COLOR ONLY) */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-lg transition" />

      <Card
        className="
          relative flex gap-4 p-3 rounded-xl
          bg-[#0F1629]
          border border-white/5
          transition
          hover:border-white/10
        "
      >

        {/* IMAGE */}
        <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black">
          <img
            src={project.thumbnail || '/placeholder.png'}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          <button className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1 min-w-0">

          {/* TOP */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-1 truncate">
              {project.title}
              <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
            </h3>

            <div className="flex gap-1.5 mt-1 flex-wrap">
              {project.techStack?.slice(0, 2).map((tech) => (
                <Badge
                  key={tech}
                  className="bg-white/5 text-[10px] text-gray-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {project.description}
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-green-500 font-semibold text-sm">
              ₹{project.price}
            </span>

            <Link to={`/project/${project._id}`}>
              <Button
                size="sm"
                className="h-7 px-3 text-xs bg-white text-black hover:bg-gray-200"
              >
                View
              </Button>
            </Link>
          </div>

        </div>
      </Card>
    </div>
  );
}
