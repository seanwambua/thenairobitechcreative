import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/generated/client';
import {
  getUsers,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from '@/app/actions/admin';
import UsersView from './users-view';

export default async function UsersPage() {
  const session = await auth();
  const currentUserRole = session?.user?.role;

  if (currentUserRole !== Role.ADMIN) {
    redirect('/unauthorized');
  }

  const users = await getUsers();

  return (
    <UsersView
      users={users}
      updateUserStatus={updateUserStatus}
      updateUserRole={updateUserRole}
      deleteUser={deleteUser}
      currentUserRole={currentUserRole}
    />
  );
}
