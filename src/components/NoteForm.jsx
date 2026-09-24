import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function NoteForm({ onSaveNote, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState(editingNote?.title ?? "");
  const [content, setContent] = useState(editingNote?.content ?? "");

  useEffect(() => {
    setTitle(editingNote?.title ?? "");
    setContent(editingNote?.content ?? "");
  }, [editingNote]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    onSaveNote(title, content);

    setTitle("");
    setContent("");
  };
  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2 className="panel-heading">
        {editingNote ? "Edit note" : "Write a note"}
      </h2>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
        aria-label="Note title"
      />

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="editor-wrap"
        placeholder="What would you like to remember?"
      />

      <div className="form-actions">
        <button type="submit" className="button button-primary">
          {editingNote ? "Update note" : "Save note"}
        </button>
        {editingNote && (
          <button type="button" className="button button-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
