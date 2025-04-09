import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";
import logo from "../../../images/LabConnect_Logo-removebg-preview.png";

export default function MainNavigation() {
  const { auth } = useAuth();

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
          {/* Header Container */}
          <div className="w-full px-4 py-6 flex items-center justify-between">
            {/* Branding Section – flush to the very left */}
            <div className="flex items-center justify-start">
              <Link to="/">
                <img
                  src={logo}
                  alt="LabConnect Logo"
                  className="h-16 w-auto mr-2 filter brightness-0 invert"
                />
              </Link>
              <span className="font-bold text-xl">LabConnect</span>
            </div>
            {/* Navigation Links – centered */}
            <div className="hidden md:flex flex-grow justify-center">
              <nav className="flex space-x-12">
                {routes.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-2xl font-bold hover:underline ${
                        isActive ? "underline" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Social Links – flush to the right */}
            <div className="hidden md:flex items-center justify-end">
              <div className="text-lg font-bold">
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
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Disclosure.Button className="p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none">
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
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
              <div className="flex justify-start space-x-4 mt-3">
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
