
interface IProduct {
    id:number,
    name: string,
    imagenBannerUrl: string,
    category: string,
    cyberGamer: boolean,
}

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
    role:string
}

export const exampleProduct: IProduct = {
    id:1,
    name: 'Mario Bross',
    imagenBannerUrl: 'Example string',
    category: 'Example category',
    cyberGamer:true
}

export const exampleArrayProducs: IProduct[] = [
    {
        id:1,
        name: 'It takes two',
        imagenBannerUrl: 'https://i.pinimg.com/originals/50/c9/32/50c932da1c89102a7efbcfdf8a39a0b0.jpg',
        category: 'Example category',
        cyberGamer: true
    },
    {
        id:2,
        name: 'Dragon Ball Z',
        imagenBannerUrl: 'https://i.pinimg.com/originals/cb/4d/5f/cb4d5f5d42ea7cb3f5ddef8f29408128.jpg',
        category: 'Shooter',
        cyberGamer: false
    },
    {
        id:3,
        name: 'God of War',
        imagenBannerUrl: 'https://i.pinimg.com/originals/05/b5/59/05b55910e492663c34a7a7409138171f.jpg',
        category: 'Action',
        cyberGamer: true
    },
    {
        id:4,
        name: 'Rayman',
        imagenBannerUrl: 'https://cdn.mobygames.com/covers/3887468-rayman-3-hoodlum-havoc-playstation-2-front-cover.jpg',
        category: 'Adventure',
        cyberGamer: false
    },
    {
        id:5,
        name: 'It takes two',
        imagenBannerUrl: 'https://i.pinimg.com/originals/50/c9/32/50c932da1c89102a7efbcfdf8a39a0b0.jpg',
        category: 'Example category',
        cyberGamer: true
    },
    {
        id:6,
        name: 'Dragon Ball Z',
        imagenBannerUrl: 'https://i.pinimg.com/originals/cb/4d/5f/cb4d5f5d42ea7cb3f5ddef8f29408128.jpg',
        category: 'Shooter',
        cyberGamer: false
    },
    {
        id:7,
        name: 'God of War',
        imagenBannerUrl: 'https://i.pinimg.com/originals/05/b5/59/05b55910e492663c34a7a7409138171f.jpg',
        category: 'Action',
        cyberGamer: true
    },
    {
        id:8,
        name: 'Rayman',
        imagenBannerUrl: 'https://cdn.mobygames.com/covers/3887468-rayman-3-hoodlum-havoc-playstation-2-front-cover.jpg',
        category: 'Adventure',
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
  
