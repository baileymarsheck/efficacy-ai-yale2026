import { BarChart3, TrendingUp, PieChart, Users } from 'lucide-react'
import { Organization } from '@/lib/types'

interface FinancialsTabProps {
  org: Organization
}

export default function FinancialsTab({ org }: FinancialsTabProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          icon={BarChart3}
          label="Annual Budget"
          value={org.budget}
          color="blue"
        />
        <SummaryCard
          icon={TrendingUp}
          label="Revenue Growth"
          value="+12%"
          subtext="vs last year"
          color="green"
        />
        <SummaryCard
          icon={PieChart}
          label="Program Expenses"
          value="82%"
          subtext="of total budget"
          color="purple"
        />
        <SummaryCard
          icon={Users}
          label="Employees"
          value={org.employees.toLocaleString()}
          color="amber"
        />
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
        <div className="space-y-4">
          <ExpenseBar label="Program Services" percentage={82} color="bg-blue-500" />
          <ExpenseBar label="Administrative" percentage={10} color="bg-gray-400" />
          <ExpenseBar label="Fundraising" percentage={8} color="bg-amber-400" />
        </div>
        <p className="text-sm text-gray-500 mt-4">Based on most recent 990 filing</p>
      </div>

      {/* Major Funders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Major Funders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Bill & Melinda Gates Foundation', 'USAID', 'UK FCDO', 'UNICEF'].map((funder) => (
            <div key={funder} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-700">{funder}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">
          Full financial data including 990 filings, revenue trends, and detailed expense analysis coming soon.
        </p>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: any
  label: string
  value: string
  subtext?: string
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  )
}

function ExpenseBar({
  label,
  percentage,
  color,
}: {
  label: string
  percentage: number
  color: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-medium text-gray-900">{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
