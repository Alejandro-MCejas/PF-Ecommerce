'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { IProduct } from '@/interfaces/IProduct';

// Definir los tipos de datos para el contexto combinado
interface CombinedContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
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
  const [cart, setCart] = useState<IProduct[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({ quantity: '1', price: '10', amount: 10, description: 'Some book' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);
    }
  }, []);

  // Funciones para manejar el carrito
  const addToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id.toString() !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

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

// Custom hook para usar el contexto combinado
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCombinedContext must be used within a CombinedProvider');
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