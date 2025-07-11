import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import DashboardLayout from "./components/layout/DashboardLayout";
import HomePage from "./pages/homeowner/HomePage";
import SearchPage from "./pages/homeowner/SearchPage";
import ArtisanProfilePage from "./pages/homeowner/ArtisanProfilePage";
import DashboardPage from "./pages/artisan/DashboardPage";
import ProfilePage from "./pages/artisan/ProfilePage";
import JobsPage from "./pages/artisan/JobsPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ContactPage from "./pages/ContactPage";
import RequestJobPage from "./pages/artisan/RequestJobPage";
import JobDetailsPage from "./pages/artisan/JobsDetailPage";
import LeaveReviewPage from "./pages/artisan/LeaveReviewPage";
import UserJobsPage from "./pages/artisan/UserJobsPage";
import UserJobDetailPage from "./pages/artisan/UserJobDetailPage";
import UserSingleJobPage from "./pages/artisan/UserSingleJobPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Homeowner Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="artisan/:id" element={<ArtisanProfilePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Artisan Routes */}
          <Route path="/artisan" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="jobs" element={<JobsPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/my-jobs" element={<UserJobsPage />} />
          <Route path="/my-jobs/:id" element={<UserJobDetailPage />} />
          <Route path="/my-jobs/:id/edit" element={<UserJobDetailPage />} />

          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/my-jobs/:id/review" element={<LeaveReviewPage />} />


          <Route path="/request" element={<RequestJobPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="/my-jobs/:id" element={<UserSingleJobPage />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
