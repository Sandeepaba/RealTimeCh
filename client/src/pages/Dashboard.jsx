import { useAuth } from "../context/AuthContext.jsx";

// Day 1 placeholder that proves the protected route works. The real dashboard arrives on Day 3.
export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <main className="dash-placeholder">
      <h1 className="brand">Hushline</h1>
      <p>Signed in as <strong>{user.name}</strong> ({user.email})</p>
      <p className="muted">Chat dashboard coming next.</p>
      <button className="primary" onClick={logout}>Log out</button>
    </main>
  );
}
