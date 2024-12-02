"use client"

import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';


declare let Landbot: any;
let myLandbot: any;

const Footer = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
        script.async = true;
        script.type = "text/javascript";
        document.head.appendChild(script);
    
        const initLandbot = () => {
            if (!myLandbot) {
                myLandbot = new Landbot.Livechat({
                    configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2680897-3RYNY7L8GJGD0TTO/index.json',
                });
            }
        };
    
        const handleScriptLoad = () => {
            window.addEventListener('mouseover', initLandbot, { once: true });
            window.addEventListener('touchstart', initLandbot, { once: true });
        };
    
        script.onload = handleScriptLoad;
    
        return () => {
            document.head.removeChild(script);
            window.removeEventListener('mouseover', initLandbot);
            window.removeEventListener('touchstart', initLandbot);
        };
    }, []);
    

    // return(
    //     <div className="bg-purple-900 flex flex-col items-center py-2">
    //         <div className="flex gap-16">
    //             <Link href="https://www.whatsapp.com/" target="_blank" className="text-white hover:text-gray-500">
    //              <i className="fab fa-whatsapp fa-2x"></i>
    //             </Link>
    //             <Link href="https://facebook.com/" target="_blank" className="text-white hover:text-gray-500">
    //              <i className="fab fa-facebook fa-2x"></i>
    //             </Link>
    //             <Link href="https://x.com/" target="_blank" className="text-white hover:text-gray-500">
    //              <i className="fab fa-x fa-2x"></i>
    //            </Link>
    //         </div>
    //         <div>
    //         <p>@ Reservados todos los derechos - 2024</p>
    //         <div id="landbot-iframe-container"></div>
    //         </div>
    //     </div>
    // )

    return (
        <footer className="bg-gray-900 w-full shadow dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://s3-alpha-sig.figma.com/img/9b24/ab51/4afde8507a88429e72fe3362ccbebe43?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dRsBfIogFmR3yUGOV6dEjMC0MH7NFtW4-NXo6eeUhCZ3JbHKzWNMKHYg08~IiruoGURhyL1PcSY~phZaTgFvbBsq7DxAE0LJF3UNRglelYEi4dt7GPmHhDSk-LbBkQ6to1ddesbQGtU4m-jfMaaT3ShKm82V0aFOFJoT9ng8chimHLKaxz5qYkZC1JCP158GzA3worP-RIqK9QObZ3gjouw2-9MYaRKhnpuS9CSIbOCoAZaGZskMAlo~KjXAs3-q03rEtEeTW~J3eAeUhU-Xmwt5ruo7KEkOG1Arycn-wCaLsDBkyWbWegXNEqgKj8LcDCD2GFSQyHjKeHg9X6DX3Q__" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CyberGames</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">CyberGames™</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}
export default Footer