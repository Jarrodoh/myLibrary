import { getDownloadUrl } from '@vercel/blob';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function POST(req: Request) {
  const { pathname } = await req.json();
  if (!pathname) return new NextResponse('Missing pathname', { status: 400 });
  const { url } = await getDownloadUrl(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN, expiresIn: '10m' });
  return NextResponse.json({ url });
}
