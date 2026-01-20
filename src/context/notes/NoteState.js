import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = ( props ) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
    const [notes, setNotes] = useState([notesInitial]);

     // Get all  Note

  const getNotes = async () => {
    //TODO API CALL
     //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZDM4OGI3YjIyNDhlNWU3NGZmNmYyIn0sImlhdCI6MTc2NzcxNzAwM30.XL_7VvlmflOy8ZNGWI2ztHdasoTgB5PJq7FI10qjYYs"
      },
     
    });
   const json = await response.json();
   
   setNotes(json);
  };
   
  //Add notes
const addNote = async (title, description, tag) => {
   if (title.length < 3 || description.length < 5) {
    console.error("Validation failed");
    return;
  }
  console.log("Sending:", { title, description, tag });
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZDM4OGI3YjIyNDhlNWU3NGZmNmYyIn0sImlhdCI6MTc2NzcxNzAwM30.XL_7VvlmflOy8ZNGWI2ztHdasoTgB5PJq7FI10qjYYs"
    },
    body: JSON.stringify({ title, description, tag })
  });

  const json = await response.json(); //  CALL IT
  

  setNotes((prevNotes) => prevNotes.concat(json)); //  backend note
};


  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZDM4OGI3YjIyNDhlNWU3NGZmNmYyIn0sImlhdCI6MTc2NzcxNzAwM30.XL_7VvlmflOy8ZNGWI2ztHdasoTgB5PJq7FI10qjYYs"
      },
      

    });
    const json = await response.json();
    
    
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZDM4OGI3YjIyNDhlNWU3NGZmNmYyIn0sImlhdCI6MTc2NzcxNzAwM30.XL_7VvlmflOy8ZNGWI2ztHdasoTgB5PJq7FI10qjYYs"
      },
      body: JSON.stringify({ title, description, tag }),

    });
    await response.json();

    // SAFETY CHECK
  if (!Array.isArray(notes)) return;
    // Deep copy of notes
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {

        // Update note locally
      if (newNotes[index]._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
      

    }
    
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;