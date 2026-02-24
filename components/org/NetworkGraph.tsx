'use client'

import { useCallback } from 'react'
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

interface NetworkGraphProps {
  org: Organization
}

function createNodes(org: Organization): Node[] {
  const centerX = 250
  const centerY = 200
  const radius = 150

  const nodes: Node[] = [
    {
      id: 'center',
      position: { x: centerX, y: centerY },
      data: {
        label: (
          <div className="text-center">
            <div className="font-semibold text-sm">{org.name}</div>
            <div className="text-xs text-gray-500">{org.budget}</div>
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

    nodes.push({
      id: similarOrg.slug,
      position: { x, y },
      data: {
        label: (
          <div className="text-center">
            <div className="font-semibold text-xs">{similarOrg.name}</div>
            <div className="text-xs text-gray-500">{similarOrg.sector}</div>
            <div className="text-xs text-gray-400">{similarOrg.budget}</div>
            {similarOrg.evidenceBacked && (
              <div className="text-xs text-green-600 mt-1">✓</div>
            )}
          </div>
        ),
      },
      style: {
        background: 'white',
        border: `3px solid ${borderColor}`,
        borderRadius: '50%',
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
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
  const initialNodes = createNodes(org)
  const initialEdges = createEdges(org)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="h-[400px] bg-white rounded-xl border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
      <div className="flex items-center justify-center gap-6 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span className="text-xs text-gray-600">Water, Sanitation & Hygiene (WASH)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-amber-500 bg-white" />
          <span className="text-xs text-gray-600">WASH</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-white" />
          <span className="text-xs text-gray-600">Global Health / WASH</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-sm">✓</span>
          <span className="text-xs text-gray-600">Evidence-backed</span>
        </div>
      </div>
    </div>
  )
}
