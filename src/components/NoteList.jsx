import React from "react";

function NoteList() {
  const notes = [
    {
      id: 1,
      title: "First Note",
      content: "This is the content of the first note.",
    },
    // Add more notes here
  ];

  return (
    <div className="mt-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-dark-orange p-4 rounded-lg mb-4 shadow-lg"
        >
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
