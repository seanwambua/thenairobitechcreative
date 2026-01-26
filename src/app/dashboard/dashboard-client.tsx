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

function DashboardClientLayout({
  children,
  logoUrl,
}: {
  children: React.ReactNode;
  logoUrl: string | null;
}) {
  const { setOpenMobile, isMobile } = useSidebar();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const pathname = usePathname();

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
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                isActive={pathname.startsWith('/dashboard/settings')}
                tooltip="Settings"
                onClick={handleLinkClick}
              >
                <Link href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/troubleshooting')}
                tooltip="Troubleshooting"
                onClick={handleLinkClick}
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
            {mounted ? (
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
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="h-10 w-10" />
            )}
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
                  <MenubarItem
                    onClick={() => router.push('/dashboard/content')}
                  >
                    Post
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => router.push('/dashboard/projects')}
                  >
                    Project
                  </MenubarItem>
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

export function DashboardClient({
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
