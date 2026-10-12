```jsx
import { useState } from "react";

function CRUDOperations() {
  const [users, setUsers] = useState([
    { id: 1, name: "Aakash", email: "aakash@example.com" },
    { id: 2, name: "Ram", email: "ram@example.com" },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Add or Update User
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editId !== null) {
      setUsers(
        users.map((user) =>
          user.id === editId
            ? { ...user, name, email }
            : user
        )
      );
      setEditId(null);
    } else {
      setUsers([
        ...users,
        { id: Date.now(), name, email },
      ]);
    }

    setName("");
    setEmail("");
  };

  // Load User Data into Form
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  // Delete User
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));

    if (editId === id) {
      setEditId(null);
      setName("");
      setEmail("");
    }
  };

  // Search Users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-3"
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {editId !== null ? "Update User" : "Add User"}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
              setEmail("");
            }}
            className="ml-2 bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded p-3 mb-6"
      />

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-wrap items-center justify-between gap-3 border rounded-lg p-4"
          >
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-3 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-600 text-white px-3 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No users found.
          </p>
        )}
      </div>

      <p className="mt-5 text-gray-600">
        Total users: {users.length}
      </p>
    </div>
  );
}

export default CRUDOperations;