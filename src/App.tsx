import React, { useState, useEffect } from "react";
import "./App.scss";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import ITodo from "./interfaces";

declare var confirm: (question: string) => boolean;

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {}, []);

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]); //потому что ассинхронно могут меняться, поэтому лучше сразу задать, что берем значения из предыдущего состояния
    // setTodos([newTodo, ...todos])
  };

  const toggleHandler = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const removeHandler = (id: number) => {
    const shoudRemove = confirm("Ready?");
    if (shoudRemove) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="container">
      <TodoForm onAdd={addHandler} />
      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </div>
  );
};

export default App;
