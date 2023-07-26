import React from "react";
import jwtDecode from "jwt-decode";

 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/"
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };
  
  const getUserRoles = () => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.roles || [];
    }
    return [];
  };

  const userRole = getUserRoles();
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       Eventify
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
         {userRole.includes("admin") && (
           <li className="nav-item">
             <NavLink className="nav-link" to="/event/create">
               Create Event
             </NavLink>
           </li> )}
           <li className="nav-item">
             <NavLink className="nav-link" to="/event">
               Events
             </NavLink>
           </li>
           {userRole.includes("admin") && (
           <li className="nav-item">
             <NavLink className="nav-link" to="/user">
               Users
             </NavLink>
           </li>
           )}
           <li className="nav-item">
             <NavLink className="nav-link" onClick= {logOut}>
               LogOut
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}