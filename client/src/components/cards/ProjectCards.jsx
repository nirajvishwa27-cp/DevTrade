import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, BadgeCheck } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <Card
      className="
        max-w-sm w-full overflow-hidden rounded-2xl 
        bg-gray-900 border border-gray-800 shadow-lg
        transition-all duration-300 hover:shadow-xl hover:border-gray-700
      "
    >
      {/* ---------- TOP: FULL IMAGE BANNER ---------- */}
      <div className="relative w-full h-44 rounded-t-2xl overflow-hidden">
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 to-purple-700/20 z-10" />

        {/* Main Image */}
        <img
          src={project.thumbnail || "/placeholder.png"}
          alt={project.title}
          className="
            w-full h-full object-cover 
            transition duration-500 
            group-hover:scale-105
          "
        />

        {/* Heart button (like) */}
        <button
          className="
            absolute top-3 right-3 z-20 
            bg-white/20 backdrop-blur-md p-2 rounded-full 
            hover:bg-white/30 transition
          "
        >
          <Heart className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* ---------- CONTENT ---------- */}
      <CardContent className="p-5 pb-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-white flex items-center gap-1">
          {project.title}
          <BadgeCheck className="w-4 h-4 text-blue-400" />
        </h2>

        {/* Tech Tags */}
        <div className="flex gap-2 mt-2">
          {project.techStack?.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              className="
                bg-gray-800 text-gray-300 
                px-2 py-0.5 text-xs rounded-md
              "
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-3 line-clamp-2">
          {project.description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <p className="text-xs text-gray-400">PRICE</p>
          <p className="text-xl font-bold text-green-400">
            ₹{project.price}
          </p>
        </div>
      </CardContent>

      {/* ---------- FOOTER ---------- */}
      <CardFooter className="p-5 pt-0 flex justify-end">
        <Link to={`/project/${project._id}`} className="w-full">
          <Button
            className="
              w-full bg-white text-black 
              hover:bg-gray-200 rounded-lg 
              font-medium
            "
          >
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
