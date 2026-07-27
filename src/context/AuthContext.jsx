import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "skymart_users";
const CURRENT_USER_KEY = "skymart_current_user";

// sirf @gmail.com allow karna hai - koi bhi doosra domain reject
export function isGmail(email) {
  return /^[^\s@]+@gmail\.com$/i.test(email.trim());
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function getStoredCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredCurrentUser);

  // returns { success, message }
  function register({ fullName, email, password }) {
    const cleanEmail = email.trim().toLowerCase();

    if (!isGmail(cleanEmail)) {
      return { success: false, message: "Only Gmail addresses are allowed (e.g. name@gmail.com)" };
    }

    const users = getStoredUsers();
    if (users.some((u) => u.email === cleanEmail)) {
      return { success: false, message: "An account with this email already exists" };
    }

    const newUser = { fullName, email: cleanEmail, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    const sessionUser = { name: fullName, email: cleanEmail };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true, message: "Account created successfully" };
  }

  // returns { success, message }
  function login({ email, password }) {
    const cleanEmail = email.trim().toLowerCase();

    if (!isGmail(cleanEmail)) {
      return { success: false, message: "Only Gmail addresses are allowed" };
    }

    const users = getStoredUsers();
    const match = users.find((u) => u.email === cleanEmail && u.password === password);

    if (!match) {
      return { success: false, message: "Invalid email or password" };
    }

    const sessionUser = { name: match.fullName, email: match.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true, message: "Logged in successfully" };
  }

  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
