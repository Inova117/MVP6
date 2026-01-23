'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, DollarSign, Target, Loader2 } from 'lucide-react'

interface Stat {
  name: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any
}

interface Lead {
  id: string
  company: string
  contact: string
  score: number
  status: string
  dealValue: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const iconMap: Record<string, any> = {
    'Total Leads': Users,
    'Qualified Leads': Target,
    'In Pipeline': TrendingUp,
    'Avg Deal Value': DollarSign,
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()

        const mappedStats = data.stats.map((s: any) => ({
          ...s,
          icon: iconMap[s.name] || Users
        }))

        setStats(mappedStats)
        setRecentLeads(data.recentLeads)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge variant="success">{score}</Badge>
    if (score >= 70) return <Badge variant="warning">{score}</Badge>
    return <Badge variant="danger">{score}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
    > = {
      new: 'outline',
      qualified: 'default',
      contacted: 'secondary',
      proposal: 'warning',
      won: 'success',
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">
          Welcome back! Here&apos;s your sales overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>
            Latest leads with AI scoring and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-slate-900">
                        {lead.company}
                      </p>
                      <p className="text-sm text-slate-600">{lead.contact}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Deal Value</p>
                    <p className="font-semibold text-slate-900">
                      ${lead.dealValue.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getScoreBadge(lead.score)}
                    {getStatusBadge(lead.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Add New Lead</p>
                <p className="text-sm text-slate-600">Import or manually add</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Run AI Scoring</p>
                <p className="text-sm text-slate-600">Score unrated leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Create Campaign</p>
                <p className="text-sm text-slate-600">Send bulk emails</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
