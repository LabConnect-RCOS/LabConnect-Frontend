import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";

export default function MainNavigation() {
  const { auth } = useAuth();
  const location = useLocation().pathname;

  const routes = auth.isAuthenticated
    ? [
        { name: "Jobs", href: "/jobs", current: location === "/jobs" },
        { name: "Create", href: "/create", current: location === "/create" },
        { name: "Staff", href: "/staff", current: location === "/staff" },
        { name: "Profile", href: "/profile", current: location === "/profile" },
        { name: "Sign Out", href: "/signout", current: false },
      ]
    : [{ name: "Sign In", href: "/signin", current: false }];

  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-all duration-200">
                  LabConnect
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center">
                <div className="flex space-x-8">
                  {routes.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        location === item.href
                          ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-600 transition-all duration-200"
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-4 pt-2 pb-3">
              {routes.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`${
                    location === item.href
                      ? "block text-blue-600 font-semibold py-2 border-l-4 border-blue-600 pl-4 transition-all duration-200"
                      : "block text-gray-600 hover:text-blue-600 py-2 pl-4 transition-all duration-200"
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
