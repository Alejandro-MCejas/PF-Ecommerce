
interface IProduct {
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

const exampleProduct: IProduct = {
    name: 'Mario Bross',
    imagenBannerUrl: 'Example string',
    category: 'Example category',
    cyberGamer:true
}

const exampleUser: IUser = {
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
  
