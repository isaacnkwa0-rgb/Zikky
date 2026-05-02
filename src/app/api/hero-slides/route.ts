import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(slides);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const last = await prisma.heroSlide.findFirst({ orderBy: { order: 'desc' } });
  const slide = await prisma.heroSlide.create({
    data: { ...data, order: (last?.order ?? -1) + 1 },
  });
  return NextResponse.json(slide, { status: 201 });
}
