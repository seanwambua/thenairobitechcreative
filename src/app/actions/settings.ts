'use server';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getSetting(key: string): Promise<string | null> {
    const result = await db.query.settings.findFirst({
        where: eq(schema.settings.key, key),
    });
    return result?.value ?? null;
}

export async function getSettings(keys: string[]): Promise<Record<string, string | null>> {
    if (keys.length === 0) {
        return {};
    }
    const settingsMap = await db.query.settings.findMany({
        where: (settings, { inArray }) => inArray(settings.key, keys),
    });

    const settings: Record<string, string | null> = {};
    keys.forEach(key => {
        const found = settingsMap.find(s => s.key === key);
        settings[key] = found?.value ?? null;
    });

    return settings;
}

export async function updateSetting(key: string, value: string | null) {
    await db.insert(schema.settings)
        .values({ key, value })
        .onConflictDoUpdate({
            target: schema.settings.key,
            set: { value },
        });

    // Revalidate all paths that might use settings
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
}
