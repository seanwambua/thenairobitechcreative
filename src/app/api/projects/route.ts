import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    // Convert keyFeatures from string to array
    const formattedProjects = projects.map(p => ({
        ...p,
        keyFeatures: p.keyFeatures.split(',').map(s => s.trim())
    }));
    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
