import Counter from "./01_Counter";
import TodoList from "./02_TodoList";
import SearchFilter from "./07_SearchFilter";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        React Practice
      </h1>

      <section className="mb-10 bg-white rounded-xl shadow p-5">
        <Counter />
      </section>

      <section className="mb-10 bg-white rounded-xl shadow p-5">
        <TodoList />
      </section>

      <section className="bg-white rounded-xl shadow p-5">
        <SearchFilter />
      </section>
    </main>
  );
}

export default App;