import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const links = [
    // Homeowner
    { label: "Home", path: "/" },
    { label: "Search", path: "/search" },
    { label: "Contact", path: "/contact" },
    { label: "Artisan Profile (View)", path: "/artisan/:id" }, // dynamic, but left for reference

    // Artisan
    { label: "Artisan Dashboard", path: "/artisan" },
    { label: "Artisan Profile", path: "/artisan/profile" },
    { label: "Profile Edit", path: "/artisan/profile/edit" },
    { label: "Jobs", path: "/artisan/jobs" },
    { label: "Services", path: "/artisan/services" },
    { label: "Add Services", path: "/artisan/services/add" },
    { label: "Edit Services", path: "/artisan/services/edit" },
    { label: "Verification", path: "/artisan/verification" },
    { label: "Verification Status", path: "/artisan/verification/status" },

    // Review Pages
    { label: "Leave Review", path: "/review/:artisanId" }, // dynamic
    { label: "Review Confirmation", path: "/review-confirmation/:artisanId" }, // dynamic

    // Homeowner Dashboard
    { label: "Homeowner Dashboard", path: "/homeowner" },
    { label: "My Jobs", path: "/homeowner/my-jobs" },
    { label: "Job Detail", path: "/homeowner/my-jobs/:id" }, // dynamic
    { label: "Edit Job Request", path: "/homeowner/my-jobs/:id/edit" }, // dynamic
    { label: "Review Job", path: "/homeowner/my-jobs/:id/review" }, // dynamic
    { label: "Request Job", path: "/homeowner/request" },

    // Admin
    { label: "Admin Dashboard", path: "/admin" },
    { label: "Admin Verification", path: "/admin/verification" },
    { label: "Verify Detail", path: "/admin/verify-detail" },
    { label: "Admin Reviews", path: "/admin/reviews" },
    { label: "Review Detail", path: "/admin/reviews/:reviewId" }, // dynamic
    { label: "Admin Users", path: "/admin/users" },
    { label: "User Detail", path: "/admin/users/:userId" }, // dynamic

    // Auth
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
    { label: "Forgot Password", path: "/forgot-password" },

    // Legacy
    { label: "AdminOld", path: "/adminold" },
  ];

  // Filter out dynamic params for navigation testing
  const isDynamic = (path) => path.includes(":");

  return (
    <div className="w-full bg-white shadow sticky top-0 z-50 overflow-x-auto">
      <div className="flex space-x-2 px-4 py-2 whitespace-nowrap">
        {links.map((link) => (
          <button
            key={link.label}
            disabled={isDynamic(link.path)}
            onClick={() => {
              if (!isDynamic(link.path)) navigate(link.path);
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded ${
              isDynamic(link.path)
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "hover:bg-indigo-100 active:bg-indigo-200 text-gray-700"
            } transition-colors`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
