'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture ?? '/default-profile.png'} alt={user.name ?? 'User'} />
        <h2>{user.name ?? 'No Name Available'}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
