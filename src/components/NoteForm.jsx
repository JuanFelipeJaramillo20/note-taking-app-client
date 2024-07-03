import React, { useState } from "react";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-light-gray p-4 rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <label className="block text-dark-orange font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-dark-orange font-bold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-dark-orange text-light-gray font-bold py-2 px-4 rounded hover:bg-orange-700"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
