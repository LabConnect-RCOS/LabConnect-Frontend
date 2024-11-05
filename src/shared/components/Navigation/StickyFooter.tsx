import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/LabConnect_Logo.webp";

export default function StickyFooter(authenticated) {

  const routes = authenticated.authenticated[1]
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
      <p className="stickyfooter-header">
        Made by{" "}
        <Link to="https://new.rcos.io" className="no-underline text-red-600 hover:text-red-800">
          RCOS
        </Link>
      </p>
      <div className="stickyfooter-info">
        <div className="pb-3">
          <img src={logo} alt="LabConnect" width="160" height="160 / (319/289)" />
        </div>

        <div className="w-40">
          <p>
            <b>Contact Us</b>
            <p className="text-base">
              <Link
                to="https://discord.gg/STtGsX86"
                className="hover-link hover:text-neutral-950"
              >
                Discord
              </Link>
              <br />
              <Link
                to="https://github.com/LabConnect-RCOS"
                className="hover-link hover:text-neutral-950"
              >
                GitHub
              </Link>
              <br />
            </p>
          </p>
        </div>
        <div className="w-40 text-base">
          <b>Additional Pages</b>
          <p>
            {routes.map((item) => (
              <>
                <Link
                  key={item.name}
                  to={item.href}
                  className="hover-link hover:text-neutral-950"
                  aria-current={item.current}
                >
                  {item.name}
                </Link>
                <br />
              </>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
