import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";
import logo from "../../../images/LabConnect_Logo-removebg-preview.png";

export default function StickyFooter() {
  const { auth } = useAuth();

  // Define navigation links based on authentication.
  const navLinks = auth.isAuthenticated
    ? [
        { label: "Jobs", to: "/jobs" },
        { label: "Create", to: "/create" },
        { label: "Staff", to: "/staff" },
        { label: "Profile", to: "/profile" },
        { label: "Sign Out", to: "/signout" },
      ]
    : [{ label: "Sign In", to: "/signin" }];

  return (
    <footer className="bg-blue-600 text-white shadow-inner">
      {/* Container using a flex layout similar to MainNavigation */}
      <div className="w-full px-4 py-6 flex items-center justify-between">
        {/* Branding Section (Left) */}
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
        {/* Navigation Links (Center) */}
        <div className="hidden md:flex flex-grow justify-center">
          <nav className="flex space-x-12">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="hover:underline text-2xl font-bold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Social & Credit Section (Right) */}
        <div className="hidden md:flex items-center justify-end">
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              <Link
                to="https://discord.gg/tsaxCKjYHT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-2xl font-bold"
              >
                Discord
              </Link>
              <span className="mx-2 text-2xl font-bold">|</span>
              <Link
                to="https://github.com/LabConnect-RCOS"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-2xl font-bold"
              >
                GitHub
              </Link>
            </div>
            <div className="text-2xl font-bold">
              Made by{" "}
              <Link
                to="https://new.rcos.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red-500 text-2xl font-bold"
              >
                RCOS
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Panel */}
      <div className="md:hidden px-4 pb-3 pt-2 space-y-1">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="block text-2xl font-bold hover:underline"
          >
            {link.label}
          </Link>
        ))}
        <div className="flex flex-col items-start mt-3">
          <div className="flex items-center space-x-2">
            <Link
              to="https://discord.gg/tsaxCKjYHT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-2xl font-bold"
            >
              Discord
            </Link>
            <span className="text-2xl font-bold">|</span>
            <Link
              to="https://github.com/LabConnect-RCOS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-2xl font-bold"
            >
              GitHub
            </Link>
          </div>
          <div className="text-2xl font-bold mt-1">
            Made by{" "}
            <Link
              to="https://new.rcos.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-red-400 text-2xl font-bold"
            >
              RCOS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
