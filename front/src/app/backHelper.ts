import { IProduct } from "@/interfaces/IProduct"

interface IOrder{
    products: IProduct[],
    orderState:string
}

interface IUser {
    name:string,
    email:string,
    password:string,
    phoneNumber:number,
    orders: IOrder[],
    cybergamer:boolean,
    role:string,
}

export const exampleProduct: IProduct = {
    id:1,
    name: 'Mario Bross',
    imagenBannerUrl: 'Example string',
    category: 'Example category',
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    stock:4,
    price:60,
    cyberGamer:true
}

export const exampleArrayProducs: IProduct[] = [
    {
        id:1,
        name: 'It takes two',
        imagenBannerUrl: 'https://i.pinimg.com/originals/50/c9/32/50c932da1c89102a7efbcfdf8a39a0b0.jpg',
        category: 'Example category',
        price:60,
        stock:4,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        cyberGamer: true,
    },
    {
        id:2,
        name: 'Dragon Ball Z',
        imagenBannerUrl: 'https://i.pinimg.com/originals/cb/4d/5f/cb4d5f5d42ea7cb3f5ddef8f29408128.jpg',
        category: 'Shooter',
        price:60,
        stock:2,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        cyberGamer: false
    },
    {
        id:3,
        name: 'God of War',
        imagenBannerUrl: 'https://i.pinimg.com/originals/05/b5/59/05b55910e492663c34a7a7409138171f.jpg',
        category: 'Action',
        price:60,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        stock:0,
        cyberGamer: true
    },
    {
        id:4,
        name: 'Rayman',
        imagenBannerUrl: 'https://cdn.mobygames.com/covers/3887468-rayman-3-hoodlum-havoc-playstation-2-front-cover.jpg',
        category: 'Adventure',        
        price:60,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        stock:7,
        cyberGamer: false
    },
    {
        id:5,
        name: 'It takes two',
        imagenBannerUrl: 'https://i.pinimg.com/originals/50/c9/32/50c932da1c89102a7efbcfdf8a39a0b0.jpg',
        category: 'Example category',
        price:60,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        stock:9,
        cyberGamer: true
    },
    {
        id:6,
        name: 'Dragon Ball Z',
        imagenBannerUrl: 'https://i.pinimg.com/originals/cb/4d/5f/cb4d5f5d42ea7cb3f5ddef8f29408128.jpg',
        category: 'Shooter',
        price:60,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        stock:2,
        cyberGamer: false
    },
    {
        id:7,
        name: 'God of War',
        imagenBannerUrl: 'https://i.pinimg.com/originals/05/b5/59/05b55910e492663c34a7a7409138171f.jpg',
        category: 'Action',
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price:60,
        stock:6,
        cyberGamer: true
    },
    {
        id:8,
        name: 'Rayman',
        imagenBannerUrl: 'https://cdn.mobygames.com/covers/3887468-rayman-3-hoodlum-havoc-playstation-2-front-cover.jpg',
        category: 'Adventure',
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price:60,
        stock:2,
        cyberGamer: false
    }
];

export const exampleUser: IUser = {
    email: "user@example.com",
    name: 'Valentino Sparvoli',
    password: "password123",
    phoneNumber: 1234567890,
    orders:[
        {
            products: [exampleProduct],
            orderState: 'En proceso'
        },
        {
            products: [exampleProduct, exampleProduct],
            orderState: 'Entregado'
        }
    ],
    cybergamer: false,
    role: "user" // Puede ser "user" o "admin"
  };
  
