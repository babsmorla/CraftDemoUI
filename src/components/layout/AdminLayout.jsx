// AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Review Management", path: "/admin/reviews", icon: "⭐" },
    { name: "User Management", path: "/admin/users", icon: "👥" },
    { name: "Verifications", path: "/admin/verification", icon: "✅" },
    { name: "Reports", path: "/admin/reports", icon: "📈" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-indigo-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">CraftConnect Admin</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 rounded hover:bg-indigo-700"
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-1">
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left flex items-center px-4 py-3 hover:bg-indigo-700 ${
                    location.pathname === item.path ? "bg-indigo-700" : ""
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-indigo-700">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center w-full text-left"
          >
            <span className="text-xl mr-3">←</span>
            {sidebarOpen && <span>Back to Main Site</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <span className="ml-3 text-gray-700 hidden md:inline">Admin User</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;