import { FileText, ExternalLink, AlertCircle, ChevronRight } from 'lucide-react'
import { Organization } from '@/lib/types'

interface OverviewTabProps {
  org: Organization
  onViewAllImpact?: () => void
}

const typeConfig = {
  rigorous: {
    badge: 'bg-green-100 text-green-800 border-green-200',
    label: 'Rigorous',
    borderColor: '#22c55e',
  },
  funder: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Funder',
    borderColor: '#3b82f6',
  },
  'self-reported': {
    badge: 'bg-gray-100 text-gray-600 border-gray-200',
    label: 'Self-reported',
    borderColor: '#9ca3af',
  },
}

export default function OverviewTab({ org, onViewAllImpact }: OverviewTabProps) {
  // Count findings by type
  const rigorousCount = org.impactFindings.filter(f => f.type === 'rigorous').length
  const funderCount = org.impactFindings.filter(f => f.type === 'funder').length
  const selfReportedCount = org.impactFindings.filter(f => f.type === 'self-reported').length

  // Get top findings for horizontal display (prioritize rigorous)
  const sortedFindings = [...org.impactFindings].sort((a, b) => {
    const order = { rigorous: 0, funder: 1, 'self-reported': 2 }
    return order[a.type] - order[b.type]
  })
  const topFindings = sortedFindings.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Mission Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Mission</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">{org.mission}</p>
      </div>

      {/* Quick Facts + Ratings Combined */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Snapshot</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Ratings */}
          <div className="bg-gold-50 rounded-xl p-4 text-center border border-gold-100">
            <p className="text-xs text-gray-500 mb-1">CharityWatch</p>
            <p className="text-2xl font-bold text-gray-900">{org.ratings.charityWatch}</p>
            <p className="text-xs text-gray-400">out of A+</p>
          </div>
          <div className="bg-gold-50 rounded-xl p-4 text-center border border-gold-100">
            <p className="text-xs text-gray-500 mb-1">Charity Navigator</p>
            <p className="text-2xl font-bold text-gray-900">{org.ratings.charityNavigator}</p>
            <p className="text-xs text-gray-400">out of 100</p>
          </div>

          {/* Key Facts */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Annual Budget</p>
            <p className="text-xl font-bold text-gray-900">{org.budget}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Employees</p>
            <p className="text-xl font-bold text-gray-900">{org.employees.toLocaleString()}</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">GiveWell</p>
            <p className="text-sm font-semibold text-gray-900">{org.ratings.giveWell}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">BBB Wise Giving</p>
            <p className="text-sm font-semibold text-gray-900">{org.ratings.bbbWiseGiving}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">CEO</p>
            <p className="text-sm font-semibold text-gray-900">{org.ceo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Website</p>
            <a
              href={`https://${org.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gold-500 hover:text-gold-600 inline-flex items-center gap-1"
            >
              {org.website}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Impact Evidence - Horizontal Layout */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">Impact Evidence</h2>
          </div>
          {onViewAllImpact && (
            <button
              onClick={onViewAllImpact}
              className="text-sm text-gold-500 hover:text-gold-600 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Evidence summary bar */}
        <div className="flex items-center gap-4 mb-5 p-3 bg-gray-50 rounded-lg">
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

        {/* Horizontal findings grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topFindings.map((finding, index) => {
            const config = typeConfig[finding.type]
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border-l-4"
                style={{ borderLeftColor: config.borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded border ${config.badge}`}>
                    {config.label}
                  </span>
                  <span className="text-xs text-gray-400">{finding.year}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3 mb-2">{finding.summary}</p>
                <p className="text-xs text-gray-400">{finding.source}</p>
              </div>
            )
          })}
        </div>

        {org.impactFindings.length > 3 && onViewAllImpact && (
          <button
            onClick={onViewAllImpact}
            className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
    </div>
  )
}
