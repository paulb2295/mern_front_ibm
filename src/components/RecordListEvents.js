import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import './../RecordList.css';

const RecordCard = (props) => {
  ////////
  
///////////////////////
  //const [isAttending, setIsAttending] = useState(false);
/*
  async function handleAttend() {
    // Add the user's name to the event members
    const newMembers = [...props.record.members, "Mihai"]; 
    const updatedRecord = { ...props.record, members: newMembers };

    // Send a PUT request to update the event with the new members list
    await fetch(`http://localhost:3001/events/${props.record._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedRecord),
    });

    // Update the state of the record to reflect the changes
    //props.updateRecord(updatedRecord);
    setIsAttending(true); 
  }  */
  ////////
  return(
  <div className="card" >
    <div className="card-body">
      <h5 className="card-title">{props.record.name}</h5>
      <p className="card-text">Description: {props.record.description}</p>
      <p className="card-text">Date: {props.record.date}</p>
      <p className="card-text">Location: {props.record.location}</p>
      
        <div className="card-actions">
        {props.isAdmin && (
          <Link className="btn btn-link" to={`event/edit/${props.record._id}`}>
            Edit
          </Link> )}
          {props.isAdmin && (
          <button className="btn btn-link" onClick={() => props.deleteRecord(props.record._id)}>
            Delete
          </button> )}
        </div>
      
      
    </div>
  </div>

  
);}
/*
const getToken2 = () => {
  return localStorage.getItem("token");
};

const getUserNames = () => {
  const token = getToken2();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.name || "";
  }
  return "";
};

const userName = getUserNames(); */

export default function RecordList() {
  const [records, setRecords] = useState([]);
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

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3001/events/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:3001/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <RecordCard
          record={record}
          deleteRecord={deleteRecord}
          key={record._id}
          isAdmin={userRole.includes("admin")}
        />
      );
    });
  }

  return (
    <div >
      <h3>Record List  </h3>
      <div className="card-container">{recordList()}</div>
    </div>
  );
}
