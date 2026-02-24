'use client'

import { useState } from 'react'
import { List, Network } from 'lucide-react'
import { Organization } from '@/lib/types'
import SimilarOrgCard from './SimilarOrgCard'
import NetworkGraph from './NetworkGraph'

interface SimilarOrgsTabProps {
  org: Organization
  defaultView?: 'list' | 'network'
}

export default function SimilarOrgsTab({ org, defaultView = 'list' }: SimilarOrgsTabProps) {
  const [viewMode, setViewMode] = useState<'list' | 'network'>(defaultView)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">Similar Organizations</h2>
          </div>
          <p className="text-gray-600 text-sm">
            AI-identified organizations with similar missions, activities, and approaches.
          </p>
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
            List
          </button>
          <button
            onClick={() => setViewMode('network')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'network'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Network className="w-4 h-4" />
            Network
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-4">
          {org.similarOrgs.map((similarOrg) => (
            <SimilarOrgCard key={similarOrg.slug} org={similarOrg} />
          ))}
        </div>
      ) : (
        <NetworkGraph org={org} />
      )}
    </div>
  )
}
