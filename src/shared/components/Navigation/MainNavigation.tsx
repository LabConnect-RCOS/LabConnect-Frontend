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
    <Disclosure as="nav" className="bg-slate-100">
      {({ open }) => (
        <>
          <div className="mainnav sm:px-6 lg:px-8">
            <div className="mainnav-header">
              <div className="mainnav-desc sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="btn-disclosure hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="blck66" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="blck66" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="mainnav-desc2 sm:items-stretch sm:justify-start">
                <div className="mainnav-title-link">
                  <Link to="/" className="blue-link hover:text-blue-900 focus:text-blue-900">
                    LabConnect
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {routes.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={`${location === item.href
                          ? "text-black"
                          : "text-gray-600"
                          } hover:text-gray-800  hover:bg-gray-200  mainnav-link`}
                        aria-current={item.current}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {routes.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="btn-disclosure2 hover:bg-gray-200"
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
