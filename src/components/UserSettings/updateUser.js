export async function updateUser(token, updatedData) {
  const response = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/users/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Update user error details:", errorData);
    throw new Error(`Błąd aktualizacji użytkownika: ${response.status} ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}
