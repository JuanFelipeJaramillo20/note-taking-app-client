import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const NoteForm = ({ fetchNotes, noteToEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("No token found");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("categories-resource", config)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          error.response ? error.response.data : "Error fetching categories"
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });

    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setSelectedCategories(
        noteToEdit.categories.map((category) => category.name)
      );
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const token = localStorage.getItem("token");
      let response;
      if (noteToEdit) {
        response = await axios.put(
          `note-resource/${noteToEdit.id}`,
          { title, content, categoryNames: selectedCategories },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccessMessage("Note updated successfully!");
      } else {
        response = await axios.post(
          "note-resource",
          { title, content, categoryNames: selectedCategories },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccessMessage("Note created successfully!");
      }
      setTitle("");
      setContent("");
      setSelectedCategories([]);
      fetchNotes();
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error creating/editing note"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setErrorMessage("")}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success: </strong>
          <span className="block sm:inline">{successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setSuccessMessage("")}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="flex flex-col">
          <label className="text-orange-400 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-orange-400 font-bold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white h-24"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-orange-400 font-bold mb-2">Categories</label>
          <select
            multiple
            value={selectedCategories}
            onChange={(e) =>
              setSelectedCategories(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white h-24"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded transition duration-200"
        >
          {noteToEdit ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
