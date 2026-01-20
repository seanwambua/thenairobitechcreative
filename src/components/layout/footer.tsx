'use client';
import { getSetting } from '@/app/actions/settings';
import { FooterUI } from './footer-ui';
import { useState, useEffect } from 'react';

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    getSetting('logo').then(setLogoUrl).catch(console.error);
  }, []);

  return <FooterUI logoUrl={logoUrl} />;
}
