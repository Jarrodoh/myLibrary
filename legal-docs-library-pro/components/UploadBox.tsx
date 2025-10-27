'use client';
import React from 'react';

export default function UploadBox({ onUploaded }: { onUploaded: () => void }) {
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get('file') as File | null;
    if (!file) return;
    setBusy(true); setErr('');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setBusy(false);
    if (!res.ok) { setErr('Upload failed'); return; }
    (e.target as HTMLFormElement).reset();
    onUploaded();
  }

  return (
    <div className="card p-4">
      <form onSubmit={onUpload} className="flex flex-wrap items-center gap-3">
        <input name="file" type="file" required />
        <button className="btn-primary" disabled={busy} type="submit">
          {busy ? 'Uploading…' : 'Upload'}
        </button>
        {err && <span className="text-red-600 text-sm">{err}</span>}
      </form>
    </div>
  );
}
