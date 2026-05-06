import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    await prisma.subscriber.create({ data: { email: email.toLowerCase().trim() } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const isUnique = err instanceof Error && err.message.includes('Unique constraint');
    if (isUnique) return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
