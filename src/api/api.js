const API_URL = "http://localhost:3000"; // ou URL do seu backend

export const getUserProfile = async (token) => {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const updateUserProfile = async (token, data) => {
  const res = await fetch(`${API_URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
