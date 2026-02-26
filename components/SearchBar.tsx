'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { getAllOrganizations } from '@/data/mockOrgs'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const allOrgs = getAllOrganizations()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allOrgs
      .filter(org =>
        org.name.toLowerCase().includes(q) ||
        org.sector.toLowerCase().includes(q) ||
        org.tagline.toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [query, allOrgs])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(slug: string) {
    setOpen(false)
    setQuery('')
    router.push(`/org/${slug}`)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (results.length > 0) {
      handleSelect(results[0].slug)
    }
  }

  function handleSuggestionClick(suggestion: string) {
    const slug = suggestion.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    router.push(`/org/${slug}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto" ref={containerRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
          <div className="pl-6">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => { if (query.trim()) setOpen(true) }}
            placeholder="Search for an NGO, charity, or nonprofit..."
            className="flex-1 px-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-6 py-3 mr-2 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-full transition-colors"
          >
            Analyze
          </button>
        </div>

        {/* Dropdown */}
        {open && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
            {results.map((org, i) => (
              <button
                key={org.slug}
                type="button"
                onMouseDown={() => handleSelect(org.slug)}
                className={`w-full flex items-center justify-between px-5 py-3 hover:bg-gold-50 transition-colors text-left group ${
                  i !== results.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900 text-sm group-hover:text-gold-700">{org.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{org.sector}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold-500 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </form>

      <p className="text-center mt-4 text-gray-400 text-sm">
        Try:{' '}
        <button onClick={() => handleSuggestionClick('WaterAid')} className="text-gray-300 hover:text-white underline">
          WaterAid
        </button>
        ,{' '}
        <button onClick={() => handleSuggestionClick('Doctors Without Borders')} className="text-gray-300 hover:text-white underline">
          Doctors Without Borders
        </button>
        , or{' '}
        <button onClick={() => handleSuggestionClick('Harlem Childrens Zone')} className="text-gray-300 hover:text-white underline">
          Harlem Children's Zone
        </button>
      </p>
    </div>
  )
}
