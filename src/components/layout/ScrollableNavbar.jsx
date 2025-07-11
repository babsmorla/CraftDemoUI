import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "🏠 Home" },
  { to: "/search", label: "🔍 Search" },
  { to: "/contact", label: "📞 Contact" },
  { to: "/artisan", label: "🛠️ Artisan Dashboard" },
  { to: "/artisan/profile", label: "🛠️ Profile" },
  { to: "/artisan/jobs", label: "🛠️ Jobs" },
  { to: "/artisan/request", label: "🛠️ Request Job" },
  { to: "/login", label: "🔑 Login" },
  { to: "/signup", label: "📝 Signup" },
  { to: "/forgot-password", label: "🔑 Forgot Password" },
  { to: "/admin", label: "⚙️ Admin Dashboard" },
  { to: "/my-jobs", label: "📋 My Jobs" },
  { to: "/my-jobs/job-101", label: "📋 My Job Detail" },
  { to: "/my-jobs/job-101/review", label: "⭐ Leave Review" },
];

const ScrollableNavbar = () => {
  return (
    <nav className="w-full overflow-x-auto bg-gray-100 border-b border-gray-300">
      <div className="flex space-x-4 px-4 py-2 whitespace-nowrap">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-3 py-1 rounded ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default ScrollableNavbar;
