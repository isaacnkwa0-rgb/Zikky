import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const count = await prisma.category.count();
    const cats = await prisma.category.findMany({ take: 3 });
    return NextResponse.json({ ok: true, categoryCount: count, sample: cats });
  } catch (err: unknown) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
