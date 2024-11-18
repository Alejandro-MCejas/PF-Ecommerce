'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
   console.log({ user });
   const usuario = { user }
   console.log(usuario);
   
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
 
  return (
    user && (
      <div className='text-slate-300'>
        <img src={user.picture ?? '/default-profile.png'} alt={user.name ?? 'User'} className='rounded-full' />
        <h2>{user.name ?? 'No Name Available'}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
