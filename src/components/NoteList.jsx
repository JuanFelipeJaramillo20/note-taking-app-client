import { useState } from "react";

function NoteList({
  notes,
  categories,
  onArchive,
  onUnarchive,
  onDelete,
  onViewChange,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleArchiveClick = (id) => {
    onArchive(id);
  };

  const handleUnarchiveClick = (id) => {
    onUnarchive(id);
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const handleEditClick = (id) => {
    onViewChange(`edit-${id}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredNotes =
    selectedCategory === "all"
      ? notes
      : notes.filter((note) =>
          note.categories.some((category) => category.name === selectedCategory)
        );

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="mr-2 font-semibold">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="bg-dark-orange p-4 rounded-lg mb-4 shadow-lg flex justify-between items-start relative"
        >
          <div className="flex-1">
            <div>
              <h2 className="text-xl font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            {note.categories && note.categories.length > 0 && (
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Categories:</h3>
                {note.categories.map((category) => (
                  <span
                    key={category.id}
                    className="bg-orange-500 text-white py-1 px-2 rounded-lg mr-2 text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-end">
            <button
              onClick={() => handleEditClick(note.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg mr-2"
            >
              Edit
            </button>
            {note.archived ? (
              <button
                onClick={() => handleUnarchiveClick(note.id)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-lg mr-2"
              >
                Unarchive
              </button>
            ) : (
              <button
                onClick={() => handleArchiveClick(note.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-lg mr-2"
              >
                Archive
              </button>
            )}
            <button
              onClick={() => handleDeleteClick(note.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
