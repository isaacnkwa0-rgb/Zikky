import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const banners = await prisma.promoBanner.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(banners);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const last = await prisma.promoBanner.findFirst({ orderBy: { order: 'desc' } });
  const banner = await prisma.promoBanner.create({
    data: { ...data, order: (last?.order ?? -1) + 1 },
  });
  return NextResponse.json(banner, { status: 201 });
}
