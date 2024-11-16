import { UserRole } from "src/users/enum/role.enum";

export const usersMock = [
    {
        "name": "Ana Martínez",
        "email": "user1@gmail.com",
        "password": "prueba",
        "address": "Rivadavia 101",
        "phone": "2211334455",
        "admin": UserRole.USER
    },
    {
        "name": "Carlos Gomez",
        "email": "admin1@gmail.com",
        "password": "admin123",
        "address": "San Martin 789",
        "phone": "0987654321",
        "admin": UserRole.ADMIN
    },
    {
        "name": "Jorge Ramírez",
        "email": "user2@gmail.com",
        "password": "prueba",
        "address": "Corrientes 234",
        "phone": "3344556677",
        "admin": UserRole.USER
    },
    {
        "name": "Laura Torres",
        "email": "user3@gmail.com",
        "password": "prueba",
        "address": "Alsina 789",
        "phone": "6677889900",
        "admin": UserRole.USER
    },
    {
        "name": "Mariana López",
        "email": "admin2@gmail.com",
        "password": "prueba",
        "address": "Belgrano 678",
        "phone": "1234567890",
        "admin": UserRole.ADMIN
    },
    {
        "name": "Santiago Pérez",
        "email": "admin3@gmail.com",
        "password": "prueba",
        "address": "Av. Libertador 1234",
        "phone": "1122334455",
        "admin": UserRole.ADMIN
    }
];
