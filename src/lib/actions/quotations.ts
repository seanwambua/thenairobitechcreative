'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { QuotationStatus } from '@prisma/client';

export async function createQuotation(data: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const quotation = await prisma.quotation.create({
    data,
  });
  revalidatePath('/dashboard/quotations');
  return quotation;
}

export async function getQuotations() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  return prisma.quotation.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateQuotationStatus(id: number, status: QuotationStatus) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  const quotation = await prisma.quotation.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/dashboard/quotations');
  return quotation;
}

export async function deleteQuotation(id: number) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  await prisma.quotation.delete({
    where: { id },
  });

  revalidatePath('/dashboard/quotations');
}
