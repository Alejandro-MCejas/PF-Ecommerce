'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { IProductCart } from '@/interfaces/IProduct';

// Definir los tipos de datos para el contexto
interface CombinedContextType {
  cart: IProductCart[];
  addToCart: (product: IProductCart) => void;
  removeFromCart: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void; // Nueva función
  clearCart: () => void;
  cartCount: number;
  preferenceId: string | null;
  isLoading: boolean;
  orderData: { quantity: string; price: string; amount: number; description: string };
  setOrderData: React.Dispatch<React.SetStateAction<{ quantity: string; price: string; amount: number; description: string }>>;
}

// Crear el contexto
const CartContext = createContext<CombinedContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado del carrito
  const [cart, setCart] = useState<IProductCart[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({ quantity: '1', price: '10', amount: 10, description: 'Some book' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);
    }
  }, []);

  // Función para agregar un producto al carrito
  const addToCart = (product: IProductCart) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((p) => p.id === product.id);
      let updatedCart;

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity = 
          (updatedCart[existingProductIndex].quantity || 0) + (product.quantity || 1);
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad inicial
        updatedCart = [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
      

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateProductQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', '[]');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateProductQuantity, // Incluye la nueva función en el contexto
        clearCart,
        cartCount: cart.length,
        preferenceId,
        isLoading,
        orderData,
        setOrderData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};



























// 'use client'
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { IProduct } from '@/interfaces/IProduct';

// interface CartContextType {
//   cart: IProduct[];
//   addToCart: (product: IProduct) => void;
//   removeFromCart: (productId: string) => void;
//   clearCart: () => void;
//   cartCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<IProduct[]>([]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
//       setCart(storedCart);
//     }
//   }, []);

//   const addToCart = (product: IProduct) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart, product];
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.filter((product) => product.id.toString() !== productId);
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };
  
//   const clearCart = () => {
//     setCart([]);
//     localStorage.setItem('cart', '[]');
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount: cart.length }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };