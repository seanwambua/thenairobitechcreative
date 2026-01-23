import { getSettings } from '@/app/actions/settings';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SettingsClient } from './settings-client';

export default async function SettingsPage() {
  const settings = await getSettings(['founderName', 'founderMessage']);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>
          Manage general site settings and content.
        </CardDescription>
      </CardHeader>
      <SettingsClient initialSettings={settings} />
    </Card>
  );
}
