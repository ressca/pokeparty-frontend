export async function fetchCurrentUser(token) {
  console.log("API URL:", import.meta.env.VITE_POKEPARTY_API_URL);
  console.log("TOKEN:", token);

  const res = await fetch(
    `${import.meta.env.VITE_POKEPARTY_API_URL}/users/current-user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Nie udało się pobrać usera:", res.status, errorText);
    throw new Error("Cannot fetch user data");
  }

  return res.json();
}
