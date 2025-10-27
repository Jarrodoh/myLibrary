# Legal Docs Library PRO (Next.js + Vercel Blob)

Mobile-friendly, animated UI with a passcode gate. Upload/list/read/delete files (private in Vercel Blob). Includes PWA + loading screen + scroll progress.

## Quick Start (Local)
1) Create `.env.local`:
```
PASSCODE=your_secret
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
BLOB_PREFIX=legal-docs
```
2) Install & run:
```bash
npm install
npm run dev
```
3) Open http://localhost:3000 and enter your passcode.

## Deploy to Vercel
Set env vars `PASSCODE`, `BLOB_READ_WRITE_TOKEN`, optional `BLOB_PREFIX`. Deploy.

## Legal
For legally-owned/public-domain files only.
