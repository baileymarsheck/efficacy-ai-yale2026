'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getOrganization } from '@/data/mockOrgs'
import OrgHeader from '@/components/org/OrgHeader'
import OverviewTab from '@/components/org/OverviewTab'
import RatingsTab from '@/components/org/RatingsTab'
import FinancialsTab from '@/components/org/FinancialsTab'
import KeyPeopleTab from '@/components/org/KeyPeopleTab'
import SimilarOrgsTab from '@/components/org/SimilarOrgsTab'
import ImpactTab from '@/components/org/ImpactTab'
import SimilarOrgsSidebar from '@/components/org/SimilarOrgsSidebar'

type TabType = 'overview' | 'ratings' | 'financials' | 'people' | 'similar' | 'impact'
type SimilarViewMode = 'list' | 'network'

const mainTabs = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'ratings' as const, label: 'Ratings' },
  { id: 'financials' as const, label: 'Financials' },
  { id: 'people' as const, label: 'Key People' },
]

export default function OrgPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [similarViewMode, setSimilarViewMode] = useState<SimilarViewMode>('list')

  const org = getOrganization(slug)

  if (!org) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Organization Not Found</h1>
          <p className="text-gray-600 mb-6">
            We don't have data for "{slug}" yet. Try searching for one of these organizations:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/org/wateraid" className="text-gold-500 hover:text-gold-600 font-medium">
              WaterAid
            </Link>
            <Link href="/org/doctors-without-borders" className="text-gold-500 hover:text-gold-600 font-medium">
              Doctors Without Borders
            </Link>
            <Link href="/org/givedirectly" className="text-gold-500 hover:text-gold-600 font-medium">
              GiveDirectly
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Check if we're viewing expanded Similar Orgs or Impact tabs
  const isExpandedView = activeTab === 'similar' || activeTab === 'impact'

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to search
      </Link>

      <OrgHeader org={org} />

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-6">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id || (isExpandedView && tab.id === 'overview')
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
          {isExpandedView && (
            <>
              <span className="py-3 text-gray-300">|</span>
              <button
                className="py-3 text-sm font-medium border-b-2 border-gold-500 text-gold-600"
              >
                {activeTab === 'similar' ? 'Similar Orgs (Expanded)' : 'Impact (Expanded)'}
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Expanded views */}
      {activeTab === 'similar' && (
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to overview with sidebar
          </button>
          <SimilarOrgsTab org={org} defaultView={similarViewMode} />
        </div>
      )}

      {activeTab === 'impact' && (
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to overview with sidebar
          </button>
          <ImpactTab org={org} />
        </div>
      )}

      {/* Main content with sidebar layout */}
      {!isExpandedView && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <OverviewTab
                org={org}
                onViewAllImpact={() => setActiveTab('impact')}
              />
            )}
            {activeTab === 'ratings' && <RatingsTab org={org} />}
            {activeTab === 'financials' && <FinancialsTab org={org} />}
            {activeTab === 'people' && <KeyPeopleTab org={org} />}
          </div>

          {/* Right Sidebar - Similar Orgs only */}
          <div className="space-y-6">
            <SimilarOrgsSidebar
              org={org}
              onViewAll={() => {
                setSimilarViewMode('list')
                setActiveTab('similar')
              }}
              onViewNetwork={() => {
                setSimilarViewMode('network')
                setActiveTab('similar')
              }}
            />
          </div>
        </div>
      )}
    </main>
  )
}
