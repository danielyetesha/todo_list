import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddTodo } from "../hooks/useTodo";
import { useUpdateTodo } from "../hooks/useTodo";
import { useState, useEffect } from "react";

function TodoInput({ editingTodo, setEditingTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    mutate: addTodo,
    isError: addError,
    error: addErrorMessage,
    reset: resetAddError,
    isSuccess: addSuccess,
  } = useAddTodo();

  const {
    mutate: updateTodo,
    isError: updateError,
    error: updateErrorMessage,
    isSuccess: updateSuccess,
  } = useUpdateTodo();

  // Prefill the form when editing an existing todo
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    }
  }, [editingTodo]);

  // Handle form submission
  const onSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Both title and description are required.");
      return;
    } else {
      setErrorMessage(""); // Clear error message if validation passes
    }

    // Perform the appropriate action based on whether we are editing or adding a todo
    if (editingTodo) {
      updateTodo({ ...editingTodo, title, description });
    } else {
      addTodo({ title, description, completed: false });
    }
  };

  // Handle API error responses
  useEffect(() => {
    if (addError || updateError) {
      if (addError && addErrorMessage.response?.data?.message) {
        setErrorMessage(addErrorMessage.response.data.message); // Custom error from backend (e.g., "Title is already taken")
      } else if (updateError && updateErrorMessage.response?.data?.message) {
        setErrorMessage(updateErrorMessage.response.data.message);
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    }
  }, [addError, updateError, addErrorMessage, updateErrorMessage]);

  // Reset error state when a successful action is completed
  useEffect(() => {
    if (addSuccess || updateSuccess) {
      setErrorMessage(""); // Clear any existing error message
      setTitle("");
      setDescription("");
      if (setEditingTodo) setEditingTodo(null); // Reset editing state
    }
  }, [addSuccess, updateSuccess, setEditingTodo]);

  return (
    <div className="flex gap-1 flex-col">
      {/* Title Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />

        {/* Description Input */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="flex-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />

        {/* Submit Button */}
        {addError || updateError ? (
          <button
            onClick={() => {
              resetAddError();
              // You may want to handle the update error reset similarly if needed
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Retry
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md disabled:bg-gray-300"
            disabled={!title.trim() || !description.trim()} // Disable if title or description is empty
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>
      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      {/* Retry Button for API Errors */}
    </div>
  );
}

export default TodoInput;
