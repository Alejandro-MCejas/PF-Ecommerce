"use client"
import React from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import teamMembers from '@/helpers/teamMembers.helper';
import IMember from '@/interfaces/IMember';
 
const TeamMembers = () => {
    const team: IMember[] = teamMembers;

    return (
        <div className='bg-primaryColor pb-6'>
            <div className='text-white max-w-[1500px] mx-auto flex flex-col items-center text-center mb-6 px-8'>
                <h1 className='text-4xl font-bold py-8'>Our Team of Programmers</h1>
                <p>We are a group of students passionate about programming and software development. Our goal is to create innovative and effective solutions that address current challenges in the technological field. Each member brings their unique skills and creativity to contribute to the success of our projects.</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-6'>
                {
                    team.map((member) => (
                        <div key={member.id} className='w-[200px] h-[200px]  md:w-[300px] md:h-auto bg-white flex flex-col items-center p-8 rounded-2xl relative group hover:scale-105'>
                            <div className='bg-tertiaryColor w-20 h-20 absolute rounded-full top-15 left-10 opacity-0 group-hover:opacity-100'></div>
                            <div className=' w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden mx-auto z-10'>
                                <img 
                                    src={member.image} 
                                    alt={`Foto perfil de ${member.name}`} 
                                    className='w-[100px] h-[100xp] md:h-full md:w-full object-cover'
                                    onError={(e) => { e.currentTarget.src = '/path/to/default/image.jpg'; }} // Cambia la ruta a la imagen por defecto
                                />
                            </div>
                            <h2 className='text-[10px] md:text-2xl font-bold'>{member.name}</h2>
                            <p className='text-[10px]'>{member.profession}</p>
                            <div className='flex gap-4 mt-2'>
                                <Link href={member.linkFacebook} target="_blank" className="size-[20px] hover:text-blue-500 text-gray-300">
                                    <i className="fab fa-facebook fa-2x"></i>
                                </Link>
                                <Link href={member.linkGitHub} target="_blank" className="size-[20px] hover:text-black text-gray-300">
                                    <i className="fab fa-github fa-2x"></i>
                                </Link>
                                <Link href={member.linkLinkedIn} target="_blank" className="size-[20px] hover:text-blue-800 text-gray-300">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TeamMembers;
