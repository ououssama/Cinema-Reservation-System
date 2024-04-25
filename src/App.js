import { Hall } from "./hall";
import "./styles.css";
import Auth from "./auth";
import { useEffect, useState } from "react";
import Accounts from "./accounts";

export default function App() {
  const [auth, setAuth] = Auth();

  const [currentUser, setCurrentUser] = useState(1);
  const [isUserAdded, setIsUserAdded] = useState(false);

  const getUser = (data) => {
    setCurrentUser(data);
  };

  // this function will trigger when new user been added
  const triggerAddedUser = (data) => {
    setIsUserAdded(data.isUserAdded);
  };

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify({ Users: auth.Users }));
  }, [auth]);

  return (
    <div className="App">
      <div className="header">
        <h1>Cinema Sets Reservation</h1>
        <Accounts
          user={auth}
          getUser={getUser}
          triggerAddedUser={triggerAddedUser}
          isUserAdded={isUserAdded}
        />
      </div>
      <Hall hallId={1} currentUser={currentUser} isUserAdded={isUserAdded} />
    </div>
  );
}
