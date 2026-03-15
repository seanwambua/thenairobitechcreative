import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the context type to match Next.js expectations
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // 1. Await the params to satisfy the Promise constraint
    const { id: rawId } = await context.params;
    const id = parseInt(rawId, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Asset ID format' }, { status: 400 });
    }

    const asset = await prisma.asset.findUnique({ where: { id } });

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (error: any) {
    if (error.code === 'P2021') {
      return NextResponse.json({ error: 'Database infrastructure uninitialized' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to fetch asset' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = parseInt(rawId, 10);
    
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const { name, alt, url } = await request.json();
    
    if (!name || !url) {
      return NextResponse.json({ error: 'Name and URL are required' }, { status: 400 });
    }

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: { name, alt, url },
    });

    return NextResponse.json(updatedAsset);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update asset' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = parseInt(rawId, 10);

    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await prisma.asset.delete({ where: { id } });
    
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 });
  }
}