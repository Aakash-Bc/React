import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? `Welcome ${user}` : "No user logged in"}
    </div>
  );
}

function UseContextExample() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}

export default UseContextExample;