
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatButton } from "@/components/chat";
import "./App.css";

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const Documents = lazy(() => import("./pages/documents/Documents"));
const PhotoReports = lazy(() => import("./pages/photo-reports/PhotoReports"));
const AdminDashboard = lazy(() => import("./pages/admin/index"));
const AdminConfig = lazy(() => import("./pages/admin/Config"));
const RecentFiles = lazy(() => import("./pages/admin/RecentFiles"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/photo-reports" element={<PhotoReports />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/config" element={<AdminConfig />} />
          <Route path="/admin/recent" element={<RecentFiles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Chat Button */}
        <ChatButton />
      </Suspense>
    </Router>
  );
}

export default App;
