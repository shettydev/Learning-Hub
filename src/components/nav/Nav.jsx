// Import necessary dependencies 
import React from "react";
import style from "./Nav.module.css";
import { Outlet, NavLink } from "react-router-dom";

import { authSelector, deleteSessionThunk } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

// Function Component Nav
function Nav() {

  const dispatch = useDispatch();

  const {isLoggedIn, userLoggedIn} = useSelector(authSelector);

  return (
    <>
    <nav>

      {/* Main Nav Container */}
      <div className={style.nav_container}>

        {/* Logo and Title */}
        <div className={style.nav_title_wrapper}>

          <NavLink to={"/"}>
          <img
            className={style.logo}
            src="https://cdn-icons-png.flaticon.com/128/2436/2436855.png"
            alt="logo"
          />
          </NavLink>
          <NavLink to={"/"}>
          <h4>LearningHub</h4>
          </NavLink>
        </div>

        {/* Right Side of the Navbar */}
        <div className={style.nav_details}>

          {isLoggedIn && (
            <>
            <span> Welcome, {userLoggedIn.name} </span>
            
              <NavLink to="/courses"> 
                {({isActive}) => (isActive ? 
                  <NavLink to="/enrolled">
                    <button>My Courses</button>
                  </NavLink> : 
                  <button>All Courses</button>)}
              </NavLink>

              
            </>
          )}
        
          <NavLink to={!isLoggedIn ? "/signin" : "/"}>
            <span>
              {!isLoggedIn ? (
                <button>
                  Sign In
                </button>
              ) : (
              <>
                <button onClick={() => dispatch(deleteSessionThunk())}>
                  Sign Out
                </button>
              </>
              )}
            </span>
          </NavLink>
          
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  );
}

// Export Nav
export default Nav;
