import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import './../App.css';


 
export default function Create () {
  
 const [form, setForm] = useState({
   name: "",
   description: "",
   date: "",
   location: "",
 });
 const navigate = useNavigate();


  

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
    fetch("http://localhost:3001/events/", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ` + localStorage.getItem('token')
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   }); 

   setForm({ name: "", description: "", date: "" , location:"" });
   navigate("/");
 } 

 
 // This following section will display the form that takes the input from the user.
 return (
   <div >
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Date</label>
         <input
           type="text"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="location">Location</label>
         <input
           type="text"
           className="form-control"
           id="location"
           value={form.location}
           onChange={(e) => updateForm({ location: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <input
           type="submit"
           value="Create Event"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}