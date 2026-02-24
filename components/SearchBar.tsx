'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Convert query to slug format for URL
      const slug = query.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      router.push(`/org/${slug}`)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    const slug = suggestion.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    router.push(`/org/${slug}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
          <div className="pl-6">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an NGO, charity, or nonprofit..."
            className="flex-1 px-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 mr-2 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-full transition-colors"
          >
            Analyze
          </button>
        </div>
      </form>

      <p className="text-center mt-4 text-gray-400 text-sm">
        Try:{' '}
        <button
          onClick={() => handleSuggestionClick('WaterAid')}
          className="text-gray-300 hover:text-white underline"
        >
          WaterAid
        </button>
        ,{' '}
        <button
          onClick={() => handleSuggestionClick('Doctors Without Borders')}
          className="text-gray-300 hover:text-white underline"
        >
          Doctors Without Borders
        </button>
        , or{' '}
        <button
          onClick={() => handleSuggestionClick('Harlem Childrens Zone')}
          className="text-gray-300 hover:text-white underline"
        >
          Harlem Children's Zone
        </button>
      </p>
    </div>
  )
}
