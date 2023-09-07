import { useState } from "react";
import { Link } from "react-router-dom";
import useDb from "../../hooks/useDb";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = state;

  const auth = useDb();
  // Define a callback function to handle the login result
  const handleLoginResult = (user) => {
    if (user) {
      console.log("Login successful. User data:", user);
      // You can perform actions here after a successful login
    } else {
      console.log("Login failed. Invalid credentials.");
      // You can handle failed login attempts here
    }
  };

  
  const handelSubmit = (e) => {
      e.preventDefault()
      auth.login(email, password, handleLoginResult);
    //   console.log('form submit');
    }
    
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
