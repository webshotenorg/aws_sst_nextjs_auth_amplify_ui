'use client';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';

function Home({ user }: { user?: { username?: string } }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Sign Out
      </button>
    </main>
  );
}

export default withAuthenticator(Home);
