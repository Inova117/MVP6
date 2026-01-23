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
import { Plus, Mail, Send, TrendingUp, Sparkles, Loader2 } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  subject: string
  status: 'draft' | 'sent'
  recipients: number
  sentAt: string | null
  openRate: number
  clickRate: number
}

interface Stats {
  totalSent: number
  avgOpenRate: number
  avgClickRate: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/campaigns')
        const data = await res.json()
        setCampaigns(data.campaigns)
        setAiSuggestions(data.aiSuggestions)
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCreateCampaign = () => {
    // Simulated: Would open campaign builder modal
  }

  const handleAISuggestion = () => {
    setShowAISuggestions(!showAISuggestions)
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  // Calculate local stats based on fetched data
  const sentCampaigns = campaigns.filter(c => c.status === 'sent')
  const stats: Stats = {
    totalSent: sentCampaigns.length,
    avgOpenRate: sentCampaigns.length > 0
      ? Math.round(sentCampaigns.reduce((acc, c) => acc + c.openRate, 0) / sentCampaigns.length)
      : 0,
    avgClickRate: sentCampaigns.length > 0
      ? Math.round(sentCampaigns.reduce((acc, c) => acc + c.clickRate, 0) / sentCampaigns.length)
      : 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Email Campaigns</h1>
          <p className="text-slate-600">
            Create and manage AI-powered email campaigns
          </p>
        </div>
        <Button onClick={handleCreateCampaign}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Sent</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalSent}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Avg Open Rate
                </p>
                <p className="text-2xl font-bold text-slate-900">{stats.avgOpenRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Avg Click Rate
                </p>
                <p className="text-2xl font-bold text-slate-900">{stats.avgClickRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Subject Line Generator Demo */}
      <Card className="border-primary-200 bg-primary-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-600" />
            AI Subject Line Generator
          </CardTitle>
          <CardDescription>
            Let AI suggest compelling subject lines for your campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter campaign topic (e.g., 'Product launch for SaaS companies')"
                className="flex-1"
              />
              <Button onClick={handleAISuggestion}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>

            {showAISuggestions && (
              <div className="space-y-2 rounded-lg border border-primary-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-900">
                  AI Suggestions:
                </p>
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50"
                  >
                    <p className="text-sm text-slate-900">{suggestion}</p>
                    <Button size="sm" variant="outline">
                      Use This
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            View performance metrics for your email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h4 className="font-semibold text-slate-900">
                      {campaign.name}
                    </h4>
                    <Badge
                      variant={
                        campaign.status === 'sent' ? 'success' : 'outline'
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-slate-600">
                    Subject: {campaign.subject}
                  </p>
                  {campaign.status === 'sent' && (
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>{campaign.recipients} recipients</span>
                      <span>•</span>
                      <span>{campaign.openRate}% opened</span>
                      <span>•</span>
                      <span>{campaign.clickRate}% clicked</span>
                      <span>•</span>
                      <span>
                        Sent {new Date(campaign.sentAt!).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {campaign.status === 'draft' ? (
                    <>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Campaign Builder Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Campaign Preview</CardTitle>
          <CardDescription>
            Template variables available: {'{'}
            {'{'}first_name{'}'}, {'{'}company{'}'}, {'{'}industry{'}'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subject Line
              </label>
              <Input
                placeholder="Hi {{first_name}}, transform your sales process"
                defaultValue="Hi {{first_name}}, transform your sales process"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Body
              </label>
              <textarea
                className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                rows={6}
                placeholder="Dear {{first_name}},
 
I noticed {{company}} is in the {{industry}} industry...
 
[Your personalized message here]
 
Best regards"
                defaultValue={`Dear {{first_name}},
 
I noticed {{company}} is in the {{industry}} industry, and I wanted to reach out with a solution that could transform your sales pipeline.
 
Our AI-powered CRM has helped companies like yours increase qualified leads by 40% and reduce sales cycles by 30%.
 
Would you be interested in a quick 15-minute demo?
 
Best regards`}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Preview</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
