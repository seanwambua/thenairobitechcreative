'use client';
import { Logo } from './logo';

export function Stamp({ logoUrl }: { logoUrl: string | null }) {
  return <Logo logoUrl={logoUrl} />;
}
