
import { useState } from "react";
import Login from "./Pages/Login";
import DashboardLayout from "./Layouts/DashboardLayout";
import { getUser, removeUser } from "./Utils/Storage";

function App() {
  const [user, setUser] = useState(() => getUser());

  function handleLogin(name) {
    setUser(name);
  }

  function handleLogout() {
    removeUser();
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App;
