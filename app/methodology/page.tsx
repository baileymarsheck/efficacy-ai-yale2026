export default function MethodologyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Methodology</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Transparency is core to our mission. Here's how we gather, process, and present
          information about nonprofit organizations.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Sources</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            <strong>Charity ratings:</strong> CharityWatch, Charity Navigator, GiveWell, BBB Wise
            Giving Alliance
          </li>
          <li>
            <strong>Financial data:</strong> IRS 990 filings via ProPublica Nonprofit Explorer
          </li>
          <li>
            <strong>Impact evaluations:</strong> 3ie, J-PAL, NBER, and peer-reviewed journals
          </li>
          <li>
            <strong>Organizational data:</strong> Organization websites, annual reports, press releases
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Similar Organizations</h2>
        <p className="text-gray-600 mb-4">
          We use embedding-based semantic similarity to identify organizations with related
          missions, activities, and approaches. This goes beyond simple sector classifications
          to find truly comparable organizations.
        </p>
        <p className="text-gray-600 mb-4">
          The match percentage represents cosine similarity between organization embeddings,
          weighted by factors including mission alignment, geographic overlap, and program focus.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Evidence Classification</h2>
        <p className="text-gray-600 mb-4">We classify impact findings into three tiers:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            <strong>Rigorous evaluation:</strong> RCTs, quasi-experimental studies published in
            peer-reviewed journals or by evaluation organizations (3ie, J-PAL)
          </li>
          <li>
            <strong>Funder evaluation:</strong> Performance reviews and assessments conducted by
            major funders (USAID, DFID, World Bank)
          </li>
          <li>
            <strong>Self-reported:</strong> Data from organization's own annual reports and
            impact statements
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">AI Summarization</h2>
        <p className="text-gray-600 mb-4">
          Impact findings are summarized using large language models to make complex research
          accessible. We always link to original sources and encourage users to consult full
          evaluations for complete methodology and context.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Limitations</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Coverage is limited to medium-to-large organizations with public data</li>
          <li>Ratings may lag behind current organizational performance</li>
          <li>AI summarization may not capture all nuances of original evaluations</li>
          <li>Similar organization matching is based on available mission descriptions</li>
        </ul>
      </div>
    </main>
  )
}
