import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950 text-white">
      
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main wrapper (THIS is the fix) */}
      <div
        className={`
          flex min-h-screen flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? "md:ml-64" : "md:ml-16"}
        `}
      >
        <Header />

        <main className="flex-1 px-6 py-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
