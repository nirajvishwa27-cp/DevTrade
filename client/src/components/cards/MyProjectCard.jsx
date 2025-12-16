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
    <div className="relative group bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
      {/* MAIN CARD */}
      <ProjectCard project={project} />

      {/* ACTION BUTTONS (inside card box now) */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to={`/edit/${project._id}`}>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full shadow-md">
            Edit
          </Button>
        </Link>

        <Button
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 w-full shadow-md"
        >
          Delete
        </Button>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl animate-scaleIn">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Delete Project?
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">{project.title}</span>?
              This action cannot be undone.
            </p>

            {/* FIXED BUTTON CONTAINER */}
            <div className="flex gap-3 w-full">
              <Button
                className="bg-gray-700 hover:bg-gray-600 flex-1"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-red-600 hover:bg-red-700 flex-1"
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
