import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/LabConnect_Logo.webp";
import { useAuth } from "../../../context/AuthContext.tsx";

export default function StickyFooter() {
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
<footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

    {/* Left: Branding */}
    <div className="flex flex-col items-center md:items-start space-y-2">
      <img src={logo} alt="LabConnect" className="w-20 h-auto" />
      <p className="text-base text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} LabConnect</p>
      <p className="text-base">
        Made by{" "}
        <Link
          to="https://new.rcos.io"
          className="text-red-600 hover:text-red-800 dark:hover:text-red-400 font-medium transition-colors"
        >
          RCOS
        </Link>
      </p>
    </div>

    {/* Center: Contact */}
    <div className="text-center md:text-left">
      <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
      <ul className="space-y-1 text-base">
        <li>
          <Link
            to="https://discord.gg/tsaxCKjYHT"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            Discord
          </Link>
        </li>
        <li>
          <Link
            to="https://github.com/LabConnect-RCOS"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            GitHub
          </Link>
        </li>
      </ul>
    </div>

    {/* Right: Resources */}
    <div className="text-center md:text-left">
      <h4 className="text-lg font-semibold mb-2">Resources</h4>
      <ul className="space-y-1 text-base">
        {routes.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`hover:text-blue-700 dark:hover:text-blue-400 transition-colors ${
                item.current ? "font-semibold underline" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
</footer>




  );
}
