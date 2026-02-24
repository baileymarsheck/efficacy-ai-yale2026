import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import FeatureCard from '@/components/FeatureCard'
import { CheckCircle, Users, FileSearch, BarChart3, TrendingUp, Shield, ArrowRight } from 'lucide-react'

const trendingOrgs = [
  {
    slug: 'givedirectly',
    name: 'GiveDirectly',
    sector: 'Cash Transfers',
    tagline: 'Direct cash to people in poverty',
    evidenceBacked: true,
  },
  {
    slug: 'teach-for-america',
    name: 'Teach For America',
    sector: 'Education',
    tagline: 'Leaders in under-resourced schools',
    evidenceBacked: true,
  },
  {
    slug: 'year-up',
    name: 'Year Up',
    sector: 'Workforce',
    tagline: 'Closing the opportunity divide',
    evidenceBacked: true,
  },
  {
    slug: 'boys-girls-clubs',
    name: 'Boys & Girls Clubs',
    sector: 'Youth Dev',
    tagline: 'Enabling youth potential',
    evidenceBacked: true,
  },
  {
    slug: 'against-malaria-foundation',
    name: 'Against Malaria',
    sector: 'Global Health',
    tagline: 'Bed nets to prevent malaria',
    evidenceBacked: true,
  },
  {
    slug: 'harlem-childrens-zone',
    name: 'Harlem Children\'s Zone',
    sector: 'Education',
    tagline: 'Cradle-to-career pipeline',
    evidenceBacked: true,
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
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

      {/* Trending Orgs Section */}
      <section className="py-12 px-4 bg-gray-50">
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
                  {org.evidenceBacked && (
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-gold-600 text-sm mb-1">
                  {org.name}
                </h3>
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

      {/* Feature Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={CheckCircle}
              title="Aggregated Ratings"
              description="Pull ratings from CharityWatch, Charity Navigator, GiveWell, and more into one unified view."
              color="gold"
            />
            <FeatureCard
              icon={Users}
              title="Ecosystem Mapping"
              description="AI-powered comparison with similar organizations based on mission, activities, and approach — not just sector."
              color="green"
            />
            <FeatureCard
              icon={FileSearch}
              title="Impact Evaluation"
              description="Surface and summarize existing impact evaluations, RCTs, and effectiveness findings in plain language."
              color="blue"
            />
            <FeatureCard
              icon={BarChart3}
              title="Financial Intelligence"
              description="990 filings, revenue trends, expense ratios, and major funders — all in one place."
              color="purple"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
