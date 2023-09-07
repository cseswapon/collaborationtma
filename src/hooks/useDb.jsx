// useDb.js
const useDb = () => {
  const dbName = "CollaborativeTMA";
  const storeName = "user";
  let currentUser = null;

  // Open the IndexedDB database
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const idb = indexedDB.open(dbName, 1);

      idb.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("users", "email", { unique: true });
      };

      idb.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };

      idb.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  // Sign up a new user
  const signUp = (email, password, username, bio, profilePicture, callback) => {
    openDB()
      .then((db) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const emailIndex = store.index("users");
        const emailRequest = emailIndex.get(email);

        emailRequest.onsuccess = (event) => {
          const existingUser = event.target.result;
          if (existingUser) {
            callback(false, "Email already exists");
          } else {
            store.add({
              email,
              password,
              username,
              bio,
              profilePicture,
            });
            callback(true, "User signed up successfully");
          }
        };

        tx.oncomplete = () => {
          db.close();
        };

        tx.onerror = (event) => {
          callback(false, event.target.error);
        };
      })
      .catch((error) => {
        callback(false, error);
      });
  };

  // Log in a user
  const login = (email, password, callback) => {
    openDB()
      .then((db) => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const emailIndex = store.index("users");
        const emailRequest = emailIndex.get(email);

        emailRequest.onsuccess = (event) => {
          const user = event.target.result;

          if (user && user.password === password) {
            // Successful login, set the current user and trigger the callback
            currentUser = user;
            callback(true, "User logged in successfully", currentUser);
          } else {
            // Invalid credentials, trigger the callback with an error message
            callback(false, "Invalid credentials");
          }
        };

        tx.onerror = (event) => {
          callback(false, event.target.error);
        };

        tx.oncomplete = () => {
          db.close();
        };
      })
      .catch((error) => {
        callback(false, error);
      });
  };

  // Log out the current user
  const logout = () => {
    currentUser = null;
  };

  // Get the current user
  const getCurrentUser = () => {
    return currentUser;
  };

  return {
    signUp,
    login,
    logout,
    getCurrentUser,
  };
};

export default useDb;
