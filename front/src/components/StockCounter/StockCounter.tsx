"use client";

import { useCart } from '@/context/CartContext';
import React, { useState } from 'react';

interface StockCounterProps {
  idProduct: string;
  initialStock: number;
  maxStock: number;
}

const StockCounter: React.FC<StockCounterProps> = ({ initialStock, idProduct, maxStock }) => {
  const { updateProductQuantity } = useCart(); // Trae la función del contexto
  const [stock, setStock] = useState<number>(initialStock);

  const handleDecrement = () => {
    if (stock > 1) {
      const newStock = stock - 1;
      setStock(newStock);
      updateProductQuantity(idProduct, newStock); // Actualiza el carrito
    }
  };

  const handleIncrement = () => {
    if (stock < maxStock) {
      const newStock = stock + 1;
      setStock(newStock);
      updateProductQuantity(idProduct, newStock); // Actualiza el carrito
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrement}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        &minus;
      </button>
      <span className="px-4 py-2 border rounded">{stock}</span>
      <button
        onClick={handleIncrement}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default StockCounter;

