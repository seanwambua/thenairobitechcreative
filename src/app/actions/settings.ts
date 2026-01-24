'use server';

import { cache } from 'react';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const getSetting = cache(async (key: string): Promise<string | null> => {
  const result = await prisma.settings.findUnique({
    where: { key },
  });
  return result?.value ?? null;
});

export const getSettings = cache(
  async (keys: string[]): Promise<Record<string, string | null>> => {
    if (keys.length === 0) {
      return {};
    }
    const settingsMap = await prisma.settings.findMany({
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
  await prisma.settings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  // Revalidate all paths that might use settings
  revalidatePath('/', 'layout');
  revalidatePath('/dashboard', 'layout');
}

export async function updateSettings(data: Record<string, string | null>) {
  const transactions = Object.entries(data).map(([key, value]) =>
    prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value: value ?? '' },
    })
  );

  await prisma.$transaction(transactions);

  revalidatePath('/', 'layout');
  revalidatePath('/dashboard', 'layout');
  revalidatePath('/services');
}
