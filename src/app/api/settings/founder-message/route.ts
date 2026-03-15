import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: 'founder-message' },
    });
    return NextResponse.json(setting || { value: '' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch setting' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { value } = await request.json();
    const updatedSetting = await prisma.settings.upsert({
      where: { key: 'founder-message' },
      update: { value },
      create: { key: 'founder-message', value },
    });
    return NextResponse.json(updatedSetting);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}
