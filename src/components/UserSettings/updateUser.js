export async function updateUser(token, updatedData) {
  const response = await fetch("http://localhost:8000/users/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Błąd aktualizacji użytkownika");
  }

  return await response.json();
}
