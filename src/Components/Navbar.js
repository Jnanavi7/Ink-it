import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <>
      <nav className="p-4">
        <div className="d-flex justify-content-between">
          <Link className="navbar-brand" to="/">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-journal-bookmark-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
                />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>
             Ink-it
            </h2>
          </Link>

          <ul className="me-auto d-flex mt-3">
            <li className="nav-item me-3">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } `}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                } `}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form>
              <Link
                className="btn btn-outline-primary mx-1"
                role="button"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary mx-1"
                role="button"
                to="/signup"
              >
                Signup
              </Link>
            </form>
          ) : (
            <div>
              <button onClick={handleLogout} className="btn btn-outline-primary mt-2">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
