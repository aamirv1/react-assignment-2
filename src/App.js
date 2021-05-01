import React, { useRef, useState, useEffect } from "react";
import TodoList from "./Components/TodoList";
import Posts from "./Components/Posts";
function App() {
  const [todos, setTodos] = useState([]);
  const ref = useRef();
  function handleAddTodo(e) {
    const name = ref.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: Date.now(), name, complete: false }];
    });
    ref.current.value = null;
  }
  const LOCAL_STORAGE_KEY = "todoApp.todos";

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todos) => !todos.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <input ref={ref} placeholder="Write Here" />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodos}> Clear Completed </button>
      <TodoList toggleTodo={toggleTodo} todos={todos} />
      <Posts path="/post/:id" />
    </>
  );
}

export default App;
