import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDb from "../../hooks/useDb";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = state;

    const navigator = useNavigate();

  const auth = useDb();
  // cookie set with a login
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Define a callback function to handle the login result
  const handleLoginResult = (user) => {
    if (user) {
      console.log("Login successful. User data:", user);
      setCookie("user_login", email, 2);
        localStorage.setItem("user-info", JSON.stringify({ logIn: user, email:email }));
        alert('Login Successful');
        navigator('/')
    } else {
      alert("Login failed. Invalid credentials.");
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    auth.login(email, password, handleLoginResult);
    //   console.log('form submit');
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handelSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Add New <Link to={"/register"}>Register</Link>{" "}
      </p>
      {error && <p>{error}</p>}
    </>
  );
}
