// MainNavigation.tsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";
import logo from "../../../images/LabConnect_Logo-removebg-preview.png"; // using the sticky footer logo

export default function MainNavigation() {
  const { auth } = useAuth();

  // Set up the navigation routes based on authentication
  const routes = auth.isAuthenticated
    ? [
        { name: "Jobs", href: "/jobs" },
        { name: "Create", href: "/create" },
        { name: "Staff", href: "/staff" },
        { name: "Profile", href: "/profile" },
        { name: "Sign Out", href: "/signout" },
      ]
    : [{ name: "Sign In", href: "/signin" }];

  return (
    <Disclosure as="nav" className="bg-blue-600 text-white shadow-inner">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Branding Section */}
            <div className="flex items-center justify-center md:justify-start">
            <Link to="/">
              <img
                src={logo}
                alt="LabConnect Logo"
                className="h-16 w-auto mr-2 filter brightness-0 invert"
              />
            </Link>
              <span className="font-bold text-xl">LabConnect</span>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center justify-center">
              <nav className="space-x-4">
                {routes.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `hover:underline text-lg font-bold ${
                        isActive ? "underline" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Social Links Section */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="text-center text-lg font-bold">
                <Link
                  to="https://discord.gg/tsaxCKjYHT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Discord
                </Link>
                {" | "}
                <Link
                  to="https://github.com/LabConnect-RCOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-4 pb-3 pt-2 space-y-1">
              {routes.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block hover:underline text-lg font-bold"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Additional mobile social links */}
              <div className="flex justify-center space-x-4 mt-3">
                <Link
                  to="https://discord.gg/tsaxCKjYHT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-lg font-bold"
                >
                  Discord
                </Link>
                <Link
                  to="https://github.com/LabConnect-RCOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-lg font-bold"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
