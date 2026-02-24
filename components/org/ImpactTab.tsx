import { FileText, AlertCircle } from 'lucide-react'
import { Organization, ImpactFinding } from '@/lib/types'

interface ImpactTabProps {
  org: Organization
}

const typeStyles = {
  rigorous: {
    badge: 'bg-gray-900 text-white',
    label: 'Rigorous evaluation',
  },
  funder: {
    badge: 'bg-white text-gray-700 border border-gray-300',
    label: 'Funder evaluation',
  },
  'self-reported': {
    badge: 'bg-white text-gray-600 border border-gray-200',
    label: 'Self-reported',
  },
}

export default function ImpactTab({ org }: ImpactTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Impact Evaluation Findings</h2>
      </div>
      <p className="text-gray-600 text-sm mb-6">
        Publicly available evaluation reports, studies, and self-reported impact data.
      </p>

      <div className="space-y-4">
        {org.impactFindings.map((finding, index) => (
          <ImpactFindingCard key={index} finding={finding} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          Impact findings are AI-summarized from publicly available sources. Always refer to original evaluations for complete methodology and context.
        </p>
      </div>
    </div>
  )
}

function ImpactFindingCard({ finding }: { finding: ImpactFinding }) {
  const style = typeStyles[finding.type]

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${style.badge}`}>
          {style.label}
        </span>
        <span className="text-sm text-gray-500">
          {finding.source} ({finding.year})
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed">{finding.summary}</p>
    </div>
  )
}
