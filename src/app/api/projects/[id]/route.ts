import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const data = await request.json();
    const { keyFeatures, ...rest } = data;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...rest,
        keyFeatures: keyFeatures.join(','),
      },
    });

    const formattedProject = {
        ...updatedProject,
        keyFeatures: updatedProject.keyFeatures.split(',').map(s => s.trim())
    };

    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.project.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
