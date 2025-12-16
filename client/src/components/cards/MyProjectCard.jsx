import ProjectCard from "./ProjectCards";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteProject } from "@/api/project.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MyProjectCard({ project, refetch }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProject(project._id),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      setConfirmOpen(false);
      refetch();
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div className="bg-[#0d121a] border border-gray-800 rounded-xl shadow-lg p-4 space-y-4">
      {/* FIX: Removed border + outline wrapper */}
      <ProjectCard project={project} />

      {/* BUTTONS */}
      <div className="flex items-center justify-between gap-2 mt-3">
        <Link to={`/update/${project._id}`} className="w-full">
          <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700">
            Edit
          </Button>
        </Link>

        <Button
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
          className=" h-8 text-xs bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Delete Project?
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">{project.title}</span>?
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                className="bg-gray-700 hover:bg-gray-600 w-full"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-red-600 hover:bg-red-700 w-full"
                disabled={isPending}
                onClick={() => mutate()}
              >
                {isPending ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
