import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        campaigns: [
            {
                id: '1',
                name: 'Q1 Product Launch',
                subject: 'Introducing Our Revolutionary AI Solution',
                status: 'sent',
                recipients: 45,
                sentAt: '2026-01-20',
                openRate: 68,
                clickRate: 24,
            },
            {
                id: '2',
                name: 'Follow-up Sequence',
                subject: "Let's discuss how we can help your team",
                status: 'sent',
                recipients: 32,
                sentAt: '2026-01-18',
                openRate: 52,
                clickRate: 18,
            },
            {
                id: '3',
                name: 'Winter Promotion',
                subject: '20% Off Enterprise Plan - Limited Time',
                status: 'draft',
                recipients: 0,
                sentAt: null,
                openRate: 0,
                clickRate: 0,
            },
        ],
        aiSuggestions: [
            '🚀 Transform Your Sales Pipeline in 30 Days',
            'Exclusive Invite: See How AI Scores Your Leads',
            'Join 500+ Companies Using AI for Sales Growth',
        ],
    })
}
