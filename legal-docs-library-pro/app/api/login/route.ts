import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const pass = form.get('passcode');
  if (!process.env.PASSCODE) return new NextResponse('PASSCODE not set', { status: 500 });
  if (pass !== process.env.PASSCODE) return new NextResponse('Unauthorized', { status: 401 });

  const res = new NextResponse('OK', { status: 200 });
  res.cookies.set('passcode', String(pass), { httpOnly: false, sameSite: 'lax', path: '/' });
  return res;
}
