'use client'

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'ratings', label: 'Ratings' },
  { id: 'financials', label: 'Financials' },
  { id: 'similar', label: 'Similar Orgs' },
  { id: 'impact', label: 'Impact' },
]

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
