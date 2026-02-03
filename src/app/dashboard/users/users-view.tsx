'use client';

import { useState } from 'react';
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
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import type { User } from '@/generated/client';
import { UserStatus, Role } from '@/generated/client';

interface UsersViewProps {
  users: User[];
  updateUserStatus: (userId: string, status: UserStatus) => Promise<void>;
  updateUserRole: (userId: string, role: Role) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  currentUserRole: Role;
}

export default function UsersView({ users, updateUserStatus, updateUserRole, deleteUser, currentUserRole }: UsersViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => updateUserStatus(user.id, user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE)}>
                    {user.status === UserStatus.ACTIVE ? 'Deactivate' : 'Activate'}
                  </DropdownMenuItem>
                  {currentUserRole === Role.ADMIN && (
                    <>
                      <DropdownMenuItem onClick={() => updateUserRole(user.id, user.role === Role.ADMIN ? Role.USER : Role.ADMIN)}>
                        {user.role === Role.ADMIN ? 'Make User' : 'Make Admin'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteUser(user.id)}>Delete</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
