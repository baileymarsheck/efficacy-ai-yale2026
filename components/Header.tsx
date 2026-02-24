'use client'

import Link from 'next/link'
import { Sparkles, GitCompare } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">
              Efficacy<span className="text-gold-500">AI</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/methodology"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Methodology
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
