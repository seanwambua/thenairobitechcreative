import { getSetting } from '@/app/actions/settings';
import { FooterUI } from './footer-ui';

export async function Footer() {
  const logoUrl = await getSetting('logo');
  return <FooterUI logoUrl={logoUrl} />;
}
