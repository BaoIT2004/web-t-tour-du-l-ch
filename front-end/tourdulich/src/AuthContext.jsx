import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(parsedUser.token);
      setUser({ email: parsedUser.email, role: parsedUser.role });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userData.token);
    setUser({ email: userData.email, role: userData.role });
  };

  // Trong AuthContext.jsx
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
