'use client';

import { User } from '@prisma/client';

export function UsersClient({ users }: { users: User[] }) {
  return (
    <div>
      <h1>Users</h1>
      {/* We will build out the user management UI here */}
    </div>
  );
}
