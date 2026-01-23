// Database Tables Component - Complete Schema Documentation
'use client'

export function DatabaseTables() {
    const tables = [
        {
            name: 'leads',
            description: 'Core lead management and tracking',
            icon: '👥',
            color: 'blue',
            fields: [
                { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Unique identifier' },
                { name: 'company_name', type: 'TEXT', constraint: 'NOT NULL', description: 'Company name' },
                { name: 'industry', type: 'TEXT', constraint: 'NULL', description: 'Industry sector' },
                { name: 'website', type: 'TEXT', constraint: 'NULL', description: 'Company website URL' },
                { name: 'contact_name', type: 'TEXT', constraint: 'NULL', description: 'Primary contact person' },
                { name: 'contact_email', type: 'TEXT', constraint: 'NULL', description: 'Contact email address' },
                { name: 'contact_phone', type: 'TEXT', constraint: 'NULL', description: 'Contact phone number' },
                { name: 'ai_score', type: 'INTEGER', constraint: 'CHECK (0-100)', description: 'AI-generated lead quality score' },
                { name: 'ai_insights', type: 'JSONB', constraint: 'NULL', description: 'AI analysis and recommendations' },
                { name: 'status', type: 'TEXT', constraint: 'ENUM', description: 'Pipeline stage: new, qualified, contacted, proposal, won, lost' },
                { name: 'deal_value', type: 'DECIMAL(10,2)', constraint: 'NULL', description: 'Potential deal value in USD' },
                { name: 'created_by', type: 'UUID', constraint: 'FK → auth.users', description: 'User who created the lead' },
                { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Creation timestamp' },
                { name: 'updated_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Last update timestamp' },
            ],
            indexes: [
                'idx_leads_created_by',
                'idx_leads_status',
                'idx_leads_ai_score',
            ],
            rlsPolicies: [
                { name: 'Users can view own leads', operation: 'SELECT', rule: 'auth.uid() = created_by' },
                { name: 'Users can create own leads', operation: 'INSERT', rule: 'auth.uid() = created_by' },
                { name: 'Users can update own leads', operation: 'UPDATE', rule: 'auth.uid() = created_by' },
                { name: 'Users can delete own leads', operation: 'DELETE', rule: 'auth.uid() = created_by' },
            ],
        },
        {
            name: 'activities',
            description: 'Activity timeline and interaction history',
            icon: '📝',
            color: 'green',
            fields: [
                { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Unique identifier' },
                { name: 'lead_id', type: 'UUID', constraint: 'FK → leads', description: 'Associated lead' },
                { name: 'type', type: 'TEXT', constraint: 'ENUM', description: 'Activity type: note, email, call' },
                { name: 'content', type: 'TEXT', constraint: 'NOT NULL', description: 'Activity content/notes' },
                { name: 'created_by', type: 'UUID', constraint: 'FK → auth.users', description: 'User who created activity' },
                { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Creation timestamp' },
            ],
            indexes: ['idx_activities_lead_id'],
            rlsPolicies: [
                { name: 'Users can view activities for own leads', operation: 'SELECT', rule: 'EXISTS (SELECT 1 FROM leads WHERE leads.id = activities.lead_id AND leads.created_by = auth.uid())' },
                { name: 'Users can create activities for own leads', operation: 'INSERT', rule: 'EXISTS (SELECT 1 FROM leads WHERE leads.id = lead_id AND leads.created_by = auth.uid())' },
            ],
        },
        {
            name: 'email_campaigns',
            description: 'Email campaign management',
            icon: '📧',
            color: 'purple',
            fields: [
                { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Unique identifier' },
                { name: 'name', type: 'TEXT', constraint: 'NOT NULL', description: 'Campaign name' },
                { name: 'subject', type: 'TEXT', constraint: 'NOT NULL', description: 'Email subject line' },
                { name: 'body', type: 'TEXT', constraint: 'NOT NULL', description: 'Email body content' },
                { name: 'status', type: 'TEXT', constraint: 'ENUM', description: 'Campaign status: draft, sent' },
                { name: 'sent_at', type: 'TIMESTAMP', constraint: 'NULL', description: 'Send timestamp' },
                { name: 'created_by', type: 'UUID', constraint: 'FK → auth.users', description: 'Campaign creator' },
                { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Creation timestamp' },
                { name: 'updated_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Last update timestamp' },
            ],
            indexes: [],
            rlsPolicies: [
                { name: 'Users can manage own campaigns', operation: 'ALL', rule: 'auth.uid() = created_by' },
            ],
        },
        {
            name: 'campaign_recipients',
            description: 'Campaign recipient tracking and analytics',
            icon: '📬',
            color: 'orange',
            fields: [
                { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Unique identifier' },
                { name: 'campaign_id', type: 'UUID', constraint: 'FK → email_campaigns', description: 'Associated campaign' },
                { name: 'lead_id', type: 'UUID', constraint: 'FK → leads', description: 'Recipient lead' },
                { name: 'sent', type: 'BOOLEAN', constraint: 'DEFAULT false', description: 'Email sent status' },
                { name: 'opened', type: 'BOOLEAN', constraint: 'DEFAULT false', description: 'Email opened status' },
                { name: 'clicked', type: 'BOOLEAN', constraint: 'DEFAULT false', description: 'Link clicked status' },
                { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Creation timestamp' },
            ],
            indexes: [
                'idx_campaign_recipients_campaign_id',
                'idx_campaign_recipients_lead_id',
            ],
            rlsPolicies: [
                { name: 'Users can manage own campaign recipients', operation: 'ALL', rule: 'EXISTS (SELECT 1 FROM email_campaigns WHERE email_campaigns.id = campaign_recipients.campaign_id AND email_campaigns.created_by = auth.uid())' },
            ],
        },
    ]

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50 px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg text-white">
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
                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Database Schema & Tables
                        </h2>
                        <p className="text-slate-600">
                            PostgreSQL tables with Row Level Security (RLS)
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="space-y-8">
                    {/* Entity Relationship Diagram */}
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Entity Relationship Diagram
                        </h3>
                        <div className="bg-white rounded-lg p-4 font-mono text-sm">
                            <pre className="text-slate-700">
                                {`┌─────────────────┐       ┌──────────────────┐
│     leads       │───┬───│   activities     │
│─────────────────│   │   │──────────────────│
│ • id (PK)       │   │   │ • id (PK)        │
│ • company_name  │   │   │ • lead_id (FK)   │
│ • ai_score      │   │   │ • type           │
│ • status        │   │   │ • content        │
│ • created_by    │   │   └──────────────────┘
└─────────────────┘   │
         │            │   ┌──────────────────────┐
         │            └───│ campaign_recipients  │
         │                │──────────────────────│
         │                │ • id (PK)            │
         │                │ • lead_id (FK)       │
         │                │ • campaign_id (FK)   │
         │                │ • sent, opened       │
         │                └──────────────────────┘
         │                         │
         │                         │
         │                ┌────────▼──────────┐
         └────────────────│ email_campaigns   │
                          │───────────────────│
                          │ • id (PK)         │
                          │ • name            │
                          │ • subject, body   │
                          │ • status          │
                          └───────────────────┘`}
                            </pre>
                        </div>
                    </div>

                    {/* Detailed Table Documentation */}
                    {tables.map((table) => (
                        <div key={table.name} className="border border-slate-200 rounded-lg overflow-hidden">
                            {/* Table Header */}
                            <div className={`bg-${table.color}-50 border-b border-${table.color}-200 px-6 py-4`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{table.icon}</span>
                                        <div>
                                            <h3 className="font-mono font-bold text-lg text-slate-900">
                                                {table.name}
                                            </h3>
                                            <p className="text-sm text-slate-600">{table.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700">
                                            {table.fields.length} fields
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 border border-green-300 rounded text-sm font-medium text-green-700">
                                            {table.rlsPolicies.length} RLS policies
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Fields Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Field Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Constraint
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {table.fields.map((field, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <code className="text-sm font-mono text-purple-600 font-semibold">
                                                        {field.name}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-mono text-blue-600">
                                                        {field.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-xs px-2 py-1 bg-slate-100 rounded font-mono text-slate-700">
                                                        {field.constraint}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {field.description}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Indexes */}
                            {table.indexes.length > 0 && (
                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                                        📊 Indexes (Performance Optimization)
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {table.indexes.map((index, idx) => (
                                            <code key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-mono">
                                                {index}
                                            </code>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* RLS Policies */}
                            <div className="px-6 py-4 bg-green-50 border-t border-green-200">
                                <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Row Level Security (RLS) Policies
                                </h4>
                                <div className="space-y-2">
                                    {table.rlsPolicies.map((policy, idx) => (
                                        <div key={idx} className="bg-white border border-green-200 rounded p-3">
                                            <div className="flex items-start justify-between mb-1">
                                                <span className="text-sm font-medium text-green-900">
                                                    {policy.name}
                                                </span>
                                                <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs font-mono rounded">
                                                    {policy.operation}
                                                </span>
                                            </div>
                                            <code className="text-xs font-mono text-green-700 bg-green-50 px-2 py-1 rounded block mt-2">
                                                {policy.rule}
                                            </code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
