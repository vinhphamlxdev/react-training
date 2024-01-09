import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todosLocal")) || [],
};

export const todoSlice = createSlice({
  name: "todoapp",
  initialState,
  reducers: {
    addNewTodo: (state, action) => {
      const newTodo = action.payload;
      const checkExist = state.todos.every((todo) => todo.id !== newTodo.id);
      if (checkExist) {
        state.todos.unshift(newTodo);
        localStorage.setItem("todosLocal", JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      const idNeedDelete = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== idNeedDelete);
      localStorage.setItem("todosLocal", JSON.stringify(state.todos));
    },
    updateStatusTodo: (state, action) => {
      const { id, status } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status: status,
          };
        }
        return todo;
      });
      localStorage.setItem("todosLocal", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: text,
          };
        }
        return todo;
      });
      localStorage.setItem("todosLocal", JSON.stringify(state.todos));
    },
  },
});

export const { addNewTodo, deleteTodo, updateStatusTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
