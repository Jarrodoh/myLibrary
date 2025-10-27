'use client';
import React from 'react';

export default function LoginPage() {
  const [err, setErr] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/login', { method: 'POST', body: fd });
    setBusy(false);
    if (res.ok) {
      const url = new URL(window.location.href);
      const redirect = url.searchParams.get('redirect') || '/';
      window.location.href = redirect;
    } else {
      setErr('Wrong passcode');
    }
  }

  return (
    <main className="card p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-2">Enter Passcode</h1>
      <form onSubmit={onSubmit} className="flex gap-3 items-center">
        <input name="passcode" placeholder="Passcode" className="border rounded px-3 py-2 flex-1" required />
        <button type="submit" disabled={busy} className="btn-primary">{busy ? 'Checking…' : 'Unlock'}</button>
      </form>
      {err && <div className="text-red-600 text-sm mt-2">{err}</div>}
      <p className="muted mt-2 text-sm">Set <code>PASSCODE</code> in your environment variables.</p>
    </main>
  );
}
