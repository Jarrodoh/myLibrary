import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Legal Docs Library',
  description: 'Personal document library for legally-owned files',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="max-w-4xl mx-auto p-4 md:p-6 font-[system-ui]">
        <header className="mb-6">
          <nav className="card flex items-center justify-between p-3 md:p-4">
            <a href="/" className="text-lg md:text-xl font-semibold tracking-tight">📚 Docs Library</a>
            <div className="flex gap-2">
              <a className="btn-outline" href="/">Home</a>
              <a className="btn-outline" href="/login">Lock / Unlock</a>
            </div>
          </nav>
        </header>
        {children}
        <footer className="mt-10 text-center text-xs text-gray-500">
          Use only for legally-owned or public-domain files.
        </footer>
      </body>
    </html>
  );
}
