import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords don't match.");
    setBusy(true);
    try { await register(form.name, form.email, form.password); }
    catch (err) { setError(err.message); setBusy(false); }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes a minute. Then find people and start chatting."
      footer={<>Already registered? <Link to="/login">Sign in</Link></>}
    >
      <form onSubmit={submit} noValidate>
        <label>Full name
          <input autoComplete="name" value={form.name} onChange={set("name")} required />
        </label>
        <label>Email
          <input type="email" autoComplete="email" value={form.email} onChange={set("email")} required />
        </label>
        <label>Password
          <input type="password" autoComplete="new-password" value={form.password} onChange={set("password")} required />
        </label>
        <label>Confirm password
          <input type="password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} required />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
      </form>
    </AuthShell>
  );
}
