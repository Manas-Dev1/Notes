import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <section className="panel" aria-label="Search notes">
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        aria-label="Search notes"
      />
    </section>
  );
}

export default SearchBar;
