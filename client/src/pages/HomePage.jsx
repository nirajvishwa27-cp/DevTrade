import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="px-6 md:px-12 lg:px-20 py-10">

      {/* HERO */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Discover, Showcase & Trade Developer Projects
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          DevTrade is a modern marketplace for developers to upload their real
          projects, explore others' work, and gain visibility in the dev community.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/projects">
            <Button className="bg-blue-600 hover:bg-blue-700 px-6">
              Explore Projects
            </Button>
          </Link>

          <Link to="/upload">
            <Button className="bg-gray-700 hover:bg-gray-600 px-6">
              Upload Project
            </Button>
          </Link>
        </div>
      </section>

      {/* SEARCH */}
      <div className="max-w-3xl mx-auto mt-10">
        <input
          type="text"
          placeholder="Search for projects..."
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white"
        />
      </div>

      {/* FEATURED PROJECTS */}
      <section className="mt-16 px-4">
        <h2 className="text-2xl font-semibold text-white mb-6">Featured Projects</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* map your project cards here */}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-20 px-4">
        <h2 className="text-2xl font-semibold text-white mb-6">Browse by Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            "Web Apps",
            "Mobile Apps",
            "AI/ML",
            "Tools",
            "Games",
            "Portfolio",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-gray-800 border border-gray-700 p-4 text-center rounded-xl cursor-pointer hover:bg-gray-700 transition"
            >
              <p className="text-white font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center py-16 bg-gray-900/50 border border-gray-800 rounded-xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to upload your project?</h2>
        <p className="text-gray-400 mb-6">
          Join hundreds of developers showcasing their best work.
        </p>

        <Link to="/verification">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-2">
            Get Started
          </Button>
        </Link>
      </section>
    </main>
  );
}
