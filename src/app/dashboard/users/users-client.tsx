'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ShieldCheck, User as UserIcon, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { updateUserStatus, updateUserRole, deleteUser } from '@/lib/actions/admin';
import { Role, UserStatus, User } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export function UsersClient({ initialUsers }: { initialUsers: User[] | null }) {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    const list = Array.isArray(initialUsers) ? initialUsers : [];
    return list.filter(user => 
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialUsers, search]);

  const pendingUsers = useMemo(() => filteredUsers.filter(u => u.status === 'PENDING'), [filteredUsers]);

  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      const res = await action();
      if (res.success) {
        toast({ title: 'Success', description: successMsg });
        router.refresh();
      } else {
        toast({ variant: 'destructive', title: 'Error', description: res.error });
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Action failed.' });
    }
  };

  const UserTable = ({ users }: { users: User[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === Role.ADMIN ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'APPROVED' ? 'outline' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Manage Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleAction(() => updateUserStatus(user.id, UserStatus.APPROVED), 'User approved.')}>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(() => updateUserStatus(user.id, UserStatus.REJECTED), 'User rejected.')}>
                        <XCircle className="mr-2 h-4 w-4 text-red-500" /> Reject
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleAction(() => updateUserRole(user.id, user.role === Role.ADMIN ? Role.USER : Role.ADMIN), 'Role updated.')}>
                        {user.role === Role.ADMIN ? <UserIcon className="mr-2 h-4 w-4" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                        Set as {user.role === Role.ADMIN ? 'User' : 'Admin'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleAction(() => deleteUser(user.id), 'User deleted.')}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <div className="w-full max-w-sm">
          <Input 
            placeholder="Search by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All Users ({filteredUsers.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Approval ({pendingUsers.length})
            {pendingUsers.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {pendingUsers.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <UserTable users={filteredUsers} />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <UserTable users={pendingUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
