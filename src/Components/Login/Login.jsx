import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDb from "../../hooks/useDb";
import './Login.css';
export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = state;

    const navigator = useNavigate();

  const auth = useDb();
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  const handleLoginResult = (user) => {
    if (user) {
      // console.log("Login successful. User data:", user);
      setCookie("user_login", email, 2);
        sessionStorage.setItem("user-info", JSON.stringify({ logIn: user, email:email }));
        alert('Login Successful');
        navigator('/')
    } else {
      alert("Login failed. Invalid credentials.");
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    auth.login(email, password, handleLoginResult);
  };

  return (
    <div className="bg-login">
      <div>
        <h2 className="fw-bold text-light">Login</h2>
        <form onSubmit={handelSubmit}>
          <div>
            <label className="text-light my-1">Email:</label><br />
            <input
              className="p-2"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
       
            />
          </div>
          <div>
            <label className="text-light my-1">Password:</label><br />
            <input
              className="p-2"
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
           
            />
          </div>
          <button className="mt-3 mb-2 btn btn-primary w-100" type="submit">Login</button>
        </form>
        <p className="text-light text-center">
          Add New User <Link to={"/register"}>Register</Link>{" !!!"}
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
