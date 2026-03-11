import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';
import { getUsers } from '@/lib/actions/admin';
import { UsersClient } from './users-client';

export default async function UsersPage() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }
  const users = await getUsers();
  return <UsersClient initialUsers={users} />;
}
