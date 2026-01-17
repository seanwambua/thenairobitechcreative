import { getSetting } from '@/app/actions/settings';
import { HeaderUI } from './header-ui';

export async function Header() {
  const logoUrl = await getSetting('logo');
  return <HeaderUI logoUrl={logoUrl} />;
}
