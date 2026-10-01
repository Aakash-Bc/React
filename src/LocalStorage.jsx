import { useState } from "react";

function LocalStorageExample() {
  const [name, setName] = useState(
    localStorage.getItem("name") || ""
  );

  const saveName = () => {
    localStorage.setItem("name", name);
    alert("Name saved!");
  };

  const removeName = () => {
    localStorage.removeItem("name");
    setName("");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-3 w-full rounded"
        placeholder="Enter name"
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={saveName}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={removeName}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default LocalStorageExample;