"use client"

import { IProduct } from '@/interfaces/IProduct';
import { useEffect, useState } from 'react';

const RandomProductsComponent = ({products}: {products:IProduct[]}) => {
  const [randomProducts, setRandomProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getRandomProducts = async () => {
      if (Array.isArray(products) && products.length > 2) {
        const randomIndices: number[] = [];
        while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * products.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        const selectedProducts = randomIndices.map(index => products[index]);
        setRandomProducts(selectedProducts);
      } else if (Array.isArray(products)) {
        // Si hay 2 o menos productos, mostrarlos todos
        setRandomProducts(products);
      } else {
        setRandomProducts([]);
      }
    };

    getRandomProducts();
  }, []);

  return (
    <div className='flex w-full max-w-[1500px] justify-evenly items-center'>
      {randomProducts.map(product => (
        <div key={product.id} className='flex'>
          <img src={product.image[0]} alt="" className='w-[200px] h-[300px] rounded-md' />
          {/* Renderiza otros detalles del producto si es necesario */}
        </div>
      ))}
    </div>
  );
};

export default RandomProductsComponent;
