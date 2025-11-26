export async function registerUser(username, email, password) {
  const res = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }
  return res.json();
}

export async function loginUser(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const res = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Login failed:", res.status, errorText);
    throw new Error("Invalid credentials");
  }

  return res.json();
}


