import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerificationPage from "./pages/VerificationPage";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import UploadProject from "./pages/UploadProject";
import ExploreProjects from "./pages/ExploreProjects";
import GetMyProjects from "./pages/GetMyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import UpdateProject from "./pages/UpdateProject";
import { SidebarProvider } from "./context/SidebarContext";
import ProfilePage from "./pages/ProfilePage";

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
         <Route
          path="/profile"
          element={
               <AppLayout>
              <ProfilePage />
            </AppLayout>
          }
        />
        {/* PROTECTED PAGE → Only when logged in */}
        <Route
          path="/"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <AppLayout>
              <UploadProject />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/projects" element={
          <AppLayout>
          <ExploreProjects />
          </AppLayout>
          } />

        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <AppLayout>
              <GetMyProjects />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProject/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
