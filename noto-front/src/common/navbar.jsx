import React, { Fragment } from "react";
import Logo from "./logo";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-primary"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <Logo />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-2 mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/about">
                אודות
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/business">
                נותני שירות
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                  מועדפים
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {user ? (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/my-cars"
                  >
                    הרכבים שלי
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/logout"
                  >
                    התנתק
                  </NavLink>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/signin"
                  >
                    התחבר
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    הצטרף
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
