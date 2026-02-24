'use client'

import { FileText, ChevronRight, AlertCircle } from 'lucide-react'
import { Organization, ImpactFinding } from '@/lib/types'

interface ImpactSidebarProps {
  org: Organization
  onViewAll: () => void
}

const typeConfig = {
  rigorous: {
    badge: 'bg-green-100 text-green-800 border-green-200',
    label: 'Rigorous',
    dot: 'bg-green-500',
  },
  funder: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Funder',
    dot: 'bg-blue-500',
  },
  'self-reported': {
    badge: 'bg-gray-100 text-gray-600 border-gray-200',
    label: 'Self-reported',
    dot: 'bg-gray-400',
  },
}

export default function ImpactSidebar({ org, onViewAll }: ImpactSidebarProps) {
  // Count by type
  const rigorousCount = org.impactFindings.filter(f => f.type === 'rigorous').length
  const funderCount = org.impactFindings.filter(f => f.type === 'funder').length
  const selfReportedCount = org.impactFindings.filter(f => f.type === 'self-reported').length

  // Show top 3 findings, prioritizing rigorous
  const sortedFindings = [...org.impactFindings].sort((a, b) => {
    const order = { rigorous: 0, funder: 1, 'self-reported': 2 }
    return order[a.type] - order[b.type]
  })
  const topFindings = sortedFindings.slice(0, 3)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gold-500" />
          <h3 className="font-semibold text-gray-900">Impact Evidence</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm text-gold-500 hover:text-gold-600 flex items-center gap-1"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Evidence summary bar */}
      <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        {rigorousCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">{rigorousCount} RCT/Rigorous</span>
          </div>
        )}
        {funderCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">{funderCount} Funder</span>
          </div>
        )}
        {selfReportedCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-600">{selfReportedCount} Self-reported</span>
          </div>
        )}
      </div>

      {/* Top findings */}
      <div className="space-y-3">
        {topFindings.map((finding, index) => {
          const config = typeConfig[finding.type]
          return (
            <div key={index} className="border-l-2 pl-3" style={{ borderColor: config.dot === 'bg-green-500' ? '#22c55e' : config.dot === 'bg-blue-500' ? '#3b82f6' : '#9ca3af' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded border ${config.badge}`}>
                  {config.label}
                </span>
                <span className="text-xs text-gray-400">{finding.year}</span>
              </div>
              <p className="text-xs text-gray-700 line-clamp-2">{finding.summary}</p>
              <p className="text-xs text-gray-400 mt-1">{finding.source}</p>
            </div>
          )
        })}
      </div>

      {org.impactFindings.length > 3 && (
        <button
          onClick={onViewAll}
          className="w-full mt-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          +{org.impactFindings.length - 3} more findings
        </button>
      )}

      {/* Disclaimer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>AI-summarized from public sources. See full evaluations for methodology.</span>
        </div>
      </div>
    </div>
  )
}
