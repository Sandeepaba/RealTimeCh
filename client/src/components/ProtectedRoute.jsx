import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="splash">Loading your chats…</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="splash">Loading…</div>;
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
