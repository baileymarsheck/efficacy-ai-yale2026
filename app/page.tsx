import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { Compass, GitCompare, ArrowRight, TrendingUp, Shield } from 'lucide-react'
import { getAllOrganizations } from '@/data/mockOrgs'

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

const trendingOrgs = [
  { slug: 'givedirectly', name: 'GiveDirectly', sector: 'Cash Transfers', tagline: 'Direct cash to people in poverty', evidenceBacked: true },
  { slug: 'teach-for-america', name: 'Teach For America', sector: 'Education', tagline: 'Leaders in under-resourced schools', evidenceBacked: true },
  { slug: 'year-up', name: 'Year Up', sector: 'Workforce', tagline: 'Closing the opportunity divide', evidenceBacked: true },
  { slug: 'boys-girls-clubs', name: 'Boys & Girls Clubs', sector: 'Youth Dev', tagline: 'Enabling youth potential', evidenceBacked: true },
  { slug: 'against-malaria-foundation', name: 'Against Malaria', sector: 'Global Health', tagline: 'Bed nets to prevent malaria', evidenceBacked: true },
  { slug: 'harlem-childrens-zone', name: "Harlem Children's Zone", sector: 'Education', tagline: 'Cradle-to-career pipeline', evidenceBacked: true },
]

const previewOrgs = [
  { slug: 'givedirectly', name: 'GiveDirectly', sector: 'Cash Transfers' },
  { slug: 'against-malaria-foundation', name: 'Against Malaria', sector: 'Global Health' },
  { slug: 'teach-for-america', name: 'Teach For America', sector: 'Education' },
]

export default function Home() {
  const allOrgs = getAllOrganizations()

  const topSectors = (() => {
    const counts = new Map<string, number>()
    for (const org of allOrgs) {
      const s = getPrimarySector(org.sector)
      counts.set(s, (counts.get(s) ?? 0) + 1)
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([s]) => s)
      .sort()
  })()

  return (
    <main>
      {/* Hero / Search */}
      <section className="bg-gray-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider text-gray-300 mb-4">
            AI-POWERED NGO INTELLIGENCE
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Make your giving<br />
            <span className="text-gold-500">count for more.</span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Aggregated ratings, comparisons to similar NGOs, financial data, and org impact
            — everything you need to make informed funding decisions.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Explore + Compare panels */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Explore by Sector */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Explore by Sector</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Browse {allOrgs.length} organizations across {topSectors.length}+ impact sectors.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 flex-1">
              {topSectors.map(sector => (
                <Link
                  key={sector}
                  href={`/explore?sector=${encodeURIComponent(sector)}`}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-full hover:border-gold-300 hover:text-gold-600 transition-colors"
                >
                  {sector}
                </Link>
              ))}
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-gold-600 font-semibold text-sm hover:text-gold-700 transition-colors"
            >
              Browse all sectors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Compare Organizations */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Compare Organizations</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Side-by-side analysis of ratings, financials, and impact across up to 4 organizations.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6 flex-1">
              {previewOrgs.map(org => (
                <Link
                  key={org.slug}
                  href={`/compare?org=${org.slug}`}
                  className="group bg-gray-50 rounded-xl border border-gray-100 p-3 hover:border-gold-300 hover:bg-gold-50 transition-colors"
                >
                  <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-gold-700">{org.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{org.sector}</p>
                  <div className="mt-3 h-1.5 bg-gold-100 rounded-full">
                    <div className="h-1.5 bg-gold-400 rounded-full w-4/5" />
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-gold-600 font-semibold text-sm hover:text-gold-700 transition-colors"
            >
              Start comparing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Trending Orgs */}
      <section className="py-12 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gold-500" />
            <h2 className="text-xl font-semibold text-gray-900">Orgs Other Users are Checking Out</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingOrgs.map((org) => (
              <Link
                key={org.slug}
                href={`/org/${org.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-gold-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {org.sector}
                  </span>
                  {org.evidenceBacked && <Shield className="w-3.5 h-3.5 text-green-500" />}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-gold-600 text-sm mb-1">{org.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{org.tagline}</p>
                <div className="mt-3 flex items-center text-xs text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View profile</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
