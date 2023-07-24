import React from "react";
import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  const handleOnClick = () => {
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"",tag:""})
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Note Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Enter your note title"
          onChange={onChange}
          value={note.title}
          minLength={5} required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Note Content
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          onChange={onChange}
          value={note.description}
          minLength={5}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
          value={note.tag}
          minLength={5}
          required
        />
      </div>
      <input
        className="btn btn-primary"
        type="submit"
        value="Add Note"
        onClick={handleOnClick}
        disabled = {note.title.length<5||note.description.length<5}
      />
    </div>
  );
};

export default AddNote;
