# 🔧 ENGINEERING GUIDE - MVP #6: AI Lead Finder + CRM

## Cross-Reference

| Feature (PRODUCT.md)        | Implementation |
| --------------------------- | -------------- |
| Feature #1: Lead Management | § 6.2          |
| Feature #2: AI Scoring      | § 6.3          |
| Feature #3: Pipeline Kanban | § 6.4          |
| Feature #4: Email Campaigns | § 6.5          |
| Feature #5: Analytics       | § 6.6          |

## Setup

Ver `docs/SETUP_GUIDE.md`.

**Dependencies**:

```bash
npm install openai resend @dnd-kit/core
```

## 6.3 AI Lead Scoring

**`app/api/leads/[id]/score/route.ts`**:

```typescript
import OpenAI from 'openai'

export async function POST(req) {
  const { id } = params
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Score this B2B lead 0-100 based on:
        - Company size
        - Industry fit
        - Tech stack match
        - Recent growth signals
        Return JSON: { score: number, insights: string[] }`,
      },
      {
        role: 'user',
        content: JSON.stringify({
          company: lead.company_name,
          industry: lead.industry,
          website: lead.website,
        }),
      },
    ],
  })

  const result = JSON.parse(response.choices[0].message.content)

  await supabase
    .from('leads')
    .update({
      ai_score: result.score,
      ai_insights: result.insights,
    })
    .eq('id', id)

  return NextResponse.json({ data: result })
}
```

## 6.4 Pipeline Kanban

**`components/pipeline-board.tsx`**:

```typescript
import { DndContext } from '@dnd-kit/core'

export function PipelineBoard() {
  const columns = ['new', 'qualified', 'contacted', 'proposal', 'won']

  function handleDragEnd(event) {
    const { active, over } = event
    const leadId = active.id
    const newStatus = over.id

    await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', leadId)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {columns.map(column => (
        <Column key={column} status={column} />
      ))}
    </DndContext>
  )
}
```

## 6.5 Email Campaigns

**`app/api/campaigns/[id]/send/route.ts`**:

```typescript
import { Resend } from 'resend'

export async function POST(req, { params }) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data: campaign } = await supabase
    .from('email_campaigns')
    .select('*, campaign_recipients(*, leads(*))')
    .eq('id', params.id)
    .single()

  for (const recipient of campaign.campaign_recipients) {
    const lead = recipient.leads

    const personalizedSubject = campaign.subject
      .replace('{{first_name}}', lead.contact_name.split(' ')[0])
      .replace('{{company}}', lead.company_name)

    await resend.emails.send({
      from: 'sales@yourcompany.com',
      to: lead.contact_email,
      subject: personalizedSubject,
      html: personalizeBody(campaign.body, lead),
    })

    await supabase
      .from('campaign_recipients')
      .update({ sent: true })
      .eq('id', recipient.id)
  }

  return NextResponse.json({ sent: campaign.campaign_recipients.length })
}
```

**Last Updated**: 2026-01-13
