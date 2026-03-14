import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: parseInt(params.id, 10) },
    });
    if (asset) {
      return NextResponse.json(asset);
    } else {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch asset' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, alt, url } = await request.json();
    const updatedAsset = await prisma.asset.update({
      where: { id: parseInt(params.id, 10) },
      data: { name, alt, url },
    });
    return NextResponse.json(updatedAsset);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update asset' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: parseInt(params.id, 10) },
    });

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    await prisma.asset.delete({
      where: { id: parseInt(params.id, 10) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 });
  }
}
