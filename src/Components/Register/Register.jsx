// Register.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDb from "../../hooks/useDb";

export default function Register() {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
    bio: "",
    profilePicture: null, // Store the selected file here
    error: "",
  });

  const { email, password, username, bio, error } = state;
    const auth = useDb();
    const navigate = useNavigate();

  const handleRegistration = (success, message) => {
    if (success) {
        // console.log("Register successful. Message:", message);
        alert("Register successful. Message");
        navigate('/login')
    } else {
        console.error("Register failed. Message:", message);
        alert("Register failed. Message");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profilePictureFile = state.profilePicture;

    if (profilePictureFile) {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        const profilePicture = event.target.result; 
        auth.signUp(
          email,
          password,
          username,
          bio,
          profilePicture,
          handleRegistration
        );
      };

      fileReader.readAsDataURL(profilePictureFile);
    } else {
      console.error("Profile picture not selected.");
    }
  };

  return (
    <div className="bg-login">
      <div>
        <h2 className="fw-bold text-light">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-light my-1">Email:</label>
            <br />
            <input
              required
              className="w-100 p-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-light my-1">Password:</label>
            <br />
            <input
              required
              className="w-100 p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>
          <div>
            <label className="text-light my-1">Username:</label>
            <br />
            <input
              required
              className="w-100 p-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setState({ ...state, username: e.target.value })}
            />
          </div>
          <div>
            <label className="text-light my-1">Bio:</label>
            <br />
            <textarea
              required
              className="w-100 p-2"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setState({ ...state, bio: e.target.value })}
            />
          </div>
          <div>
            <label className="text-light my-1">Profile Picture:</label>
            <br />
            <input
              required
              className="w-100 p-2"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setState({ ...state, profilePicture: e.target.files[0] })
              }
            />
          </div>
          <button className="btn btn-primary mt-3 w-100" type="submit">
            Register
          </button>
        </form>
        <p className="text-center text-light my-2">
         User Already Registered <Link to="/login">Login</Link> !!!
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
