import { Star, ExternalLink } from 'lucide-react'
import { Organization } from '@/lib/types'

interface RatingsTabProps {
  org: Organization
}

export default function RatingsTab({ org }: RatingsTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-gold-500" />
        <h2 className="text-lg font-semibold text-gray-900">Detailed Ratings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RatingDetailCard
          source="CharityWatch"
          rating={org.ratings.charityWatch}
          maxRating="A+"
          description="CharityWatch evaluates charities based on their financial efficiency and transparency."
          url="https://www.charitywatch.org"
        />
        <RatingDetailCard
          source="Charity Navigator"
          rating={org.ratings.charityNavigator.toString()}
          maxRating="100"
          description="Charity Navigator rates charities on financial health, accountability, and transparency."
          url="https://www.charitynavigator.org"
        />
        <RatingDetailCard
          source="GiveWell"
          rating={org.ratings.giveWell}
          maxRating="Top Charity"
          description="GiveWell conducts in-depth research to find charities that save or improve lives the most per dollar."
          url="https://www.givewell.org"
        />
        <RatingDetailCard
          source="BBB Wise Giving Alliance"
          rating={org.ratings.bbbWiseGiving}
          maxRating="Pass"
          description="BBB Wise Giving Alliance evaluates charities against 20 standards for charity accountability."
          url="https://www.give.org"
        />
      </div>
    </div>
  )
}

function RatingDetailCard({
  source,
  rating,
  maxRating,
  description,
  url,
}: {
  source: string
  rating: string
  maxRating: string
  description: string
  url: string
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900">{source}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-gray-900">{rating}</span>
        <span className="text-sm text-gray-500">out of {maxRating}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
