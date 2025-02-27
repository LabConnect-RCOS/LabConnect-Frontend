import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/LabConnect_Logo.webp";
import { useAuth } from "../../../context/AuthContext.tsx";

export default function StickyFooter() {
  const { auth } = useAuth();

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
    <section className="stickyfooter-general">
      <h1 className="stickyfooter-header text-center text-2xl font-bold">
        Made by{" "}
        <Link
          to="https://new.rcos.io"
          className="no-underline text-red-600 hover:text-red-800 focus:text-red-800"
        >
          RCOS
        </Link>
      </h1>
      <div className="stickyfooter-info mt-5 flex flex-col items-center">
        <div className="pb-3">
          <img src={logo} alt="LabConnect" width="160" height="160 / (319/289)" />
        </div>

        <div className="w-40 text-center">
          <div>
            <b className="text-xl">Contact Us</b>
            <p className="text-lg">
              <Link
                to="https://discord.gg/tsaxCKjYHT"
                className="grey-link hover:text-neutral-950 focus:text-neutral-950"
              >
                Discord
              </Link>
              <br />
              <Link
                to="https://github.com/LabConnect-RCOS"
                className="grey-link hover:text-neutral-950 focus:text-neutral-950"
              >
                GitHub
              </Link>
              <br />
            </p>
          </div>
        </div>
        <div className="w-40 text-center">
          <b className="text-xl">Resources</b>
          <br />
          {routes.map((item) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.href}
                className="grey-link hover:text-neutral-950 focus:text-neutral-950 text-lg"
                aria-current={item.current}
              >
                {item.name}
              </Link>
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
