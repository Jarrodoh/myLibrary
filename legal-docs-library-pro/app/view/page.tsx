'use client';

import React from 'react';

function useQuery() {
  const [params, setParams] = React.useState(() => new URLSearchParams(window.location.search));
  React.useEffect(() => {
    const onPop = () => setParams(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return params;
}

export default function Viewer() {
  const qs = useQuery();
  const url = qs.get('url') || '';
  const pathname = qs.get('pathname') || '';
  const key = `progress:${pathname}`;
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem(key);
    const pct = saved ? parseFloat(saved) : 0;
    const el = containerRef.current;
    if (!el) return;
    const doRestore = () => {
      const max = el.scrollHeight - el.clientHeight;
      el.scrollTop = max * pct;
    };
    setTimeout(doRestore, 100);
  }, [key]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let t: any;
    const onScroll = () => {
      if (t) cancelAnimationFrame(t);
      t = requestAnimationFrame(() => {
        const max = el.scrollHeight - el.clientHeight;
        const pct = max > 0 ? el.scrollTop / max : 0;
        localStorage.setItem(key, String(pct));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [key]);

  if (!url) return <main><p className="text-red-600">Missing file URL.</p></main>;

  return (
    <main className="h-[calc(100vh-140px)] flex flex-col card p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <a href="/" className="text-blue-600 hover:underline">← Back</a>
          <span className="text-gray-700 break-all">{pathname}</span>
        </div>
        <a href={url} target="_blank" className="text-blue-600 hover:underline">Open in new tab</a>
      </div>
      <div ref={containerRef} className="flex-1 overflow-auto border rounded">
        <iframe src={url} className="w-full h-full" title="Document viewer"></iframe>
      </div>
      <p className="text-xs text-gray-500 mt-2">Progress auto-saves on scroll (device-specific).</p>
    </main>
  );
}
