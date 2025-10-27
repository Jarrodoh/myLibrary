import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET() {
  const prefix = process.env.BLOB_PREFIX || 'legal-docs';
  const { blobs } = await list({ prefix, token: process.env.BLOB_READ_WRITE_TOKEN });
  const files = blobs.map(b => ({ url: b.url, pathname: b.pathname, size: b.size, uploadedAt: b.uploadedAt }));
  return NextResponse.json({ files });
}
