import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user từ localStorage khi app mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(parsedUser.token);
      setUser({
        id: parsedUser.id,
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
        address: parsedUser.address,
        gender: parsedUser.gender,
        role: parsedUser.role,
        phonenumber: parsedUser.phonenumber
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userData.token);
    setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      address: userData.address,
      gender: userData.gender,
      role: userData.role,
      phonenumber: userData.phonenumber
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
