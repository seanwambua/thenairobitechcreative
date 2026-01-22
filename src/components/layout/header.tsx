'use client';
import { HeaderUI } from './header-ui';

export function Header({ logoUrl }: { logoUrl: string | null }) {
  return <HeaderUI logoUrl={logoUrl} />;
}
