import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    newTodoText: "",
    editingTodo: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setNewTodoText: (state, action) => {
      state.newTodoText = action.payload;
    },
    setEditingTodo: (state, action) => {
      state.editingTodo = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNewTodoText, setEditingTodo, setLoading, setError } =
  todoSlice.actions;
export default todoSlice.reducer;
