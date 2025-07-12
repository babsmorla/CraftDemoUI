// App.js (clean, corrected nested routing)
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import Layout from "./components/layout/Layout";
import DashboardLayout from "./components/layout/DashboardLayout";
import HomeownerDashboardLayout from "./pages/artisan/HomeownerDashboardLayout";

// Homeowner pages
import HomePage from "./pages/homeowner/HomePage";
import SearchPage from "./pages/homeowner/SearchPage";
import ArtisanProfilePage from "./pages/homeowner/ArtisanProfilePage";
import ContactPage from "./pages/ContactPage";
import HomeownerDashboardPage from "./pages/homeowner/HomeownerDashboardPage";

// Artisan pages
import DashboardPage from "./pages/artisan/DashboardPage";
import ProfilePage from "./pages/artisan/ProfilePage";
import JobsPage from "./pages/artisan/JobsPage";
import JobDetailsPage from "./pages/artisan/JobsDetailPage";
import RequestJobPage from "./pages/artisan/RequestJobPage";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Admin page
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

// User job management pages
import UserJobDetailPage from "./pages/artisan/UserJobDetailPage";
import LeaveReviewPage from "./pages/artisan/LeaveReviewPage";
import UserJobsPage from "./pages/artisan/UserJobsPage";
import EditJobRequestPage from "./pages/artisan/EditJobRequestPage";

import ArtisanAddServicesPage from "./pages/artisan/ArtisanAddServicesPage";
import ArtisanEditServicesPage from "./pages/artisan/ArtisanEditServicesPage";
import ArtisanServicesViewPage from "./pages/artisan/ArtisanServicesViewPage";
import ProfileEditPage from "./pages/artisan/ProfileEditPage";
import VerificationUploadPage from "./pages/artisan/VerificationUploadPage";

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
            <Route path="jobs/:jobId" element={<JobDetailsPage />} />
            <Route path="services" element={<ArtisanServicesViewPage />} />
            <Route path="services/add" element={<ArtisanAddServicesPage />} />
            <Route path="services/edit" element={<ArtisanEditServicesPage />} />
            <Route path="profile/edit" element={<ProfileEditPage />} />
            <Route path="verification" element={<VerificationViewPage />} />
            <Route
              path="verification/upload"
              element={<VerificationUploadPage />}
            />
          </Route>

          {/* Homeowner Dashboard Routes (fixed nested paths) */}
          <Route path="/homeowner" element={<HomeownerDashboardLayout />}>
            <Route index element={<HomeownerDashboardPage />} />
            <Route path="my-jobs" element={<UserJobsPage />} />
            <Route path="my-jobs/:id" element={<UserJobDetailPage />} />
            <Route path="my-jobs/:id/edit" element={<EditJobRequestPage />} />
            <Route path="my-jobs/:id/review" element={<LeaveReviewPage />} />
            <Route path="request" element={<RequestJobPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboardPage />} />

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
