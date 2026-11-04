const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const tokenStore = {
  get: () => localStorage.getItem("token"),
  set: (t) => localStorage.setItem("token", t),
  clear: () => localStorage.removeItem("token"),
};

export async function api(path, { method = "GET", body } = {}) {
  const token = tokenStore.get();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Request failed.");
    err.status = res.status;
    throw err;
  }
  return data;
}
