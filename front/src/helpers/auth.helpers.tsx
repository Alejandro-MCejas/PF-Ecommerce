// auth.helper.ts
import { ILoginProps } from "@/components/Login/TypesLogin";

const mockUsers = [
  { name: "admin", password: "admin123", role: "administrator" },
  { name: "user", password: "user123", role: "user" },
  { name: "controller", password: "controller123", role: "controller" },
];
/*
export async function login(userData: ILoginProps) {
  const user = mockUsers.find(
    (u) => u.name === userData.name && u.password === userData.password
  );
  
  if (user) {
    const mockResponse = {
      token: "fake-jwt-token",
      user: {
        id: Date.now(),
        name: user.name,
        role: user.role,
      },
    };
    return mockResponse;
  } else {
    throw new Error("Failed to login: Incorrect username or password");
  }
}
*/