import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const row = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: { select: { name: true, slug: true } } },
  });
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}
