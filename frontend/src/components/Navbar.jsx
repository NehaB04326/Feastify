import React, { useState, useEffect } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";
import LogoutButton from "./LogoutButton"; 

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);


  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    setIsUserLoggedIn(!!userToken);
    setIsAdminLoggedIn(!!adminToken);
  }, []);

  return (
    <>
      <nav>
        <div className="logo">Feastify</div>

        <div className={show ? "navLinks showmenu" : "navLinks"}>
          {/* Scroll Links */}
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>

          
          <button className="menuBtn">OUR MENU</button>

         
          {isAdminLoggedIn && (
            <RouterLink to="/admin/dashboard">
              <button className="menuBtn">Admin Dashboard</button>
            </RouterLink>
          )}

       
          {(isUserLoggedIn || isAdminLoggedIn) && <LogoutButton />}

          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <RouterLink to="/login">
                <button className="menuBtn">Login</button>
              </RouterLink>

              <RouterLink to="/register">
                <button className="menuBtn">Register</button>
              </RouterLink>
              <RouterLink to="/chat">
  <button className="menuBtn">Chat</button>
           </RouterLink>

            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
