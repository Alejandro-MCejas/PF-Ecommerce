"use client"

import React, { useState } from 'react';
import SuscriptionPriceAdmin from '../SuscriptionPriceAdmin/SuscriptionPriceAdmin';

const SideMenuAdmin = () => {
  // Estado para controlar la opción activa
  const [activeTab, setActiveTab] = useState<string>('price');

  // Función para renderizar el contenido en función de la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'price':
        return <SuscriptionPriceAdmin />;
      case 'offers':
        return <div><h2>Subscription offers</h2><p>Details about offers available for subscribers.</p></div>;
      case 'users':
        return <div><h2>Subscription users</h2><p>Details about current subscription users.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Menú lateral */}
      <div className="w-1/4 h-[700px] bg-gray-100 border-r-2">
        <ul className="flex flex-col items-center justify-evenly h-full bg-red-300">
          <li
            onClick={() => setActiveTab('price')}
            className={`p-4 cursor-pointer w-full flex text-[30px] font-bold justify-center items-center ${activeTab === 'price' ? 'bg-gray-400' : ''}`}
          >
            Subscription price
          </li>
          <li
            onClick={() => setActiveTab('offers')}
            className={`p-4 cursor-pointer w-full flex text-[30px] font-bold justify-center items-center ${activeTab === 'offers' ? 'bg-gray-400' : ''}`}
          >
            Subscription offers
          </li>
          <li
            onClick={() => setActiveTab('users')}
            className={`p-4 cursor-pointer w-full flex text-[30px] font-bold justify-center items-center ${activeTab === 'users' ? 'bg-gray-400' : ''}`}
          >
            Subscription users
          </li>
        </ul>
      </div>

      {/* Contenido dinámico */}
      <div className="w-3/4 p-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default SideMenuAdmin;
