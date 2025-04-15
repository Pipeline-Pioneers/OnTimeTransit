const mockUsers = [
  { username: "admin", password: "admin123", role: "ADMIN" },
  { username: "user", password: "user123", role: "USER" },
];

export const login = (username, password) => {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }
  return user.role;
};