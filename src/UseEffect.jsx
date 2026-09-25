import { useEffect, useState } from "react";

function UseEffectExample() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Users
      </h2>

      {users.map((user) => (
        <div key={user.id} className="border p-3 mb-2 rounded">
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UseEffectExample;