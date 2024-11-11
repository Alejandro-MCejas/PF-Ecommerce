"use client"

import { useCart } from '@/context/CartContext';
import { fetchingProductByID } from '@/helpers/productHelper';
import React, { useState } from 'react';

interface StockCounterProps {
    idProduct: string
    initialStock: number;
    maxStock: number;
}

const StockCounter: React.FC<StockCounterProps> = ({ initialStock, idProduct , maxStock }) => {
    const [stock, setStock] = useState<number>(initialStock);
    // const {addToCart, removeFromCart } = useCart();

    const handleDecrement = () => {
        if (stock > 1) {
            setStock(stock - 1);
            // removeFromCart(idProduct)
        }
    };

    const handleIncrement = async () => {
        if (stock < maxStock) {
            const product = await fetchingProductByID(idProduct);
            if (product) {
                setStock(stock + 1);
                // addToCart(product); // Añade un producto al carrito
            }
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
