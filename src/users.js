import React from "react";

 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordListUser from "./components/recordListUser";
import EditUser from "./components/editUser";
import Create from "./components/create";
 
const User = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordListUser />} />
       <Route path="user/EditUser/:id" element={<EditUser />} />
       
     </Routes>
   </div>
 );
};
 
export default User;