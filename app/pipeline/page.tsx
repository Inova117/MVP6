'use client'

import { useEffect, useState } from 'react'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { GripVertical, Loader2 } from 'lucide-react'

interface Lead {
  id: string
  companyName: string
  contactName: string
  aiScore: number
  dealValue: number
  status: 'new' | 'qualified' | 'contacted' | 'proposal' | 'won'
}

interface ColumnProps {
  status: Lead['status']
  leads: Lead[]
  title: string
  color: string
}

function LeadCard({ lead }: { lead: Lead }) {
  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'danger'
  }

  return (
    <Card className="mb-3 cursor-move transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <p className="font-semibold text-slate-900">{lead.companyName}</p>
            <p className="text-sm text-slate-600">{lead.contactName}</p>
          </div>
          <GripVertical className="h-4 w-4 text-slate-400" />
        </div>
        <div className="flex items-center justify-between">
          <Badge
            variant={
              getScoreBadge(lead.aiScore) as
              | 'success'
              | 'warning'
              | 'danger'
              | 'default'
              | 'secondary'
              | 'outline'
            }
            className="font-mono text-xs"
          >
            {lead.aiScore}
          </Badge>
          <p className="text-sm font-semibold text-slate-900">
            {formatCurrency(lead.dealValue)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function Column({ leads, title, color }: Omit<ColumnProps, 'status'>) {
  const totalValue = leads.reduce((sum, lead) => sum + lead.dealValue, 0)

  return (
    <div className="flex min-h-[600px] w-80 flex-col rounded-lg bg-slate-50 p-4">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <h3 className="font-semibold text-slate-900">{title}</h3>
          </div>
          <Badge variant="outline">{leads.length}</Badge>
        </div>
        <p className="text-sm text-slate-600">
          {formatCurrency(totalValue)} total
        </p>
      </div>
      <div className="flex-1 space-y-2">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPipeline() {
      try {
        const res = await fetch('/api/pipeline')
        const data = await res.json()
        setLeads(data.leads)
      } catch (error) {
        console.error('Failed to fetch pipeline:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPipeline()
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const leadId = active.id as string
      const newStatus = over.id as Lead['status']

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      )
    }

    setActiveId(null)
  }

  const columns: {
    status: Lead['status']
    title: string
    color: string
  }[] = [
      { status: 'new', title: 'New', color: 'bg-slate-500' },
      { status: 'qualified', title: 'Qualified', color: 'bg-blue-500' },
      { status: 'contacted', title: 'Contacted', color: 'bg-purple-500' },
      { status: 'proposal', title: 'Proposal', color: 'bg-orange-500' },
      { status: 'won', title: 'Won', color: 'bg-green-500' },
    ]

  const getLeadsByStatus = (status: Lead['status']) => {
    return leads.filter((lead) => lead.status === status)
  }

  const activeLead = leads.find((lead) => lead.id === activeId)

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sales Pipeline</h1>
        <p className="text-slate-600">
          Drag and drop leads through your sales stages
        </p>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.status}
              leads={getLeadsByStatus(column.status)}
              title={column.title}
              color={column.color}
            />
          ))}
        </div>

        <DragOverlay>
          {activeLead ? <LeadCard lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {columns.map((column) => {
              const columnLeads = getLeadsByStatus(column.status)
              const totalValue = columnLeads.reduce(
                (sum, lead) => sum + lead.dealValue,
                0
              )
              return (
                <div key={column.status} className="text-center">
                  <div className={`mb-2 h-2 w-full rounded ${column.color}`} />
                  <p className="text-2xl font-bold text-slate-900">
                    {columnLeads.length}
                  </p>
                  <p className="text-sm text-slate-600">{column.title}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(totalValue)}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
