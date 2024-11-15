import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  fetchTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../api/todosApi.js";

// export const useAllTodos = () => {
//   return useQuery({
//     queryKey: ["todos"],
//     queryFn: fetchTodos,
//   });
// };

export const useTodos = (page, limit = 6) => {
  return useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page, limit),
    keepPreviousData: true, // Keep the previous page's data while fetching new data
  });
};

export const useTodo = (id) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id),
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
