import {
  faCheckCircle,
  faPencil,
  faTrash,
  faCircle, // To show an empty circle for incomplete todos
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteTodo, useUpdateTodo } from "../hooks/useTodo";
import { useState } from "react";

function TodoCard({ todo, onEdit }) {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleToggleCompletion = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const handleDeleteTodo = () => {
    // Show a confirmation dialog before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirmed) {
      deleteTodo(todo.id); // Proceed with deletion if confirmed
    }
  };

  const handleEditTodo = () => {
    onEdit(todo);
  };

  // Format the start date
  const formattedDate = new Date(todo.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4 bg-custom-red rounded-lg shadow-lg flex justify-between gap-6">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {todo.completed ? (
              <span className="line-through text-gray-500">{todo.title}</span>
            ) : (
              todo.title
            )}
          </h3>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span>
            Status: <span>{todo.completed ? "Completed" : "Pending"}</span>
          </span>
          <span className="text-sm">Created on: {formattedDate}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-gray-500">
        {[
          {
            icon: todo.completed ? faCheckCircle : faCircle,
            onClick: handleToggleCompletion,
            title: todo.completed ? "Mark as Incomplete" : "Mark as Complete",
          },
          {
            icon: faPencil,
            onClick: handleEditTodo,
            title: "Edit Todo",
          },
          {
            icon: faTrash,
            onClick: handleDeleteTodo,
            title: "Delete Todo",
          },
        ].map(({ icon, onClick, title }, index) => (
          <button
            key={index}
            onClick={onClick}
            title={title}
            className="hover:text-gray-700 transition duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoCard;
