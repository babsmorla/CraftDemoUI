// App.js (clean, corrected /admin
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./components/layout/Layout";
import DashboardLayout from "./pages/artisan/DashboardLayout";
import HomeownerDashboardLayout from "./pages/artisan/HomeownerDashboardLayout";

// Homeowner pages
import HomePage from "./pages/homeowner/HomePage";
import SearchPage from "./pages/homeowner/SearchPage";
import ArtisanProfilePage from "./pages/artisan/ArtisanProfilePage";
import ContactPage from "./pages/ContactPage";
import HomeownerDashboardPage from "./pages/artisan/HomeownerDashboardPage";

// Artisan pages
import DashboardPage from "./pages/artisan/DashboardPage";
import ProfilePage from "./pages/artisan/ProfilePage";

import RequestJobPage from "./pages/artisan/RequestJobPage";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Admin page

// User job management pages
import UserJobDetailPage from "./pages/artisan/UserJobDetailPage";

import UserJobsPage from "./pages/artisan/UserJobsPage";


import ArtisanEditServicesPage from "./pages/artisan/ArtisanEditServicesPage";
import ArtisanServicesViewPage from "./pages/artisan/ArtisanServicesViewPage";
import ProfileEditPage from "./pages/artisan/ProfileEditPage";
import ArtisanVerificationPage from "./pages/artisan/ArtisanVerificationPage";
import ArtisanVerificationStatusPage from "./pages/artisan/ArtisanVerificationStatusPage";

import AdminLayout from "./pages/artisan/AdminLayout";
import ReviewListPage from "./pages/artisan/ReviewListPage";
import ReviewDetailPage from "./pages/artisan/ReviewDetailPage";
import UserListPage from "./pages/artisan/UserListPage";
import UserDetailPage from "./pages/artisan/UserDetailPage";
import AdminVerificationPage from "./pages/artisan/AdminVerificationPage";
import VerificationDetailPage from "./pages/artisan/VerificationDetailPage";

import ReviewForm from "./pages/artisan/ReviewForm";
import ArtisanJobDetailPage from "./pages/artisan/ArtisanJobDetailPage";
import ArtisanJobsPage from "./pages/artisan/ArtisanJobsPage";
import LeaveReviewPage from "./pages/artisan/LeaveReviewPage";
import UserDashboard from "./pages/artisan/UserDashbord.";
import UserReviewsPage from "./pages/artisan/UserReviewsPage";
import AdminDashboardPage from "./pages/artisan/AdminDashboardPage";
import ArtisanAddEditServicesPage from "./pages/artisan/ArtisanEditServicesPage";

function App() {
  return (
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
          <Route path="jobs" element={<ArtisanJobsPage />} />
          <Route path="jobs/view/:jobId" element={<ArtisanJobDetailPage />} />
          <Route path="services" element={<ArtisanServicesViewPage />} />
          <Route path="services-edit" element={<ArtisanAddEditServicesPage />} />
          <Route path="profile/edit" element={<ProfileEditPage />} />
          <Route path="verification" element={<ArtisanVerificationPage />} />
          <Route
            path="verify/status"
            element={<ArtisanVerificationStatusPage />}
          />
        </Route>

        {/* Homeowner Dashboard Routes (fixed nested paths) */}
        <Route path="/homeowner" element={<HomeownerDashboardLayout />}>
          <Route index element={<HomeownerDashboardPage />} />
          <Route path="my-jobs" element={<UserJobsPage />} />
          <Route path="my-jobs/:jobId" element={<UserJobDetailPage />} />
          <Route path="my-jobs/review/:artisanId" element={<ReviewForm />} />
          <Route path="my-jobs/:id/review" element={<LeaveReviewPage />} />
          <Route path="request" element={<RequestJobPage />} />
          <Route path="user-profile" element={<UserDashboard />} />
          <Route path="user-reviews" element={<UserReviewsPage />} />
        </Route>

        {/* Admin Route */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="verification" element={<AdminVerificationPage />} />
          <Route path="verify-detail" element={<VerificationDetailPage />} />
          <Route index element={<AdminDashboardPage />} />
          <Route path="reviews" element={<ReviewListPage />} />
          <Route path="reviews/:reviewId" element={<ReviewDetailPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="users/:userId" element={<UserDetailPage />} />
        </Route>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

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
  );
}

export default App;
