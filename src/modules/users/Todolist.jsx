
import { useState } from "react";

const TodoList = () => {
  // Store all todo items
  const [todos, setTodos] = useState([]);

const appName = "My Todo App";
const developer = "Aakash";
const version = "1.0.0";
const currentYear = new Date().getFullYear();
const welcomeMessage = `Welcome to ${appName}`;

  // Store input value
  const [task, setTask] = useState("");

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
    setTask("");
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  };

  // Mark todo as completed
  const toggleTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Remove all completed todos
  const clearCompleted = () => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed)
    );
  };

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Todo List
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your daily tasks with React
          </p>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={addTodo}
          className="bg-white p-4 rounded-2xl shadow-md flex gap-3"
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you need to do?"
            className="flex-1 px-4 py-3 border border-gray-300
                       rounded-xl outline-none
                       focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white
                       rounded-xl font-medium
                       hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        <div className="mt-6 space-y-3">

          {todos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <p className="text-gray-400">
                No tasks yet. Add your first task!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white p-4 rounded-xl shadow
                           flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  {/* Complete Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 accent-blue-600"
                  />

                  {/* Todo Text */}
                  <span
                    className={`text-lg ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </span>

                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700
                             font-medium"
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow
                          flex items-center justify-between">

            <p className="text-gray-500">
              {completedCount} of {todos.length} completed
            </p>

            <button
              onClick={clearCompleted}
              className="text-sm text-red-500
                         hover:text-red-700"
            >
              Clear Completed
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default TodoList;
