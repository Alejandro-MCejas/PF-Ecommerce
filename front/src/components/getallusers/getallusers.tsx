"use client"
import { useEffect, useState } from "react";
import { getAllUsers } from "@/helpers/auth.helper";

type User = {
  id: number;
  name: string;
  // Agrega aquí cualquier otra propiedad que tenga el objeto `user`
  email?: string;
  age?: number;
  // Puedes usar el tipo `Record<string, any>` si el objeto puede tener propiedades dinámicas
};

const GetAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData: User[] = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>Details for {user.name}</h2>
            <ul>
              {Object.entries(user).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
