import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try { await login(form.email, form.password); }
    catch (err) { setError(err.message); setBusy(false); }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up your conversations."
      footer={<>New here? <Link to="/register">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate>
        <label>Email
          <input type="email" autoComplete="email" value={form.email} onChange={set("email")} required />
        </label>
        <label>Password
          <input type="password" autoComplete="current-password" value={form.password} onChange={set("password")} required />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </AuthShell>
  );
}
