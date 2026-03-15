import { getSetting } from '@/lib/actions/settings';
import { FooterUI } from './footer-ui';

export async function Footer() {
  const logoUrl = await getSetting('logo');
  return <FooterUI logoUrl={logoUrl} />;
}
