import Login from "./login";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Accounts(props) {
  const [accounts, setAccounts] = useState(() => {
    const users = JSON.parse(localStorage.getItem("Users"));
    return users.Users ?? [];
  });

  const [selectedUser, setSelectedUser] = useState(0);

  const dispatchUser = (userId) => {
    console.log("local storage: ", JSON.parse(localStorage.getItem("Users")));
    return props.getUser(userId);
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("Users"));
    setAccounts(users.Users);
  }, []);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("Users"));
   setAccounts(users.Users)
    console.log("user", users);
  }, [props.user]);

  const [loginVisibility, setLoginVisibility] = useState("hidden");

  const dropDownAccountList = useRef();

  const toggelAccountList = () => {
    dropDownAccountList.current.classList.toggle("hidden");
  };

  useEffect(() => {
    const OutsideClick = (e) => {
      if (
        dropDownAccountList.current &&
        !dropDownAccountList.current.contains(e.target) &&
        !document.querySelector(".chevron-icon").contains(e.target)
      ) {
        dropDownAccountList.current.classList.add("hidden");
      }
    };

    document.addEventListener("click", OutsideClick);

    return () => {
      document.removeEventListener("click", OutsideClick);
    };
  }, [dropDownAccountList]);

  const toggleLoginVisibilty = () => {
    dropDownAccountList.current.classList.add("hidden");
    setLoginVisibility((prev) => !prev);
  };

  return (
    <div className="account">
      <div className="account-container">
        <div>
          {accounts.length > 0 && (
            <div className="account-profile">
              <div className="account-profile-img">
                <img
                  src={`https://eu.ui-avatars.com/api/?name=${accounts[selectedUser]?.firstName}+${accounts[selectedUser]?.lastName}&size=250`}
                  alt="profile"
                />
              </div>
              <span>Hi, {accounts[selectedUser]?.firstName.toUpperCase()}</span>
              <span
                className="chevron-icon"
                onClick={(e) => toggelAccountList(e)}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </div>
          )}
        </div>
        <div ref={dropDownAccountList} className="account-list hidden">
          {accounts.map((user, i) => (
            <div
              key={user.id}
              className="user"
              onClick={() => (
                dispatchUser(user.id), setSelectedUser(i), toggelAccountList()
              )}
            >
              <div className="user-profile">
                <img
                  src={`https://eu.ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=250`}
                  alt="profile"
                />
              </div>
              <div className="user-info">
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span>{user.email}</span>
              </div>
            </div>
          ))}

          <div className="new-account" onClick={() => toggleLoginVisibilty()}>
            <span className="plus-icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <p>Add Account</p>
          </div>
        </div>
      </div>
      <Login visibility={loginVisibility} close={setLoginVisibility} />
    </div>
  );
}
