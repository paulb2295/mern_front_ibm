import React from "react";

 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Event from "./event";
import LogReg from "./LogReg";
import User from  "./users"
 
const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/"   element={<LogReg />} />
       <Route exact path="/event/*"   element={<Event />} />
       <Route exact path="/user/*"   element={<User />} />
     </Routes>
   </div>
 );
};
 
export default App;