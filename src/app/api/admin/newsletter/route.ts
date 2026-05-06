import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendMail } from '@/lib/mailer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(subscribers);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { subject, html } = await req.json();
    if (!subject || !html) return NextResponse.json({ error: 'Subject and body required' }, { status: 400 });

    const subscribers = await prisma.subscriber.findMany();
    if (subscribers.length === 0) return NextResponse.json({ error: 'No subscribers' }, { status: 400 });

    const emails = subscribers.map(s => s.email);
    await sendMail({ to: emails, subject, html });

    return NextResponse.json({ success: true, sent: emails.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[NEWSLETTER ERROR]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
