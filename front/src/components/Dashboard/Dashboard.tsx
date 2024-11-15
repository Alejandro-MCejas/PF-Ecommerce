"use client"
import { useState } from "react";
import Link from "next/link";
import MyInformation from "./MyInformation";
import Favorites from "./Favotites";
import Ordes from "./Orders";

const Dashboard = () => {
    const [activeView, setActiveView] = useState("information");

    const renderContent = () => {
        switch (activeView) {
            case "information":
                return (
                 <MyInformation/>
             
                );
            case "favorites":
                return (
                 <Favorites />     
             
                );
            case "orders":
               return (
                <Ordes/>
               )
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
                <div className="flex border-b border-gray-300 pb-4 mb-4">
                    <div className="flex flex-col w-1/4 pr-4">
                        <button
                            className={`text-left py-2 px-4 rounded-lg mb-2 font-semibold ${activeView === "information" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                            onClick={() => setActiveView("information")}
                        >
                            My Information
                        </button>
                        <button
                            className={`text-left py-2 px-4 rounded-lg mb-2 ${activeView === "favorites" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                            onClick={() => setActiveView("favorites")}
                        >
                            Favorites
                        </button>
                        <button
                            className={`text-left py-2 px-4 rounded-lg ${activeView === "orders" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                            onClick={() => setActiveView("orders")}
                        >
                            My Orders
                        </button>
                    </div>
                    <div className="w-3/4 pl-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
