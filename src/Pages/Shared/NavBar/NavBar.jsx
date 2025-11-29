import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import useAuth from "../../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user,signOutUser,loading } = useAuth();
  console.log(user);

  const handleLogout = ()=>{
    signOutUser()
    .then(()=>{
        toast('SignOut Successful')
    })
  }
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myParcel">My Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>
    </>
  );
  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link>
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn btn-primary bg-primary">Logout</button>
        ) : (
          <div className="flex items-center ">
            <div className="mr-3">
              <Link to='/login' className="btn btn-primary bg-primary">Login</Link>
            </div>
            <div>
              <Link to='/register' className="btn btn-primary bg-primary">Register</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
