import ProjectCard from "./ProjectCards";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteProject } from "@/api/project.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

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
    <div className="group relative rounded-xl bg-[#0F1629] border border-white/5">

      {/* Project Preview */}
      <ProjectCard project={project} />

      {/* ===== OWNER ACTION BAR ===== */}
      <div className="flex gap-3 p-3 border-t border-white/5 bg-black/20">

        <Link to={`/update/${project._id}`} className="flex-1">
          <Button
            size="sm"
            className="
              w-full h-9
              bg-white/10 text-white
              hover:bg-white/20
              transition
            "
          >
            Edit
          </Button>
        </Link>

        <Button
          size="sm"
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
          className="
            w-full h-9 flex-1
            bg-red-500/15 text-red-400
            hover:bg-red-500/25 hover:text-red-300
            transition
          "
        >
          Delete
        </Button>
      </div>

      {/* ===== CONFIRM MODAL ===== */}
      {confirmOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-sm rounded-xl bg-[#0F1629] border border-white/10 p-6">

              <h2 className="text-lg font-semibold text-white mb-2">
                Delete Project?
              </h2>

              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to delete{" "}
                <span className="text-white font-medium">
                  {project.title}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  className="h-8 px-4 text-sm"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="h-8 px-4 text-sm bg-red-600 hover:bg-red-700"
                  disabled={isPending}
                  onClick={() => mutate()}
                >
                  {isPending ? "Deleting…" : "Confirm"}
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
