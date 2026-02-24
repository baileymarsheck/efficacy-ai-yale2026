import { Users, Linkedin, ExternalLink } from 'lucide-react'
import { Organization } from '@/lib/types'

interface KeyPeopleTabProps {
  org: Organization
}

export default function KeyPeopleTab({ org }: KeyPeopleTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-gold-500" />
          <h2 className="text-lg font-semibold text-gray-900">Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {org.keyPeople.map((person, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-semibold text-gray-500">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{person.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{person.role}</p>
              <div className="flex items-center gap-2">
                <button className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board Members Placeholder */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-sm text-gray-500">
          Board of Directors and additional leadership information coming soon.
        </p>
      </div>
    </div>
  )
}
