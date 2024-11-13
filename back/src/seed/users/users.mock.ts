import { UserRole } from "src/users/enum/role.enum";

export const usersMock = [
    // {
    //     "name": "Ana Martínez",
    //     "email": "prueba123@gmail.com",
    //     "password": "prueba",
    //     "confirmPassword": "prueba",
    //     "address": "Rivadavia 101",
    //     "phone": "2211334455",
    //     "admin": UserRole.USER
    // },
    // {
    //     "name": "Carlos Gomez",
    //     "email": "prueba12345@gmail.com",
    //     "password": "prueba",
    //     "confirmPassword": "prueba",
    //     "address": "San Martin 789",
    //     "phone": "0987654321",
    //     "admin": UserRole.ADMIN
    // },
    // {
    //     "name": "Jorge Ramírez",
    //     "email": "prueba123@gmail.com",
    //     "password": "prueba",
    //     "confirmPassword": "prueba",
    //     "address": "Corrientes 234",
    //     "phone": "3344556677",
    //     "admin": UserRole.USER
    // },
    // {
    //     "name": "Laura Torres",
    //     "email": "prueba1234@gmail.com",
    //     "password": "prueba",
    //     "confirmPassword": "prueba",
    //     "address": "Alsina 789",
    //     "phone": "6677889900",
    //     "admin": UserRole.USER
    // },
    // {
    //     "name": "Mariana López",
    //     "email": "prueba123@gmail.com",
    //     "password": "prueba",
    //     "confirmPassword": "prueba",
    //     "address": "Belgrano 678",
    //     "phone": "1234567890",
    //     "admin": UserRole.ADMIN
    // },
    // {
    //     "name": "Santiago Pérez",
    //     "email": "prueba123@gmail.com",
    //     "password": "prueba",
    //     "confirmPassword": "prueba",
    //     "address": "Av. Libertador 1234",
    //     "phone": "1122334455",
    //     "admin": UserRole.ADMIN
    // }

        {
          "name": "Ana Martínez",
          "email": "prueba123@gmail.com",
          "password": "prueba",
          "confirmPassword": "prueba",
          "address": "Rivadavia 101",
          "phone": "2211334455",
          "isSuscription":false,
          "admin": UserRole.USER
        },
        {
          "name": "Carlos Gómez",
          "email": "carlosgomez@gmail.com",
          "password": "userpassword123",
          "confirmPassword": "userpassword123",
          "address": "Av. Libertador 200",
          "phone": "2213445566",
          "isSuscription":false,
          "admin": UserRole.USER
        },
        {
          "name": "Lucía Fernández",
          "email": "luciafernandez@gmail.com",
          "password": "mypassword123",
          "confirmPassword": "mypassword123",
          "address": "Calle Falsa 789",
          "phone": "2214556677",
          "isSuscription":true,
          "admin": UserRole.ADMIN
        }
      
];
