import { BarChart3, Shield } from 'lucide-react'
import Link from 'next/link'
import { SimilarOrg } from '@/lib/types'

interface SimilarOrgCardProps {
  org: SimilarOrg
}

export default function SimilarOrgCard({ org }: SimilarOrgCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Link href={`/org/${org.slug}`} className="text-lg font-semibold text-gray-900 hover:text-gold-500">
              {org.name}
            </Link>
            {org.evidenceBacked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                <Shield className="w-3 h-3" />
                Evidence-backed
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {org.sector} · Budget: {org.budget}
          </p>
        </div>
        <span className="text-lg font-semibold text-gold-500">{org.matchPercent}% match</span>
      </div>

      <p className="text-gray-600 mb-4">{org.tagline}</p>

      {org.keyFinding ? (
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Key Finding</span>
          </div>
          <p className="text-sm text-gray-700">{org.keyFinding.text}</p>
          <p className="text-xs text-gray-500 mt-2">Source: {org.keyFinding.source}</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600">No independent studies found</p>
          <p className="text-sm text-gray-500 mt-1">
            No independent impact evaluations found. Self-reported monitoring data available via annual reports.
          </p>
        </div>
      )}
    </div>
  )
}
