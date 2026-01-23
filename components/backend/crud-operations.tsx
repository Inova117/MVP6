// CRUD Operations Component - Complete API Documentation
'use client'

export function CRUDOperations() {
    const operations = [
        {
            category: 'Leads Management',
            color: 'blue',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/leads',
                    description: 'List all leads with optional filters',
                    auth: true,
                    params: [
                        { name: 'industry', type: 'string', required: false, description: 'Filter by industry' },
                        { name: 'status', type: 'string', required: false, description: 'Filter by status' },
                        { name: 'ai_score_min', type: 'number', required: false, description: 'Minimum AI score (0-100)' },
                    ],
                    response: `{
  "leads": [
    {
      "id": "uuid",
      "companyName": "TechCorp",
      "aiScore": 95,
      "status": "qualified",
      "dealValue": 15000
    }
  ],
  "total": 248
}`,
                    example: `// Fetch high-value qualified leads
const response = await fetch('/api/leads?status=qualified&ai_score_min=80')
const data = await response.json()`,
                },
                {
                    method: 'POST',
                    path: '/api/leads',
                    description: 'Create a new lead',
                    auth: true,
                    body: `{
  "companyName": "New Company Inc",
  "contactName": "John Doe",
  "contactEmail": "john@company.com",
  "industry": "SaaS",
  "dealValue": 10000,
  "status": "new"
}`,
                    response: `{
  "success": true,
  "lead": {
    "id": "new-uuid",
    "companyName": "New Company Inc",
    "createdAt": "2026-01-23T18:00:00Z"
  }
}`,
                    example: `// Create new lead with validation
const newLead = {
  companyName: "Acme Corp",
  contactEmail: "contact@acme.com",
  status: "new"
}

const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newLead)
})`,
                },
                {
                    method: 'PATCH',
                    path: '/api/leads/:id',
                    description: 'Update lead information',
                    auth: true,
                    body: `{
  "status": "qualified",
  "aiScore": 92,
  "dealValue": 25000
}`,
                    response: `{
  "success": true,
  "lead": { /* updated lead */ }
}`,
                    example: `// Move lead to next pipeline stage
await fetch('/api/leads/abc-123', {
  method: 'PATCH',
  body: JSON.stringify({ status: 'proposal' })
})`,
                },
                {
                    method: 'DELETE',
                    path: '/api/leads/:id',
                    description: 'Delete a lead (soft delete recommended)',
                    auth: true,
                    response: `{
  "success": true,
  "message": "Lead deleted successfully"
}`,
                    example: `// Delete lead
await fetch('/api/leads/abc-123', {
  method: 'DELETE'
})`,
                },
            ],
        },
        {
            category: 'Activities & Timeline',
            color: 'green',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/leads/:id/activities',
                    description: 'Get activity timeline for a lead',
                    auth: true,
                    response: `{
  "activities": [
    {
      "id": "uuid",
      "type": "email",
      "content": "Sent follow-up email",
      "createdAt": "2026-01-23T10:00:00Z"
    }
  ]
}`,
                    example: `// Fetch lead activity history
const activities = await fetch('/api/leads/abc-123/activities')
  .then(r => r.json())`,
                },
                {
                    method: 'POST',
                    path: '/api/leads/:id/activities',
                    description: 'Add activity to lead timeline',
                    auth: true,
                    body: `{
  "type": "call",
  "content": "Had discovery call, very interested in enterprise plan"
}`,
                    response: `{
  "success": true,
  "activity": { /* created activity */ }
}`,
                    example: `// Log a phone call
await fetch('/api/leads/abc-123/activities', {
  method: 'POST',
  body: JSON.stringify({
    type: 'call',
    content: 'Discussed pricing and timeline'
  })
})`,
                },
            ],
        },
        {
            category: 'Email Campaigns',
            color: 'purple',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/campaigns',
                    description: 'List all email campaigns',
                    auth: true,
                    response: `{
  "campaigns": [
    {
      "id": "uuid",
      "name": "Q1 Launch",
      "status": "sent",
      "openRate": 68,
      "clickRate": 24
    }
  ]
}`,
                    example: `// Get campaign performance
const campaigns = await fetch('/api/campaigns')
  .then(r => r.json())`,
                },
                {
                    method: 'POST',
                    path: '/api/campaigns',
                    description: 'Create new email campaign',
                    auth: true,
                    body: `{
  "name": "Product Launch 2026",
  "subject": "Introducing our new AI features",
  "body": "Hi {{first_name}}, ...",
  "status": "draft"
}`,
                    response: `{
  "success": true,
  "campaign": { /* created campaign */ }
}`,
                    example: `// Create campaign with personalization
const campaign = {
  name: "Winter Promo",
  subject: "Special offer for {{company}}",
  body: "Dear {{first_name}}, ..."
}

await fetch('/api/campaigns', {
  method: 'POST',
  body: JSON.stringify(campaign)
})`,
                },
                {
                    method: 'POST',
                    path: '/api/campaigns/:id/send',
                    description: 'Send campaign to recipients',
                    auth: true,
                    body: `{
  "leadIds": ["uuid1", "uuid2"],
  "scheduleAt": "2026-01-24T09:00:00Z"
}`,
                    response: `{
  "success": true,
  "sent": 45,
  "scheduled": true
}`,
                    example: `// Send campaign to qualified leads
await fetch('/api/campaigns/xyz-789/send', {
  method: 'POST',
  body: JSON.stringify({
    leadIds: qualifiedLeadIds
  })
})`,
                },
            ],
        },
        {
            category: 'Analytics & Reporting',
            color: 'orange',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/analytics',
                    description: 'Get comprehensive analytics data',
                    auth: true,
                    params: [
                        { name: 'period', type: 'string', required: false, description: '7d, 30d, 90d, 1y' },
                        { name: 'groupBy', type: 'string', required: false, description: 'day, week, month' },
                    ],
                    response: `{
  "metrics": {
    "conversionRate": "11.3%",
    "avgDealSize": "$15,200",
    "salesCycle": "12 days"
  },
  "funnel": [...],
  "trends": [...]
}`,
                    example: `// Get 30-day analytics
const analytics = await fetch('/api/analytics?period=30d')
  .then(r => r.json())`,
                },
                {
                    method: 'GET',
                    path: '/api/stats',
                    description: 'Get dashboard statistics',
                    auth: false,
                    response: `{
  "stats": [
    { "name": "Total Leads", "value": "248", "change": "+12%" }
  ],
  "recentLeads": [...]
}`,
                    example: `// Fetch dashboard stats
const stats = await fetch('/api/stats')
  .then(r => r.json())`,
                },
            ],
        },
    ]

    const getMethodColor = (method: string) => {
        const colors: Record<string, string> = {
            GET: 'bg-green-100 text-green-700 border-green-300',
            POST: 'bg-blue-100 text-blue-700 border-blue-300',
            PATCH: 'bg-orange-100 text-orange-700 border-orange-300',
            PUT: 'bg-yellow-100 text-yellow-700 border-yellow-300',
            DELETE: 'bg-red-100 text-red-700 border-red-300',
        }
        return colors[method] || 'bg-slate-100 text-slate-700 border-slate-300'
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            CRUD Operations & API Endpoints
                        </h2>
                        <p className="text-slate-600">
                            Complete REST API documentation with examples
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="space-y-12">
                    {operations.map((category) => (
                        <div key={category.category}>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className={`w-1 h-6 bg-${category.color}-500 rounded`}></span>
                                {category.category}
                            </h3>

                            <div className="space-y-6">
                                {category.endpoints.map((endpoint, idx) => (
                                    <div
                                        key={idx}
                                        className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        {/* Endpoint Header */}
                                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded font-mono text-sm font-bold border ${getMethodColor(endpoint.method)}`}>
                                                        {endpoint.method}
                                                    </span>
                                                    <code className="text-sm font-mono text-slate-900">
                                                        {endpoint.path}
                                                    </code>
                                                </div>
                                                {endpoint.auth && (
                                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                        Auth Required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-600">{endpoint.description}</p>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            {/* Parameters */}
                                            {endpoint.params && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Query Parameters</h4>
                                                    <div className="bg-slate-50 rounded p-3 space-y-2">
                                                        {endpoint.params.map((param, pidx) => (
                                                            <div key={pidx} className="flex items-start gap-2 text-sm">
                                                                <code className="font-mono text-purple-600 font-semibold">{param.name}</code>
                                                                <span className="text-slate-400">:</span>
                                                                <span className="font-mono text-blue-600">{param.type}</span>
                                                                {!param.required && <span className="text-xs text-slate-500">(optional)</span>}
                                                                <span className="text-slate-600">- {param.description}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Request Body */}
                                            {endpoint.body && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Request Body</h4>
                                                    <pre className="bg-slate-900 text-slate-100 rounded p-4 text-sm overflow-x-auto">
                                                        <code>{endpoint.body}</code>
                                                    </pre>
                                                </div>
                                            )}

                                            {/* Response */}
                                            {endpoint.response && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Response (200 OK)</h4>
                                                    <pre className="bg-slate-900 text-green-400 rounded p-4 text-sm overflow-x-auto">
                                                        <code>{endpoint.response}</code>
                                                    </pre>
                                                </div>
                                            )}

                                            {/* Code Example */}
                                            {endpoint.example && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                        </svg>
                                                        Code Example
                                                    </h4>
                                                    <pre className="bg-blue-950 text-blue-100 rounded p-4 text-sm overflow-x-auto">
                                                        <code>{endpoint.example}</code>
                                                    </pre>
                                                </div>
                                            )}

                                            {/* Test Button */}
                                            {endpoint.method === 'GET' && (
                                                <div className="pt-2">
                                                    <a
                                                        href={endpoint.path.replace(':id', 'test-id')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                        Test Endpoint
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Resources */}
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Complete API Documentation</h4>
                            <p className="text-sm text-blue-700 mb-3">
                                For detailed error codes, authentication flows, rate limiting, and advanced examples, see:
                            </p>
                            <a
                                href="/docs/API_SPEC.md"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 underline"
                            >
                                docs/API_SPEC.md
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
