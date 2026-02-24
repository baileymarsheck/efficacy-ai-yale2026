import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'EfficacyAI - AI-Powered NGO Intelligence',
  description: 'Understand any nonprofit\'s true efficacy with aggregated ratings, financial data, impact evaluations, and AI-driven comparisons.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  )
}
