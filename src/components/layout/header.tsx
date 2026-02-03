'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stamp } from '@/components/stamp';
import { LayoutGrid, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { InquirySheet } from '../inquiry-sheet';
import { navLinks } from '@/lib/data';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Role } from '@/generated/client';

export function Header({ logoUrl }: { logoUrl: string | null }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const visibleNavItems = navLinks.filter(() => true);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
            <Stamp logoUrl={logoUrl} />
          </div>
          <span className="font-headline text-xl font-semibold lg:hidden">
            NTC
          </span>
          <span className="hidden font-headline text-xl font-semibold lg:inline-block">
            The Nairobi Tech Creative
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {visibleNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session.user?.image ?? undefined}
                      alt={session.user?.name ?? undefined}
                    />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.user?.role === Role.ADMIN && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn('google')}>Sign In</Button>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div
          className={cn(
            'md:hidden',
            'border-t border-border/40 bg-background/95 backdrop-blur-lg'
          )}
        >
          <nav className="container mx-auto flex flex-col items-center gap-4 px-4 py-8">
            {visibleNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full text-center font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <InquirySheet logoUrl={logoUrl}>
              <Button className="w-full">Get In Touch</Button>
            </InquirySheet>
          </nav>
        </div>
      )}
    </header>
  );
}
