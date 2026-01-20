'use client';
import { getSetting } from '@/app/actions/settings';
import { HeaderUI } from './header-ui';
import { useState, useEffect } from 'react';

export function Header() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    getSetting('logo').then(setLogoUrl).catch(console.error);
  }, []);

  return <HeaderUI logoUrl={logoUrl} />;
}
