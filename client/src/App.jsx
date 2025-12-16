import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerificationPage from "./pages/VerificationPage";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import UploadProject from "./pages/UploadProject";
import ExploreProjects from "./pages/ExploreProjects"
import GetMyProjects from "./pages/GetMyProjects";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/verification"
          element={
            <PublicRoute>
              <VerificationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        {/* PROTECTED PAGE → Only when logged in */}
        <Route path="/" element={<AppLayout />} />
        
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadProject />
            </ProtectedRoute>
          }
        />

        <Route path="/projects"
        element={
        <ExploreProjects/>
        }
        />

        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <GetMyProjects/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails/>
            </ProtectedRoute>
          }
        />

      </Routes>

        
    </BrowserRouter>
  );
}

export default App;
