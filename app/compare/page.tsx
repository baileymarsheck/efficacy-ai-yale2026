'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, X, Search, GitCompare, Shield, CheckCircle, AlertCircle, FileText, Globe, Users } from 'lucide-react'
import { getAllOrganizations, getOrganization } from '@/data/mockOrgs'
import { Organization } from '@/lib/types'

function CompareContent() {
  const searchParams = useSearchParams()
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    const org = searchParams.get('org')
    if (!org) return []
    return org.split(',').filter(Boolean)
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const allOrgs = getAllOrganizations()

  const selectedOrgs = useMemo(() => {
    return selectedSlugs
      .map(slug => getOrganization(slug))
      .filter((org): org is Organization => org !== null)
  }, [selectedSlugs])

  const filteredOrgs = useMemo(() => {
    if (!searchQuery.trim()) return allOrgs.filter(org => !selectedSlugs.includes(org.slug))
    return allOrgs.filter(org =>
      !selectedSlugs.includes(org.slug) &&
      (org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       org.sector.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [allOrgs, searchQuery, selectedSlugs])

  const addOrg = (slug: string) => {
    if (!selectedSlugs.includes(slug) && selectedSlugs.length < 4) {
      setSelectedSlugs([...selectedSlugs, slug])
      setSearchQuery('')
      setShowSearch(false)
    }
  }

  const removeOrg = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter(s => s !== slug))
  }

  // Count rigorous findings
  const getRigorousCount = (org: Organization) => {
    return org.impactFindings.filter(f => f.type === 'rigorous').length
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to search
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center">
          <GitCompare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compare Organizations</h1>
          <p className="text-gray-500">Select up to 4 organizations to compare side-by-side</p>
        </div>
      </div>

      {/* Selected Orgs + Add Button */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {selectedOrgs.map(org => (
          <div
            key={org.slug}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
          >
            <span className="font-medium text-gray-900">{org.name}</span>
            <button
              onClick={() => removeOrg(org.slug)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {selectedSlugs.length < 4 && (
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="inline-flex items-center gap-2 bg-gold-50 border-2 border-dashed border-gold-300 text-gold-600 hover:bg-gold-100 rounded-lg px-4 py-2 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Organization
            </button>

            {showSearch && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search organizations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {filteredOrgs.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No organizations found</p>
                  ) : (
                    filteredOrgs.map(org => (
                      <button
                        key={org.slug}
                        onClick={() => addOrg(org.slug)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <p className="font-medium text-gray-900 text-sm">{org.name}</p>
                        <p className="text-xs text-gray-500">{org.sector}</p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedOrgs.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
          <GitCompare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Start Comparing</h2>
          <p className="text-gray-500 mb-6">Add organizations above to compare their ratings, financials, and impact</p>
          <div className="flex flex-wrap justify-center gap-2">
            {allOrgs.slice(0, 4).map(org => (
              <button
                key={org.slug}
                onClick={() => addOrg(org.slug)}
                className="inline-flex items-center gap-1 text-sm text-gold-600 hover:text-gold-700 bg-gold-50 hover:bg-gold-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <Plus className="w-3 h-3" />
                {org.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4 w-48">Metric</th>
                  {selectedOrgs.map(org => (
                    <th key={org.slug} className="text-left text-sm font-semibold text-gray-900 px-6 py-4 min-w-[200px]">
                      <Link href={`/org/${org.slug}`} className="hover:text-gold-600 transition-colors">
                        {org.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Sector */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">Sector</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm text-gray-900 px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {org.sector}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Founded */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">Founded</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm text-gray-900 px-6 py-4">{org.founded}</td>
                  ))}
                </tr>

                {/* Budget */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">Annual Budget</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm font-semibold text-gray-900 px-6 py-4">{org.budget}</td>
                  ))}
                </tr>

                {/* Employees */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">Employees</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm text-gray-900 px-6 py-4">{org.employees.toLocaleString()}</td>
                  ))}
                </tr>

                {/* Ratings Section Header */}
                <tr className="bg-gold-50/50">
                  <td colSpan={selectedOrgs.length + 1} className="px-6 py-3">
                    <span className="text-sm font-semibold text-gold-700">Ratings</span>
                  </td>
                </tr>

                {/* CharityWatch */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">CharityWatch</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-gold-50 text-gold-700 font-bold rounded-lg border border-gold-200">
                        {org.ratings.charityWatch}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Charity Navigator */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">Charity Navigator</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">{org.ratings.charityNavigator}</span>
                        <span className="text-xs text-gray-400">/100</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* GiveWell */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">GiveWell</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        org.ratings.giveWell === 'Top Charity'
                          ? 'bg-green-100 text-green-800'
                          : org.ratings.giveWell === 'Standout Charity'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {org.ratings.giveWell === 'Top Charity' && <CheckCircle className="w-3 h-3" />}
                        {org.ratings.giveWell}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* BBB Wise Giving */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">BBB Wise Giving</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        org.ratings.bbbWiseGiving === 'Pass'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {org.ratings.bbbWiseGiving === 'Pass' && <CheckCircle className="w-3 h-3" />}
                        {org.ratings.bbbWiseGiving}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Impact Section Header */}
                <tr className="bg-green-50/50">
                  <td colSpan={selectedOrgs.length + 1} className="px-6 py-3">
                    <span className="text-sm font-semibold text-green-700">Impact Evidence</span>
                  </td>
                </tr>

                {/* Rigorous Evaluations */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      RCTs / Rigorous
                    </div>
                  </td>
                  {selectedOrgs.map(org => {
                    const count = getRigorousCount(org)
                    return (
                      <td key={org.slug} className="px-6 py-4">
                        <span className={`text-xl font-bold ${count > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                          {count}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">evaluations</span>
                      </td>
                    )
                  })}
                </tr>

                {/* Total Impact Findings */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Total Findings
                    </div>
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="px-6 py-4">
                      <span className="text-xl font-bold text-gray-900">{org.impactFindings.length}</span>
                      <span className="text-xs text-gray-400 ml-1">findings</span>
                    </td>
                  ))}
                </tr>

                {/* Evidence-Backed Status */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      Evidence Status
                    </div>
                  </td>
                  {selectedOrgs.map(org => {
                    const hasRigorous = getRigorousCount(org) > 0
                    return (
                      <td key={org.slug} className="px-6 py-4">
                        {hasRigorous ? (
                          <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium">
                            <Shield className="w-4 h-4" />
                            Evidence-backed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Limited evidence
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* Leadership Section Header */}
                <tr className="bg-blue-50/50">
                  <td colSpan={selectedOrgs.length + 1} className="px-6 py-3">
                    <span className="text-sm font-semibold text-blue-700">Leadership</span>
                  </td>
                </tr>

                {/* CEO */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">CEO</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm text-gray-900 px-6 py-4">{org.ceo}</td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">Headquarters</td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="text-sm text-gray-900 px-6 py-4">{org.location}</td>
                  ))}
                </tr>

                {/* Community Indicators Section Header */}
                <tr className="bg-teal-50/50">
                  <td colSpan={selectedOrgs.length + 1} className="px-6 py-3">
                    <span className="text-sm font-semibold text-teal-700">Community Indicators</span>
                  </td>
                </tr>

                {/* LMIC-Based */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-teal-500" />
                      LMIC-Based
                    </div>
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="px-6 py-4">
                      {org.lmicBased ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200">
                          <Globe className="w-3 h-3" />
                          LMIC-Based
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Community-Led */}
                <tr className="hover:bg-gray-50">
                  <td className="text-sm font-medium text-gray-600 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      Community-Led
                    </div>
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.slug} className="px-6 py-4">
                      {org.communityLed ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                          <Users className="w-3 h-3" />
                          Community-Led
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      {selectedOrgs.length > 0 && (
        <div className="mt-6 flex items-start gap-2 text-xs text-gray-500">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Data aggregated from public sources. Ratings and financial data may not reflect the most recent figures.
            Always verify with primary sources before making funding decisions.
          </span>
        </div>
      )}
    </main>
  )
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  )
}
