import { Hall } from "./hall";
import "./styles.css";
import Auth from "./auth";
import { useEffect, useState } from "react";
import Accounts from "./accounts";

export default function App() {
  const [auth, setAuth] = Auth({
    id: 1,
    firstName: "oussama",
    lastName: "oussama",
    email: "user@gmail.com",
    password: "1234",
  });

  const [currentUser, setCurrentUser] = useState(1)

  const getUser = (data) => {
    setCurrentUser(data)
  }

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify({ Users: auth.Users }));
  }, [auth]);

  return (
    <div className="App">
      <div className="header">
        <h1>Cinema Sets Reservation</h1>
        <Accounts user={auth} getUser={getUser}/>
      </div>
      <Hall hallId={1} currentUser={currentUser} />
    </div>
  );
}
