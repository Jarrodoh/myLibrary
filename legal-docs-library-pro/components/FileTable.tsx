'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BlobItem = { url: string; pathname: string; size: number; uploadedAt?: string };

export default function FileTable({ files, onDelete, onRead }:
  { files: BlobItem[], onDelete: (p:string)=>void, onRead:(p:string)=>void }) {

  return (
    <div className="card overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left border-b p-3">File</th>
            <th className="text-left border-b p-3">Size</th>
            <th className="text-left border-b p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {files.map(f => (
              <motion.tr
                key={f.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="odd:bg-white even:bg-gray-50"
              >
                <td className="p-3 break-all">{f.pathname}</td>
                <td className="p-3">{(f.size/1024).toFixed(1)} KB</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => onRead(f.pathname)} className="btn-outline">Read</button>
                  <a className="btn-outline" href={f.url} target="_blank" rel="noreferrer">Download</a>
                  <button onClick={() => onDelete(f.pathname)} className="btn-outline">Delete</button>
                </td>
              </motion.tr>
            ))}
            {files.length === 0 && (
              <tr><td colSpan={3} className="p-4 text-gray-600">No files yet.</td></tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
