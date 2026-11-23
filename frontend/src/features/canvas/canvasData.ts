import type { Edge, Node } from '@xyflow/react'

export type MemoryCategory = 'people' | 'places' | 'food'
export type CanvasFilter = 'all' | MemoryCategory

export interface MemoryCanvasNodeData extends Record<string, unknown> {
  title: string
  category: MemoryCategory | 'story'
  date: string
  summary: string
  source: string
}

export type MemoryCanvasNode = Node<MemoryCanvasNodeData, 'memory'>

export const categoryDetails: Record<MemoryCategory, { label: string; color: string }> = {
  people: { label: 'People & relationships', color: '#d96f68' },
  places: { label: 'Places & events', color: '#64899c' },
  food: { label: 'Food & nutrition', color: '#b58a38' },
}

export const memoryCanvasNodes: MemoryCanvasNode[] = [
  {
    id: 'story',
    type: 'memory',
    position: { x: 360, y: 205 },
    width: 178,
    height: 82,
    data: {
      title: 'Your story',
      category: 'story',
      date: 'A starting point',
      summary: 'A sample starting point for a future map of owner-approved memories.',
      source: 'This hub is illustrative and is not a stored memory.',
    },
  },
  {
    id: 'sea-walk',
    type: 'memory',
    position: { x: 35, y: 45 },
    width: 210,
    height: 88,
    data: {
      title: 'A Sunday by the sea',
      category: 'people',
      date: 'October 12',
      summary: 'A long walk home after lunch with Mum, with golden light and no rush to check the time.',
      source: 'Sample diary-entry preview · demo only',
    },
  },
  {
    id: 'bookshop',
    type: 'memory',
    position: { x: 680, y: 45 },
    width: 210,
    height: 88,
    data: {
      title: 'The little bookshop',
      category: 'places',
      date: 'October 8',
      summary: 'A tucked-away corner shop where a poetry book became a favorite keepsake.',
      source: 'Sample diary-entry preview · demo only',
    },
  },
  {
    id: 'lemon-cake',
    type: 'memory',
    position: { x: 365, y: 405 },
    width: 210,
    height: 88,
    data: {
      title: 'Mum’s lemon cake',
      category: 'food',
      date: 'October 3',
      summary: 'A family recipe remembered for its extra zest and a little less sugar.',
      source: 'Sample diary-entry preview · demo only',
    },
  },
]

export const memoryCanvasEdges: Edge[] = [
  { id: 'story-sea-walk', source: 'story', target: 'sea-walk', label: 'sample connection', type: 'smoothstep' },
  { id: 'story-bookshop', source: 'story', target: 'bookshop', label: 'sample connection', type: 'smoothstep' },
  { id: 'story-lemon-cake', source: 'story', target: 'lemon-cake', label: 'sample connection', type: 'smoothstep' },
]
