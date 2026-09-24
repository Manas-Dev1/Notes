import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Notes, SearchBar, NoteForm } from "./components";

function App() {
  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const formRef = useRef(null);
  const listRef = useRef(null);
  useEffect(() => {
    if (editingNote) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingNote]);
  const saveNote = (title, content) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id ? { ...note, title, content } : note,
        ),
      );
      setEditingNote(null);
      return;
    }

    setNotes((prev) => [...prev, { id: Date.now(), title, content }]);
    setTimeout(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const deleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    if (editingNote?.id === noteId) setEditingNote(null);
  };
  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Keep Notes</h1>
        <p>Your thoughts, all in one place.</p>
      </header>
      <NoteForm
        onSaveNote={saveNote}
        editingNote={editingNote}
        onCancelEdit={() => setEditingNote(null)}
        ref={formRef}
      />
      <SearchBar search={search} setSearch={setSearch} />
      <Notes
        notes={filteredNotes}
        onEdit={setEditingNote}
        onDelete={deleteNote}
        ref={listRef}
      />
    </main>
  );
}

export default App;
