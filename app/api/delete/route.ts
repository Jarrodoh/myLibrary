import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function POST(req: Request) {
  const { pathname } = await req.json();
  if (!pathname) return new NextResponse('Missing pathname', { status: 400 });
  await del(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN });
  return NextResponse.json({ ok: true });
}
