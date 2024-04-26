import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../css/footer.module.css"

function Footer() {
     
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? styles.active : styles.link;
  }
  return (
    <div>
      <div class={`nav-dark bg-dark`}>
        <footer class="py-3 mt-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
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
          <p class="text-center text-white ">© 2024 Company, Inc</p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
