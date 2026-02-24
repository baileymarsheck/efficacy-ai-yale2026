import { FileText } from 'lucide-react'
import { Organization } from '@/lib/types'

interface OrgHeaderProps {
  org: Organization
}

export default function OrgHeader({ org }: OrgHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{org.name}</h1>
          <p className="text-gray-600 mt-1">{org.tagline}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
          {org.sector}
        </span>
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
  )
}
