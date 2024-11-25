// import { IProduct } from "@/interfaces/IProduct"

// interface IOrder{
//     products: IProduct[],
//     orderState:string
// }

// interface IUser {
//     name:string,
//     email:string,
//     password:string,
//     phoneNumber:number,
//     orders: IOrder[],
//     cybergamer:boolean,
//     role:string,
// }

// export const exampleProduct: IProduct = {
//     id:"1",
//     name: 'Mario Bross',
//     image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731432989/wv4oe9wvudxnxihbezqk.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731432990/qm17yii8kmsnziihxjeh.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731432991/w6uxedt7icvd1gphxvvi.jpg"],
//     category: 'Example category',
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     stock:4,
//     price:60,
//     suscription:true
// }

// export const productHelper = [
//     {
//         name: "The Legend of Zelda: Breath of the Wild",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731432989/wv4oe9wvudxnxihbezqk.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731432990/qm17yii8kmsnziihxjeh.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731432991/w6uxedt7icvd1gphxvvi.jpg"],
//         description: "Un juego de aventura en mundo abierto para Nintendo Switch.",
//         price: 59.99,
//         stock: 25,
//         suscription: false,
//         categories:"Acción",
//     },
//     {
//         name: "God of War: Ragnarok",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433116/gyubqy4w9aspiwkyupfv.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433118/zsjefi25dk7tu4frmlwq.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433121/gmp5muxwbpnj68de641t.jpg"],
//         description: "Juego de acción y aventura épico para PlayStation.",
//         price: 69.99,
//         stock: 30,
//         suscription: false,
//         categories:"Acción",
//     },
//     {
//         name: "Minecraft",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1730924299/oh1nhzyqhe42rz469fpn.png",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1730924299/wgvbotbkzlphp9vch9ff.jpg"],
//         description: "Un juego de construcción y exploración en un mundo infinito.",
//         price: 26.99,
//         stock: 100,
//         suscription: true,
//     },
//     {
//         name: "Cyberpunk 2077",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433231/bek0urfzcmshhiqnhwj7.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433232/opa0ymb11zbvh4c1bu0i.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433232/rnb6vvwussqujwcrghli.jpg"],
//         description: "Juego de rol futurista en un mundo abierto.",
//         price: 39.99,
//         stock: 45,
//         suscription: false,
//         categories:"Acción",
//     },
//     {
//         name: "FIFA 23",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433298/i9iqdtu6zvxomupiui6b.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433299/ezueh3ttujwtntwdopy5.jpg"],
//         description: "El juego de simulación de fútbol más popular.",
//         price: 59.99,
//         stock: 70,
//         suscription: true,
//         categories:"Acción",
//     },
//     {
//         name: "Elden Ring",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433403/qbwub8ty2hunxdcs4xqy.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433404/spbndizxeuk9mou8fna7.webp",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433404/bbvthhophhg0fempmo1b.jpg"],
//         description: "Aventura épica en un mundo abierto con combates desafiantes.",
//         price: 59.99,
//         stock: 20,
//         suscription: false,
//     },
//     {
//         name: "Red Dead Redemption 2",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433471/o4x5b0xsfu2rrsjneks3.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433472/zpnuawsfsmvui6u7jtdt.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433473/vc1cxt5ng8vcly5j7tal.webp"],
//         description: "Juego de aventura en el salvaje oeste.",
//         price: 49.99,
//         stock: 35,
//         suscription: false,
//     },
//     {
//         name: "Among Us",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433576/vfqasjgv62a6rhbznflf.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433576/jpgkykzrxbbhblm4lmka.jpg"],
//         description: "Juego de deducción social para grupos.",
//         price: 4.99,
//         stock: 500,
//         suscription: true,
//     },
//     {
//         name: "Horizon Forbidden West",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731434263/mdgkvdhhx6iu8luq7blz.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731434264/eechbtdaucopqj1talbc.avif",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731434265/zz2ptit6ob4bu7wwidfy.webp"],
//         description: "Aventura postapocalíptica en un mundo abierto.",
//         price: 59.99,
//         stock: 40,
//         suscription: false,
//     },
//     {
//         name: "Fortnite",
//         image: ["https://res.cloudinary.com/dvpenabty/image/upload/v1731433637/sjrrg7vxeplgjmywdzg5.jpg",
//         "https://res.cloudinary.com/dvpenabty/image/upload/v1731433638/l72umbvdmxpykmjbfkvj.jpg"],
//         description: "Juego de batalla real multijugador gratuito.",
//         price: 0.00,
//         stock: 9999,
//         suscription: true,
//     }
// ];

// export const exampleUser: IUser = {
//     email: "user@example.com",
//     name: 'Valentino Sparvoli',
//     password: "password123",
//     phoneNumber: 1234567890,
//     orders:[
//         {
//             products: [exampleProduct],
//             orderState: 'En proceso'
//         },
//         {
//             products: [exampleProduct, exampleProduct],
//             orderState: 'Entregado'
//         }
//     ],
//     cybergamer: false,
//     role: "user" // Puede ser "user" o "admin"
//   };
  
