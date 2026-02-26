'use client'

import { useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Compass, Shield, ArrowRight } from 'lucide-react'
import { getAllOrganizations } from '@/data/mockOrgs'
import type { Organization } from '@/lib/types'

// ── Sector normalization ─────────────────────────────────────────────────────

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

// ── OrgCard ──────────────────────────────────────────────────────────────────

function OrgCard({ org }: { org: Organization }) {
  const hasRigorous = org.impactFindings.some(f => f.type === 'rigorous')

  return (
    <Link
      href={`/org/${org.slug}`}
      className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-gold-300 hover:shadow-md transition-all flex flex-col"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          {getPrimarySector(org.sector)}
        </span>
        {hasRigorous && <Shield className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-gold-600 text-sm mb-1 transition-colors">
        {org.name}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 flex-1">{org.tagline}</p>
      <p className="text-xs text-gray-400 mt-2">{org.budget}</p>
      <div className="mt-3 flex items-center text-xs text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View profile</span>
        <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

function ExploreContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const allOrgs = getAllOrganizations()

  const { sectors, topSectorSet } = useMemo(() => {
    const counts = new Map<string, number>()
    for (const org of allOrgs) {
      const s = getPrimarySector(org.sector)
      counts.set(s, (counts.get(s) ?? 0) + 1)
    }
    const top10 = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([s]) => s)
      .sort()
    return {
      sectors: ['All', ...top10, 'Other'],
      topSectorSet: new Set(top10),
    }
  }, [allOrgs])

  const paramSector = searchParams.get('sector') ?? 'All'
  const selectedSector = sectors.includes(paramSector)
    ? paramSector
    : paramSector !== 'All'
      ? 'Other'
      : 'All'

  function selectSector(sector: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (sector === 'All') {
      params.delete('sector')
    } else {
      params.set('sector', sector)
    }
    router.replace(`/explore?${params.toString()}`)
  }

  const filteredOrgs = useMemo(() => {
    if (selectedSector === 'All') return allOrgs
    if (selectedSector === 'Other') return allOrgs.filter(org => !topSectorSet.has(getPrimarySector(org.sector)))
    return allOrgs.filter(org => getPrimarySector(org.sector) === selectedSector)
  }, [allOrgs, selectedSector, topSectorSet])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center">
          <Compass className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Organizations</h1>
          <p className="text-gray-500 text-sm">Browse {allOrgs.length} organizations by sector</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {sectors.map(sector => (
          <button
            key={sector}
            onClick={() => selectSector(sector)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedSector === sector
                ? 'bg-gold-500 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gold-300 hover:text-gold-600'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-4">
        {filteredOrgs.length} organization{filteredOrgs.length !== 1 ? 's' : ''}
        {selectedSector !== 'All' ? ` in ${selectedSector}` : ''}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredOrgs.map(org => (
          <OrgCard key={org.slug} org={org} />
        ))}
      </div>
    </main>
  )
}

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreContent />
    </Suspense>
  )
}
