import { useMemo, useState, type CSSProperties } from 'react'
import { Background, BackgroundVariant, Controls, Handle, MiniMap, Position, ReactFlow, type Edge, type NodeProps } from '@xyflow/react'
import { BookHeart, Heart, List, Network, X } from 'lucide-react'
import {
  categoryDetails,
  memoryCanvasEdges,
  memoryCanvasNodes,
  type CanvasFilter,
  type MemoryCanvasNode,
  type MemoryCanvasNodeData,
  type MemoryCategory,
} from './canvasData'
import '@xyflow/react/dist/style.css'
import './MemoryCanvas.css'

const nodeTypes = { memory: MemoryNode }
const filters: { value: CanvasFilter; label: string }[] = [
  { value: 'all', label: 'All memories' },
  { value: 'people', label: 'People' },
  { value: 'places', label: 'Places' },
  { value: 'food', label: 'Food' },
]

function MemoryFlowGraph({ nodes, edges, onSelect }: { nodes: MemoryCanvasNode[]; edges: Edge[]; onSelect: (data: MemoryCanvasNodeData | null) => void }) {
  const accessibleNodes = useMemo(() => nodes.map((node) => ({
    ...node,
    ariaLabel: `${node.data.title}. ${node.data.category === 'story' ? 'Starting point.' : `${categoryDetails[node.data.category].label}, ${node.data.date}.`}`,
  })), [nodes])
  const viewportWidth = window.innerWidth
  const defaultViewport = viewportWidth <= 600
    ? { x: 30, y: 100, zoom: 0.3 }
    : viewportWidth <= 1000
      ? { x: 55, y: 20, zoom: 0.7 }
      : { x: 140, y: 8, zoom: 0.85 }

  return (
    <ReactFlow
      defaultNodes={accessibleNodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      defaultViewport={defaultViewport}
      minZoom={0.3}
      maxZoom={1.7}
      nodesDraggable={false}
      nodesConnectable={false}
      nodesFocusable={false}
      elementsSelectable
      onNodeClick={(_, node) => onSelect(node.data)}
      proOptions={{ hideAttribution: false }}
    >
      <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="var(--flow-dot)" />
      <Controls showInteractive={false} position="bottom-right" />
      <MiniMap pannable zoomable position="bottom-left" nodeColor={(node) => {
        const category = node.data.category
        return category === 'story' ? 'var(--coral)' : categoryDetails[category as MemoryCategory].color
      }} />
    </ReactFlow>
  )
}

function MemoryNode({ data }: NodeProps<MemoryCanvasNode>) {
  const isStory = data.category === 'story'
  const category = isStory ? null : categoryDetails[data.category as MemoryCategory]

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${data.title}. ${isStory ? 'Starting point.' : `${category?.label}, ${data.date}.`}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          event.currentTarget.closest('.react-flow__node')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        }
      }}
      className={`memory-flow-node${isStory ? ' memory-flow-node-story' : ''}`}
      style={{ '--node-accent': category?.color ?? 'var(--coral)' } as CSSProperties}
    >
      <Handle type="target" position={Position.Top} className="memory-flow-handle" />
      <span className="memory-flow-icon">{isStory ? <Heart size={15} /> : <BookHeart size={15} />}</span>
      <strong>{data.title}</strong>
      <small>{isStory ? data.date : `${category?.label} · ${data.date}`}</small>
      <Handle type="source" position={Position.Bottom} className="memory-flow-handle" />
    </div>
  )
}

export function MemoryCanvas({ onOpenMemories }: { onOpenMemories: () => void }) {
  const [filter, setFilter] = useState<CanvasFilter>('all')
  const [view, setView] = useState<'map' | 'list'>(() => window.matchMedia('(max-width: 600px)').matches ? 'list' : 'map')
  const [selected, setSelected] = useState<MemoryCanvasNodeData | null>(null)
  const visibleNodes = useMemo(() => memoryCanvasNodes.filter((node) => node.data.category === 'story' || filter === 'all' || node.data.category === filter), [filter])
  const visibleIds = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes])
  const visibleEdges = useMemo(() => memoryCanvasEdges.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target)), [visibleIds])
  const visibleMemories = visibleNodes.filter((node) => node.data.category !== 'story')

  return (
    <section className="canvas-feature content-panel" aria-label="Neural Canvas demo">
      <div className="canvas-feature-intro">
        <span className="canvas-feature-icon"><Network size={18} /></span>
        <div>
          <strong>Explore a few sample connections</strong>
          <p>This interactive preview uses fictional demo data. It is not a live or stored relationship model.</p>
        </div>
      </div>

      <div className="canvas-toolbar">
        <div className="canvas-controls" role="group" aria-label="Filter sample memories">
          {filters.map((option) => (
            <button key={option.value} type="button" aria-pressed={filter === option.value} className={`filter-chip${filter === option.value ? ' active' : ''}`} onClick={() => { setFilter(option.value); setSelected(null) }}>
              {option.label}{option.value === 'all' && <span>{memoryCanvasNodes.length - 1}</span>}
            </button>
          ))}
        </div>
        <div className="canvas-view-switch" role="group" aria-label="Canvas view">
          <button type="button" aria-pressed={view === 'map'} onClick={() => setView('map')}><Network size={15} /> Map</button>
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={15} /> List</button>
        </div>
      </div>

      {view === 'map' ? (
        <div className="memory-flow" aria-label="Interactive sample memory map. Use the controls to zoom, or drag the background to pan.">
          <MemoryFlowGraph key={filter} nodes={visibleNodes} edges={visibleEdges} onSelect={setSelected} />
        </div>
      ) : (
        <div className="canvas-memory-list" aria-label="Sample memories in this map">
          {visibleMemories.map((node) => {
            const category = categoryDetails[node.data.category as MemoryCategory]
            return (
              <button key={node.id} type="button" className="canvas-memory-row" onClick={() => setSelected(node.data)}>
                <span className="canvas-memory-marker" style={{ backgroundColor: category.color }} />
                <span className="canvas-memory-copy"><strong>{node.data.title}</strong><small>{category.label} · {node.data.date}</small></span>
                <span aria-hidden="true">›</span>
              </button>
            )
          })}
          {visibleMemories.length === 0 && <p className="canvas-empty">No sample memories in this category.</p>}
        </div>
      )}

      <div className="canvas-legend" aria-label="Memory categories">
        {Object.entries(categoryDetails).map(([key, category]) => <span key={key}><i style={{ backgroundColor: category.color }} />{category.label}</span>)}
        <button type="button" className="text-link" onClick={onOpenMemories}>Open memories list</button>
      </div>

      {selected && (
        <aside className="canvas-detail" aria-live="polite" aria-label="Selected sample memory">
          <div className="canvas-detail-heading">
            <div><small>{selected.category === 'story' ? 'DEMO HUB' : `${categoryDetails[selected.category as MemoryCategory].label.toUpperCase()} · ${selected.date.toUpperCase()}`}</small><h3>{selected.title}</h3></div>
            <button type="button" aria-label="Close memory details" onClick={() => setSelected(null)}><X size={16} /></button>
          </div>
          <p>{selected.summary}</p>
          <small className="canvas-detail-source">{selected.source}</small>
        </aside>
      )}
    </section>
  )
}
