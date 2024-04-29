import { useState, useEffect } from "react";

const initialState = { Users: [{
  id: 1,
  firstName: "oussama",
  lastName: "oussama",
  email: "user@gmail.com",
  password: "1234",
}] };

export default function Auth(payload) {
  const [state, setState] = useState(() => {
    const getKey = localStorage.getItem("Users");
    if (getKey) {
      let userAuth = JSON.parse(getKey);
      if (payload) {
        let findUser = userAuth.Users.find(
          ({ email }) => email === payload.email
        );
        if (findUser === undefined) {
          return { Users: [...userAuth.Users, payload].flat(1) };
        } else {
          return { Users: userAuth.Users };
        }
      } else {
        return { Users: userAuth.Users };
      }
    } else {
      localStorage.setItem("Users", JSON.stringify(initialState));
    }
  });

  const onChange = (nextState) => {
    // console.log(nextState["id"]);
    let userAuth = JSON.parse(localStorage.getItem("Users"));
    const userId = (previousUser, user?) => {
      if (previousUser.Users[previousUser.Users.length - 1]?.id) {
        user.Users["id"] =
          previousUser?.Users[previousUser.Users.length - 1]?.id + 1;
      } else {
        user.Users["id"] = 1;
      }
      return user.Users;
    };

    //userId(userAuth)
    //console.log(userId(nextState.Users?.id, nextState));
    let findUser = userAuth.Users.find(
      ({ email }) => email === nextState.email
    );
    if (findUser === undefined) {
      setState((prev) => ({
        Users: [...prev.Users, userId(userAuth, nextState)],
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(state));
  }, [state]);

  return [state, onChange];
}
