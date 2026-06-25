import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlowChat — Automate Conversations. Grow Your Audience.',
  description: 'Build powerful chat automation for Instagram, WhatsApp, Facebook, TikTok, and more. No code needed. Start free.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{fontFamily:"'Inter', sans-serif"}}>{children}</body>
    </html>
  )
}
