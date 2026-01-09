'use client';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Stamp} from '@/components/stamp';
import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {cn} from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {href: '/#portfolio', label: 'Portfolio'},
    {href: '/blog', label: 'Blog'},
    {href: '/#testimonials', label: 'Testimonials'},
    {href: '/#contact', label: 'Contact'},
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8">
            <Stamp />
          </div>
          <span className="hidden font-headline text-xl font-semibold sm:inline-block">
            The Nairobi Tech Creative
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map(item => (
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
          <Button>Get In Touch</Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
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
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full text-center font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full">Get In Touch</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
