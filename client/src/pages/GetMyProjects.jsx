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

  // 🔥 FIX: correct API structure
  const projects = data?.data?.projects || [];

  // ------------------ LOADING UI ------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6">My Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 animate-pulse"
            >
              <div className="h-40 bg-gray-800 rounded mb-4" />
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-800 rounded w-1/2 mb-4" />
              <div className="h-8 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ------------------ API ERROR UI ------------------
  // if (isError) {
  //   return (
  //     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
  //       <div className="bg-gray-900 border border-gray-800 p-10 rounded-xl text-center shadow-xl">
  //         <h2 className="text-2xl font-semibold mb-3">Error Loading Projects</h2>
  //         <p className="text-gray-400 mb-6">
  //           Something went wrong. Try again later.
  //         </p>

  //         <Button onClick={refetch} className="bg-blue-600 hover:bg-blue-700">
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // ------------------ NO PROJECTS UI ------------------
  if (projects.length === 0 || isError) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="bg-gray-900 border border-gray-800 p-10 rounded-xl text-center shadow-xl">
          <h2 className="text-3xl font-semibold mb-3">No Projects Yet</h2>
          <p className="text-gray-400 mb-6">Upload your first project and start selling!</p>

          <Link to="/upload">
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg">
              Upload Project
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ------------------ SUCCESS UI ------------------
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <MyProjectCard key={p._id} project={p} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
