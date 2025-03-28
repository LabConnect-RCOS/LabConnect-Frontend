import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/LabConnect_Logo-removebg-preview.png";
import { useAuth } from "../../../context/AuthContext.tsx";

export default function StickyFooter() {
  const { auth } = useAuth();

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
    <footer className="bg-indigo-800 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Branding Section */}
        <div className="flex items-center justify-center md:justify-start">
        <Link to="/">
            <img
              src={logo}
              alt="LabConnect Logo"
              className="my-logo h-16 w-auto mr-2"
            />
        </Link>

          <span className="font-bold text-xl">LabConnect</span>
        </div>
        {/* Navigation Section */}
        <div className="flex items-center justify-center">
          <nav className="space-x-4">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.to} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Social & Credit Section */}
        <div className="flex flex-col items-center justify-center md:justify-end">
          <div className="text-center mb-2">
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
          <div className="text-xs">
            Made by{" "}
            <Link
              to="https://new.rcos.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-red-400"
            >
              RCOS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
