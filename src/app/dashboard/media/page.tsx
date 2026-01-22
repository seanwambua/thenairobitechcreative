import { getSettings } from '@/app/actions/settings';
import { MediaClient } from './media-client';

export default async function MediaPage() {
  const settings = await getSettings(['heroImage', 'logo', 'founderImage']);

  return <MediaClient initialSettings={settings} />;
}
