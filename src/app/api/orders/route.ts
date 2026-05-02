import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const where = status ? { status } : {};
  const orders = await prisma.order.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { reference, name, email, phone, address, total, items } = body;

  // Verify payment with Paystack
  const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
  const verifyData = await verifyRes.json();

  if (!verifyData.status || verifyData.data?.status !== 'success') {
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 402 });
  }

  const order = await prisma.order.create({
    data: {
      reference,
      name,
      email,
      phone,
      address,
      total,
      status: 'paid',
      paidAt: new Date(),
      items: {
        create: items.map((i: { productId?: number; name: string; price: number; quantity: number; image: string }) => ({
          productId: i.productId ?? null,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}
