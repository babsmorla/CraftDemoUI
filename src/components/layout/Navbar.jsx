import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed w-full z-50 bg-white shadow-md">
        <div className="p-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 flex items-center"
          >
            <i className="fas fa-hammer mr-2"></i>CraftConnect
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="bg-white shadow-lg absolute w-full">
            {currentUser?.role === "homeowner" && (
              <NavLink
                to="/homeowner/dashboard"
                className={({ isActive }) =>
                  `block py-3 px-6 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-tachometer-alt mr-3"></i>Dashboard
              </NavLink>
            )}
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `block py-3 px-6 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-search mr-3"></i>Find Artisans
            </NavLink>
            <NavLink
              to="/artisan"
              className={({ isActive }) =>
                `block py-3 px-6 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-toolbox mr-3"></i>Artisan Dashboard
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-3 px-6 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-envelope mr-3"></i>Contact
            </NavLink>
            <div className="border-t py-3 px-6">
              {currentUser ? (
                <button
                  onClick={logout}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              <p className="text-center mt-2 text-gray-600">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-blue-600 ml-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-blue-600 flex items-center"
              >
                <i className="fas fa-hammer mr-2"></i>CraftConnect
              </Link>
            </div>

            <nav className="hidden lg:flex space-x-8">
              {currentUser?.role === "homeowner" && (
                <NavLink
                  to="/homeowner/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600 font-medium"
                  }
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600 font-medium"
                }
              >
                Find Artisans
              </NavLink>
              <NavLink
                to="/artisan"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600 font-medium"
                }
              >
                For Artisans
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600 font-medium"
                }
              >
                Contact
              </NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/artisan"
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium hidden lg:block"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
