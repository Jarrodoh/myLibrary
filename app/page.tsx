'use client';

import React from 'react';
import UploadBox from '../components/UploadBox';
import FileTable from '../components/FileTable';
import { motion } from 'framer-motion';

type BlobItem = { url: string; pathname: string; size: number; uploadedAt?: string };

export default function Page() {
  const [files, setFiles] = React.useState<BlobItem[]>([]);

  async function refresh() {
    const res = await fetch('/api/list', { cache: 'no-store' });
    const data = await res.json();
    setFiles(data.files || []);
  }
  React.useEffect(() => { refresh(); }, []);

  async function onDelete(pathname: string) {
    if (!confirm(`Delete ${pathname}?`)) return;
    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ pathname })
    });
    if (res.ok) refresh();
  }

  async function onRead(pathname: string) {
    const res = await fetch('/api/sign', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ pathname })
    });
    if (!res.ok) return alert('Failed to sign URL');
    const data = await res.json();
    const url = new URL('/view', window.location.origin);
    url.searchParams.set('pathname', pathname);
    url.searchParams.set('url', data.url);
    window.location.href = url.toString();
  }

  return (
    <main className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Legal Documents</h1>
        <p className="muted">Upload, read, and manage files you have the right to store.</p>
      </motion.div>

      <UploadBox onUploaded={refresh} />

      <FileTable files={files} onDelete={onDelete} onRead={onRead} />
    </main>
  );
}
