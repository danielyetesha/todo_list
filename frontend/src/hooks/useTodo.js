import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch Todos from API
const fetchTodos = async () => {
  const response = await fetch("/api/todos"); // Replace with your API endpoint
  if (!response.ok) throw new Error("Network error");
  return response.json();
};

// Add a new Todo
const addTodo = async (todo) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error adding todo");
  return response.json();
};

export const useTodos = () => {
  return useQuery(["todos"], fetchTodos, {
    staleTime: 10000, // Time in ms before considering the data stale
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // Refetch the Todos after adding a new one
    },
  });
};
