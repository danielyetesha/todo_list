import axios from "axios";

// Set the base URL for your API
const todosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // withCredentials: true,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const fetchCSRFToken = async () => {
  try {
    // Request CSRF token from Laravel
    await todosApi.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching CSRF token", error);
  }
};

// export const fetchTodos = async () => {
//   const response = await todosApi.get("todos");
//   return response.data;
// };

export const fetchTodos = async (page = 1, limit = 6) => {
  const response = await todosApi.get(`todos?page=${page}&limit=${limit}`);
  return response.data; // Assuming your API returns a paginated response.
};

export const addTodo = async (newTodo) => {
  const response = await todosApi.post("todos", newTodo, {
    headers: {
      Accept: "application/json",
      // "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    },
    // withCredentials: true,
  });
  return response.data;
};

export const fetchTodo = async (id) => {
  const response = await todosApi.get(`todos/${id}`);
  return response.data;
};

export const updateTodo = async (updatedTodo) => {
  const response = await todosApi.put(`todos/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await todosApi.delete(`todos/${id}`);
  return response.data;
};

export default todosApi;
