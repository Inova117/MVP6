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
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Clock,
  Loader2,
} from 'lucide-react'

interface Metric {
  conversionRate: string
  conversionTrend: string
  avgDealSize: string
  dealSizeTrend: string
  salesCycle: string
  cycleTrend: string
  activeDeals: number
  activeTrend: string
}

interface FunnelStage {
  stage: string
  count: number
  percentage: number
}

interface Trend {
  month: string
  leads: number
  converted: number
}

interface Performer {
  name: string
  deals: number
  value: number
}

interface AIPerformance {
  range: string
  label: string
  value: string
  count: number
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<Metric | null>(null)
  const [funnel, setFunnel] = useState<FunnelStage[]>([])
  const [trends, setTrends] = useState<Trend[]>([])
  const [performers, setPerformers] = useState<Performer[]>([])
  const [aiPerformance, setAiPerformance] = useState<AIPerformance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/analytics')
        const data = await res.json()
        setMetrics(data.metrics)
        setFunnel(data.funnel)
        setTrends(data.trends)
        setPerformers(data.topPerformers)
        setAiPerformance(data.aiPerformance)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading || !metrics) {
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
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600">
          Track your sales performance and conversion metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-slate-900">{metrics.conversionRate}</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {metrics.conversionTrend}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Avg Deal Size
                </p>
                <p className="text-2xl font-bold text-slate-900">{metrics.avgDealSize}</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {metrics.dealSizeTrend}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Sales Cycle
                </p>
                <p className="text-2xl font-bold text-slate-900">{metrics.salesCycle}</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  {metrics.cycleTrend}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Active Deals
                </p>
                <p className="text-2xl font-bold text-slate-900">{metrics.activeDeals}</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {metrics.activeTrend}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>
            Lead progression through sales stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnel.map((stage, index) => (
              <div key={stage.stage}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">
                    {stage.stage}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">
                      {stage.count} leads
                    </span>
                    <Badge variant="outline">{stage.percentage}%</Badge>
                  </div>
                </div>
                <div className="h-8 overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className={`h-full transition-all ${index === 0
                        ? 'bg-blue-500'
                        : index === 1
                          ? 'bg-purple-500'
                          : index === 2
                            ? 'bg-orange-500'
                            : index === 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                      }`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Leads generated vs converted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trends.map((stat) => (
                <div key={stat.month}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">
                      {stat.month}
                    </span>
                    <div className="text-sm text-slate-600">
                      {stat.converted} / {stat.leads} converted
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 flex-1 overflow-hidden rounded bg-slate-100">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(stat.leads / 250) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="h-6 flex-1 overflow-hidden rounded bg-slate-100">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${(stat.converted / 30) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-blue-500" />
                <span>Leads Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-green-500" />
                <span>Leads Converted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest revenue this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performers.map((performer, index) => (
                <div
                  key={performer.name}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                            ? 'bg-slate-400'
                            : 'bg-orange-600'
                        }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {performer.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {performer.deals} deals closed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">
                      ${(performer.value / 1000).toFixed(0)}K
                    </p>
                    <p className="text-sm text-slate-600">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Scoring Performance */}
      <Card>
        <CardHeader>
          <CardTitle>AI Scoring Performance</CardTitle>
          <CardDescription>Conversion rates by AI score ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {aiPerformance.map((item) => (
              <div key={item.range} className={`rounded-lg border p-4 ${item.label === 'Hot' ? 'border-green-200 bg-green-50' :
                  item.label === 'Warm' ? 'border-yellow-200 bg-yellow-50' :
                    'border-red-200 bg-red-50'
                }`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-sm font-medium ${item.label === 'Hot' ? 'text-green-900' :
                      item.label === 'Warm' ? 'text-yellow-900' :
                        'text-red-900'
                    }`}>
                    {item.range}
                  </span>
                  <Badge variant={
                    item.label === 'Hot' ? 'success' :
                      item.label === 'Warm' ? 'warning' :
                        'danger'
                  }>{item.label}</Badge>
                </div>
                <p className={`text-2xl font-bold ${item.label === 'Hot' ? 'text-green-900' :
                    item.label === 'Warm' ? 'text-yellow-900' :
                      'text-red-900'
                  }`}>{item.value}</p>
                <p className={`text-sm ${item.label === 'Hot' ? 'text-green-700' :
                    item.label === 'Warm' ? 'text-yellow-700' :
                      'text-red-700'
                  }`}>
                  Conversion rate • {item.count} leads
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
