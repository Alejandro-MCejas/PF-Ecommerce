'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      console.log('Usuario cargado:', user);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) return <div>No user data</div>;

  return (
    <div className='text-slate-300'>
      <img src={user.picture ?? '/default-profile.png'} alt={user.name ?? 'User'} className='rounded-full' />
      <h2>{user.name ?? 'No Name Available'}</h2>
      <p>{user.email}</p>
    </div>
  );
}
