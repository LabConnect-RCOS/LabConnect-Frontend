import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/LabConnect_Logo.png";

export default function StickyFooter(authenticated) {

  const routes = authenticated.authenticated[1]
    ? [
      { name: "Jobs", href: "/jobs", current: true },
      { name: "Create", href: "/createPost", current: false },
      { name: "Staff", href: "/staff", current: false },
      { name: "Profile", href: "/profile", current: false },
      { name: "Sign Out", href: "/signout", current: false },
    ]
    : [{ name: "Sign In", href: "/signin", current: false }];

  return (
    <section className="stickyfooter-general">
      <p className="stickyfooter-header">
        Made by{" "}
        <Link to="https://new.rcos.io" className="no-underline text-red-400">
          RCOS
        </Link>
      </p>
      <div className="stickyfooter-info">
        <div className="pb-3">
          <img src={logo} alt="Logo" className="h-32 w-36"></img>
        </div>

        <div className="w-40">
          <p>
            <b>Contact Us</b>
            <p className="text-base">
              <Link
                to="https://discord.gg/STtGsX86"
                className="stickyfooter-link hover:text-neutral-950"
              >
                Discord
              </Link>
              <br />
              <Link
                to="https://github.com/LabConnect-RCOS"
                className="stickyfooter-link hover:text-neutral-950"
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
                  className="stickyfooter-link hover:text-neutral-950"
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
