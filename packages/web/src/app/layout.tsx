'use client';

import { initAmplifyAuthentication } from '@/components/auth/authenticator-wrapper';
import type React from 'react';
import './globals.css';

initAmplifyAuthentication();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="flex justify-center items-center min-h-screen py-8 px-4">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </body>
    </html>
  );
}
