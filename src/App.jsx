import { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import Login from "./components/Login";
import Register from "./components/Register";
import api from "./api/axiosConfig";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("all");
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      const response = await api.get("/api/categories", config);
      setCategories(response.data);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error fetching categories"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAllNotes = async () => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      const response = await api.get("/api/notes", config);
      setNotes(response.data);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error fetching notes"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveNotes = async () => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      const response = await api.get("/api/notes/active", config);
      setNotes(response.data);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error fetching active notes"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedNotes = async () => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      const response = await api.get("/api/notes/archived", config);
      setNotes(response.data);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error fetching archived notes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchAllNotes();
      fetchCategories();
    }
  }, [isAuthenticated, token]);

  const handleViewChange = (viewName) => {
    setView(viewName);
    setEditNoteId(null);
    switch (viewName) {
      case "all":
        fetchAllNotes();
        break;
      case "active":
        fetchActiveNotes();
        break;
      case "archived":
        fetchArchivedNotes();
        break;
      default:
        fetchAllNotes();
        break;
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setView("all");
    fetchAllNotes();
    fetchCategories();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setView("login");
  };

  const handleNoteCreation = async (noteData) => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      await api.post(
        "/api/notes",
        {
          title: noteData.title,
          content: noteData.content,
          categoryNames: noteData.selectedCategories,
        },
        config
      );
      fetchAllNotes();
      setView("all");
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error creating note"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNoteUpdate = async (id, noteData) => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      await api.put(
        `/api/notes/${id}`,
        {
          title: noteData.title,
          content: noteData.content,
          categoryNames: noteData.selectedCategories,
        },
        config
      );
      fetchAllNotes();
      setView("all");
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error updating note"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNoteDeletion = async (id) => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      await api.delete(`/api/notes/${id}`, config);
      fetchAllNotes();
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error deleting note"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNoteArchive = async (id) => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      await api.put(`/api/notes/${id}/archive`, null, config);
      fetchAllNotes();
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error archiving note"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNoteUnarchive = async (id) => {
    if (!token) {
      setErrorMessage("No token found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      await api.put(`/api/notes/${id}/unarchive`, null, config);
      fetchAllNotes();
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error unarchiving note"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    setView(`edit-${id}`);
  };

  let viewComponent;

  if (view === "login") {
    viewComponent = <Login onLogin={handleAuthSuccess} />;
  } else if (view === "register") {
    viewComponent = <Register onRegister={handleAuthSuccess} />;
  } else if (view === "all" || view === "active" || view === "archived") {
    viewComponent = (
      <NoteList
        notes={notes}
        categories={categories}
        onArchive={handleNoteArchive}
        onUnarchive={handleNoteUnarchive}
        onDelete={handleNoteDeletion}
        onViewChange={handleViewChange}
        onEdit={handleEditClick}
        showArchived={view === "archived"}
      />
    );
  } else if (view === "create") {
    viewComponent = (
      <NoteForm
        categories={categories}
        fetchNotes={fetchAllNotes}
        onCreateNote={handleNoteCreation}
      />
    );
  } else if (view.startsWith("edit-")) {
    const editNoteId = parseInt(view.split("-")[1]);
    const noteToEdit = notes.find((note) => note.id === editNoteId);
    viewComponent = (
      <NoteForm
        categories={categories}
        fetchNotes={fetchAllNotes}
        noteToEdit={noteToEdit}
        onUpdateNote={(noteData) => handleNoteUpdate(editNoteId, noteData)}
      />
    );
  }

  return (
    <div className="App">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl text-orange-400">Note Taking App</h1>
        <nav className="space-x-4 mt-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleViewChange("all")}
                className="text-white hover:text-orange-400"
              >
                All Notes
              </button>
              <button
                onClick={() => handleViewChange("active")}
                className="text-white hover:text-orange-400"
              >
                Active Notes
              </button>
              <button
                onClick={() => handleViewChange("archived")}
                className="text-white hover:text-orange-400"
              >
                Archived Notes
              </button>
              <button
                onClick={() => handleViewChange("create")}
                className="text-white hover:text-orange-400"
              >
                Create Note
              </button>
              <button
                onClick={handleLogout}
                className="text-white hover:text-orange-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleViewChange("login")}
                className="text-white hover:text-orange-400"
              >
                Login
              </button>
              <button
                onClick={() => handleViewChange("register")}
                className="text-white hover:text-orange-400"
              >
                Register
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {loading && (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-orange-400"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span className="text-orange-400">Loading...</span>
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        {!loading && viewComponent}
      </main>
    </div>
  );
}

export default App;
