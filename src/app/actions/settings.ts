'use server';

import { cache } from 'react';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const getSetting = cache(async (key: string): Promise<string | null> => {
  const result = await db.settings.findUnique({
    where: { key },
  });
  return result?.value ?? null;
});

export const getSettings = cache(
  async (keys: string[]): Promise<Record<string, string | null>> => {
    if (keys.length === 0) {
      return {};
    }
    const settingsMap = await db.settings.findMany({
      where: { key: { in: keys } },
    });

    const settings: Record<string, string | null> = {};
    keys.forEach((key) => {
      const found = settingsMap.find((s) => s.key === key);
      settings[key] = found?.value ?? null;
    });

    return settings;
  }
);

export async function updateSetting(key: string, value: string | null) {
  await db.settings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath('/');
}
