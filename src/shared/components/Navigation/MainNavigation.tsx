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
      { name: "Jobs", href: "/jobs", current: true },
      { name: "Create", href: "/create", current: false },
      { name: "Staff", href: "/staff", current: false },
      { name: "Profile", href: "/profile", current: false },
      { name: "Sign Out", href: "/signout", current: false },
    ]
    : [{ name: "Sign In", href: "/signin", current: false }];

  return (
    <Disclosure as="nav" className="bg-white shadow-sm dark:bg-gray-900">
  {({ open }) => (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Mobile menu */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 font-semibold text-xl tracking-tight hover:text-blue-800 dark:hover:text-blue-300"
            >
              LabConnect
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {routes.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-300"
                    } hover:text-gray-900 dark:hover:text-white transition`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: Mobile menu button */}
          <div className="sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-4 pt-2 pb-3">
          {routes.map((item) => (
            <Disclosure.Button
              key={item.name}
              as={Link}
              to={item.href}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-3 py-2 transition"
              aria-current={item.current ? "page" : undefined}
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
