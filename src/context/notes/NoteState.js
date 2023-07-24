import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
// import React,{useState} from "react";

const NoteState = (props) => {
  // const NoteState = (props) => {
  //   const s1 = {
  //     "name": "harry",
  //     "class": "5b"
  //   };
  // const [state, setState] = useState(s1);

  //   const update = () => {
  //     setTimeout(() => {
  //      setState({
  //          "name": "larry",
  //           "class": "10b"
  //         })
  //       }, 1000);
  //     }

  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes

  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTE0YTY0OTVkMmRjZGI2NGY4YmQxYSIsImlhdCI6MTY4ODI5MTk0MX0.0iJx4vgtVShIUN2NOMKvC7ojxUN4P3xFjWj085-s5t8",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTE0YTY0OTVkMmRjZGI2NGY4YmQxYSIsImlhdCI6MTY4ODI5MTk0MX0.0iJx4vgtVShIUN2NOMKvC7ojxUN4P3xFjWj085-s5t8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    //   console.log('new note added');
    //  const note = {
    //   "_id": "61322f19553781a8ca8d0e0851",
    //   "user": "6131dc5e3e4037cd4734a0664",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-09-03T14:20:09.668Z",
    //   "__v": 0
    // }; This is hard coded notes

    setNotes(notes.concat(note));
    //  concat returns a new array but (notes.push) will update an existing array
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTE0YTY0OTVkMmRjZGI2NGY4YmQxYSIsImlhdCI6MTY4ODI5MTk0MX0.0iJx4vgtVShIUN2NOMKvC7ojxUN4P3xFjWj085-s5t8",
      },
    });
    const json = response.json();
    console.log(json);

    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTE0YTY0OTVkMmRjZGI2NGY4YmQxYSIsImlhdCI6MTY4ODI5MTk0MX0.0iJx4vgtVShIUN2NOMKvC7ojxUN4P3xFjWj085-s5t8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    // <NoteContext.Provider value={{state:state, update:update}}>
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
