import Link from 'next/link'
import { FileText, Globe, Users } from 'lucide-react'
import { Organization } from '@/lib/types'

const SECTOR_ALIASES: Record<string, string> = {
  'Water, Sanitation & Hygiene (WASH)': 'WASH',
  'Global Health & Humanitarian': 'Global Health',
  'Agricultural Development': 'Agriculture',
  'Youth Mentoring': 'Youth Development',
  'Youth-Led Development': 'Youth Development',
}

function getPrimarySector(raw: string): string {
  if (SECTOR_ALIASES[raw]) return SECTOR_ALIASES[raw]
  const primary = raw.split(' / ')[0].trim()
  return SECTOR_ALIASES[primary] ?? primary
}

interface OrgHeaderProps {
  org: Organization
}

export default function OrgHeader({ org }: OrgHeaderProps) {
  const hasBadges = org.lmicBased || org.communityLed

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{org.name}</h1>
            <p className="text-gray-600 mt-1">{org.tagline}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link
                href={`/explore?sector=${encodeURIComponent(getPrimarySector(org.sector))}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gold-50 hover:text-gold-700 transition-colors"
              >
                {org.sector}
              </Link>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                Founded {org.founded}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {org.location}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                EIN: {org.ein}
              </span>
            </div>
          </div>
        </div>

        {hasBadges && (
          <div className="flex flex-col gap-2 flex-shrink-0">
            {org.lmicBased && (
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-teal-600 text-white rounded-lg shadow-md">
                <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-teal-100">Recognition</div>
                  <div className="text-sm font-bold leading-tight">LMIC-Based</div>
                </div>
              </div>
            )}
            {org.communityLed && (
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-purple-600 text-white rounded-lg shadow-md">
                <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-purple-100">Recognition</div>
                  <div className="text-sm font-bold leading-tight">Community-Led</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}
