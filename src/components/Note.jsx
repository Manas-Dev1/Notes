import React from "react";

function Note({ note, onEdit, onDelete }) {
  return (
    <article className="note-card">
      <div>
        <h3 className="note-title">{note.title}</h3>
        <div className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
      </div>
      <div className="note-actions">
        <button
          className="button button-secondary"
          onClick={() => onEdit(note)}
        >
          Edit note
        </button>
        <button
          className="button button-danger"
          onClick={() => onDelete(note.id)}
          aria-label={`Delete ${note.title}`}
          title="Delete note"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default Note;
