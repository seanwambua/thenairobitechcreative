'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { getSetting } from '@/lib/actions/settings';
import { Role } from '@/lib/roles';
import { useMediaQuery } from '@/hooks/use-media-query';

import {
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarInset,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';

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
  ClipboardList,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutGrid, exact: true },
  { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart, adminOnly: true },
  { href: '/dashboard/content', label: 'Blog Posts', icon: NotebookText, adminOnly: true },
  { href: '/dashboard/projects', label: 'Projects', icon: Briefcase, adminOnly: true },
  { href: '/dashboard/testimonials', label: 'Testimonials', icon: Star },
  { href: '/dashboard/quotations', label: 'Inquiries', icon: ClipboardList, adminOnly: true },
  { href: '/dashboard/media', label: 'Site Assets', icon: ImageIcon, adminOnly: true },
  { href: '/dashboard/users', label: 'User Management', icon: Users, adminOnly: true },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/troubleshooting', label: 'System Health', icon: Wrench, adminOnly: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [logoUrl, setLogoUrl] = React.useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const pathSegments = pathname.split('/').filter(Boolean);

  const handleNavigation = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
  };

  React.useEffect(() => {
    getSetting('logo').then(url => setLogoUrl(url));
  }, []);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar
        collapsible="icon"
        variant="inset"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarHeader className="pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <Logo logoUrl={logoUrl} />
            </div>
            <span className="truncate font-headline text-lg font-semibold group-data-[collapsible=icon]:hidden">
              NTC
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu>
            {navItems.map((item) => {
              if (item.adminOnly && session?.user?.role !== Role.ADMIN) return null;
              
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <SidebarMenuItem key={item.href} onClick={handleNavigation}>
                  <SidebarMenuButton asChild tooltip={item.label} isActive={isActive}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? ''} />
                      <AvatarFallback className="rounded-lg">{session?.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold">{session?.user?.name}</span>
                      <span className="truncate text-xs">{session?.user?.email}</span>
                    </div>
                    <MoreHorizontal className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56" side="right" align="end">
                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                     </Link>
                   </DropdownMenuItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={handleSignOut}>
                     <LogOut className="mr-2 h-4 w-4" /> Log out
                   </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                  const isLast = index === pathSegments.length - 1;
                  const label = segment.charAt(0).toUpperCase() + segment.slice(1);

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Menubar className="border-none bg-transparent shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                  <PlusCircle className="mr-2 h-4 w-4" /> New
                </MenubarTrigger>
                <MenubarContent>
                  {session?.user?.role === Role.ADMIN && (
                    <>
                      <MenubarItem onClick={() => router.push('/dashboard/content')}>Post</MenubarItem>
                      <MenubarItem onClick={() => router.push('/dashboard/projects')}>Project</MenubarItem>
                    </>
                  )}
                  <MenubarItem onClick={() => router.push('/dashboard/testimonials')}>Testimonial</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
