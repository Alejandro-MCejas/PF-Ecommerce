"use client"

import { fetchingProducts } from '@/helpers/productHelper';
import { IProduct } from '@/interfaces/IProduct';
import { useEffect, useState } from 'react';

const RandomProductsComponent = () => {
  const [randomProducts, setRandomProducts] = useState<IProduct[]>([]);
  const [productList , setProductList] = useState<IProduct[]>([])
  useEffect(() => {

    const fetchingProduct = async ()=>{
        const products = await fetchingProducts()
        setProductList(products)
    }
    const getRandomProducts = async () => {
      if (Array.isArray(productList) && productList.length > 2) {
        const randomIndices: number[] = [];
        while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * productList.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        const selectedProducts = randomIndices.map(index => productList[index]);
        setRandomProducts(selectedProducts);
      } else if (Array.isArray(productList)) {
        // Si hay 2 o menos productos, mostrarlos todos
        setRandomProducts(productList);
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
