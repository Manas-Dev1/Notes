import React from "react";
import Note from "./Note";
function Notes({ notes, onEdit, onDelete }) {
  return (
    <section className="notes-section" aria-label="Your notes">
      <h2 className="notes-heading">Your notes <span>({notes.length})</span></h2>
      <div className="notes-grid">
        {notes.length ? notes.map((note) => (
          <Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
        )) : <p className="empty-state">No notes yet. Add one above to get started.</p>}
      </div>
    </section>
  );
}

export default Notes;
