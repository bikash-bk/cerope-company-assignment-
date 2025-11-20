import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-black text-white border-t pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-4">
          <span className="font-semibold">Cerope</span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          © {new Date().getFullYear()} Cerope — All rights reserved.
        </div>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
