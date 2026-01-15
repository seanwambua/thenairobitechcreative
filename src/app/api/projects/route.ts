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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { keyFeatures, ...rest } = data;
    const newProject = await prisma.project.create({
      data: {
        ...rest,
        keyFeatures: keyFeatures.join(','),
      },
    });
     const formattedProject = {
        ...newProject,
        keyFeatures: newProject.keyFeatures.split(',').map(s => s.trim())
    };
    return NextResponse.json(formattedProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
