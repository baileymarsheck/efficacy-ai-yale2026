'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Network, Shield, ChevronRight, BarChart3, List } from 'lucide-react'
import { Organization } from '@/lib/types'

interface SimilarOrgsSidebarProps {
  org: Organization
  onViewAll: () => void
  onViewNetwork?: () => void
}

export default function SimilarOrgsSidebar({ org, onViewAll, onViewNetwork }: SimilarOrgsSidebarProps) {
  // Show top 4 similar orgs in sidebar
  const topSimilarOrgs = org.similarOrgs.slice(0, 4)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-gold-500" />
          <h3 className="font-semibold text-gray-900">Similar Organizations</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onViewAll}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            title="View list"
          >
            <List className="w-4 h-4" />
          </button>
          {onViewNetwork && (
            <button
              onClick={onViewNetwork}
              className="text-sm text-gold-500 hover:text-gold-600 flex items-center gap-1 bg-gold-50 px-2 py-1 rounded-md"
              title="View network graph"
            >
              <Network className="w-4 h-4" />
              <span className="text-xs font-medium">Network</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {topSimilarOrgs.map((similarOrg) => (
          <div
            key={similarOrg.slug}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-1">
              <Link
                href={`/org/${similarOrg.slug}`}
                className="font-medium text-gray-900 hover:text-gold-500 text-sm"
              >
                {similarOrg.name}
              </Link>
              <span className="text-xs font-semibold text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded-full">
                {similarOrg.matchPercent}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">{similarOrg.sector} · {similarOrg.budget}</p>

            {similarOrg.evidenceBacked ? (
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-700">Evidence-backed</span>
              </div>
            ) : (
              <span className="text-xs text-gray-400">No independent evaluation</span>
            )}

            {similarOrg.keyFinding && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-start gap-1.5">
                  <BarChart3 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {similarOrg.keyFinding.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {org.similarOrgs.length > 4 && (
        <button
          onClick={onViewAll}
          className="w-full mt-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          +{org.similarOrgs.length - 4} more organizations
        </button>
      )}
    </div>
  )
}
