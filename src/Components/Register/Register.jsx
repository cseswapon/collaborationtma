// Register.js
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleRegistration = (success, message) => {
    if (success) {
      console.log("Register successful. Message:", message);
    } else {
      console.error("Register failed. Message:", message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the selected image file directly for reading
    const profilePictureFile = state.profilePicture;

    if (profilePictureFile) {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        const profilePicture = event.target.result; // Use the result directly
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
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setState({ ...state, bio: e.target.value })}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setState({ ...state, profilePicture: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already Registered? <Link to="/login">Login</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
}
