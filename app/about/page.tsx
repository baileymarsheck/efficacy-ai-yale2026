export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About EfficacyAI</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          EfficacyAI is an AI-powered platform that helps funders, researchers, and donors make
          informed decisions about nonprofit organizations by aggregating ratings, financial data,
          impact evaluations, and providing intelligent comparisons.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          We believe that understanding a nonprofit's true efficacy shouldn't require hours of
          research across multiple platforms. EfficacyAI brings together everything you need to
          know about an organization in one place.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What Makes Us Different</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            <strong>AI-powered ecosystem mapping:</strong> We use semantic similarity to identify
            organizations with similar missions and approaches, not just sector classifications.
          </li>
          <li>
            <strong>Evidence-focused:</strong> We surface and summarize rigorous impact evaluations,
            making research findings accessible to non-academic audiences.
          </li>
          <li>
            <strong>Comprehensive aggregation:</strong> Ratings from CharityWatch, Charity Navigator,
            GiveWell, and other sources, all in one unified view.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact</h2>
        <p className="text-gray-600">
          Questions or feedback? Reach out to us at{' '}
          <a href="mailto:hello@efficacy.ai" className="text-gold-500 hover:text-gold-600">
            hello@efficacy.ai
          </a>
        </p>
      </div>
    </main>
  )
}
