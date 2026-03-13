import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';
import { getUsers } from '@/lib/actions/admin';
import { UsersClient } from './users-client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    return redirect('/unauthorized');
  }

  const response = await getUsers();

  if (!response.success) {
    return (
      <div className="container py-10">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Users</AlertTitle>
          <AlertDescription>
            {response.error || 'There was a problem fetching the user list.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <UsersClient initialUsers={response.data} />;
}
