'use client';
import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Briefcase,
  LineChart,
  Settings,
  MoreHorizontal,
  LayoutGrid,
  LogOut,
  NotebookText,
  Image as ImageIcon,
  Star,
  Wrench,
  PlusCircle,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useSession, signOut } from 'next-auth/react';
import { Role } from '@/lib/roles';

function DashboardClientLayout({
  children,
  logoUrl,
}: {
  children: React.ReactNode;
  logoUrl: string | null;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
              <Logo logoUrl={logoUrl} />
            </div>
            <span className="hidden font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden md:inline-block">
              NTC
            </span>
            <span className="hidden font-headline text-xl font-semibold lg:inline-block">
              The Nairobi Tech Creative
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            {session?.user?.role === Role.ADMIN && (
              <Link
                href="/dashboard/content"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <NotebookText className="h-4 w-4" />
                <span>Content</span>
              </Link>
            )}
            {session?.user?.role === Role.ADMIN && (
              <Link
                href="/dashboard/media"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Media</span>
              </Link>
            )}
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Briefcase className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link
              href="/dashboard/testimonials"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Star className="h-4 w-4" />
              <span>Testimonials</span>
            </Link>
            {session?.user?.role === Role.ADMIN && (
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            )}
            {session?.user?.role === Role.ADMIN && (
              <Link
                href="/dashboard/users"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            )}
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            {session?.user?.role === Role.ADMIN && (
              <Link
                href="/dashboard/troubleshooting"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Wrench className="h-4 w-4" />
                <span>Troubleshooting</span>
              </Link>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session?.user?.image ?? undefined}
                  alt={session?.user?.name ?? undefined}
                />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{session?.user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <PlusCircle className="mr-2 h-4 w-4" /> New
                </MenubarTrigger>
                <MenubarContent>
                  {session?.user?.role === Role.ADMIN && (
                    <MenubarItem
                      onClick={() => router.push('/dashboard/content')}
                    >
                      Post
                    </MenubarItem>
                  )}
                  {session?.user?.role === Role.ADMIN && (
                    <MenubarItem
                      onClick={() => router.push('/dashboard/projects')}
                    >
                      Project
                    </MenubarItem>
                  )}
                  <MenubarItem
                    onClick={() => router.push('/dashboard/testimonials')}
                  >
                    Testimonial
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </>
  );
}

export default function DashboardClient({
  children,
  logoUrl,
}: {
  children: React.ReactNode;
  logoUrl: string | null;
}) {
  return (
    <SidebarProvider>
      <DashboardClientLayout logoUrl={logoUrl}>
        {children}
      </DashboardClientLayout>
    </SidebarProvider>
  );
}
