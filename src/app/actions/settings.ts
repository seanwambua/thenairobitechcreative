'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSetting(key: string): Promise<string | null> {
    const result = await prisma.settings.findUnique({
        where: { key },
    });
    return result?.value ?? null;
}

export async function getSettings(keys: string[]): Promise<Record<string, string | null>> {
    if (keys.length === 0) {
        return {};
    }
    const settingsMap = await prisma.settings.findMany({
        where: { key: { in: keys } },
    });

    const settings: Record<string, string | null> = {};
    keys.forEach(key => {
        const found = settingsMap.find(s => s.key === key);
        settings[key] = found?.value ?? null;
    });

    return settings;
}

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
