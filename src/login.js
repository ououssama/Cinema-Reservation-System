import { useState } from "react";
import Auth from "./auth";
export default function Login(props) {
  const [form, setForm] = useState();
  const [auth, setAuth] = Auth();

  const Register = (e) => {
    e.preventDefault();
    setAuth({ Users: form });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`login ${props.visibility}`}>
      <div className="close-btn" onClick={() => props.close("hidden")}>
        <div id="line-t"></div>
        <div id="line-b"></div>
      </div>
      <form className="form" action="" onSubmit={Register}>
        <label for="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="input-primary"
            onChange={handleChange}
          />
        </label>
        <label for="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="input-primary"
            onChange={handleChange}
          />
        </label>
        <label for="email">
          Email
          <input
            type="text"
            name="email"
            id="email"
            className="input-primary"
            onChange={handleChange}
          />
        </label>
        <label for="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="input-primary"
            onChange={handleChange}
          />
        </label>
        <button className="button-primary" type="submit">
          Add Account
        </button>
      </form>
    </div>
  );
}
