import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('category');
  const featured = searchParams.get('featured');
  const search = searchParams.get('q');

  const where: Record<string, unknown> = { active: true };
  if (categorySlug) where.category = { slug: categorySlug };
  if (featured === '1') where.featured = true;
  if (search) where.name = { contains: search };

  const rows = await prisma.product.findMany({
    where,
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const count = await prisma.product.count();
  const row = await prisma.product.create({
    data: { ...body, order: body.order ?? count },
    include: { category: { select: { name: true, slug: true } } },
  });
  return NextResponse.json(row, { status: 201 });
}
