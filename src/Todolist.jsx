import { useState } from "react"
import Button from "./components/common/Button"

function TodoList() {
    const [task, setTask] = useState("")
    const [todoList, setTodoList] = useState([
        { id: 1, task: "Build a premium UI", completed: false },
        { id: 2, task: "Learn Tailwind CSS v4", completed: true }
    ])

    const addTodo = () => {
        if (task.trim() === "") {
            return;
        }
        const newTodo = {
            id: Date.now(),
            task: task,
            completed: false
        }
        setTodoList([...todoList, newTodo])
        setTask("")
    }

    const deleteTodo = (idToDelete) => {
        const updatedTodo = todoList.filter((item) => item.id !== idToDelete)
        setTodoList(updatedTodo)
    }

    const toggleDone = (completedId) => {
        const updatedTodo = todoList.map((item) => (
            item.id === completedId ? { ...item, completed: !item.completed } : item
        ))
        setTodoList(updatedTodo)
    }

    return (
        <div className="min-h-[60vh] bg-slate-50/50 py-12 px-4">
            <div className="max-w-xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Daily <span className="text-indigo-600">Tasks</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Manage your workflow with style</p>
                </div>

                {/* Input Section */}
                <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/60 flex items-center gap-2 border border-slate-100">
                    <input
                        type="text"
                        value={task}
                        placeholder="What needs to be done?"
                        className="flex-1 bg-transparent px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none font-medium"
                        onChange={(e) => setTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <Button
                        variant="gradient"
                        size="md"
                        className="rounded-xl px-6"
                        onClick={addTodo}
                    >
                        Add Task
                    </Button>
                </div>

                {/* List Section */}
                <div className="space-y-3">
                    {todoList.length === 0 ? (
                        <div className="text-center py-12 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-medium">No tasks yet. Enjoy your day! ☕</p>
                        </div>
                    ) : (
                        todoList.map((item) => (
                            <div
                                key={item.id}
                                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${item.completed
                                    ? "bg-slate-50/80 border-slate-100 opacity-75"
                                    : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100"
                                    }`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <button
                                        onClick={() => toggleDone(item.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${item.completed
                                            ? "bg-indigo-500 border-indigo-500 text-white"
                                            : "border-slate-300 hover:border-indigo-400"
                                            }`}
                                    >
                                        {item.completed && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                    <span className={`text-slate-700 font-semibold transition-all duration-300 ${item.completed ? "line-through text-slate-400" : ""}`}>
                                        {item.task}
                                    </span>
                                </div>

                                <button
                                    onClick={() => deleteTodo(item.id)}
                                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoList