import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import '@/styles/index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Kuriftu Resorts — AI Resort Intelligence for Ethiopia',
  description:
    'Kuriftu Resorts gives Ethiopian resort operators AI-powered pricing, demand forecasting, and personalized guest experiences — built for low-data environments.',
  icons: {
    icon: [{ url: '/assets/images/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'Kuriftu Resorts — AI Resort Intelligence',
    description: 'AI-powered pricing, forecasting & guest experiences for Ethiopian resorts.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fresortiq5413back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
