import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from '../css/navbar.module.css'

function NavBar() {
    
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? styles.active : styles.link;
  }

  return (
    <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
      <ul class="navbar-nav me-auto mb-2 mb-lg- ms-5">
              <li className={`nav-item `}>
                <NavLink
                  exact
                  to="/"
                  className={getActiveClass("/") + " nav-link text-white"}
                >
                  Home
                </NavLink>
              </li>
              <li className={`  nav-item`}>
                <NavLink
                  to="/about"
                  className={getActiveClass("/about") + " nav-link text-white"}
                >
                  About Us
                </NavLink>
              </li>
            </ul>
        <div className="d-flex mt-2" role="search">
              
              <Link
                className={"btn btn-outline-light me-3 d-flex align-items-center text-white " + styles.hover} 
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="btn btn-primary me-3 d-flex align-items-center"
                to="/register"
              >
                Sign up
              </Link>
            </div>
      </div>
    </div>
  </nav>
    </div>
  );
}

export default NavBar;
