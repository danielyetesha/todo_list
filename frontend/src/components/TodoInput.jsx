import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddTodo } from "../hooks/useTodo"; // Assuming useAddTodo handles adding a new todo
import { useUpdateTodo } from "../hooks/useTodo"; // Assuming useUpdateTodo handles editing an existing todo
import { useState, useEffect } from "react";

function TodoInput({ editingTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    mutate: addTodo,
    isError: addError,
    error,
    reset,
    isSuccess: addSuccess,
  } = useAddTodo();

  const {
    mutate: updateTodo,
    isError: updateError,
    error: updateErrorMessage,
    isSuccess: updateSuccess,
  } = useUpdateTodo();

  // When editingTodo changes, prefill the form
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    }
  }, [editingTodo]); // Only run when editingTodo changes

  const onSubmit = () => {
    if (editingTodo) {
      updateTodo({ ...editingTodo, title, description });
      if (updateSuccess) {
        setTitle("");
        setDescription("");
        return;
      }
    } else {
      addTodo({ title, description, completed: false });
      if (addSuccess) {
        setTitle("");
        setDescription("");
        return;
      }
    }
  };

  // Error handling UI for add/update
  if (addError || updateError) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">
          Error: {error ? error.message : updateErrorMessage}
        </p>
        <button
          onClick={reset}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="flex-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button
        onClick={onSubmit}
        className="px-4 bg-green-500 text-white rounded-lg shadow-md"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default TodoInput;
