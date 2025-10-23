import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";
import logo from "../../../images/simple_logo-transparent.png"; // Adjust path if needed

export default function MainNavigation() {
  const { auth } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode by adding or removing the "dark" class on the HTML element.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Define navigation routes based on authentication.
  const routes = auth.isAuthenticated
    ? [
      { name: "Opportunities", href: "/opportunities" },
      { name: "Create", href: "/create" },
      { name: "Staff", href: "/staff" },
      { name: "Profile", href: "/profile" },
      { name: "Saved", href: "/saved" },
      { name: "Sign Out", href: "/signout" }
    ]
    : [{ name: "Sign In", href: "/signin" }];

  return (
    <Disclosure as="nav" className="bg-blue-600 text-white shadow-inner">
      {({ open }) => (
        <>
          <div className="w-full px-4 py-6 flex items-center justify-between">
            {/* Left Section: Branding */}
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img
                  src={logo}
                  alt="LabConnect Logo"
                  className="pr-3 pl-5 h-16 w-auto filter brightness-0 invert"
                />
              </Link>
              <span className="font-bold text-xl">LabConnect</span>
            </div>
            {/* Center Section: Navigation Links */}
            <div className="hidden md:flex grow justify-center">
              <nav className="flex space-x-12">
                {routes.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-2xl font-bold transition duration-175 hover:scale-115 ${
                        isActive ? "underline scale-115" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Right Section: Dark Mode Toggle and Mobile Menu Button */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode((prev) => !prev)}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isDarkMode ? "translate-x-5" : ""
                      }`}
                  ></div>
                </div>
                <span className="ml-3 text-white text-lg font-bold">
                  Enable Dark Mode
                </span>
              </label>
              <div className="md:hidden ml-4">
                <Disclosure.Button className="p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Mobile Panel */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-4 pb-3 pt-2 space-y-1">
              {routes.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block text-2xl font-bold hover:underline"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Dark Mode Toggle Switch */}
              <label className="absolute top-4 right-4 flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(prev => !prev)}
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-focus:outline-none peer-checked:bg-blue-600 relative transition-all duration-300">
                  <div
                    className={`absolute left-1 top-1 bg-white dark:bg-gray-300 w-4 h-4 rounded-full transition-transform duration-300 ${isDarkMode ? "translate-x-5" : ""
                      }`}
                  ></div>
                </div>
                <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                  Enable Dark Mode
                </span>
              </label>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
