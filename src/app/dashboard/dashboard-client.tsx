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
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { placeholderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { DbUninitializedError } from '@/components/db-uninitialized-error';

export function DashboardClient({
  children,
  logoUrl,
  founderImage,
}: {
  children: React.ReactNode;
  logoUrl: string | null;
  founderImage: string | null;
}) {

  const pathname = usePathname();
  
  const founderInfo = placeholderImages.founder;
  const founderInitials = founderInfo.imageHint
    .split(' ')
    .map((n) => n[0])
    .join('');
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
              <Logo logoUrl={logoUrl} />
            </div>
            <span className="hidden font-headline text-xl font-semibold lg:inline-block group-data-[collapsible=icon]:hidden">
              NTC
            </span>
            <span className="hidden font-headline text-xl font-semibold lg:inline-block">
              The Nairobi Tech Creative
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutGrid />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/content')}
                tooltip="Content"
              >
                <Link href="/dashboard/content">
                  <NotebookText />
                  <span>Content</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/media')}
                tooltip="Media"
              >
                <Link href="/dashboard/media">
                  <ImageIcon />
                  <span>Media</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/projects')}
                tooltip="Projects"
              >
                <Link href="/dashboard/projects">
                  <Briefcase />
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/testimonials')}
                tooltip="Testimonials"
              >
                <Link href="/dashboard/testimonials">
                  <Star />
                  <span>Testimonials</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/analytics')}
                tooltip="Analytics"
              >
                <Link href="/dashboard/analytics">
                  <LineChart />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/troubleshooting')}
                tooltip="Troubleshooting"
              >
                <Link href="/dashboard/troubleshooting">
                  <Wrench />
                  <span>Troubleshooting</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
              <Avatar className="h-10 w-10">
                 <AvatarImage src={founderImage ?? undefined} alt={founderInfo.imageHint} />
                 <AvatarFallback>
                  {founderInitials}
                 </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{founderInfo.imageHint}</p>
                <p className="text-sm text-muted-foreground">Admin</p>
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
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
