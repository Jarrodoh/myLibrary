import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return new NextResponse('No file', { status: 400 });

  const prefix = process.env.BLOB_PREFIX || 'legal-docs';
  const pathname = `${prefix}/${Date.now()}-${file.name}`;

  const { url } = await put(pathname, file, {
    access: 'private',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ ok: true, url, pathname });
}
