'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Upload, Filter, Loader2 } from 'lucide-react'

interface Lead {
  id: string
  companyName: string
  industry: string
  contactName: string
  contactEmail: string
  aiScore: number | null
  status: 'new' | 'qualified' | 'contacted' | 'proposal' | 'won' | 'lost'
  dealValue: number | null
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/leads')
        const data = await res.json()
        setLeads(data.leads)
      } catch (error) {
        console.error('Failed to fetch leads:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  const getScoreBadge = (score: number | null) => {
    if (score === null) return <Badge variant="outline">Not Scored</Badge>
    if (score >= 90)
      return (
        <Badge variant="success" className="font-mono">
          {score}
        </Badge>
      )
    if (score >= 70)
      return (
        <Badge variant="warning" className="font-mono">
          {score}
        </Badge>
      )
    return (
      <Badge variant="danger" className="font-mono">
        {score}
      </Badge>
    )
  }

  const getStatusBadge = (status: Lead['status']) => {
    const variants: Record<
      Lead['status'],
      'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
    > = {
      new: 'outline',
      qualified: 'default',
      contacted: 'secondary',
      proposal: 'warning',
      won: 'success',
      lost: 'danger',
    }
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const filteredLeads = leads.filter(
    (lead) =>
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-600">
            Manage and track your sales leads with AI-powered insights
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search leads by company, contact, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>
            Click on a lead to view details and activity timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm font-medium text-slate-600">
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Industry</th>
                  <th className="pb-3">AI Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Deal Value</th>
                  <th className="pb-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="cursor-pointer transition-colors hover:bg-slate-50"
                  >
                    <td className="py-4">
                      <p className="font-medium text-slate-900">
                        {lead.companyName}
                      </p>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {lead.contactName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {lead.contactEmail}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm text-slate-600">{lead.industry}</p>
                    </td>
                    <td className="py-4">{getScoreBadge(lead.aiScore)}</td>
                    <td className="py-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-4">
                      {lead.dealValue ? (
                        <p className="font-semibold text-slate-900">
                          ${lead.dealValue.toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-sm text-slate-400">-</p>
                      )}
                    </td>
                    <td className="py-4">
                      <p className="text-sm text-slate-600">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
