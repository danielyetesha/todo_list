import { useState } from "react";
import { useTodos } from "../hooks/useTodo";
import TodoCard from "./TodoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleCircleSquare } from "@fortawesome/free-solid-svg-icons";
import TodoInput from "./TodoInput";

function TodoList() {
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all"); // State for managing filter
  const [page, setPage] = useState(1); // Pagination state

  // Use query with pagination
  const { data: todos, isLoading, error, isFetching, refetch } = useTodos(page);

  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
  };

  // Error handling UI
  if (error) {
    return (
      <div className="self-center text-red-500 text-center flex-1 content-center">
        <p>Error: {error.message}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  // Loading state UI
  if (isLoading) {
    return (
      <p className="self-center text-center content-center flex-1">
        Loading...
      </p>
    );
  }

  // No todos found
  if (todos?.data.length === 0) {
    return (
      <p className="self-center text-center content-center flex-1">
        No todos found
      </p>
    );
  }

  // Filter todos based on the selected filter
  const filteredTodos = todos?.data.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // Show all todos if filter is 'all'
  });

  const handleLoadMore = () => {
    // Check if there are more pages
    if (todos?.current_page < todos?.last_page) {
      // If there are more pages, increment the page number
      setPage((prev) => prev + 1);
    } else {
      // If no more pages, reset to page 1
      setPage(1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <TodoInput editingTodo={editingTodo} />
      <div>
        <p className="flex items-center gap-2 bg-custom-red p-2 rounded-lg shadow-md self-start w-fit">
          <label className="text-sm text-white font-semibold">
            Filter by Status:
          </label>
          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Update filter state
          >
            <option value="all">All Todos</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </p>
      </div>

      {/* Todo List */}
      <div className="grid gap-4 grid-cols-2">
        {filteredTodos?.map((todo) => (
          <TodoCard key={todo.id} onEdit={handleEditClick} todo={todo} />
        ))}
      </div>

      {/* Load More button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore} // Handle loading more or resetting to first page
          disabled={isFetching}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md"
        >
          {isFetching ? "Loading more..." : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default TodoList;
