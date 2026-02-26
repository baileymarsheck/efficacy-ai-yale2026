'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Organization, SimilarOrg } from '@/lib/types'
import { getOrganization } from '@/data/mockOrgs'

interface NetworkGraphProps {
  org: Organization
}

function createNodes(org: Organization): Node[] {
  const centerX = 250
  const centerY = 200
  const radius = 170

  // Build center node badge indicators
  const centerBadges = []
  if (org.lmicBased) centerBadges.push({ label: 'LMIC', color: '#0D9488' })
  if (org.communityLed) centerBadges.push({ label: 'CL', color: '#9333EA' })

  const nodes: Node[] = [
    {
      id: 'center',
      position: { x: centerX, y: centerY },
      data: {
        label: (
          <div className="text-center">
            <div className="font-semibold text-sm">{org.name}</div>
            <div className="text-xs text-gray-200">{org.budget}</div>
            {centerBadges.length > 0 && (
              <div className="flex justify-center gap-1 mt-1">
                {centerBadges.map(b => (
                  <span key={b.label} style={{ background: b.color, color: 'white', fontSize: 9, padding: '1px 4px', borderRadius: 4, fontWeight: 700 }}>
                    {b.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ),
      },
      style: {
        background: '#3B82F6',
        color: 'white',
        border: '3px solid #2563EB',
        borderRadius: '50%',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
      },
    },
  ]

  org.similarOrgs.forEach((similarOrg, index) => {
    const angle = (index * 2 * Math.PI) / org.similarOrgs.length - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    const borderColor = similarOrg.evidenceBacked ? '#22C55E' : '#F59E0B'

    const fullOrg = getOrganization(similarOrg.slug)
    const badges = []
    if (fullOrg?.lmicBased) badges.push({ label: 'LMIC', color: '#0D9488' })
    if (fullOrg?.communityLed) badges.push({ label: 'CL', color: '#9333EA' })

    nodes.push({
      id: similarOrg.slug,
      position: { x, y },
      data: {
        label: (
          <div className="text-center w-full" style={{ overflow: 'hidden', maxHeight: 72 }}>
            <div className="font-semibold text-xs leading-tight truncate">{similarOrg.name}</div>
            <div className="text-xs text-gray-400 mt-0.5 truncate">{similarOrg.budget}</div>
            {similarOrg.evidenceBacked && (
              <div className="text-xs text-green-600">✓</div>
            )}
            {badges.length > 0 && (
              <div className="flex justify-center gap-1 mt-0.5">
                {badges.map(b => (
                  <span key={b.label} style={{ background: b.color, color: 'white', fontSize: 8, padding: '1px 3px', borderRadius: 3, fontWeight: 700 }}>
                    {b.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ),
      },
      style: {
        background: 'white',
        border: `3px solid ${borderColor}`,
        borderRadius: '50%',
        width: 110,
        height: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
      },
    })
  })

  return nodes
}

function createEdges(org: Organization): Edge[] {
  return org.similarOrgs.map((similarOrg) => ({
    id: `center-${similarOrg.slug}`,
    source: 'center',
    target: similarOrg.slug,
    label: `${similarOrg.matchPercent}%`,
    style: { stroke: '#9CA3AF', strokeWidth: 2, strokeDasharray: '5,5' },
    labelStyle: { fill: '#6B7280', fontSize: 12 },
    labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
  }))
}

export default function NetworkGraph({ org }: NetworkGraphProps) {
  const router = useRouter()
  const initialNodes = createNodes(org)
  const initialEdges = createEdges(org)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.id !== 'center') {
      router.push(`/org/${node.id}`)
    }
  }, [router])

  return (
    <div className="h-[400px] bg-white rounded-xl border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-left"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#f3f4f6" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>

      {/* Legend */}
      <div className="flex items-center justify-center flex-wrap gap-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-white" />
          <span className="text-xs text-gray-600">Evidence-backed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-amber-500 bg-white" />
          <span className="text-xs text-gray-600">Limited evidence</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ background: '#0D9488', color: 'white', fontSize: 9, padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>LMIC</span>
          <span className="text-xs text-gray-600">LMIC-Based</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ background: '#9333EA', color: 'white', fontSize: 9, padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>CL</span>
          <span className="text-xs text-gray-600">Community-Led</span>
        </div>
      </div>
    </div>
  )
}
