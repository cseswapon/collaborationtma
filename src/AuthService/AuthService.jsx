// import { addData } from "../DB/IndexDB";


const users = [
  {
    id: 1,
    email: "user1@example.com",
    password: "password1",
    username: "User1",
    bio: "A user",
  },
  {
    id: 2,
    email: "user2@example.com",
    password: "password2",
    username: "User2",
    bio: "Another user",
  },
];

class AuthService {
  static register(email, password) {
    // addData(email, password);
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      const newUser = { id: users.length + 1, email, password };
      users.push(newUser);
      resolve(newUser);
    });
  }

  static login(email, password) {
    return new Promise((resolve, reject) => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  }

  static logout() {
    // Simulated logout logic (you should clear the authentication token here).
    return Promise.resolve();
  }
}

export default AuthService;
