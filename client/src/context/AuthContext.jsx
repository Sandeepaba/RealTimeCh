import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, tokenStore } from "../api.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!tokenStore.get());

  // Restore session on refresh
  useEffect(() => {
    if (!tokenStore.get()) return;
    api("/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  const authenticate = useCallback(async (path, body) => {
    const data = await api(path, { method: "POST", body });
    tokenStore.set(data.token);
    setUser(data.user);
  }, []);

  const login = (email, password) => authenticate("/auth/login", { email, password });
  const register = (name, email, password) => authenticate("/auth/register", { name, email, password });

  const logout = async () => {
    try { await api("/auth/logout", { method: "POST" }); } catch { /* token may already be invalid */ }
    tokenStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  );
}
