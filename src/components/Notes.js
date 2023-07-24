import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote  } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click(); 
    // useRef hook used
    console.log("Updating the note...", note);
    e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    // <AddNote> can also be added here insted of Home.js (very IMP)
    <div className="container">
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Input Form here same as <AddNote> cpmponent format */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Note Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  placeholder="Enter your note title"
                  value={note.etitle}
                  onChange={onChange}
                  minLength={5} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Note Content
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  rows="3"
                  value={note.edescription}
                  onChange={onChange}
                  minLength={5} required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"
              onClick={handleClick}
              disabled = {note.etitle.length<5||note.edescription.length<5} >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" row my-3 g-3">
        <h2>Your note preview</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
