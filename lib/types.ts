export interface Organization {
  slug: string
  name: string
  tagline: string
  sector: string
  founded: number
  location: string
  ein: string
  mission: string
  budget: string
  employees: number
  ceo: string
  website: string
  ratings: {
    charityWatch: string
    charityNavigator: number
    giveWell: string
    bbbWiseGiving: string
  }
  keyPeople: { name: string; role: string }[]
  similarOrgs: SimilarOrg[]
  impactFindings: ImpactFinding[]
}

export interface SimilarOrg {
  slug: string
  name: string
  sector: string
  budget: string
  tagline: string
  matchPercent: number
  evidenceBacked: boolean
  keyFinding?: {
    text: string
    source: string
  }
}

export interface ImpactFinding {
  type: 'rigorous' | 'funder' | 'self-reported'
  source: string
  year: number
  summary: string
}
