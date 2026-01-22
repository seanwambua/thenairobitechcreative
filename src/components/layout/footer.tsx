'use client';
import { FooterUI } from './footer-ui';

export function Footer({ logoUrl }: { logoUrl: string | null }) {
  return <FooterUI logoUrl={logoUrl} />;
}
