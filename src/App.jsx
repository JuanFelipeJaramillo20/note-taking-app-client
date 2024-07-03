import React from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";

function App() {
  return (
    <div className="min-h-screen bg-dark-gray text-light-gray">
      <header className="p-4 bg-dark-orange">
        <h1 className="text-center text-3xl font-bold">Note-Taking App</h1>
      </header>
      <main className="p-4">
        <NoteForm />
        <NoteList />
      </main>
    </div>
  );
}

export default App;
